var firebase = require('../firebase')

const db = firebase.collection("/mensagens");

class DataService {
  getAll() {
    return db;
  }

  create(tutorial) {
    return db.add(tutorial);
  }
}
module.exports = new DataService