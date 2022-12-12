import RemoveItemArray from '../../utils/RemoveItemArray';

import { users, realUser, fakeUser } from '../../mocks/user';
import searchUserById from '../../utils/User/SearchUser';

// remove friend from the list
test('remove friend from the list', () => {
    const result = RemoveItemArray(users, users[0]);
    expect(result.length).toBe(2);
    expect(result[0].userId).toBe('2');
    expect(result[1].userId).toBe('3');
});

// search friend
test('search friend. Found', async () => {
    const result = await searchUserById(realUser.uid);
    expect(result.userId).toBe(realUser.uid);
});

test('search friend. Not found', async () => {
    const result = await searchUserById(fakeUser.uid);
    expect(result).toBe(null);
});
