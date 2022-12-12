// Remove an item from array
const RemoveItemArray = (array, removeItem) => {
    const index = array.indexOf(removeItem);

    //remove only when array contain the item
    if (index > -1) {
        array.splice(index, 1);
    }
    return array;
};

export default RemoveItemArray;
