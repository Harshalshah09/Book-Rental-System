import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import bookRoutes from "./routes/book.routes";
import transactionRoutes from "./routes/transaction.routes";
import { errorHandler } from "./middlewares/errorHandler.middleware";

const app = express();

// Enable CORS
app.use(cors());
app.options("*", cors());

// Parse JSON request body
app.use(express.json());

// Use routes
app.use("/api", userRoutes);
app.use("/api", bookRoutes);
app.use("/api", transactionRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;
