export const createRef = (arr, key, val) => {
    const refObj = {};
    for (const item of arr) {
        const newKey = String(item[key]);
        refObj[newKey] = item[val];
    }
    return refObj;
};
