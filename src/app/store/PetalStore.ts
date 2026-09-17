import { create } from 'zustand';

interface PetalState {
  active: boolean;
  continuous: boolean;
  trigger: () => void;
  startContinuous: () => void;
  stopContinuous: () => void;
}

export const usePetalStore = create<PetalState>((set) => ({
  active: false,
  continuous: false,
  trigger: () => {
    set({ active: true });
    setTimeout(() => set({ active: false }), 100);
  },
  startContinuous: () => set({ continuous: true, active: true }),
  stopContinuous: () => set({ continuous: false, active: false }),
}));