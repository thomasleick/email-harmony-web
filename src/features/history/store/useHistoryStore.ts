import { create } from 'zustand';
import { HistoryItem } from '../domain/history.types';

interface HistoryState {
  items: HistoryItem[];
  addItem: (item: HistoryItem) => void;
  clearHistory: () => void;
}

export const useHistoryStore = create<HistoryState>((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [item, ...state.items] })),
  clearHistory: () => set({ items: [] }),
}));
