import { IToken } from '../interfaces/IAuth';

export const getToken = (args: { name: string }): IToken | null => {
  try {
    return JSON.parse(localStorage.getItem(args.name) as string) as IToken;
  } catch(err) {
    return null;
  }
};

export const setToken = (args: { name: string, value: any }): void => {
  localStorage.setItem(args.name, args.value);
};

export const removeToken = (args: { name: string }): void => {
  localStorage.removeItem(args.name);
};

