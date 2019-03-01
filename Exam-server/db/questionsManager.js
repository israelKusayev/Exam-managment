// @ts-check
const baseRepository = require('./managerBase');

exports.getQuestions = function(subjectId, callback) {
  baseRepository.executeInDB(
    'sp_GetQuestions',
    [{ SubjectId: subjectId }],
    callback
  );
};

exports.getQuestionById = function(questionId, callback) {
  baseRepository.executeInDB(
    'sp_GetQuestionById',
    [{ QuestionId: questionId }],
    callback
  );
};

exports.addQuestion = function(
  subjectId,
  possibleAnswers,
  title,
  textBelow,
  multipleChoice,
  tags,
  horizontalDisplay,
  callback
) {
  baseRepository.executeInDB(
    'sp_AddQuestion',
    [
      { SubjectId: subjectId },
      {
        PossibleAnswers: baseRepository.createPossibleAnswerTable(
          possibleAnswers
        )
      },
      { Title: title },
      { TextBelow: textBelow },
      { MultipleChoice: multipleChoice },
      { Tags: tags },
      { HorizontalDisplay: horizontalDisplay }
    ],
    callback
  );
};

exports.getQuestionPossibleAnswers = function(questionId, callback) {
  baseRepository.executeInDB(
    'sp_GetQuestionPossibleAnswers',
    [{ QuestionId: questionId }],
    callback
  );
};

exports.deleteQuestion = function(questionId, callback) {
  baseRepository.executeInDB(
    'sp_DeleteQuestion',
    [{ QuestionId: questionId }],
    callback
  );
};

exports.updateQuestion = function(
  questionId,
  possibleAnswers,
  title,
  textBelow,
  multipleChoice,
  tags,
  horizontalDisplay,
  callback
) {
  baseRepository.executeInDB(
    'sp_UpdateQuestion',
    [
      { QuestionId: questionId },
      {
        PossibleAnswers: baseRepository.createPossibleAnswerTable(
          possibleAnswers
        )
      },
      { Title: title },
      { TextBelow: textBelow },
      { MultipleChoice: multipleChoice },
      { Tags: tags },
      { HorizontalDisplay: horizontalDisplay }
    ],
    callback
  );
};
