const baseRepository = require('./managerBase');

function getAnswers(id, callback) {
  baseRepository.executeInDB('sp_GetAnswers', [{ questionId: id }], callback);
}

exports.getAnswers = getAnswers;
