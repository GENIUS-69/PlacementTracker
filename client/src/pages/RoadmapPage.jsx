import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronRight, CheckCircle2, Circle, Clock } from 'lucide-react';
import useStore from '../store/useStore';

const RoadmapPage = ({ type }) => {
  const { roadmaps, fetchRoadmap, updateSubtopicStatus, loading } = useStore();
  const [expandedTopics, setExpandedTopics] = useState([]);

  useEffect(() => {
    fetchRoadmap(type);
  }, [type]);

  const toggleTopic = (topicId) => {
    setExpandedTopics(prev => 
      prev.includes(topicId) 
        ? prev.filter(id => id !== topicId) 
        : [...prev, topicId]
    );
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed': return <CheckCircle2 className="text-emerald-500" size={18} />;
      case 'In Progress': return <Clock className="text-amber-500 animate-pulse" size={18} />;
      default: return <Circle className="text-slate-500" size={18} />;
    }
  };

  const handleStatusChange = (topicId, subtopicId, currentStatus) => {
    const statusCycle = ['Pending', 'In Progress', 'Completed'];
    const nextIndex = (statusCycle.indexOf(currentStatus) + 1) % statusCycle.length;
    updateSubtopicStatus(type, topicId, subtopicId, statusCycle[nextIndex]);
  };

  const roadmap = roadmaps[type.toLowerCase()];

  if (loading && !roadmap) return <div className="text-white p-8">Loading roadmap...</div>;
  if (!roadmap) return <div className="text-white p-8">Roadmap not found.</div>;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white uppercase tracking-wider">{roadmap.name}</h2>
          <p className="text-slate-400">Track and master every topic step by step.</p>
        </div>
        <div className="glass px-6 py-3 rounded-2xl flex items-center space-x-4 border border-primary/20">
          <div className="text-right">
            <p className="text-xs text-slate-400">Completion</p>
            <p className="text-xl font-bold text-primary">
              {Math.round(roadmap.topics.reduce((acc, t) => acc + t.subtopics.filter(s => s.status === 'Completed').length, 0) / 
               roadmap.topics.reduce((acc, t) => acc + t.subtopics.length, 0) * 100) || 0}%
            </p>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-slate-700 border-t-primary rotate-45" />
        </div>
      </header>

      <div className="space-y-4">
        {roadmap.topics.map((topic) => (
          <div key={topic.topicId} className="glass rounded-2xl overflow-hidden border border-white/5">
            <button
              onClick={() => toggleTopic(topic.topicId)}
              className="w-full px-6 py-5 flex items-center justify-between hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-lg ${expandedTopics.includes(topic.topicId) ? 'bg-primary text-secondary' : 'bg-slate-800 text-primary'}`}>
                  {expandedTopics.includes(topic.topicId) ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                </div>
                <h3 className="text-lg font-bold text-white">{topic.title}</h3>
                <span className="text-xs px-2 py-1 bg-slate-800 rounded-full text-slate-400">
                  {topic.subtopics.filter(s => s.status === 'Completed').length} / {topic.subtopics.length}
                </span>
              </div>
            </button>

            {expandedTopics.includes(topic.topicId) && (
              <div className="px-6 pb-6 space-y-2 pt-2 border-t border-white/5 bg-slate-900/50">
                {topic.subtopics.map((subtopic) => (
                  <button
                    key={subtopic.subtopicId}
                    onClick={() => handleStatusChange(topic.topicId, subtopic.subtopicId, subtopic.status)}
                    className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-all group"
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center space-x-4">
                        {getStatusIcon(subtopic.status)}
                        <span className={`text-sm ${subtopic.status === 'Completed' ? 'text-slate-400 line-through' : 'text-slate-200'}`}>
                          {subtopic.title}
                        </span>
                      </div>
                      {subtopic.children && subtopic.children.length > 0 && (
                        <div className="ml-9 mt-2 flex flex-wrap gap-2">
                          {subtopic.children.map((child, idx) => (
                            <span key={idx} className="text-[10px] bg-slate-800/50 text-slate-400 px-2 py-0.5 rounded border border-white/5">
                              {child}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] uppercase font-bold text-primary tracking-widest">
                      Change Status
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapPage;
