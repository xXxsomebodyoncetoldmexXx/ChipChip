import { Database } from 'sqlite3';
import CommonTable from '../common/commonTable';

export default class UsersTable extends CommonTable {
  constructor(db: Database) {
    super(db, 'users', 'app:db:users');
  }

  initTable(db: Database) {
    db.run(
      `CREATE TABLE IF NOT EXISTS ${this.tableName} (
        id      VARCHAR(48) PRIMARY KEY NOT NULL,
        name    NVARCHAR(100) NOT NULL,
        regdate TIMESTAMP DEFAULT (strftime('%s', 'now')))`,
      () => this.debugLog(`Success run table ${this.tableName}`)
    );
  }
}
