const baseRepository = require('./managerBase');

function createTest(params, callback) {
  baseRepository.executeInDB('sp_CreateTest', null, callback);
}

exports.createTest = createTest;
