import create from 'zustand';

// 1. create get/set states.
const store = (set) => ({
    showModal: false,
    showSave: false,
    setShowModal: (showModal) => set({ showModal }),
    setShowSave: (showSave) => set({ showSave }),
});

// 2. create store
export const useEditProfileStore = create(store);

