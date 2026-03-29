import React, { createContext, useState } from "react";

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {

  // 🔥 DUMMY DATA
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      amount: 850,
      category: "Food",
      vendor: "Dominos",
      description: "Team lunch",
      date: "2026-03-20",
      employee: "Aakash",
      status: "Pending",
      finalStatus: null,
    },
    {
      id: 2,
      amount: 2200,
      category: "Travel",
      vendor: "Uber",
      description: "Client meeting travel",
      date: "2026-03-21",
      employee: "Sagar",
      status: "Pending",
      finalStatus: null,
    },
    {
      id: 3,
      amount: 500,
      category: "Office",
      vendor: "Stationery Shop",
      description: "Office supplies",
      date: "2026-03-22",
      employee: "Aakash",
      status: "Approved",
      finalStatus: "Approved",
    },
  ]);

  const addExpense = (expense) => {
    setExpenses((prev) => [expense, ...prev]);
  };

  const updateExpense = (id, updatedFields) => {
    setExpenses((prev) =>
      prev.map((exp) =>
        exp.id === id ? { ...exp, ...updatedFields } : exp
      )
    );
  };

  return (
    <ExpenseContext.Provider
      value={{ expenses, addExpense, updateExpense }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};