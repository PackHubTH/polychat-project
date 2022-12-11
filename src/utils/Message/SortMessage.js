const sortMessage = (messageArray) => {
    let sortedArray = [];
    if (messageArray.length != undefined || messageArray.length != 0) {
        sortedArray = messageArray.sort(
            (a, b) => a.timestamp.seconds - b.timestamp.seconds
        );
    }
    return sortedArray;
};

export default sortMessage;
