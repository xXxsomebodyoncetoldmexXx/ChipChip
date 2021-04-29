import { Database } from 'sqlite3';
import CommonTable from '../common/commonTable';

export default class ChipsTable extends CommonTable {
  constructor(db: Database) {
    super(db, 'chips', 'app:db:chips');
  }

  initTable(db: Database) {
    db.run(
      `CREATE TABLE IF NOT EXISTS ${this.tableName} (
        id        VARCHAR(64) PRIMARY KEY NOT NULL,
        content   NVARCHAR(300) NOT NULL,
        authorID  VARCHAR(48) NOT NULL,
        pubdate   TIMESTAMP DEFAULT (strftime('%s', 'now')),
        like      INTEGER DEFAULT 0,
        rechip    INTEGER DEFAULT 0,
        CONSTRAINT fk_authorID
          FOREIGN KEY (authorID)
          REFERENCES users (id) 
          ON UPDATE CASCADE
          ON DELETE CASCADE)`,
      () => this.debugLog(`Success run table ${this.tableName}`)
    );
  }
}
