import create from 'zustand';

// 1. create get/set states.
const store = (set) => ({
    userData: [],
    tempDisplayName: null,
    tempStatus: null,
    setUserData: (userData) => set({ userData }),
    setDisplayName: (displayName) => set((state) => ({ userData: { ...state.userData, displayName: displayName } })),
    setStatus: (status) => set((state) => ({ userData: { ...state.userData, status: status } })),
    setTempDisplayName: (tempDisplayName) => set({ tempDisplayName }),
    setTempStatus: (tempStatus) => set({ tempStatus }),
});

// 2. create store
export const useProfileStore = create(store);

