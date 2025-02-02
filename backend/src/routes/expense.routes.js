import { Router } from "express";
import {
  deleteExpense,
  getAllExpenses,
  getExpenseByID,
  postExpense,
  updateExpense,
} from "../controllers/expense.controllers.js";
import { ProtectedRoutes } from "../middleware/auth.middleware.js";

const routers = Router(); // Use a new router instance

// post a expense
routers.post("/postExpense", ProtectedRoutes, postExpense);

// Add the route to get all expenses for the authenticated user
routers.get("/getexpenses", ProtectedRoutes, getAllExpenses);

// get expense by Id
routers.get("/getExpenseByID/:id", ProtectedRoutes, getExpenseByID);

// delete and expense by ID
routers.delete("/deleteExpense/:id", ProtectedRoutes, deleteExpense);

// update an expense by ID
routers.put("/update/:id", ProtectedRoutes, updateExpense);

export default routers;
