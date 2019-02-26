//@ts-check
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
    data => {
      let answeredSuccessfully = 0;
      const userAnswers = data[0];
      const correctAnswers = data[1];
      const questionCount = data[2].questionCount;
      console.log(data);

      for (let i = 0; i < userAnswers.length; i++) {
        const userAnswer = userAnswers[i];
      }

      let index = 0;
      for (let i = 0; i < correctAnswers.length; i++) {
        const correctAnswer = correctAnswers[i];
        if (correctAnswer.questionId === userAnswers[index].questionId) {
          // same question
          if (correctAnswer.answerId === userAnswers[index].questionId) {
            // same answer
          }
        }
        index++;
      }

      for (let i = 0; i < correctAnswers.length; i++) {
        const correctAnswer = correctAnswers[i];
        for (let j = 0; j < userAnswers.length; j++) {
          const userAnswer = userAnswers[j];
          if (userAnswer.questionId === correctAnswer.questionId) {
            if (!correctAnswer.multipleChoice) {
              answeredSuccessfully++;
            }
          }
        }
      }
    }
  );
}

module.exports = {
  craeteTestExecution: craeteTestExecution,
  getStudentTest: getStudentTest,
  calcGrade: calcGrade
};
