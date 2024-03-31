import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabase('database.db');

export const getPlayers = (): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('Database is not initialized'));
      return;
    }
    db.transaction(tx => {
      if (!tx) {
        reject(new Error('Transaction is not initialized'));
        return;
      }
      tx.executeSql(
        'SELECT * FROM profile',
        [],
        (_, result) => resolve(result.rows._array),
        (_, error) => { reject(error); return false }
      );
    });
  });
}

export const saveNewPlayer = (data: any): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    if (!data) {
      console.error("No data provided to save");
      reject(new Error("No data provided"));
      return;
    }

    db.transaction((tx: any) => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS profile (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, sobrenome TEXT, email TEXT, cep TEXT, rua TEXT, numero TEXT, bairro TEXT, cidade TEXT, uf TEXT);');
    })

    db.transaction((tx: any) => {
      if (!tx) {
        console.error("Failed to open database");
        reject(new Error("Failed to open database"));
        return;
      }

      const { nome, sobrenome, email, cep, rua, numero, bairro, cidade, uf } = data;
      const insertQuery = `INSERT INTO profile (nome, sobrenome, email, cep, rua, numero, bairro, cidade, uf) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`;
      const insertParams = [nome, sobrenome, email, cep, rua, numero, bairro, cidade, uf];

      tx.executeSql(insertQuery, insertParams,
        (txResult: any) => {
          console.log("Dados salvos com sucesso");
          resolve(true);
        },
        (txError: any) => {
          console.error("Erro ao salvar dados do competidor: ", txError);
          reject(txError);
        });
    }, (error: any) => {
      console.error("Erro ao abrir banco de dados: ", error);
      reject(error);
    });
  });
};


export const deleteAllPlayers = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    db.transaction((tx: any) => {
      tx.executeSql('DELETE FROM profile', [],
        (_: any, result: boolean | PromiseLike<boolean>) => resolve(result),
        (_: any, error: any) => { reject(error); return false }
      );
    });
  });
}