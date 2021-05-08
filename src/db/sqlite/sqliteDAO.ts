import DAO from '../DAO';
import sqlite3 from 'sqlite3';
import { Database } from 'sqlite';
import debug from 'debug';

export default abstract class SqliteDAO<T, U> implements DAO<T, U> {
  db: Database<sqlite3.Database, sqlite3.Statement>;
  name: string;
  debugLog: debug.IDebugger;

  constructor(
    db: Database<sqlite3.Database, sqlite3.Statement>,
    tableName: string,
    debugScope: string
  ) {
    this.db = db;
    this.name = tableName;
    this.debugLog = debug(debugScope);
    this.initTable();
  }

  enableDebug(): void {
    this.db.on('trace', (data: string) => {
      this.debugLog(data);
    });
  }

  getAll(): Promise<T[]> {
    const sql = `SELECT * FROM ${this.name};`;
    return this.db.all(sql);
  }

  getOne(id: string): Promise<T | null | undefined> {
    const sql = `SELECT * FROM ${this.name} WHERE id=(?);`;
    return this.db.get(sql, id);
  }

  async deleteOne(id: string): Promise<T | null | undefined> {
    const sql = `DELETE FROM ${this.name} WHERE id=(?)`;
    let result: Promise<T | null | undefined> = Promise.resolve(null);
    try {
      result = this.getOne(id);
      this.db.run(sql, id);
    } catch (err) {
      this.debugLog(err);
    }
    return result;
  }

  abstract initTable(): void;
  abstract updateOne(newValue: U): Promise<T | null | undefined>;
}
