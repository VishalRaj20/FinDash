import { cn } from '../../utils/formatters';

export const Card = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        'bg-white/70 dark:bg-slate-800/60 backdrop-blur-xl rounded-2xl shadow-sm border border-slate-200/50 dark:border-slate-700/50 p-6 transition-all duration-300',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
