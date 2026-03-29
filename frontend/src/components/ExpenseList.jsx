import React, { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

const ExpenseList = () => {
  const { expenses } = useContext(ExpenseContext);

  return (
    <div className="mt-6">
      <h2 className="text-xl mb-4">My Expenses</h2>

      {expenses.length === 0 ? (
        <p>No expenses yet</p>
      ) : (
        <div className="space-y-4">
          {expenses.map((exp, index) => (
            <div
              key={index}
              className="bg-white text-black p-4 rounded-xl flex justify-between"
            >
              <div>
                <p className="font-medium">{exp.category}</p>
                <p>₹{exp.amount}</p>
                <p className="text-sm text-gray-500">{exp.vendor}</p>
              </div>

              <span>{exp.status}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpenseList;