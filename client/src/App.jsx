import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import RoadmapPage from './pages/RoadmapPage';
import TimerPage from './pages/TimerPage';
import TestPage from './pages/TestPage';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'dsa': return <RoadmapPage type="DSA" />;
      case 'devops': return <RoadmapPage type="DevOps" />;
      case 'system-design': return <RoadmapPage type="System Design" />;
      case 'timer': return <TimerPage />;
      case 'tests': return <TestPage />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background text-white">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 ml-64 p-10">
        <div className="max-w-6xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;
