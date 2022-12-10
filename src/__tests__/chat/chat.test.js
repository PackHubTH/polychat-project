import { getAllUserChat } from '../../utils/dbs/AuthDataOperator';

// get a user chat(s)
test('get user chat. Found', async () => {
   const userChat = await getAllUserChat('OxMqlmqrhzWzmoMscd3FeauPIw72');
   expect(userChat.length >= 1).toBe(true);
});

test('get user chat. Not found', () => {
   const userChat = getAllUserChat('dummy');
   expect(userChat.length >= 1).toBe(false);
});
