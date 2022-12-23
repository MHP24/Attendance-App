import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteDBConnection, SQLiteConnection, CapacitorSQLitePlugin } from '@capacitor-community/sqlite';
import { tableSchema, insertUserQ, deleteUserQ, selectAllQ, selectByMailQ, 
  selectAuthQ, insertSessionQ, selectSessionQ, deleteSessionQ } from '../files/db-utils';
@Injectable({
  providedIn: 'root'
})
export class DatabaseHandlerService {

  capacitorSQLitePlugin: CapacitorSQLitePlugin;
  sqlite: SQLiteConnection;
  db: SQLiteDBConnection;

  constructor() { }

  initDB(): Promise<boolean> {
      const dbOptions = {database: 'attendanceApp', readonly: false };
      return new Promise(async resolve => {
          try {
            this.capacitorSQLitePlugin = CapacitorSQLite;
            await this.capacitorSQLitePlugin.closeConnection(dbOptions).catch((reason) => console.log(reason))
            this.sqlite = new SQLiteConnection(this.capacitorSQLitePlugin);
            this.db = await this.createConnection();
            this.db.open();
            await this.db.execute(tableSchema);
            resolve(true);
          } catch(err) {
            resolve(false);
          }
      });
  }

  async createConnection(): Promise<SQLiteDBConnection> {
    return await this.sqlite.createConnection('attendanceApp', false, 'no-encryption', 1, false);
  }

  createUser(mail: string, password: string, username: string, question: string, answer: string) {
    this.db.query(insertUserQ, [mail, password, username, question, answer]);
  }

  async deleteUser(mail: string) {
    return await this.db.query(deleteUserQ, [mail]);
  }

  async selectUsers(): Promise<any> {
    try {
      const { values } = await this.db.query(selectAllQ);
      return values;        
    }catch(err) {
      return JSON.stringify(err);
    }
  }

  async selectUser(mail: string): Promise<any> {
    const { values } = await this.db.query(selectByMailQ, [mail]);
    return values;
  }

  async loginUser(mail: string, password: string) {
    const { values } = await this.db.query(selectAuthQ, [mail, password]);
    return values;
  }

  async saveSession(mail: string, password: string) {
    return await this.db.query(insertSessionQ, [mail, password]);
  }

  async getSession() {
    const { values } =  await this.db.query(selectSessionQ, []);
    return values;
  }

  async logout() {
    return await this.db.query(deleteSessionQ, []);
  }
}
