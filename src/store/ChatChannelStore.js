import create from 'zustand';

// 1. create get/set states.
const store = (set) => ({
    channelMessages: [],
    friendData: null,
    userChat: null,
    setChannelMessages: (channelMessages) => set({ channelMessages }),
    setFriendData: (friendData) => set({ friendData }),
    setUserChat: (userChat) => set({ userChat }),
});

// 2. create store
export const useChatChannelStore = create(store);

