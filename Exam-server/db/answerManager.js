const baseRepository = require('./managerBase');

function getAnswers(id, callback) {
  baseRepository.executeInDB('sp_GetAnswers', [{ questionId: id }], callback);
}

function saveAnswers(testExecId, questionId, answerIds, callback) {
  getAnswers(questionId, answers => {
    console.log([testExecId, questionId, answerIds]);

    baseRepository.executeInDB(
      'sp_UpdateAnswersInTestExec',
      [
        { testExecutionId: testExecId },
        { questionId: questionId },
        { answerIds: baseRepository.createListId(answerIds) },
        { allAnswersCorrect: isQuestionAnswered(answers, answerIds) }
      ],
      callback
    );
  });
}

function isQuestionAnswered(answers, answerIds) {
  let corrects = answers.filter(a => a.IsCorrect);

  for (let i = 0; i < corrects.length; i++) {
    let found = false;

    for (let j = 0; j < answerIds.length; j++) {
      if (corrects[i].Id === answerIds[j]) {
        found = true;
      }
    }

    if (!found) {
      return false;
    }
  }

  if (corrects.length !== answerIds.length) {
    return false;
  }
  return true;
}

module.exports = {
  getAnswers: getAnswers,
  saveAnswers: saveAnswers
};
