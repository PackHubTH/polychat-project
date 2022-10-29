// Remove an item from array
const RemoveItemArray = (array, removeItem) => {
  console.log(array);
  const index = array.indexOf(removeItem);

  //remove only when found
  if (index > -1) {
    array.splice(index, 1);
  }
  console.log(array);
  return array;
};

export default RemoveItemArray;
