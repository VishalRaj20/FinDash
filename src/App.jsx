import { useState, useEffect } from 'react';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { DashboardPage } from './pages/DashboardPage';
import { TransactionsPage } from './pages/TransactionsPage';
import { useStore } from './store/useStore';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, isLoading, initializeData } = useStore();

  // Run mock API initialization
  useEffect(() => {
    initializeData();
  }, [initializeData]);

  // Handle initial theme application
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Use a softer gradient for the main background
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 font-sans selection:bg-blue-500/30">
      
      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Mobile: Fixed drawer, Desktop: Static with subtle styling */}
      <div className={`fixed inset-y-0 left-0 z-50 transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]`}>
        <Sidebar 
          currentView={currentView} 
          setCurrentView={(view) => {
            setCurrentView(view);
            setMobileMenuOpen(false);
          }} 
        />
      </div>

      {/* Main Content Box */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative">
        <Header onMenuClick={() => setMobileMenuOpen(true)} />
        
        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-10 relative z-0">
          <div className="max-w-7xl mx-auto w-full">
            {isLoading ? (
              <div className="h-full flex flex-col items-center justify-center min-h-[50vh] text-slate-400">
                <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-600 rounded-full animate-spin mb-4 shadow-lg shadow-blue-500/20" />
                <p className="text-sm font-semibold tracking-wide animate-pulse uppercase">Syncing Dashboard Data...</p>
              </div>
            ) : (
              currentView === 'dashboard' ? <DashboardPage /> : <TransactionsPage />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
