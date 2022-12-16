import 'dotenv/config';
import { DataSource } from 'typeorm';
import typeormConfig from '../config/typeorm.config';

export class DatabaseConnection {
  private static _connection: DataSource;

  public static async connect() {
    if(!this._connection) {
      this._connection = await typeormConfig.initialize();
    }

    console.log('Connection established! 🏆️');    
  }

  public static get connection() {
    if(!this._connection) {
      throw new Error('Database has already been initialized! 😡️')
    }
    return this._connection
  }

}

