const baseRepository = require('./managerBase');

function craeteTestExecution(testId, userId, callback) {
  baseRepository.executeInDB(
    'sp_CreateTestExecution',
    [{ testId: testId }, { userId: userId }],
    data => {
      if (data.error) callback(data);
      else {
        callback(data);
      }
    }
  );
}

function getStudentTest(testId, userId, callback) {
  baseRepository.executeInDB(
    'sp_GetTestQuestionsAndAnswers',
    [{ testId: testId }],
    data => {
      if (data.error) callback(data);
      else {
        let questions = data[1];
        questions.forEach(
          q => (q.answers = data[2].filter(a => a.questionId === q.id))
        );
        let test = data[0][0];
        questionRandom(test.id, userId, questions);

        test['questions'] = questions;
        callback(test);
      }
    }
  );
}

function finishTestExecution(testExecutionId, callback) {
  baseRepository.executeInDB(
    'sp_FinishTestExecution',
    [{ TestExecutionId: testExecutionId }],
    callback
  );
}

function getTestExecutionResults(testExecutionId, callback) {
  baseRepository.executeInDB(
    'sp_GetTestExecutionResults',
    [{ TestExecutionId: testExecutionId }],
    callback
  );
}

/**
 *
 * @param {number} testId
 * @param {string} userId
 * @param {[]} questions
 */
function questionRandom(testId, userId, questions) {
  let userIdAscii = 0;
  for (var i = 0; i < userId.length; i++) {
    userIdAscii += userId.charCodeAt(i);
  }
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];

    const rand = (testId * userIdAscii * question.id * 2411) % 11;
    question.rand = rand;
  }
  questions.sort((a, b) => {
    if (a.rand !== b.rand) return a.rand - b.rand;
    else return a.questionId - a.questionId;
  });
  questions.map(q => {
    return delete q.rand;
  });
}

function calcGrade(testId, testExecId, callback) {
  baseRepository.executeInDB(
    'sp_CalcGrade',
    [{ testId: testId }, { testExecId: testExecId }],
    callback
  );
}

module.exports = {
  craeteTestExecution: craeteTestExecution,
  finishTestExecution: finishTestExecution,
  getTestExecutionResults: getTestExecutionResults,
  getStudentTest: getStudentTest
};
