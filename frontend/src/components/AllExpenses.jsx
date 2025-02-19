import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useExpense } from "../ZustandStores/expenseStore";
import { FaEdit } from "react-icons/fa";

const AllExpenses = () => {
  const { getExpense, allExpense, deleteExpense } = useExpense();
  const navigate = useNavigate();

  // Fetch expenses when the component mounts
  useEffect(() => {
    getExpense();
  }, [getExpense, allExpense]);

  const handleExpenseDetails = async (expenseId) => {
    try {
      await deleteExpense(expenseId); // Ensure this is properly handled
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const handleUpdateExpenseDetails = async (expenseId) => {
    navigate(`/update/${expenseId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Legend for Expense Categories */}
      {allExpense?.expenses && allExpense.expenses.length > 0 && (
        <div className="flex justify-center gap-4 mb-8">
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 bg-green-400 rounded-full mr-2"></span>
            Income
          </div>
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 bg-red-400 rounded-full mr-2"></span>
            Expenses
          </div>
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 bg-blue-400 rounded-full mr-2"></span>
            Investment
          </div>
        </div>
      )}

      {/* Expense Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {allExpense?.expenses && allExpense.expenses.length > 0 ? (
          allExpense.expenses.map((expense) => (
            <div
              key={expense._id}
              className={`${
                expense.expenseCategory === "income"
                  ? "bg-green-50 border-green-400"
                  : expense.expenseCategory === "investment"
                  ? "bg-blue-50 border-blue-400"
                  : "bg-red-50 border-red-400"
              } border-l-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300`}
            >
              <div className="p-6">
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => handleUpdateExpenseDetails(expense._id)}
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
                  >
                    <FaEdit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleExpenseDetails(expense._id)}
                    className="text-gray-600 hover:text-red-600 transition-colors duration-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      className="w-5 h-5"
                    >
                      <path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.7 23.7 0 0 0 -21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0 -16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z" />
                    </svg>
                  </button>
                </div>
                <div className="space-y-2">
                  <div>
                    <strong className="text-gray-700">Description:</strong>{" "}
                    <span className="text-gray-600">{expense.description}</span>
                  </div>
                  <div>
                    <strong className="text-gray-700">Amount:</strong>{" "}
                    <span className="text-gray-600">{expense.amount}</span>
                  </div>
                  <div>
                    <strong className="text-gray-700">Payment Method:</strong>{" "}
                    <span className="text-gray-600">{expense.paymentMethod}</span>
                  </div>
                  <div>
                    <strong className="text-gray-700">Expense Category:</strong>{" "}
                    <span className="text-gray-600">{expense.expenseCategory}</span>
                  </div>
                  <div>
                    <strong className="text-gray-700">Date:</strong>{" "}
                    <span className="text-gray-600">
                      {new Date(expense.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">No expenses found</p>
        )}
      </div>
    </div>
  );
};

export default AllExpenses;