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
    <div className="p-4">
      <div className="p-4 w-full shadow-2xl sm:max-w-xl rounded-lg bg-white mx-auto">
        <form className="p-2 space-y-4" onSubmit={handleSubmit}>
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

          {/* Amount Input */}
          <div className="flex flex-col">
            <label htmlFor="amount" className="mb-1 font-medium text-gray-700">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
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
            Update Expense
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePage;
