import type { Request, Response } from "express";
import Quiz from "../models/Quiz.ts";

export const createQuiz = async (req: Request, res: Response) => {
  try {
    const newQuiz = await Quiz.create(req.body);
    res.status(201).json(newQuiz);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la création du quiz" });
  }
};

export const getAllQuizzes = async (_: Request, res: Response) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la récupération des quiz" });
  }
};
