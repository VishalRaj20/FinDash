import { SummaryCards } from '../components/Dashboard/SummaryCards';
import { Charts } from '../components/Dashboard/Charts';
import { InsightsSection } from '../components/Insights/InsightsSection';
import { motion } from 'framer-motion';

export const DashboardPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
  };

  return (
    <motion.div 
      className="space-y-8 pb-12 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="pt-4 pb-2 border-b border-slate-200/50 dark:border-slate-800/50 mb-8">
        <motion.h1 
          className="text-4xl font-extrabold pb-1 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent tracking-tight"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Dashboard Overview
        </motion.h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 mt-2">Here's your personal financial summary.</p>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <SummaryCards />
      </motion.div>
      
      <motion.div variants={itemVariants} className="mt-12">
        <Charts />
      </motion.div>
      
      <motion.div variants={itemVariants} className="mt-12">
        <InsightsSection />
      </motion.div>
    </motion.div>
  );
};
