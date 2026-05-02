import { LayoutDashboard, BookOpen, Terminal, Shield, Timer, FileText } from 'lucide-react';
import useStore from '../store/useStore';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { targetDate } = useStore();
  
  const formattedDate = new Date(targetDate).toLocaleDateString('en-US', { 
    month: 'short', 
    year: 'numeric' 
  });

  const fullDate = new Date(targetDate).toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric',
    year: 'numeric' 
  });
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'dsa', label: 'DSA', icon: BookOpen },
    { id: 'devops', label: 'DevOps', icon: Terminal },
    { id: 'system-design', label: 'System Design', icon: Shield },
    { id: 'timer', label: 'Study Timer', icon: Timer },
    { id: 'tests', label: 'Self Tests', icon: FileText },
  ];

  return (
    <div className="w-64 h-screen glass border-r border-white/10 flex flex-col fixed left-0 top-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold bg-linear-to-r from-primary to-amber-500 bg-clip-text text-transparent">
          PPTracker
        </h1>
        <p className="text-xs text-slate-400 mt-1">{formattedDate} Preparation</p>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              activeTab === item.id
                ? 'bg-primary text-secondary font-bold shadow-lg shadow-primary/20'
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 mt-auto space-y-4">
        <div className="glass-light rounded-xl p-4">
          <p className="text-xs text-slate-400">Target Date</p>
          <p className="text-sm font-semibold text-white">{fullDate}</p>
        </div>
        
        <div className="text-[10px] text-slate-500 text-center px-2">
          © {new Date().getFullYear()} PPTracker. <br />
          Built by GENIUS-69.
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
