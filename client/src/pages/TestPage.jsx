import React, { useState, useEffect } from 'react';
import { Plus, Trophy, AlertTriangle, Calendar } from 'lucide-react';
import { TestService } from '../services/api';

const TestPage = () => {
  const [tests, setTests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    score: '',
    total: '',
    topics: '',
    weakAreas: ''
  });

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      const response = await TestService.getTests();
      setTests(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await TestService.createTest({
        ...formData,
        score: Number(formData.score),
        total: Number(formData.total),
        topics: formData.topics.split(',').map(t => t.trim()),
        weakAreas: formData.weakAreas.split(',').map(t => t.trim()),
        date: new Date().toISOString().split('T')[0]
      });
      setShowModal(false);
      setFormData({ title: '', score: '', total: '', topics: '', weakAreas: '' });
      fetchTests();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white">Self Assessment</h2>
          <p className="text-slate-400">Log your practice test results and track improvements.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 bg-primary text-secondary px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform"
        >
          <Plus size={20} />
          <span>New Test Result</span>
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tests.map((test) => (
          <div key={test._id} className="glass rounded-2xl p-6 border border-white/5 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-white">{test.title}</h3>
                <div className="flex items-center text-xs text-slate-400 mt-1">
                  <Calendar size={12} className="mr-1" />
                  {test.date}
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                (test.score / test.total) >= 0.7 ? 'bg-emerald-500/20 text-emerald-500' : 'bg-amber-500/20 text-amber-500'
              }`}>
                {Math.round((test.score / test.total) * 100)}%
              </div>
            </div>

            <div className="flex items-center space-x-2 overflow-x-auto pb-1">
              {test.topics.map((topic, i) => (
                <span key={i} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-1 rounded-md whitespace-nowrap">
                  {topic}
                </span>
              ))}
            </div>

            <div className="pt-4 border-t border-white/5 space-y-2">
              <div className="flex items-center space-x-2 text-sm text-emerald-400">
                <Trophy size={16} />
                <span>Score: {test.score} / {test.total}</span>
              </div>
              {test.weakAreas.length > 0 && (
                <div className="flex items-start space-x-2 text-sm text-amber-400">
                  <AlertTriangle size={16} className="mt-0.5" />
                  <span>Weak: {test.weakAreas.join(', ')}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass w-full max-w-md rounded-3xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6">Log Test Result</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Test Title</label>
                <input 
                  type="text" required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full glass border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary/50"
                  placeholder="e.g. LeetCode Weekly #342"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Score</label>
                  <input 
                    type="number" required
                    value={formData.score}
                    onChange={(e) => setFormData({...formData, score: e.target.value})}
                    className="w-full glass border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary/50"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Total</label>
                  <input 
                    type="number" required
                    value={formData.total}
                    onChange={(e) => setFormData({...formData, total: e.target.value})}
                    className="w-full glass border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary/50"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Topics (comma separated)</label>
                <input 
                  type="text"
                  value={formData.topics}
                  onChange={(e) => setFormData({...formData, topics: e.target.value})}
                  className="w-full glass border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary/50"
                  placeholder="Arrays, Strings, DP"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Weak Areas (comma separated)</label>
                <input 
                  type="text"
                  value={formData.weakAreas}
                  onChange={(e) => setFormData({...formData, weakAreas: e.target.value})}
                  className="w-full glass border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-primary/50"
                  placeholder="Recursive DP, Binary Search"
                />
              </div>
              <div className="flex space-x-4 pt-4">
                <button 
                  type="button" onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 rounded-xl border border-white/10 text-white hover:bg-white/5"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-6 py-3 rounded-xl bg-primary text-secondary font-bold hover:opacity-90"
                >
                  Save Result
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestPage;
