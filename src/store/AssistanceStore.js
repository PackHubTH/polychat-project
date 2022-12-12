import create from 'zustand';

// 1. create get/set states.
const store = (set) => ({
   dateTime: new Date(),
   mode: null,
   show: false,
   dateInput: 'DD/MM/YYYY',
   timeInput: 'HH:MM',
   topic: '',
   friendId: '',
   friendName: '',
   setDateTime: (dateTime) => set({ dateTime }),
   setMode: (mode) => set({ mode }),
   setShow: (show) => set({ show }),
   setDateInput: (dateInput) => set({ dateInput }),
   setTimeInput: (timeInput) => set({ timeInput }),
   setTopic: (topic) => set({ topic }),
   setFriendId: (friendId) => set({ friendId }),
   setFriendName: (friendName) => set({ friendName }),
});

// 2. create store
export const useAssistanceStore = create(store);
