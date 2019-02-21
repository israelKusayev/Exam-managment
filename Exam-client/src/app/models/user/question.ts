import { Answer } from './answer';

export interface Question {
  id: number;
  title: string;
  textBelow: number;
  multipleChoice: boolean;
  horizontalDisplay: boolean;
  answers: Answer[];
  isSaved: boolean;
  isAnswered: boolean;
  isDataChanged: boolean;
}
