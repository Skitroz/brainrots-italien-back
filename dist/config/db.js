import mongoose from "mongoose";
export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connecté");
    }
    catch (error) {
        console.error("Erreur de connexion à MongoDB:", error);
        process.exit(1);
    }
};
