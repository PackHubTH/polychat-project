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
    setDateTime: (dateTime) => set({ dateTime }),
    setMode: (mode) => set({ mode }),
    setShow: (show) => set({ show }),
    setDateInput: (dateInput) => set({ dateInput }),
    setTimeInput: (timeInput) => set({ timeInput }),
    setTopic: (topic) => set({ topic }),
    setFriendId: (friendId) => set({ friendId }),
});

// 2. create store
export const useAssistanceStore = create(store);



// const [date, setDate] = useState(new Date());
// 	const [mode, setMode] = useState();
// 	const [show, setShow] = useState(false);
// 	const [dateInput, setDateInput] = useState("DD/MM/YYYY");
// 	const [timeInput, setTimeInput] = useState("HH:MM");