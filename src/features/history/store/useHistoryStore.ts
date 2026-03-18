import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { HistoryItem } from '../domain/history.types';

interface HistoryState {
  items: HistoryItem[];
  addItem: (item: HistoryItem) => void;
  clearHistory: () => void;
}

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => ({
          items: [item, ...state.items].slice(0, 15),
        })),
      clearHistory: () => set({ items: [] }),
    }),
    {
      name: 'email-harmony-history',
    }
  )
);
