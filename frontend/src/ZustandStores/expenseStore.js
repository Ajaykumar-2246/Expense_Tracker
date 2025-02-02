import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const baseUrl = "https://spendly-qhpk.onrender.com/api/expense";
axios.defaults.withCredentials = true;

export const useExpense = create((set) => ({
  allExpense: [],
  totalSaving: null,
  totalExpense: null,
  expenseOfId: null,
  updatingExpense:false,

  postExpense: async (expenseData) => {
    try {
      const response = await axios.post(`${baseUrl}/postExpense`, expenseData);
      toast.success("Expense added successfully!");
    } catch (error) {
      console.error("Error posting expense:", error);
      toast.error("Failed to add expense.");
    }
  },

  getExpense: async () => {
    try {
      const response = await axios.get(`${baseUrl}/getexpenses`);
      if (response.status === 401 || response.status === 403) {
        return; // Do nothing if unauthorized
      }
      set({ allExpense: response.data });

      // Assuming response.data.expenses is an array
      const expenses = response.data.expenses;

      // Calculate total income
      let totalIncome = 0;
      let totalSaves = 0;
      expenses.forEach((expense) => {
        if (expense.expenseCategory === "income") {
          totalIncome += expense.amount; // If it's income, add it to totalIncome
          totalSaves += expense.amount;
        } else {
          totalIncome -= expense.amount; // Otherwise, subtract the expense from totalIncome
        }
      });

      const totalSaving = totalIncome;

      // Set the totalSaving state
      set({ totalSaving: totalSaving });
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        return; // Do nothing for unauthorized users
      }
      console.error("Error fetching expenses:", error);
      toast.error("Failed to fetch expenses.");
    }
  },

  getExpenseById: async (id) => {
    try {
      const res = await axios.get(`${baseUrl}/getExpenseByID/${id}`);
      set({ expenseOfId: res.data.expense });
    } catch (error) {
      console.error("Error fetching expense by id:", error);
      toast.error("Failed to fetch expense.");
    }
  },

  deleteExpense: async (id) => {
    try {
      const response = await axios.delete(`${baseUrl}/deleteexpense/${id}`);
      toast.success("successfully deleted");
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  },

  updateExpense:async (id,expenseData) => {
    try{
      const response = await axios.put(`${baseUrl}/update/${id}`,expenseData);
      set({updatingExpense:false})
      toast.success("expense successfully updated");
    } 
    catch(error){
      console.error("Error updating expense:",error);
      toast.error("expense is not updated")
    }
  }


}));
