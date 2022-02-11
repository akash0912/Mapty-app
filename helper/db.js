import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("places.db");

export const init = () => {
    const promise = new Promise((resolve, reject)=>{
        db.transaction((tx) => {
          tx.executeSql(
            "CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL)",
            [],
            //SUCCESS FUNCTION
            () => {
              resolve();
            },
            //FAILURE FUNCTION
            (_, err) => {
                reject(err);
            }
          );
        });

    })
    return promise;
};


export const insertPlace = (title, imageUri, address, lat, lng)=>{
    const promise = new Promise((resolve, reject)=>{
        db.transaction((tx) => {
          tx.executeSql(
            "INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?,?,?,?,?)",
            [title, imageUri, address, lat, lng],
            //SUCCESS FUNCTION
            (_, result) => {
              resolve(result);
            },
            //FAILURE FUNCTION
            (_, err) => {
                reject(err);
            }
          );
        });

    })
    return promise;
};


export const fetchPlaces = (title, imageUri, address, lat, lng)=>{
    const promise = new Promise((resolve, reject)=>{
        db.transaction((tx) => {
          tx.executeSql(
            "SELECT * FROM places",
            [],
            //SUCCESS FUNCTION
            (_, result) => {
              resolve(result);
            },
            //FAILURE FUNCTION
            (_, err) => {
                reject(err);
            }
          );
        });

    })
    return promise;
}