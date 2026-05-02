import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Clock, CheckCircle, Target, TrendingUp } from 'lucide-react';
import useStore from '../store/useStore';
import { differenceInDays } from 'date-fns';

const COLORS = ['#FBBF24', '#78350F', '#3B82F6'];

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="glass rounded-2xl p-6 flex items-center space-x-4">
    <div className={`p-4 rounded-xl ${color} bg-opacity-20`}>
      <Icon className={color.replace('bg-', 'text-')} size={24} />
    </div>
    <div>
      <p className="text-slate-400 text-sm">{title}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  </div>
);

const Dashboard = () => {
  const { progressStats, fetchProgressStats, targetDate, setTargetDate } = useStore();
  const [daysLeft, setDaysLeft] = useState(0);
  const [isEditingDate, setIsEditingDate] = useState(false);

  useEffect(() => {
    fetchProgressStats();
  }, [fetchProgressStats]);

  useEffect(() => {
    const days = differenceInDays(new Date(targetDate), new Date());
    setDaysLeft(Math.max(0, days));
  }, [targetDate]);

  const pieData = Object.entries(progressStats).map(([name, value]) => ({
    name,
    value
  }));

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold text-white">Execution Dashboard</h2>
          <p className="text-slate-400">Welcome back! Target Goal: <span className="text-primary font-bold">{new Date(targetDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span></p>
        </div>
        <div className="flex flex-col items-end">
          {isEditingDate ? (
            <div className="flex items-center space-x-2 animate-in slide-in-from-right-4">
              <input 
                type="date" 
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="glass border-white/10 text-white rounded-lg px-3 py-2 text-sm outline-none focus:border-primary/50"
              />
              <button 
                onClick={() => setIsEditingDate(false)}
                className="bg-primary text-secondary px-4 py-2 rounded-lg font-bold text-sm"
              >
                Done
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setIsEditingDate(true)}
              className="glass border-white/10 text-slate-400 hover:text-white px-4 py-2 rounded-lg text-sm transition-colors"
            >
              Edit Goal Date
            </button>
          )}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Days to Goal" value={daysLeft} icon={Clock} color="bg-amber-500" />
        <StatCard title="DSA Progress" value={`${progressStats.DSA || 0}%`} icon={Target} color="bg-blue-500" />
        <StatCard title="DevOps Progress" value={`${progressStats.DevOps || 0}%`} icon={CheckCircle} color="bg-emerald-500" />
        <StatCard title="SD Progress" value={`${progressStats['System Design'] || 0}%`} icon={TrendingUp} color="bg-purple-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass rounded-2xl p-8 h-[400px]">
          <h3 className="text-xl font-bold text-white mb-1">Overall Roadmap Completion</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="glass rounded-2xl p-8">
          <h3 className="text-xl font-bold text-white mb-6">Daily Commitment Goal</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-slate-400">Total Completion</span>
                <span className="text-primary font-bold">
                  {Math.round(Object.values(progressStats).reduce((a, b) => a + b, 0) / 3)}%
                </span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden">
                <div 
                  className="bg-primary h-full transition-all duration-1000" 
                  style={{ width: `${Math.round(Object.values(progressStats).reduce((a, b) => a + b, 0) / 3)}%` }}
                />
              </div>
            </div>
            
            <div className="p-6 bg-secondary/20 rounded-xl border border-secondary/30">
              <h4 className="font-bold text-primary mb-2">Focus Suggestion</h4>
              <p className="text-sm text-slate-300">
                You're making great progress in DSA! Consider spending more time on DevOps this week to maintain balance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
