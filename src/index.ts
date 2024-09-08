import dotenv from "dotenv";
dotenv.config(); // Load environment variables

import { connectToDatabase } from "./config/mongodb.config";
import app from "./server";

const port = process.env.PORT || 5001; // Fallback to a default port if not set

connectToDatabase()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => {
        console.error(
            "Failed to start server due to database connection error:",
            error.message
        );
    });