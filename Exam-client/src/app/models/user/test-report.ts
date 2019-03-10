export class TestReport {
  Header: TestReportHeader;
  TestExecutions: TestExecution[] = [];
}

export class TestReportHeader {
  TestName: string;
  NumOfQuestions: number;
  PassingGrade: number;
  NumberOfSubmissions: number;
  NumberOfRespondentsPassed: number;
  PassingPercentage: number;
  AverageGrade: number;
  MedianGrade: number;
}

export class TestExecution {
  Id: number;
  FirstName: string;
  LastName: string;
  StartTime: Date;
  NumOfQuestionsAnswered: number;
  Details: TestExecutionDetail[];
}

export class TestExecutionDetail {
  Answer: boolean;
  AnswerId: number;
  IsCorrect: boolean;
  QuestionId: number;
  QuestionTitle: string;
  QuestionTextBelow: string;
  TestExecutionId: number;
  AnswerTitle: string;
}
