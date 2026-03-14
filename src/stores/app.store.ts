import { create } from 'zustand'

interface AppState {
  isSidebarOpen: boolean
  theme: 'light' | 'dark'

  // Actions
  toggleSidebar: () => void
  setTheme: (theme: 'light' | 'dark') => void
}

export const useAppStore = create<AppState>((set) => ({
  isSidebarOpen: false,
  theme: 'light',

  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setTheme: (theme) => set({ theme }),
}))
