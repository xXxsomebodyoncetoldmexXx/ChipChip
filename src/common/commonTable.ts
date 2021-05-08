import sqlite3, { Database } from 'sqlite3';
import debug from 'debug';

export default abstract class CommonTable<T> {
  protected tableName: string;
  protected debugLog: debug.IDebugger;
  protected db: Database;

  constructor(db: Database, tableName: string, debugScope: string) {
    this.db = db;
    this.tableName = tableName;
    this.debugLog = debug(debugScope);
  }

  // abstract initTable(): void;
  // abstract updateOne(id: string, newValue: unknown): T | undefined;

  getTableName(): string {
    return this.tableName;
  }

  async getAll(): Promise<T[] | undefined> {
    let result: Array<T> | undefined;
    try {
      result = await new Promise((resolve: Function, reject: Function) => {
        this.db.all(
          `SELECT * FROM ${this.tableName};`,
          (err: Error, rows: Array<T>) => {
            if (err) {
              reject(err);
            } else {
              resolve(rows);
            }
          }
        );
      });
    } catch (err) {
      this.debugLog(err);
    }
    return result;
  }

  async getOne(id: string): Promise<T | undefined> {
    let result: T | undefined;
    try {
      result = await new Promise((resolve: Function, reject: Function) => {
        this.db.get(
          `SELECT * FROM ${this.tableName} WHERE id=(?)`,
          [id],
          (err: Error, row: T) => {
            if (err) {
              reject(err);
            } else {
              resolve(row);
            }
          }
        );
      });
    } catch (err) {
      this.debugLog(err);
    }
    return result;
  }

  async deleteOne(id: string): Promise<boolean> {
    return await new Promise((resolve: Function, reject: Function) => {
      this.db.run(
        `DELETE FROM ${this.tableName} WHERE ID=(?)`,
        [id],
        (err: Error) => {
          if (err) {
            this.debugLog(err);
            reject(false);
          } else {
            resolve(true);
          }
        }
      );
    });
  }

  dropTable(db: Database): void {
    db.run(`DROP TABLE IF EXISTS ${this.tableName}`, (err) => {
      if (err) {
        this.debugLog(err);
      } else {
        this.debugLog(`Drop table ${this.tableName}`);
      }
    });
  }
}
