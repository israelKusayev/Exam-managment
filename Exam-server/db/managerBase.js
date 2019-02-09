const sql = require('mssql');
const config = require('../config/sqlConfig');

const dbPool = new sql.ConnectionPool(config, err => {
  if (err) console.log("Can't create DB pool", err);
});

function executeInDB(name, inputs, callback) {
  const req = dbPool.request();

  for (let i = 0; i < inputs.length; i++) {
    const element = inputs[i];
    const inputName = Object.keys(element)[0];

    req.input(inputName, element[inputName]);
  }

  req.execute(name, (err, data) => {
    if (err) {
      console.log('error', err);
      callback({ error: 'Execution error calling ' + name });
    } else {
      console.log(data.recordset);
      callback(data.recordset);
    }
  });
}

function createListId(arr) {
  const listId = new sql.Table();
  listId.columns.add('Id', sql.Int);
  for (let i = 0; i < arr.length; i++) {
    listId.rows.add(arr[i]);
  }
  return listId;
}

module.exports = {
  executeInDB: executeInDB,
  createListId: createListId
};
