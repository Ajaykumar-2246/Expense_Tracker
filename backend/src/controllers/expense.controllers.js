import { ExpenseRecord } from "../models/expense.models.js";
import expressAsyncHandler from "express-async-handler";

export const postExpense = expressAsyncHandler(async (req, res) => {
  try {
    const {
      userId,
      description,
      amount,
      paymentMethod,
      expenseCategory,
      date,
    } = req.body;
    // Validate required fields
    if (
      !userId ||
      !description ||
      !amount ||
      !paymentMethod ||
      !expenseCategory ||
      !date
    ) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    // Ensure amount is a valid positive number
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }
    // Create a new expense record
    const newExpense = new ExpenseRecord({
      userId,
      description,
      amount,
      paymentMethod,
      expenseCategory,
      date,
    });

    await newExpense.save();

    res.status(201).json({
      message: "Expense recorded successfully",
      expense: newExpense,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export const getAllExpenses = expressAsyncHandler(async (req, res) => {
  // Fetch all expenses related to the user
  const expenses = await ExpenseRecord.find({ userId: req.user._id });
  // Return the found expenses
  res.status(200).json({ expenses });
});


export const getExpenseByID=expressAsyncHandler(async (req,res) => {
  const expenseID=req.params.id;
  const expense=await ExpenseRecord.findById(expenseID);
  if(!expense) {
    return res.status(404).json({ message: "Expense not found" });
  }
  res.status(200).json({ expense });
})

export const deleteExpense = expressAsyncHandler(async (req, res) => {
  const expenseId = req.params.id; // Get the expenseId from the URL params
  // Find the expense by its ID
  const expense = await ExpenseRecord.findOne({ _id: expenseId });

  if (!expense) {
    return res.status(404).json({ message: "Expense not found" });
  }

  // Delete the expense from the database
  await ExpenseRecord.deleteOne({ _id: expenseId });

  return res.status(200).json({ message: "Expense deleted successfully" });
});

export const updateExpense = expressAsyncHandler(async (req, res) => {
  const expenseId = req.params.id; // Get the expenseId from the URL params
  const { description, amount, paymentMethod, expenseCategory, date } =
    req.body;
    // Find the expense by its ID
  try {
    const expense = await ExpenseRecord.findByIdAndUpdate(
      expenseId, // Use the expenseId to find the document
      {
        description,
        amount,
        paymentMethod,
        expenseCategory,
        date,
      },
      { new: true } // Return the updated document
    );

    if (!expense) {
      // If the expense is not found, return an error
      return res.status(404).json({ message: "Expense not found" });
    }

    // Return the updated expense
    res.status(200).json(expense);
  } catch (error) {
    console.error("Error updating expense:", error);
    res
      .status(500)
      .json({ message: "Server error, could not update expense." });
  }
});
