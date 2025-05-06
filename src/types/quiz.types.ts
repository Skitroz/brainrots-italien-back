export interface Question {
  questionText: string;
  image?: string;
  choices: string[];
  correctAnswerIndex: number;
  timeLimitSeconds?: number;
}

export interface Quiz {
  title: string;
  questions: Question[];
  maxScore?: number;
  globalTimeLimitSeconds?: number;
  pointsPerCorrectAnswer?: number;
}
