import mongoose, { Schema } from "mongoose";
const questionSchema = new Schema({
    questionText: { type: String, required: true },
    image: { type: String },
    choices: {
        type: [String],
        required: true,
        validate: [(arr) => arr.length === 4, "Il faut 4 choix"],
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
const quizSchema = new Schema({
    title: { type: String, required: true },
    questions: [questionSchema],
    maxScore: { type: Number, default: 100 },
    globalTimeLimitSeconds: { type: Number, default: 300 },
    pointsPerCorrectAnswer: { type: Number, default: 10 },
}, { timestamps: true });
export default mongoose.model("Quiz", quizSchema);
