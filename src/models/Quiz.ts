import mongoose, { Schema, Document } from "mongoose";
import type {
  Quiz as QuizType,
  Question as QuestionType,
} from "../types/quiz.types.ts";

interface QuestionDocument extends QuestionType, Document {}
interface QuizDocument extends QuizType, Document {}

const questionSchema = new Schema<QuestionDocument>({
  questionText: { type: String, required: true },
  image: { type: String },
  choices: {
    type: [String],
    required: true,
    validate: [(arr: string[]) => arr.length === 4, "Il faut 4 choix"],
  },
  correctAnswerIndex: {
    type: Number,
    required: true,
    min: 0,
    max: 3,
  },
  timeLimitSeconds: {
    type: Number,
    default: 30,
  },
});

const quizSchema = new Schema<QuizDocument>(
  {
    title: { type: String, required: true },
    questions: [questionSchema],
    maxScore: { type: Number, default: 100 },
    globalTimeLimitSeconds: { type: Number, default: 300 },
    pointsPerCorrectAnswer: { type: Number, default: 10 },
  },
  { timestamps: true }
);

export default mongoose.model<QuizDocument>("Quiz", quizSchema);
