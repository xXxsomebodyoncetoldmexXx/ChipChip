import sqlite3, { Database } from 'sqlite3';
import debug from 'debug';

export default abstract class CommonTable {
  protected tableName: string;
  protected debugLog: debug.IDebugger;

  constructor(db: Database, tableName: string, debugScope: string) {
    this.tableName = tableName;
    this.initTable(db);
    this.debugLog = debug(debugScope);
  }

  getTableName(): string {
    return this.tableName;
  }

  dropTable(db: Database): void {
    db.run(`DROP TABLE IF EXISTS ${this.tableName}`, () =>
      this.debugLog(`Drop table ${this.tableName}`)
    );
  }

  abstract initTable(db: Database): void;
}
