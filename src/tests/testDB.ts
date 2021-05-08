import sqlite3 from 'sqlite3';
import { open, ISqlite } from 'sqlite';
import { OUser } from '../db/properties/user';

// import initDatabase from '../db/dbDAO';
// (async () => {
//   const db = await initDatabase('test.sqlite');
//   // console.log(db);
//   for (let obj of db) {
//     let name = obj.getTableName();
//     let tmp = { `${name}`: obj };
//     console.log(tmp);
//   }
// })();

// const testf = async () => {
//   const value = await new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(5);
//     }, 5000);
//   });
//   console.log(value);
// };
// testf();

const a: OUser = {
  id: 'hello',
};

// (async () => {
//   const db = await open({
//     filename: 'db.sqlite',
//     driver: sqlite3.Database,
//   });
//   db.on('trace', (data: string) => {
//     console.log('debug', data);
//   });
//   db.all('select * from users;');
//   db.close();
// })();
// let db: sqlite3.Database = new sqlite3.Database('db.sqlite');

// db.serialize(() => {
//   db.run('insert into users(id, name) values ("1234", "steve");');
//   db.get('select * from users where id=1234;', (err, result) => {
//     console.log(result);
//   });
//   db.all("delete from users where id='1234'", (err: Error, row: any) => {
//     console.log(row);
//   });
//   db.all('select * from users;', (err, result) => {
//     console.log(result);
//   });
// });
