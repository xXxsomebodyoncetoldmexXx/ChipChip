import { Database } from 'sqlite3';
import CommonTable from '../common/commonTable';
import Chip from './properties/chip';
import { Request } from 'express';
import Joi, { Schema } from 'joi';

const Svalid: Schema = Joi.object({
  authorID: Joi.string().min(3).max(48).alphanum().required(),
  content: Joi.string().max(300).required(),
});

export function chipValidation(
  body: Request['body']
): ReturnType<Schema['validate']> {
  return Svalid.validate(body);
}

export default class ChipsTable extends CommonTable<Chip> {
  constructor(db: Database) {
    super(db, 'chips', 'app:db:chips');
  }

  initTable() {
    this.db.run(
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
