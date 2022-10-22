import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class StorageHandlerService {

  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  set(key: string, value: any) {
    this._storage?.set(key, value);
  }
  
  async get(key: string) {
    return await this._storage?.get(key);
  }

  async remove(key: string) {
    return await this._storage?.remove(key);
  }

  async clear() {
    await this._storage.remove("SESSION_DATA");
    await this._storage.clear();
  }
}
