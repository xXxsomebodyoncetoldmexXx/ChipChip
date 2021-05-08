import SqliteDAO from './sqliteDAO';
import { IUser, OUser } from '../properties/user';
import sqlite3 from 'sqlite3';
import { Database } from 'sqlite';

export default class UsersDAO extends SqliteDAO<IUser, OUser> {
  constructor(
    db: Database<sqlite3.Database, sqlite3.Statement>,
    tableName: string
  ) {
    super(db, tableName, 'app:db:sql:users');
  }

  initTable(): void {
    const sql = `CREATE TABLE IF NOT EXISTS ${this.name} (
      id      VARCHAR(48) PRIMARY KEY NOT NULL,
      name    NVARCHAR(100) NOT NULL,
      regdate TIMESTAMP DEFAULT (strftime('%s', 'now')))`;
    this.db.run(sql).catch((err) => this.debugLog(err));
  }

  async updateOne(newValue: OUser): Promise<IUser | null | undefined> {
    const sql = `UPDATE TABLE users 
    SET
      name = (?),
      regdate = (?)
    WHERE id=(?)`;
    let user: IUser | null | undefined;
    try {
      user = await this.getOne(newValue.id);
      if (user) {
        // Object assign alway take the left value if two object have the same property
        // else it create new object
        Object.assign(user, newValue);
        this.db.run(sql, [user.name, user.regdate, user.id]);
      }
    } catch (err) {
      this.debugLog(err);
    }
    return user;
  }
}
