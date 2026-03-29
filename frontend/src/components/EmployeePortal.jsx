import React from "react";
import Layout from "../components/Layout";
import Dashboard from "../components/Dashboard";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";

const EmployeePortal = () => {
  return (
    <Layout>
      <Dashboard />
      <ExpenseForm />
      <ExpenseList />
    </Layout>
  );
};

export default EmployeePortal;