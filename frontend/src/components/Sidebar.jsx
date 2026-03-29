import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-white text-black p-5">
      <h1 className="text-xl font-bold mb-6">ReimburseAI</h1>

      <ul className="space-y-4">
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/raise">Raise Expense</Link></li>
        <li><Link to="/expenses">My Expenses</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;