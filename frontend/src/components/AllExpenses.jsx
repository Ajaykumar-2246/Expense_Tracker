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
    navigate(`/update/${expenseId}`)
  };

  return (
    <div className="flex flex-col gap-2">
      {allExpense?.expenses && allExpense.expenses.length > 0 ? (
        <div className="flex gap-3 items-center justify-center flex-wrap">
          <div>
            <span className="inline-block w-3 h-3 bg-green-400"></span> Income
          </div>
          <div>
            <span className="inline-block w-3 h-3 bg-red-400"></span> Expenses
          </div>
          <div>
            <span className="inline-block w-3 h-3 bg-blue-400"></span>
            Investment
          </div>
        </div>
      ) : null}

      <div className="flex justify-center gap-x-3  flex-wrap">
        {allExpense?.expenses && allExpense.expenses.length > 0 ? (
          allExpense.expenses.map((expense) => (
            <div key={expense._id} className=" mb-4 ">
              <div
                className={`${
                  expense.expenseCategory === "income"
                    ? "bg-green-400"
                    : expense.expenseCategory === "investment"
                    ? "bg-blue-400"
                    : "bg-red-400"
                } min-w-72 min-h-40 py-3 px-4 rounded-md cursor-pointer
               shadow-xl hover:shadow-gray-400
               transform transition-all duration-300 hover:scale-105`}
              >
                <div className="flex gap-3 pb-2 items-center justify-end ">
                  <button
                    onClick={() => handleUpdateExpenseDetails(expense._id)}
                  >
                    <FaEdit />
                  </button>
                  <button onClick={() => handleExpenseDetails(expense._id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      width="13px"
                    >
                      <path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.7 23.7 0 0 0 -21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0 -16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z" />
                    </svg>
                  </button>
                </div>
                <div>
                  <strong>Description:</strong> {expense.description}
                </div>
                <div>
                  <strong>Amount:</strong> {expense.amount}
                </div>
                <div>
                  <strong>Payment Method:</strong> {expense.paymentMethod}
                </div>
                <div>
                  <strong>Expense Category:</strong> {expense.expenseCategory}
                </div>
                <div>
                  <strong>Date:</strong>{" "}
                  {new Date(expense.date).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No expenses found</p>
        )}
      </div>
    </div>
  );
};

export default AllExpenses;
