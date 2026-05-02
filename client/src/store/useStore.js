import { create } from 'zustand';
import { RoadmapService, AnalyticsService } from '../services/api';

const useStore = create((set, get) => ({
  roadmaps: {},
  progressStats: {},
  loading: false,
  error: null,
  targetDate: localStorage.getItem('targetDate') || '2026-08-01',

  setTargetDate: (date) => {
    localStorage.setItem('targetDate', date);
    set({ targetDate: date });
  },

  fetchRoadmap: async (name) => {
    set({ loading: true });
    try {
      const response = await RoadmapService.getRoadmap(name);
      set((state) => ({
        roadmaps: { ...state.roadmaps, [name.toLowerCase()]: response.data },
        loading: false
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  updateSubtopicStatus: async (name, topicId, subtopicId, status) => {
    try {
      const response = await RoadmapService.updateStatus(name, topicId, subtopicId, status);
      set((state) => ({
        roadmaps: { ...state.roadmaps, [name.toLowerCase()]: response.data }
      }));
      // Refresh stats after update
      get().fetchProgressStats();
    } catch (error) {
      set({ error: error.message });
    }
  },

  fetchProgressStats: async () => {
    try {
      const response = await AnalyticsService.getProgress();
      set({ progressStats: response.data });
    } catch (error) {
      set({ error: error.message });
    }
  }
}));

export default useStore;
