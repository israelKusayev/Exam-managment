import { Question } from './question';
export interface TestStudent {
  id: number;
  name: string;
  passingGrade: number;
  instructions: string;
  showAnswers: boolean;
  questions: Question[];
}
