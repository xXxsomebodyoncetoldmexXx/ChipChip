import debug from 'debug';

export default interface DAO<T, U> {
  name: string;
  debugLog?: debug.IDebugger;

  initTable(): void;
  getAll(): Promise<T[]>;
  getOne(id: string): Promise<T | null | undefined>;
  updateOne(newValue: U): Promise<T | null | undefined>;
  deleteOne(id: string): Promise<T | null | undefined>;
}
