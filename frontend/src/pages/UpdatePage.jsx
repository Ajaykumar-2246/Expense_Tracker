import React, { useEffect, useState } from "react";
import { useExpense } from "../ZustandStores/expenseStore";
import { useParams, useNavigate } from "react-router-dom";

const UpdatePage = () => {
  const { getExpenseById, expenseOfId, updateExpense, updatingExpense } =
    useExpense();
  const { id } = useParams();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    getExpenseById(id);
  }, [id, getExpenseById]);

  useEffect(() => {
    if (expenseOfId) {
      setDescription(expenseOfId.description || "");
      setAmount(expenseOfId.amount || "");
      setPaymentMethod(expenseOfId.paymentMethod || "");
      setExpenseCategory(expenseOfId.expenseCategory || "");
      setDate(expenseOfId.date);
    }
  }, [expenseOfId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateExpense(id, {
      description,
      amount,
      paymentMethod,
      expenseCategory,
      date,
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Update Expense
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Description Input */}
          <div className="space-y-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
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

          {/* Amount Input */}
          <div className="space-y-2">
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700"
            >
              Amount
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter the amount"
              required
            />
          </div>

          {/* Date Input */}
          <div className="space-y-2">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Payment Method */}
            <div className="space-y-2">
              <label
                htmlFor="paymentMethod"
                className="block text-sm font-medium text-gray-700"
              >
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
              <label
                htmlFor="expenseCategory"
                className="block text-sm font-medium text-gray-700"
              >
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
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Update Expense
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePage;