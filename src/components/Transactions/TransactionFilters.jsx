import { Search, Filter, ArrowUpDown } from 'lucide-react';
import { Card } from '../UI/Card';

export const TransactionFilters = ({ filterText, onFilterChange, filterType, onTypeChange, sortType, onSortChange }) => {
  return (
    <Card className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1 relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
        <input
          type="text"
          placeholder="Search by description or category..."
          className="w-full pl-12 pr-4 py-3 border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-800 transition-all shadow-sm"
          value={filterText}
          onChange={(e) => onFilterChange(e.target.value)}
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-3 min-w-0 sm:w-auto">
        <div className="relative group">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
          <select
            className="w-full sm:w-40 pl-12 pr-10 py-3 appearance-none border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-800 transition-all font-medium shadow-sm cursor-pointer"
            value={filterType}
            onChange={(e) => onTypeChange(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="income">Income Only</option>
            <option value="expense">Expense Only</option>
          </select>
        </div>
        <div className="relative group">
          <ArrowUpDown className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
          <select
            className="w-full sm:w-48 pl-12 pr-10 py-3 appearance-none border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-800 transition-all font-medium shadow-sm cursor-pointer"
            value={sortType}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="newest">Date: Newest</option>
            <option value="oldest">Date: Oldest</option>
            <option value="highest">Amount: High</option>
            <option value="lowest">Amount: Low</option>
          </select>
        </div>
      </div>
    </Card>
  );
};
