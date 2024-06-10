declare module 'str-utils' {
  type StrUtilFunc = (value: string) => string;
  
  export const strReverse: StrUtilFunc;
  export const strToLower: StrUtilFunc;
  export const strToUpper: StrUtilFunc
  export const strRandomize: StrUtilFunc
  export const strInvertCase: StrUtilFunc
}
