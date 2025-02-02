import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser"; 
import { connectDB } from "./Database/db.js";
import cors from "cors";
import path from 'path';

dotenv.config();

const app = express();

// CORS Middleware
app.use(
  cors({
    origin: ["http://localhost:5173","http://localhost:3000"],
    credentials: true,
  })
);

const _dirname = path.resolve();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
import authRoutes from "./routes/user.routes.js";
import expenseRoutes from './routes/expense.routes.js';

app.use("/api/users", authRoutes);
app.use("/api/expense",expenseRoutes)

app.use(express.static(path.join(_dirname,"frontend/dist")))
app.get('*',(_,res)=>{
  res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"))
})
const PORT = process.env.PORT || 8000; 

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
