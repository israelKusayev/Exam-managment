// @ts-check
const baseRepository = require('./managerBase');

function getQuestions(callback) {
  baseRepository.executeInDB('sp_GetQuestions', [], callback);
}

exports.getQuestions = getQuestions;
