import { useStore } from '../../store/useStore';
import { Card } from '../UI/Card';
import { formatCurrency } from '../../utils/formatters';
import { Wallet, TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// Lightweight animated counter hook
const useCountUp = (end, duration = 1500) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Use easeOutQuart curve
      const easeOut = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOut * end));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(end); // Ensure we land exactly on the end number
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return count;
};

// Animated Number Component
const AnimatedNumber = ({ value, isCount }) => {
  const animatedValue = useCountUp(value);
  return <>{isCount ? animatedValue : formatCurrency(animatedValue)}</>;
};

export const SummaryCards = () => {
  const getSummary = useStore(state => state.getSummary);
  const { totalIncome, totalExpense, balance } = getSummary();

  const cards = [
    {
      title: 'Total Balance',
      amount: balance,
      icon: Wallet,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/40',
      shadow: 'hover:shadow-blue-500/10 dark:hover:shadow-blue-500/5'
    },
    {
      title: 'Total Income',
      amount: totalIncome,
      icon: TrendingUp,
      color: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-100 dark:bg-emerald-900/40',
      shadow: 'hover:shadow-emerald-500/10 dark:hover:shadow-emerald-500/5'
    },
    {
      title: 'Total Expenses',
      amount: totalExpense,
      icon: TrendingDown,
      color: 'text-rose-600 dark:text-rose-400',
      bgColor: 'bg-rose-100 dark:bg-rose-900/40',
      shadow: 'hover:shadow-rose-500/10 dark:hover:shadow-rose-500/5'
    },
    {
      title: 'Active Transactions',
      amount: useStore(state => state.transactions.length),
      icon: Activity,
      color: 'text-violet-600 dark:text-violet-400',
      bgColor: 'bg-violet-100 dark:bg-violet-900/40',
      shadow: 'hover:shadow-violet-500/10 dark:hover:shadow-violet-500/5',
      isCount: true,
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.95, y: 10 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <motion.div key={index} variants={item}>
            <Card className={`group hover:-translate-y-1 hover:shadow-lg ${card.shadow} cursor-default`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                    {card.title}
                  </p>
                  <p className="text-3xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">
                    <AnimatedNumber value={card.amount} isCount={card.isCount} />
                  </p>
                </div>
                <div className={`p-3.5 rounded-2xl ${card.bgColor} transition-transform group-hover:scale-110 group-hover:rotate-3 duration-300`}>
                  <Icon className={`w-6 h-6 ${card.color}`} />
                </div>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
};
