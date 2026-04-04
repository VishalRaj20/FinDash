import { useStore } from '../../store/useStore';
import { Card } from '../UI/Card';
import { Lightbulb, TrendingDown, Trophy } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { motion } from 'framer-motion';

export const InsightsSection = () => {
  const transactions = useStore(state => state.transactions);

  // Compute insights
  const expenseTransactions = transactions.filter(t => t.type === 'expense');
  
  // 1. Highest spending category
  let topCategory = 'None';
  let topCategoryAmount = 0;
  
  if (expenseTransactions.length > 0) {
    const catDataMap = {};
    expenseTransactions.forEach(t => {
      catDataMap[t.category] = (catDataMap[t.category] || 0) + t.amount;
    });
    const sortedCats = Object.entries(catDataMap).sort((a, b) => b[1] - a[1]);
    if (sortedCats.length > 0) {
      topCategory = sortedCats[0][0];
      topCategoryAmount = sortedCats[0][1];
    }
  }

  // 2. Largest single expense
  let largestExpense = null;
  if (expenseTransactions.length > 0) {
    largestExpense = [...expenseTransactions].sort((a, b) => b.amount - a.amount)[0];
  }

  const insights = [
    {
      title: 'Top Category',
      message: `You've spent the most on ${topCategory} (${formatCurrency(topCategoryAmount)})`,
      icon: Trophy,
      color: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-100 dark:bg-amber-500/20',
      shadow: 'hover:shadow-amber-500/10'
    },
    {
      title: 'Largest Expense',
      message: largestExpense 
        ? `${largestExpense.description || largestExpense.category} for ${formatCurrency(largestExpense.amount)}`
        : 'No expenses yet',
      icon: TrendingDown,
      color: 'text-rose-600 dark:text-rose-400',
      bgColor: 'bg-rose-100 dark:bg-rose-500/20',
      shadow: 'hover:shadow-rose-500/10'
    },
    {
      title: 'Financial Health',
      message: 'Your spending is within normal limits this month, great job tracking!',
      icon: Lightbulb,
      color: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-100 dark:bg-emerald-500/20',
      shadow: 'hover:shadow-emerald-500/10'
    }
  ];

  return (
    <div className="mt-8">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Key Insights</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">Actionable advice based on your spending</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
            >
              <Card className={`group flex flex-col items-start space-y-4 h-full hover:-translate-y-1 ${insight.shadow}`}>
                <div className={`p-4 rounded-2xl ${insight.bgColor} transition-transform group-hover:-rotate-3 duration-300`}>
                  <Icon className={`w-7 h-7 ${insight.color}`} />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-slate-800 dark:text-slate-100 mb-1">{insight.title}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    {insight.message}
                  </p>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
