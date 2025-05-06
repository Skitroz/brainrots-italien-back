import Quiz from "../models/Quiz";
export const createQuiz = async (req, res) => {
    try {
        const newQuiz = await Quiz.create(req.body);
        res.status(201).json(newQuiz);
    }
    catch (err) {
        res.status(500).json({ error: "Erreur lors de la création du quiz" });
    }
};
export const getAllQuizzes = async (_, res) => {
    try {
        const quizzes = await Quiz.find();
        res.json(quizzes);
    }
    catch (err) {
        res.status(500).json({ error: "Erreur lors de la récupération des quiz" });
    }
};
