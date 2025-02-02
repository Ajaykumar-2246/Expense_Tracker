import React, { useState } from "react";
import { useAuthStore } from "../ZustandStores/authStore";
import { useExpense } from "../ZustandStores/expenseStore"; // Import useExpense store

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
    <div className="p-4 w-full shadow-2xl sm:max-w-xl rounded-lg bg-white mx-auto">
      {/* Display warning if total saving is low */}
      {typeof totalSaving === "number" && totalSaving <= 10 && (
        <div className="p-2 text-red-500 text-center">
          <p>
            Please add income first. After adding income, you can then add
            expenses.
          </p>
        </div>
      )}

      {/* Display Error Message */}
      {error && <p className="text-red-500 p-2 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="p-2 space-y-4">
        {/* Description Input */}
        <div className="flex flex-col">
          <label
            htmlFor="description"
            className="mb-1 font-medium text-gray-700"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter a description"
            required
          />
        </div>

        {/* Price Input */}
        <div className="flex flex-col">
          <label htmlFor="price" className="mb-1 font-medium text-gray-700">
            Amount
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value ? parseFloat(e.target.value) : "")
            }
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter the amount"
            required
          />
        </div>

        {/* Date Input */}
        <div className="flex flex-col">
          <label htmlFor="date" className="mb-1 font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Dropdowns: Payment Method and Expense Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Payment Method */}
          <div className="flex flex-col">
            <label
              htmlFor="paymentMethod"
              className="mb-1 font-medium text-gray-700"
            >
              Payment Method:
            </label>
            <select
              id="paymentMethod"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="border focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 rounded-lg p-2"
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
          <div className="flex flex-col">
            <label
              htmlFor="expenseCategory"
              className="mb-1 font-medium text-gray-700"
            >
              Category:
            </label>
            <select
              id="expenseCategory"
              value={expenseCategory}
              onChange={(e) => setExpenseCategory(e.target.value)}
              className="border focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 rounded-lg p-2"
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
          className="w-full bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600"
        >
          Submit
        </button>
      </form>

      {/* Display Savings */}
      <div className="p-2 flex gap-3">
        <strong>Saving:</strong> {totalSaving}
      </div>
    </div>
  );
};

export default Formcomponent;
