'use client'

import {create} from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useAuthStore = create(persist(
  (set) => ({
    user: null,
    setUser: (user) => set({ user }),
    logout: () => set({ user: null }),
  }),
  {
    name: 'auth',
    skipHydration: true,
    storage: createJSONStorage(() => sessionStorage),
  }
));

export default useAuthStore;