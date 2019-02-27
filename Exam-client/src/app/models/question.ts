import { PossibleAnswer } from './possible-answer';

export class Question {
  subjectId: number;
  title: string;
  textBelow: string;
  multipleChoice: boolean;
  tags: string;
  horizontalDisplay: boolean;
  isActive: boolean;
  lastUpdate: Date;
  possibleAnswers: PossibleAnswer[];
}
