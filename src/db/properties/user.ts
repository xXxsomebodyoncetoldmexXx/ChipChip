export interface IUser {
  id: string;
  name: string;
  regdate: number;
}
type primaryKey = 'id';
export type OUser = Pick<IUser, primaryKey> &
  Partial<Exclude<IUser, primaryKey>>;
