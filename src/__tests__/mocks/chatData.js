export const messages = [
    {
        id: 1,
        sender: 1,
        receiver: 2,
        message: 'Hello, Bob!',
        timestamp: { seconds: 1575158400 },
    },
    {
        id: 2,
        sender: 2,
        receiver: 1,
        message: 'Hi, Alice!',
        timestamp: { seconds: 1575158410 },
    },
    {
        id: 3,
        sender: 1,
        receiver: 2,
        message: 'How are you doing?',
        timestamp: { seconds: 1575158420 },
    },
    {
        id: 4,
        sender: 5,
        receiver: 3,
        message: 'Hello, Charlie!',
        timestamp: { seconds: 1575158430 },
    },
];

module.exports = {
    messages,
};
