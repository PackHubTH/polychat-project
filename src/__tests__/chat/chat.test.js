import { getAllUserChat } from '../../utils/dbs/AuthDataOperator';

import { messages } from '../mocks/chatData';

import sortMessage from '../../utils/Message/SortMessage';
import filterMessage from '../../utils/Message/FilterMessage';

// get a user chat(s)
test('get user chat. Found', async () => {
   const userChat = await getAllUserChat('OxMqlmqrhzWzmoMscd3FeauPIw72');
   expect(userChat.length >= 1).toBe(true);
});

test('get user chat. Not found', () => {
   const userChat = getAllUserChat('dummy');
   expect(userChat.length >= 1).toBe(false);
});

//Test the sortMessage function
test('sort messages correctly', () => {
   const sortedMessages = sortMessage(messages);
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

   expect(filteredMessages.length).toBe(3);
});
