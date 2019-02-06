const baseRepository = require('./managerBase');

function createTest(test, callback) {
  baseRepository.executeInDB('sp_CreateTest', null, callback);
}

exports.createTest = createTest;
