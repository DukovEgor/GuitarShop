export interface IComment {
  id: string;
  userName: string;
  advantage: string;
  disadvantage: string;
  comment: string;
  rating: number;
  createAt: Date;
  guitarId: number;
}

export type Comments = IComment[];
