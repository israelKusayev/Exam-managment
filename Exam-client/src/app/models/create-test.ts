export class CreateTest {
  language: number;
  passingGrade: number;
  formEmail: string;
  testName: string;
  sendCompletionMessage = false;
  showAnswres = false;
  header: string;
  successMessage: string;
  failureMessage: string;
  certificate: string;
  passingMessageSubject: string;
  passingMessageBody: string;
  failingMessageSubject: string;
  failingMessageBody: string;
  subjectId: number;
  creatorEmail: string;
  constructor(subjectId: number, creatorEmail: string) {
    this.subjectId = subjectId;
    this.creatorEmail = creatorEmail;
  }
}
