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

const stickerUrl =
   'https://firebasestorage.googleapis.com/v0/b/polychat-6523f.appspot.com/o/stickers%2Fm-nong%2Fm-nong-sign%20(9).png?alt=media&token=4a59cd46-0b76-447e-a2a9-f81df62a1bef';

module.exports = {
    messages,
    stickerUrl,
};
