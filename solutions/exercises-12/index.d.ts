declare module 'stats' {
  type ComparatorFunc<T> = (a: T, b: T) => number;
  type GetValueFunc<T> = (item: T) => number;

  type GetIndexFunc = <T>(input: T[], comparator: ComparatorFunc<T>) => number;
  type GetElementFunc = <T>(input: T[], comparator: ComparatorFunc<T>) => T | null;
  type GetAverageValueFunc = <T>(input: T[], getValue: GetValueFunc<T>) => number | null;

  export const getMaxIndex: GetIndexFunc;
  export const getMaxElement: GetElementFunc;
  export const getMinIndex: GetIndexFunc;
  export const getMinElement: GetElementFunc;
  export const getMedianIndex: GetIndexFunc;
  export const getMedianElement: GetElementFunc;
  export const getAverageValue: GetAverageValueFunc;
}
