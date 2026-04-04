import { useState, useMemo } from 'react';
import { useStore } from '../store/useStore';
import { TransactionFilters } from '../components/Transactions/TransactionFilters';
import { TransactionTable } from '../components/Transactions/TransactionTable';
import { TransactionForm } from '../components/Transactions/TransactionForm';
import { Modal } from '../components/UI/Modal';
import { Button } from '../components/UI/Button';
import { Plus, Download } from 'lucide-react';
import { motion } from 'framer-motion';

export const TransactionsPage = () => {
  const { role, transactions, deleteTransaction } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [transactionToDelete, setTransactionToDelete] = useState(null);
  
  const [filterText, setFilterText] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortType, setSortType] = useState('newest');

  const filteredTransactions = useMemo(() => {
    let result = transactions.filter(t => {
      const matchesSearch = (t.description?.toLowerCase() || '').includes(filterText.toLowerCase()) || 
                            t.category.toLowerCase().includes(filterText.toLowerCase());
      const matchesType = filterType === 'all' || t.type === filterType;
      return matchesSearch && matchesType;
    });

    // Apply sorting
    result.sort((a, b) => {
      switch (sortType) {
        case 'newest':
          return new Date(b.date) - new Date(a.date);
        case 'oldest':
          return new Date(a.date) - new Date(b.date);
        case 'highest':
          return (b.amount || 0) - (a.amount || 0);
        case 'lowest':
          return (a.amount || 0) - (b.amount || 0);
        default:
          return 0;
      }
    });

    return result;
  }, [transactions, filterText, filterType, sortType]);

  const handleExportCSV = () => {
    if (filteredTransactions.length === 0) return;
    const headers = ['ID', 'Date', 'Description', 'Category', 'Amount', 'Type'];
    const csvContent = [
      headers.join(','),
      ...filteredTransactions.map(t => 
        `"${t.id}","${t.date}","${t.description}","${t.category}",${t.amount},"${t.type}"`
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'transactions_export.csv';
    link.click();
  };

  const handleExportJSON = () => {
    if (filteredTransactions.length === 0) return;
    const jsonContent = JSON.stringify(filteredTransactions, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'transactions_export.json';
    link.click();
  };

  const handleAddClick = () => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (transaction) => {
    setTransactionToDelete(transaction);
  };

  const confirmDelete = () => {
    if (transactionToDelete) {
      deleteTransaction(transactionToDelete.id);
      setTransactionToDelete(null);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setEditingTransaction(null), 300); // clear after animation
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
  };

  return (
    <motion.div 
      className="space-y-8 pb-12 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4 pb-6 border-b border-slate-200/50 dark:border-slate-800/50 mb-8">
        <div>
          <motion.h1 
            className="text-4xl font-extrabold pb-1 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent tracking-tight"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Transactions
          </motion.h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 mt-2">Manage and view your financial history.</p>
        </div>
        <div className="flex items-center gap-3">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="hidden sm:block">
            <Button variant="ghost" onClick={handleExportCSV} className="border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800">
              <Download className="w-4 h-4 mr-2" />
              CSV
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="hidden sm:block">
            <Button variant="ghost" onClick={handleExportJSON} className="border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800">
              <Download className="w-4 h-4 mr-2" />
              JSON
            </Button>
          </motion.div>
          {role === 'admin' && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="primary" size="lg" className="shadow-md hover:shadow-lg shadow-blue-500/30 transition-shadow" onClick={handleAddClick}>
                <Plus className="w-5 h-5 mr-2" />
                Add Transaction
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>
      
      <motion.div variants={itemVariants} className="mt-8 z-10 relative">
        <TransactionFilters 
          filterText={filterText}
          onFilterChange={setFilterText}
          filterType={filterType}
          onTypeChange={setFilterType}
          sortType={sortType}
          onSortChange={setSortType}
        />
      </motion.div>
      
      <motion.div variants={itemVariants} className="mt-6 shadow-xl rounded-2xl overflow-hidden border border-slate-200/50 dark:border-slate-700/50 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl">
        <TransactionTable transactions={filteredTransactions} onEdit={handleEditClick} onDeleteClick={handleDeleteClick} />
      </motion.div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        title={editingTransaction ? "Edit Transaction" : "Add New Transaction"}
      >
        <TransactionForm onClose={handleCloseModal} initialData={editingTransaction} />
      </Modal>

      <Modal
        isOpen={!!transactionToDelete}
        onClose={() => setTransactionToDelete(null)}
        title="Confirm Deletion"
      >
        <div className="space-y-4 pt-2">
          <p className="text-slate-600 dark:text-slate-300">
            Are you sure you want to delete this transaction? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3 pt-6 border-t border-slate-200 dark:border-slate-700">
            <Button variant="ghost" className="px-5 py-2.5" onClick={() => setTransactionToDelete(null)}>
              Cancel
            </Button>
            <Button variant="danger" className="px-5 py-2.5 shadow-md shadow-rose-500/30" onClick={confirmDelete}>
              Confirm Delete
            </Button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
};
