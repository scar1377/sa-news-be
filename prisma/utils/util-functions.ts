export const createRef = (arr, key, val) => {
  const refObj = {};
  for (let i = 0; i < arr.length; i++) {
    const newKey = arr[i][key];
    refObj[newKey] = arr[i][val];
  }
  return refObj;
};
