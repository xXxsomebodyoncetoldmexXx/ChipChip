import sqlite3, { Database } from 'sqlite3';
import UsersTable from './users';
import ChipsTable from './chips';
import CommentsTable from './comments';
import debug from 'debug';
import CommonTable from '../common/commonTable';
import { debuglog } from 'node:util';

const debugLog: debug.IDebugger = debug('app:db');

const p = (file: string): Promise<CommonTable<object>[]> => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(file, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve([
          new UsersTable(db),
          new ChipsTable(db),
          new CommentsTable(db),
        ]);
      }
    });
  });
};

const initDatabase = async (file: string): Promise<CommonTable<object>[]> => {
  return await p(file);

  // let tables: Promise<CommonTable<object>[]> | undefined;
  // try {
  //   tables = await new Promise((resolve: Function, reject: Function) => {
  //     const db = new sqlite3.Database(file, (err) => {
  //       if (err) {
  //         reject(err);
  //       } else {
  //         debugLog(`Connected to database ${file}`);
  //         // Register table
  //         resolve([
  //           new UsersTable(db),
  //           new ChipsTable(db),
  //           new CommentsTable(db),
  //         ]);
  //       }
  //     });
  //   });
  // } catch (err) {
  //   debuglog(err);
  // }
  // return tables;
};

export default initDatabase;
