import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center border-b border-gray-700 p-4">

      {/* Left */}
      <h2 className="text-lg font-semibold">ReimburseAI</h2>

      {/* Right */}
      <div className="flex items-center space-x-6 text-sm">

        <Link to="/" className="hover:text-gray-300">Dashboard</Link>
        <Link to="/raise" className="hover:text-gray-300">Raise Expense</Link>
        <Link to="/expenses" className="hover:text-gray-300">My Expenses</Link>

        <Link to="/profile" className="flex items-center space-x-2">
          <span>👤</span>
          <span>Sagar</span>
        </Link>

      </div>
    </div>
  );
};

export default Navbar;