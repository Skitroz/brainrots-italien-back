// src/index.ts
import express2 from "express";
import cors from "cors";
import dotenv from "dotenv";

// src/config/db.ts
import mongoose from "mongoose";
var connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connect\xE9");
  } catch (error) {
    console.error("Erreur de connexion \xE0 MongoDB:", error);
    process.exit(1);
  }
};

// src/routes/quiz.routes.ts
import express from "express";

// src/models/Quiz.ts
import mongoose2, { Schema } from "mongoose";
var questionSchema = new Schema({
  questionText: { type: String, required: true },
  image: { type: String },
  choices: {
    type: [String],
    required: true,
    validate: [(arr) => arr.length === 4, "Il faut 4 choix"]
  },
  correctAnswerIndex: {
    type: Number,
    required: true,
    min: 0,
    max: 3
  },
  timeLimitSeconds: {
    type: Number,
    default: 30
  }
});
var quizSchema = new Schema(
  {
    title: { type: String, required: true },
    questions: [questionSchema],
    maxScore: { type: Number, default: 100 },
    globalTimeLimitSeconds: { type: Number, default: 300 },
    pointsPerCorrectAnswer: { type: Number, default: 10 }
  },
  { timestamps: true }
);
var Quiz_default = mongoose2.model("Quiz", quizSchema);

// src/controllers/quiz.controller.ts
var createQuiz = async (req, res) => {
  try {
    const newQuiz = await Quiz_default.create(req.body);
    res.status(201).json(newQuiz);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la cr\xE9ation du quiz" });
  }
};
var getAllQuizzes = async (_, res) => {
  try {
    const quizzes = await Quiz_default.find();
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la r\xE9cup\xE9ration des quiz" });
  }
};

// src/routes/quiz.routes.ts
var router = express.Router();
router.post("/", createQuiz);
router.get("/", getAllQuizzes);
var quiz_routes_default = router;

// src/index.ts
dotenv.config();
var app = express2();
var port = process.env.PORT || 3001;
app.use(cors());
app.use(express2.json());
app.use("/api/quizzes", quiz_routes_default);
var startServer = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Serveur lanc\xE9 sur le port ${port}`);
  });
};
startServer();
