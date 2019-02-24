import { Question } from './question';
export interface TestStudent {
  id: number;
  name: string;
  passingGrade: number;
  instructions: string;
  successMessage: string;
  failureMessage: string;
  questions: Question[];
}
