import { getAllUserChat } from '../utils/dbs/AuthDataOperator';

import { messages, stickerUrl } from '../mocks/chat';
import { realUser, fakeUser } from '../mocks/user';

import sortMessage from '../utils/message/SortMessage';
import filterMessage from '../utils/message/FilterMessage';
import CreateMessage from '../utils/create/CreateMessage';
import { serverTimestamp } from 'firebase/firestore';
import GenerateUid from '../utils/generate/GenerateUid';

// get a user chat(s)
test('get user chat. Found', async () => {
   const userChat = await getAllUserChat(realUser.uid);
   expect(userChat.length >= 1).toBe(true);
});
test('get user chat. Not found', async () => {
   const userChat = await getAllUserChat(fakeUser.uid);
   expect(userChat == null).toBe(true);
});

//Test the sortMessage function
test('sort messages correctly', () => {
   const sortedMessages = sortMessage(messages);

   // Check if the array is sorted
   expect(sortedMessages[0].timestamp.seconds).toBeLessThanOrEqual(
      sortedMessages[1].timestamp.seconds
   );
   expect(sortedMessages[1].timestamp.seconds).toBeLessThanOrEqual(
      sortedMessages[2].timestamp.seconds
   );
});

// Test the filterMessage function
test('filter messages correctly', () => {
   const filteredMessages = filterMessage(messages, 1, 2);

   // Check if the array is filtered by counting the number of messages
   expect(filteredMessages.length).toBe(3);
});

// Test the CreateMessage function to create text message
test('create text message correctly', () => {
   const timestamp = serverTimestamp();
   const messageId = GenerateUid();

   const message1 = {
      sender: 1,
      receiver: 2,
      text: 'Hello',
      location: '',
      photo: '',
      timestamp: timestamp,
      messageId: messageId,
   };

   const message2 = CreateMessage(
      1,
      2,
      'Hello',
      '',
      timestamp,
      messageId,
      message1.photo
   );

   // Check if the message is created correctly
   expect(message1).toEqual(message2);
});

// Test the CreateMessage function to create sticker message
test('create sticker message correctly', () => {
   const timestamp = serverTimestamp();
   const messageId = GenerateUid();

   const message1 = {
      sender: 1,
      receiver: 2,
      text: '',
      location: '',
      photo: stickerUrl,
      timestamp: timestamp,
      messageId: messageId,
   };

   const message2 = CreateMessage(
      1,
      2,
      '',
      '',
      timestamp,
      messageId,
      message1.photo
   );

   // Check if the message is created correctly
   expect(message1).toEqual(message2);
});
