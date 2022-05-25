import { IComment } from '../interfaces/comment';

export const sortByDate: (a: IComment, b: IComment) => number = (a, b) => {
  const firstDate = new Date(a.createAt).getTime();
  const secondDate = new Date(b.createAt).getTime();
  return secondDate - firstDate;
};
export const capitalize = (s: string) => s && s[0].toUpperCase() + s.slice(1);