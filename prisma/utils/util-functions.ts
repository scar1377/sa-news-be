export const createRef = <T, K extends keyof T, V extends keyof T>(
  arr: readonly T[],
  key: K,
  val: V,
): Record<string, T[V]> => {
  const refObj: Record<string, T[V]> = {};
  for (const item of arr) {
    const newKey = String(item[key]);
    refObj[newKey] = item[val];
  }
  return refObj;
};
