import { getAllUserChat } from '../../utils/dbs/AuthDataOperator';

test('get user chat', () => {
   const userChat = getAllUserChat('1');
   expect(typeof userChat).toBe('object');
});
