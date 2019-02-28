// @ts-check
const baseRepository = require('./managerBase');

function getQuestions(subjectId, callback) {
  baseRepository.executeInDB(
    'sp_GetQuestions',
    [{ subjectId: subjectId }],
    callback
  );
}

exports.getQuestions = getQuestions;
