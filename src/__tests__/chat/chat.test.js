import { getAllUserChat } from '../../utils/dbs/AuthDataOperator';

import { messages } from '../../mocks/chat';
import { realUser, fakeUser } from '../../mocks/user';

import sortMessage from '../../utils/Message/SortMessage';
import filterMessage from '../../utils/Message/FilterMessage';

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
