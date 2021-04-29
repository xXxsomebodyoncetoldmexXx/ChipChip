import { Database } from 'sqlite3';
import CommonTable from '../common/commonTable';

export default class CommentsTable extends CommonTable {
  constructor(db: Database) {
    super(db, 'comments', 'app:db:comments');
  }

  initTable(db: Database) {
    db.run(
      `CREATE TABLE IF NOT EXISTS ${this.tableName} (
        id        VARCHAR(72) PRIMARY KEY NOT NULL,
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
