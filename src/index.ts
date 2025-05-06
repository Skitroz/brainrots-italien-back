import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.ts";
import quizRoutes from "./routes/quiz.routes.ts";

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/api/quizzes", quizRoutes);

const startServer = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Serveur lancé sur le port ${port}`);
  });
};

startServer();
