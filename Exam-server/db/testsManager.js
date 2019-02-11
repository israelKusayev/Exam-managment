const baseRepository = require('./managerBase');

function createTest(test, callback) {
  baseRepository.executeInDB('sp_CreateTest', [], callback);
}

exports.createTest = createTest;
