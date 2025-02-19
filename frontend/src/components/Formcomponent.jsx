import React, { useState } from "react";
import { useAuthStore } from "../ZustandStores/authStore";
import { useExpense } from "../ZustandStores/expenseStore";

const Formcomponent = () => {
  // State variables
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState(""); // Error message state

  const { postExpense, totalSaving } = useExpense();
  const { authUser } = useAuthStore();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error

    // Validate input
    if (!description || !price || !paymentMethod || !expenseCategory || !date) {
      setError("All fields are required!");
      return;
    }

    if (isNaN(price) || price <= 0) {
      setError("Amount must be a positive number.");
      return;
    }

    // Create expense object
    const expenseData = {
      userId: authUser._id,
      description,
      amount: parseFloat(price),
      paymentMethod,
      expenseCategory,
      date,
    };

    try {
      await postExpense(expenseData);

      // Reset form fields
      setDescription("");
      setPrice("");
      setPaymentMethod("");
      setExpenseCategory("");
      setDate("");
    } catch (err) {
      setError("Failed to submit expense. Please try again.");
    }
  };

  return (
    <div className="p-6 w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg">
      {/* Display warning if total saving is low */}
      {typeof totalSaving === "number" && totalSaving <= 10 && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-center">
          <p>
            Please add income first. After adding income, you can then add
            expenses.
          </p>
        </div>
      )}

      {/* Display Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Description Input */}
        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Enter a description"
            required
          />
        </div>

        {/* Price Input */}
        <div className="space-y-2">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value ? parseFloat(e.target.value) : "")
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Enter the amount"
            required
          />
        </div>

        {/* Date Input */}
        <div className="space-y-2">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          />
        </div>

        {/* Dropdowns: Payment Method and Expense Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Payment Method */}
          <div className="space-y-2">
            <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
              Payment Method
            </label>
            <select
              id="paymentMethod"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            >
              <option value="">Select Payment Method</option>
              <option value="cash">Cash</option>
              <option value="credit-card">Credit Card</option>
              <option value="debit-card">Debit Card</option>
              <option value="bank-transfer">Bank Transfer</option>
              <option value="UPI Payment">UPI</option>
            </select>
          </div>

          {/* Expense Category */}
          <div className="space-y-2">
            <label htmlFor="expenseCategory" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="expenseCategory"
              value={expenseCategory}
              onChange={(e) => setExpenseCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            >
              <option value="">Select a Category</option>
              <option value="income">Income</option>
              <option value="expenses">Expenses</option>
              <option value="investment">Investments</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
        >
          Submit
        </button>
      </form>

      {/* Display Savings */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg text-center">
        <strong className="text-gray-700">Total Savings:</strong>
        <span className="ml-2 text-blue-600 font-semibold">${totalSaving}</span>
      </div>
    </div>
  );
};

export default Formcomponent;