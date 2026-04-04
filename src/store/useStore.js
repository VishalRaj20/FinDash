import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockTransactions } from '../data/mockData';

export const useStore = create(
  persist(
    (set, get) => ({
      // State
      transactions: [], // Start empty for mock API
      isLoading: true, // For mock API loading simulation
      hasInitialized: false,
      role: 'admin', // 'admin' | 'viewer'
      theme: 'light', // 'light' | 'dark'
      userProfile: {
        name: 'Current User',
        initials: 'CU'
      },

      // Mock API initializer
      initializeData: async () => {
        set({ isLoading: true });
        // Simulate network latency (Mock API behavior)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        set((state) => {
          // If the user has no transactions stored, populate with mock data
          if (state.transactions.length === 0 && !state.hasInitialized) {
            return {
              transactions: mockTransactions,
              isLoading: false,
              hasInitialized: true
            };
          }
          return { isLoading: false, hasInitialized: true };
        });
      },

      // Actions
      setRole: (role) => set({ role }),
      
      updateUserProfile: (profileData) => set({ 
        userProfile: { ...profileData } 
      }),

      toggleTheme: () => set((state) => {
        const newTheme = state.theme === 'light' ? 'dark' : 'light';
        // Side effect: update document classes
        if (newTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        return { theme: newTheme };
      }),

      addTransaction: (transaction) => set((state) => {
        if (state.role !== 'admin') return state;
        return {
          transactions: [{ ...transaction, id: crypto.randomUUID() }, ...state.transactions],
        };
      }),

      editTransaction: (id, updatedTransaction) => set((state) => {
        if (state.role !== 'admin') return state;
        return {
          transactions: state.transactions.map(t => 
            t.id === id ? { ...t, ...updatedTransaction } : t
          ),
        };
      }),

      deleteTransaction: (id) => set((state) => {
        if (state.role !== 'admin') return state;
        return {
          transactions: state.transactions.filter(t => t.id !== id),
        };
      }),

      // Computed insights (getters)
      getSummary: () => {
        const { transactions } = get();
        const income = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
        const expense = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
        return {
          totalIncome: income,
          totalExpense: expense,
          balance: income - expense
        };
      }
    }),
    {
      name: 'finance-dashboard-storage',
      partialize: (state) => ({ 
        transactions: state.transactions, 
        role: state.role, 
        theme: state.theme, 
        userProfile: state.userProfile,
        hasInitialized: state.hasInitialized
      }),
    }
  )
);
