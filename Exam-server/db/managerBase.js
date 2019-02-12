const sql = require('mssql');
const config = require('../config/sqlConfig');

const dbPool = new sql.ConnectionPool(config, err => {
  if (err) console.log("Can't create DB pool", err);
});

//executes a stored procedure
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

// return sql table "ListId" for sending int list to stored procedure
function createListId(arr) {
  const listId = new sql.Table();
  listId.columns.add('Id', sql.Int);
  for (let i = 0; i < arr.length; i++) {
    listId.rows.add(arr[i]);
  }
  return listId;
}

/*

sp =  [
 {
   name: "someSpName",
   inputs: [{inputName:"someValue"}],
   returnValue:
     {
      valueName:"someName",
      spNumber:index of sp in arr  type = number,
      returnValueName:name of what return from current sp  type = string
     }
 }
]

*/

/**
 *
 * @param {[{name:string,inputs:{inputName:string}[],returnValue:{valueName:string,spNumber:number,returnValueName:string}}]} sp
 * @param {Function} callback
 */
function executeMultipleSp(sp, callback) {
  const transaction = new sql.Transaction(dbPool);
  transaction.begin(err => {
    // transaction start
    if (err) console.log(err);

    executeInTransaction(transaction, sp, 0, callback);
  });
}

/**
 *
 * @param {sql.Transaction} transaction Transaction instance
 * @param {[{name:string,inputs:{inputName:string}[],returnValue:{valueName:string,spNumber:number,returnValueName:string}}]} sp
 * @param {number} index Current sp
 * @param {Function} callback
 */
function executeInTransaction(transaction, sp, index, callback) {
  let req = new sql.Request(transaction);

  const currentSp = sp[index];

  for (let i = 0; i < currentSp.inputs.length; i++) {
    const element = currentSp.inputs[i];
    const inputName = Object.keys(element)[0];

    req.input(inputName, element[inputName]);
  }

  // checking if the pervious SP's return value for this sp.
  for (let i = 0; i < index; i++) {
    const returnValue = sp[i].returnValue;

    if (returnValue && returnValue.spNumber === index) {
      req.input(returnValue.valueName, returnValue['value']);
    }
  }

  req.execute(currentSp.name, (err, result) => {
    if (err) {
      // cancel this transaction
      transaction.rollback();
      console.log(err);

      return;
    }
    const returnValue = currentSp.returnValue;
    if (returnValue) {
      returnValue['value'] = result.recordset[0][returnValue.returnValueName];
    }

    if (sp.length - 1 === index) {
      // transaction success
      transaction.commit();
      console.log('commit');

      callback(result.recordset);
    } else executeInTransaction(transaction, sp, index + 1, callback);
  });
}

module.exports = {
  executeInDB: executeInDB,
  createListId: createListId,
  executeMultipleSp: executeMultipleSp
};
