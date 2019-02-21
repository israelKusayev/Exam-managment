const baseRepository = require('./managerBase');

function getAnswers(id, callback) {
  baseRepository.executeInDB('sp_GetAnswers', [{ questionId: id }], callback);
}

function saveAnswers(testExecId, questionId, answerIds, callback) {
  console.log([testExecId, questionId, answerIds]);

  baseRepository.executeInDB(
    'sp_CreateUserAnswer',
    [
      { testExecutionId: testExecId },
      { questionId: questionId },
      { answerIds: baseRepository.createListId(answerIds) }
    ],
    callback
  );
}

module.exports = {
  getAnswers: getAnswers,
  saveAnswers: saveAnswers
};
