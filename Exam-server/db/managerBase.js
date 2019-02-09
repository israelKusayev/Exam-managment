const sql = require('mssql');
const config = require('../config/sqlConfig');

const dbPool = new sql.ConnectionPool(config, err => {
  if (err) console.log("Can't create DB pool", err);
});

// execute stored procedure
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

// function name(transactiond) {
//   const transaction = new sql.Transaction(dbPool);
//   transaction.begin(err => {
//     let req = new sql.Request(transaction);
//     req.input('xxxxx', sql.Int, 'yyyyy');
//     req.execute('storedProcName', (err, result) => {
//       if (err) {
//         transaction.rollback();
//       } else {
//         req.execute('storedProcName2', (err, result) => {
//           if (!err) {
//             transaction.commit();
//           }
//         });
//       }
//     });
//   });
// }

// sp =  [{name="someSpName", inputs:[{inputName:"someValue"}]}]

// function executeMultipleSp(sp) {
//   const transaction = new sql.Transaction(dbPool);
//   recursion(transaction, sp);
// }

// function recursion(transaction, sp, currentSp) {
//   let req = new sql.Request(transaction);

//   for (let i = 0; i < sp[currentSp].inputs.length; i++) {
//     const element = sp[currentSp].inputs[i];
//     const inputName = Object.keys(element)[0];

//     req.input(inputName, element[inputName]);
//   }

//   req.execute(sp[currentSp].name, (err, result) => {
//     if (err) {
//       transaction.rollback();
//       return;
//     } else {
//       recursion(transaction);
//     }
//   });

//   if (sp.length - 1 === currentSp) {
//     transaction.commit();
//   }
// }

// sp =  [{name:"someSpName", inputs:[{inputName:"someValue"}
// , returnValue:{}
//
//]}]

// function executeMultipleSp(sp) {
//   const transaction = new sql.Transaction(dbPool);
//   recursion(transaction, sp);
// }

// function recursion(transaction, sp, currentSp) {
//   let req = new sql.Request(transaction);

//   for (let i = 0; i < sp[currentSp].inputs.length; i++) {
//     const element = sp[currentSp].inputs[i];
//     const inputName = Object.keys(element)[0];

//     req.input(inputName, element[inputName]);
//   }

//   req.execute(sp[currentSp].name, (err, result) => {
//     if (err) {
//       transaction.rollback();
//       return;
//     } else {
//       recursion(transaction);
//     }
//   });

//   if (sp.length - 1 === currentSp) {
//     transaction.commit();
//   }
// }

module.exports = {
  executeInDB: executeInDB,
  createListId: createListId
};
