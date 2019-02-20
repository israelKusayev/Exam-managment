const baseRepository = require('./managerBase');

function createTestInputs(test) {
  return [
    { language: test.language },
    { testName: test.testName },
    { passingGrade: test.passingGrade },
    { showAnswres: test.showAnswres },
    { header: test.header },
    { successMessage: test.successMessage },
    { failureMessage: test.failureMessage },
    { certificate: test.certificate },
    { sendCompletionMessage: test.sendCompletionMessage },
    { subjectId: test.subjectId },
    { creatorEmail: test.creatorEmail }
  ];
}

function completionMessagesInputs(test) {
  return [
    { formEmail: test.formEmail },
    { passingMessageSubject: test.passingMessageSubject },
    { passingMessageBody: test.passingMessageBody },
    { failingMessageSubject: test.failingMessageSubject },
    { failingMessageBody: test.failingMessageBody }
  ];
}

function createTest(data, callback) {
  const { details: test, questions } = data;
  let inputs = createTestInputs(test);
  if (test.sendCompletionMessage) {
    inputs = [...createTestInputs(test), ...completionMessagesInputs(test)];
  }

  baseRepository.executeMultipleSp(
    [
      {
        name: 'sp_CreateTest',
        inputs: inputs,
        returnValue: {
          valueName: 'testId',
          spName: 'sp_AddQuestionsToTest',
          returnValueName: 'id'
        }
      },
      {
        name: 'sp_AddQuestionsToTest',
        inputs: [{ questionsId: baseRepository.createListId(questions) }]
      }
    ],
    callback
  );
}

function getTest(id, callback) {
  baseRepository.executeInDB('sp_GetTest', [{ id: id }], callback);
}

function getTests(subjectId, callback) {
  baseRepository.executeInDB(
    'sp_GetTests',
    [{ subjectId: subjectId }],
    callback
  );
}

function updateTest(id, data, callback) {
  const { details: test, questions } = data;

  let inputs = createTestInputs(test);
  if (test.sendCompletionMessage) {
    inputs = [...createTestInputs(test), ...completionMessagesInputs(test)];
  }

  baseRepository.executeMultipleSp(
    [
      {
        name: 'sp_UpdateTest',
        inputs: [...inputs, { testId: id }]
      },
      {
        name: 'sp_UpdateQuestionsInTest',
        inputs: [
          { questionsId: baseRepository.createListId(questions) },
          { testId: id }
        ]
      }
    ],
    callback
  );
}

function deleteTest(testId, callback) {
  baseRepository.executeInDB('sp_DeleteTest', [{ testId: testId }], callback);
}

function getStudentTest(testId, userId, callback) {
  baseRepository.executeInDB(
    'sp_GetTestQuestionsAndAnswers',
    [{ testId: testId }],
    data => {
      if (data.error) callback(data);
      else {
        console.log(data);

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
/**
 *
 * @param {number} testId
 * @param {string} userId
 * @param {[]} questions
 */
function questionRandom(testId, userId, questions) {
  userIdAscii = 0;
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

module.exports = {
  createTest: createTest,
  getTest: getTest,
  getTests: getTests,
  updateTest: updateTest,
  deleteTest: deleteTest,
  getStudentTest: getStudentTest
};
