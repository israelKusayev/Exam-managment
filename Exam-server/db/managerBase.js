const sql = require('mssql');
const config = require('../config/sqlConfig');

const dbPool = new sql.ConnectionPool(config, err => {
  if (err) console.log("Can't create DB pool", err);
});

function executeInDB(name, options, callback) {
  const req = dbPool.request();

  for (let i = 0; i < options.length; i++) {
    const option = options[i];

    req.input(option.inputName, option.type, option.value);
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

exports.executeInDB = executeInDB;
