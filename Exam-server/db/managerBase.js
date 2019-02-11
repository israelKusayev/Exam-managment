const sql = require('mssql');
const config = require('../config/sqlConfig');

const dbPool = new sql.ConnectionPool(config, err => {
  if (err) {
    //logger.log('error', "Can't create DB pool " + err + ' stack:' + err.stack);
    console.log(err);
  }
});
//executes a stored procedure
function executeInDB(name, inputs, callback) {
  const req = dbPool.request();

  for (let i = 0; i < inputs.length; i++) {
    const element=inputs[i];
    const inputName=Object.keys(element)[0];

    req.input(inputName,  element[inputName]);
  }

  req.execute(name, (err, data) => {
    if (err) {
      console.log('error', `Execution error calling '${name}', error:`);
      console.log(err);
      callback({ error: 'Execution error calling ' + name });
    } else {
      console.log(data.recordset);
      callback(data.recordset);
    }
  });
}

exports.executeInDB = executeInDB;
