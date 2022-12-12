// this function will filter the message array and return the message between two users

const filterMessage = (messageArray, uid1, uid2) => {
    let filtered = [];
    messageArray.map((e) => {
        if (e.sender == uid1 && e.receiver == uid2) {
            filtered.push(e);
        } else if (e.sender == uid2 && e.receiver == uid1) {
            filtered.push(e);
        }
    });
    return filtered;
};

export default filterMessage;
