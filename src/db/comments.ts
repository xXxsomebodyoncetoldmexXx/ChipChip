import { Database } from 'sqlite3';
import CommonTable from '../common/commonTable';
import Comment from './properties/comment';

export default class CommentsTable extends CommonTable<Comment> {
  constructor(db: Database) {
    super(db, 'comments', 'app:db:comments');
  }

  initTable() {
    this.db.run(
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
      (err) => {
        if (err) {
          this.debugLog(err);
        } else {
          this.debugLog(`Success run table ${this.tableName}`);
        }
      }
    );
  }
}
