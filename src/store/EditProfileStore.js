import create from 'zustand'

// 1. create get/set states.
const store = (set) => ({
  name: "",
  status: "",
  showModal: false,
  showSave: false,
  setName: (name) => set({ name }),
  setStatus: (status) => set({ status }),
  setShowModal: (showModal) => set({ showModal }),
  setShowSave: (showSave) => set({ showSave }),
})

// 2. create store
export const useEditProfileStore = create(store)

