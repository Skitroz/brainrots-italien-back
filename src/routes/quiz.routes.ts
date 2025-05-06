import express from "express";
import { createQuiz, getAllQuizzes } from "../controllers/quiz.controller.ts";

const router = express.Router();

router.post("/", createQuiz);
router.get("/", getAllQuizzes);

export default router;
