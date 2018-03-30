const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;

let instance = null;
let connectString = 'mongodb://localhost:27017';

class Connection {
  constructor() {
    if (!instance) {
      return new Connection();
    }

    return instance;
  }

  open(callback, fallback) {
    MongoClient.connect(connectString, (error, client) => {
      if (error) {
        fallback(error)
        return;
      }
      callback(client.db('training'));
    })
  }

  getALl() {
    return new Promise((resolve, reject) => {
      this.open(db => {
        const collection = db.collection('todos');
        collection.find({}).toArray(function(error, todos) {
          if (error) {
            reject(error);
            return;
          }
          resolve(totos)
        })
      }, error => {
        reject(error);
      })
    })
  }
}

export const NAME = '123123';
