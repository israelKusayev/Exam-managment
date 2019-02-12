// @ts-check
const baseRepository = require('./managerBase');
const sql = require('mssql');

function getLanguages(callback) {
  baseRepository.executeInDB('sp_GetAllLanguages', [], callback);
}

exports.getLanguages = getLanguages;
