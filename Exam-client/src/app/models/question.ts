import { PossibleAnswer } from './possible-answer';

export class Question {
  subjectId: number;
  title: string;
  textBelow: string;
  multipleChoice = false;
  tags: string;
  horizontalDisplay = false;
  isActive: boolean;
  lastUpdate: Date;
  possibleAnswers: PossibleAnswer[];
  id: number;
  testCount: number;

  constructor() {
    this.possibleAnswers = [];
  }
}
