import { useStore } from '../../store/useStore';
import { Card } from '../UI/Card';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { format, parseISO, isValid } from 'date-fns';
import { formatCurrency } from '../../utils/formatters';
import { useState, useMemo } from 'react';

const COLORS = ['#3b82f6', '#10b981', '#f43f5e', '#8b5cf6', '#f59e0b', '#06b6d4', '#ec4899', '#6366f1'];

export const Charts = () => {
  const transactions = useStore(state => state.transactions);
  const [pieChartType, setPieChartType] = useState('expense');

  // Prepare processing data for line chart (daily trends)
  const sortedTransactions = [...transactions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  const lineDataMap = {};
  sortedTransactions.forEach(t => {
    // Validating date safely
    const parsedDate = parseISO(t.date);
    if (!isValid(parsedDate)) return;

    const dateKey = format(parsedDate, 'MMM dd');
    if (!lineDataMap[dateKey]) {
      lineDataMap[dateKey] = { date: dateKey, income: 0, expense: 0 };
    }
    if (t.type === 'income') lineDataMap[dateKey].income += t.amount;
    if (t.type === 'expense') lineDataMap[dateKey].expense += t.amount;
  });
  const lineData = Object.values(lineDataMap);

  // Prepare processing data for pie chart (dynamic by type)
  const pieData = useMemo(() => {
    const filteredTransactions = transactions.filter(t => t.type === pieChartType);
    const catDataMap = {};
    filteredTransactions.forEach(t => {
      if (!catDataMap[t.category]) {
        catDataMap[t.category] = 0;
      }
      catDataMap[t.category] += t.amount;
    });
    
    return Object.keys(catDataMap).map(category => ({
      name: category,
      value: catDataMap[category]
    })).sort((a, b) => b.value - a.value);
  }, [transactions, pieChartType]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md p-4 shadow-xl rounded-xl border border-slate-200/50 dark:border-slate-700/50">
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-3">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm flex items-center justify-between gap-4 py-1" style={{ color: entry.color }}>
              <span className="font-medium">{entry.name}</span>
              <span className="font-bold">{formatCurrency(entry.value)}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      <Card className="flex flex-col h-[420px] hover:shadow-lg transition-shadow duration-300">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Cash Flow Trends</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Income vs Expenses over time</p>
        </div>
        <div className="flex-1 w-full relative">
          {lineData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-slate-200 dark:text-slate-700/50" />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: 'currentColor' }} className="text-slate-500 dark:text-slate-400" axisLine={false} tickLine={false} dy={10} />
                <YAxis 
                  width={60}
                  tickFormatter={(val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact' }).format(val)} 
                  tick={{ fontSize: 12, fill: 'currentColor' }} 
                  className="text-slate-500 dark:text-slate-400" 
                  axisLine={false} 
                  tickLine={false} 
                  dx={-10} 
                />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'currentColor', strokeWidth: 1, strokeDasharray: '4 4' }} className="text-slate-300 dark:text-slate-600" />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '13px', paddingTop: '20px', color: 'inherit' }} />
                <Line type="monotone" dataKey="income" name="Income" stroke="#10b981" strokeWidth={3} dot={false} activeDot={{ r: 6, strokeWidth: 0 }} />
                <Line type="monotone" dataKey="expense" name="Expenses" stroke="#f43f5e" strokeWidth={3} dot={false} activeDot={{ r: 6, strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-slate-400">
              No trend data available
            </div>
          )}
        </div>
      </Card>

      <Card className="flex flex-col h-[420px] hover:shadow-lg transition-shadow duration-300">
        <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
              {pieChartType === 'expense' ? 'Expenses by Category' : 'Income by Category'}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {pieChartType === 'expense' ? 'Where your money goes' : 'Where your money comes from'}
            </p>
          </div>
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg shrink-0">
            <button 
              onClick={() => setPieChartType('expense')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${pieChartType === 'expense' ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
            >
              Expense
            </button>
            <button 
              onClick={() => setPieChartType('income')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${pieChartType === 'income' ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
            >
              Income
            </button>
          </div>
        </div>
        <div className="flex-1 w-full relative pb-4">
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="45%"
                  innerRadius="50%"
                  outerRadius="80%"
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                  cornerRadius={6}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{ backgroundColor: 'var(--color-slate-800)', borderColor: 'var(--color-slate-700)', borderRadius: '12px', color: '#fff', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)' }}
                  itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                />
                <Legend layout="horizontal" verticalAlign="bottom" align="center" iconType="circle" fontSize={13} wrapperStyle={{ paddingTop: '10px', paddingBottom: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm">
              No {pieChartType} data available
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
