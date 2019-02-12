// @ts-check
const baseRepository = require('./managerBase');

function getLanguages(callback) {
  baseRepository.executeInDB('sp_GetAllLanguages', [], callback);
}

exports.getLanguages = getLanguages;
