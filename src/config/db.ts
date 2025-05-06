import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("MongoDB connecté");
  } catch (error) {
    console.error("Erreur de connexion à MongoDB:", error);
    process.exit(1);
  }
};
