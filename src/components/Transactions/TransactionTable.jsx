import { useStore } from '../../store/useStore';
import { Card } from '../UI/Card';
import { Button } from '../UI/Button';
import { Trash2, Edit2 } from 'lucide-react';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { motion, AnimatePresence } from 'framer-motion';

export const TransactionTable = ({ transactions, onEdit, onDeleteClick }) => {
  const { role } = useStore();

  return (
    <Card className="overflow-hidden p-0 border-none shadow-md">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
          <thead className="bg-slate-100/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 font-semibold border-b border-slate-200/80 dark:border-slate-700 backdrop-blur-md">
            <tr>
              <th className="px-6 py-5 whitespace-nowrap">Date</th>
              <th className="px-6 py-5">Description</th>
              <th className="px-6 py-5">Category</th>
              <th className="px-6 py-5">Amount</th>
              {role === 'admin' && <th className="px-6 py-5 text-right w-32">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
            <AnimatePresence>
              {transactions.length > 0 ? (
                transactions.map((t) => (
                  <motion.tr 
                    key={t.id}
                    layout
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, backgroundColor: 'rgba(244, 63, 94, 0.1)' }}
                    transition={{ duration: 0.2 }}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors bg-white dark:bg-slate-900/20 group"
                  >
                    <td className="px-6 py-4 whitespace-nowrap font-medium">{formatDate(t.date)}</td>
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">
                      {t.description || '-'}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 ring-1 ring-inset ring-slate-200/50 dark:ring-slate-700">
                        {t.category}
                      </span>
                    </td>
                    <td className={`px-6 py-4 font-bold tracking-tight ${t.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                      {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                    </td>
                    {role === 'admin' && (
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30"
                            onClick={() => onEdit(t)}
                            aria-label="Edit transaction"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30"
                            onClick={() => onDeleteClick(t)}
                            aria-label="Delete transaction"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    )}
                  </motion.tr>
                ))
              ) : (
                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <td colSpan={role === 'admin' ? 5 : 4} className="px-6 py-12 text-center bg-white dark:bg-slate-900/20">
                    <div className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500">
                      <svg className="w-12 h-12 mb-4 text-slate-300 dark:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="font-medium text-lg">No transactions found</p>
                      <p className="text-sm mt-1">Try adjusting your filters or search query.</p>
                    </div>
                  </td>
                </motion.tr>
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </Card>
  );
};
