const sql = require('mssql');
const config = require('../config/sqlConfig');

const dbPool = new sql.ConnectionPool(config, err => {
  if (err) {
    //logger.log('error', "Can't create DB pool " + err + ' stack:' + err.stack);
    console.log(err);
  }
});

function executeInDB(name, options, callback) {
  var req = dbPool.request();

  for (let i = 0; i < options.length; i++) {
    const option = options[i];

    req.input(option.inputName, option.type, option.value);
  }

  req.execute(name, (err, data) => {
    if (err) {
      console.log('error', "Execution error calling 'getuserbyname'");
      callback({ error: 'errrorr' });
    } else {
      console.log(data.recordset);
      callback(data.recordset);
    }
  });
}
exports.executeInDB = executeInDB;
