const GetTimestamp = () => {
    const date = new Date();
    let dateValues =
    date.getFullYear().toString() +
    '/' +
    (date.getMonth() + 1).toString() +
    '/' +
    date.getDate().toString() +
    '/' +
    date.getHours().toString() +
    ':';
    console.log(date.getMinutes().toString().length);

    if (date.getMinutes().toString().length === 1) {
        dateValues += '0' + date.getMinutes().toString();
    } else {
        dateValues += date.getMinutes().toString();
    }
    return dateValues;
};

export default GetTimestamp;
