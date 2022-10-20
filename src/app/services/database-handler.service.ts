import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteDBConnection, SQLiteConnection, CapacitorSQLitePlugin } from '@capacitor-community/sqlite';
import { tableSchema, insertUserQ, selectAllQ, selectByMailQ, 
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
      const dbOptions = {database: 'duocAttendance', readonly: false };
      return new Promise(async resolve => {
          try {
            this.capacitorSQLitePlugin = CapacitorSQLite;
            await this.capacitorSQLitePlugin.closeConnection(dbOptions).catch((reason) => console.log(reason))
            this.sqlite = new SQLiteConnection(this.capacitorSQLitePlugin);
            this.db = await this.createConnection();
            this.db.open();
            await this.db.execute(tableSchema);
            this.createUser('atorres@duocuc.cl', '1234', 'Ana Torres Leiva', 'Nombre de tu mascota', 'Gato');
            this.createUser('avalenzuela@duocuc.cl', 'qwer', 'Alberto Valenzuela Nuñez', 'Nombre de tu mejor amigo', 'Juanito');
            this.createUser('cifuentes@duocuc.cl', 'asdf', 'Carla Fuentes González', 'Lugar de nacimiento de tu madre', 'Valparaiso');
            resolve(true);
          } catch(err) {
            resolve(false);
          }
      });
  }

  async createConnection(): Promise<SQLiteDBConnection> {
    return await this.sqlite.createConnection('duocAttendance', false, 'no-encryption', 1, false);
  }

  createUser(mail: string, password: string, username: string, question: string, answer: string) {
    this.db.query(insertUserQ, [mail, password, username, question, answer]);
  }

  async selectUsers(): Promise<any> {
    try {
      return (
        await this.db.query(selectAllQ)
      );
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

  saveSession(mail: string, password: string) {
    this.db.query(insertSessionQ, [mail, password]);
  }

  async getSession() {
    const { values } =  await this.db.query(selectSessionQ, []);
    return values;
  }

  logout() {
    this.db.query(deleteSessionQ, []);
  }
}
