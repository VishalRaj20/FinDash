import { useState } from 'react';
import { Home, ListOrdered, Wallet, Edit2, PieChart } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { ProfileModal } from '../UI/ProfileModal';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'transactions', label: 'Transactions', icon: ListOrdered },
];

export const Sidebar = ({ currentView, setCurrentView }) => {
  const { userProfile } = useStore();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  return (
    <>
      <aside className="w-72 bg-white/50 dark:bg-slate-900/50 backdrop-blur-2xl border-r border-slate-200/50 dark:border-slate-800/50 h-screen sticky top-0 flex col overflow-hidden transition-colors duration-300 flex-col">
        
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-100/40 to-transparent dark:from-blue-900/10 pointer-events-none -mr-4" />
        
        <div className="p-8 relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <PieChart className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              FinDash.
            </h1>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 relative">
          <p className="px-4 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">Main Menu</p>
          
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={cn(
                  'w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-200 font-medium relative group overflow-hidden',
                  isActive 
                    ? 'text-white shadow-sm shadow-blue-500/20' 
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-800/50'
                )}
              >
                <>
                  {isActive && (
                    <motion.div 
                      layoutId="activeNavBg"
                      className="absolute inset-0 bg-blue-600 dark:bg-blue-500 shadow-sm border border-slate-200/50 dark:border-slate-700/50 rounded-xl"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <div className="relative z-10 flex items-center gap-3 w-full">
                    <Icon className={cn(
                      "w-5 h-5 transition-transform duration-300 group-hover:scale-110", 
                      !isActive && "opacity-70 group-hover:opacity-100"
                    )} />
                    <span>{item.label}</span>
                  </div>
                </>
              </button>
            );
          })}
        </nav>

        <div className="p-4 mt-auto mb-4 mx-4">
          <button 
            onClick={() => setIsProfileModalOpen(true)}
            className="w-full text-left p-4 rounded-2xl bg-gradient-to-br from-slate-100 to-white dark:from-slate-800 dark:to-slate-800/50 border border-slate-200/60 dark:border-slate-700/50 flex items-center space-x-3 shadow-sm hover:shadow hover:border-blue-300 dark:hover:border-blue-700 transition-all group"
          >
            <div className="w-10 h-10 shrink-0 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 flex items-center justify-center text-blue-700 dark:text-blue-300 font-bold text-sm border border-blue-200 dark:border-blue-800 shadow-inner group-hover:shadow-blue-500/20 transition-all">
              {userProfile?.initials || 'U'}
            </div>
            <div className="text-sm flex-1 overflow-hidden">
              <p className="font-semibold text-slate-800 dark:text-slate-100 truncate pr-1">{userProfile?.name || 'Current User'}</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs flex items-center mt-0.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Manage profile <Edit2 className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300" />
              </p>
            </div>
          </button>
        </div>
      </aside>

      <ProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} />
    </>
  );
};
