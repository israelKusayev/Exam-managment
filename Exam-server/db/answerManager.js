const baseRepository = require('./managerBase');

function getAnswers(id, callback) {
  baseRepository.executeInDB('sp_GetAnswers', [{ questionId: id }], callback);
}

function saveAnswers(testExecId, questionId, answers, callback) {
  console.log('SAVE ANSWERS:');
  console.log([testExecId, questionId]);
  console.log(answers);
  baseRepository.executeInDB(
    'sp_UpdateAnswersInTestExec',
    [
      { TestExecutionId: testExecId },
      { QuestionId: questionId },
      { Answers: baseRepository.createUserAnswerTable(answers) }
    ],
    callback
  );
}

module.exports = {
  getAnswers: getAnswers,
  saveAnswers: saveAnswers
};
