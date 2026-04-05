import { useState, useEffect } from 'react';
import { Moon, Sun, Menu, User, Shield, Sparkles } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Button } from '../UI/Button';
import { motion, AnimatePresence } from 'framer-motion';

export const Header = ({ onMenuClick }) => {
  const { role, setRole, theme, toggleTheme, userProfile } = useStore();
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  return (
    <header className="h-20 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b border-white/20 dark:border-slate-800/50 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-30 w-full transition-colors duration-300">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={onMenuClick} className="md:hidden mr-3">
          <Menu className="w-5 h-5" />
        </Button>
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 md:hidden">
          FinDash
        </h2>
        <div className="hidden md:flex flex-col">
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2"
          >
            <span className="text-slate-500 dark:text-slate-400 font-medium">{greeting},</span>
            <span className="text-slate-900 dark:text-slate-100 font-bold flex items-center gap-1.5">
              {userProfile?.name?.split(' ')[0] || 'User'} 
              <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
            </span>
          </motion.div>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-6">
        {/* Premium Role Switcher */}
        <div className="flex items-center relative bg-slate-100/80 dark:bg-slate-800/80 rounded-full p-1 shadow-inner border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm">
          {['viewer', 'admin'].map((r) => {
            const isActive = role === r;
            const Icon = r === 'admin' ? Shield : User;
            return (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`relative px-4 py-2 text-sm font-semibold rounded-full flex items-center gap-2 transition-colors z-10 ${isActive ? 'text-blue-700 dark:text-blue-300' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                  }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeRoleIndicator"
                    className="absolute inset-0 bg-white dark:bg-slate-700 rounded-full shadow-sm"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline capitalize">{r}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Theme Toggle */}
        <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 shadow-sm border border-slate-200/50 dark:border-slate-700/50 transition-all hover:scale-105 active:scale-95"
        >
          <motion.div
            initial={false}
            animate={{ rotate: theme === 'dark' ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5 text-indigo-500" />
            ) : (
              <Sun className="w-5 h-5 text-amber-400" />
            )}
          </motion.div>
        </Button>
      </div>
    </header>
  );
};
