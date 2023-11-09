"use client";

import { create } from "zustand";

const egresadoStore = create((set) => ({
  hasInfo: false,
  setHasInfo: (hasInfo) => set({ hasInfo }),
  interactOutside: () => set({ hasInfo: false }),
}));

export default egresadoStore;
