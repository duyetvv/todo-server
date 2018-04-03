const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;

// let instance = null;
let connectString = 'mongodb://localhost:27017/';

let TODOS = [];

const getMaxId = () => !TODOS.length ? 0 : Math.max.apply(null, TODOS.map(ele => parseInt(ele.id)));

module.exports = class Connection {
  constructor () {
  }

  _open(callback, fallback) {
    MongoClient.connect(connectString, (error, client) => {
      if (error) {
        console.log(`can't open the connection`);
        fallback(error)
        return;
      }
      console.log('Open MongoDB training Database');
      callback(client.db('training'));
    })
  }

  _updateTodos(callback, fallback) {
    this._open(db => {
      db.collection('todos').find().toArray((error, data) => {
        if (error) { reject(error); }

        const todos = data.map(obj => {
          delete obj._id
          return obj
        })

        console.log('_updateTodos ', JSON.stringify(todos))
        TODOS = todos;
        typeof callback === 'function' && callback(todos);
      })
    }, error => {
      typeof fallback === 'function' && fallback(error);
    })
  }

  getALl() {
    return new Promise((resolve, reject) => {
      if (TODOS) {
        resolve(TODOS);
        return;
      }

      this._updateTodos(todos => {
        resolve(todos);
      }, error => {
        reject(error);
      })
    })
  }

  insertOne(todo) {
    if (!todo) { return; }

    todo.id = getMaxId() + 1
    return new Promise((resolve, reject) => {
      this._open(db => {
        db.collection("todos").insertOne(todo, (error, result) => {
          if (error) {
            reject(error);
            return;
          }

          this._updateTodos();
          resolve(result);
        })
      }, error => {
        reject(error);
      })
    })
  }

  deleteOne(id) {
    if (!id) { return; }

    return new Promise((resolve, reject) => {
      this._open(db => {
        db.collection('todos').deleteOne({ "id": parseInt(id) }, (error, result) => {
          if (error) {
            reject(error);
            return;
          }

          this._updateTodos();
          resolve(result);
        })
      }, error => {
        reject(error);
      })
    })
  }
}
