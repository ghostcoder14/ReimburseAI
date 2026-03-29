import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ExpenseContext } from "../context/ExpenseContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { expenses } = useContext(ExpenseContext);

  // 🔥 Calculate totals dynamically
  const total = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);
  const pending = expenses
    .filter(e => e.status === "Pending")
    .reduce((sum, e) => sum + Number(e.amount || 0), 0);
  const approved = expenses
    .filter(e => e.status === "Approved")
    .reduce((sum, e) => sum + Number(e.amount || 0), 0);
  const rejected = expenses
    .filter(e => e.status === "Rejected")
    .reduce((sum, e) => sum + Number(e.amount || 0), 0);

  // 🔥 Download CSV
  const downloadReport = () => {
    if (expenses.length === 0) {
      alert("No data to download");
      return;
    }

    const headers = ["Amount", "Vendor", "Category", "Employee", "Status"];

    const rows = expenses.map(e =>
      [
        e.amount,
        e.vendor,
        e.category,
        e.employee || "You",
        e.status
      ].join(",")
    );

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows].join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "expenses_report.csv";
    document.body.appendChild(link);
    link.click();
  };

  const getStatusStyle = (status) => {
    if (status === "Approved") return "bg-green-100 text-green-600";
    if (status === "Pending") return "bg-yellow-100 text-yellow-600";
    return "bg-red-100 text-red-600";
  };

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="text-gray-400">Manage your expenses easily</p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white text-black p-6 rounded-2xl">
          <p>Total Expenses</p>
          <h2 className="text-2xl font-bold">₹{total}</h2>
        </div>

        <div className="bg-white text-black p-6 rounded-2xl">
          <p>Pending</p>
          <h2 className="text-2xl font-bold">₹{pending}</h2>
        </div>

        <div className="bg-white text-black p-6 rounded-2xl">
          <p>Approved</p>
          <h2 className="text-2xl font-bold">₹{approved}</h2>
        </div>

        <div className="bg-white text-black p-6 rounded-2xl">
          <p>Rejected</p>
          <h2 className="text-2xl font-bold">₹{rejected}</h2>
        </div>
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-3 gap-6">

        {/* Recent Expenses */}
        <div className="col-span-2 bg-white text-black p-6 rounded-2xl">
          <h2 className="text-xl font-semibold mb-4">Recent Expenses</h2>

          {expenses.length === 0 ? (
            <p>No expenses yet</p>
          ) : (
            expenses.slice(0, 5).map((exp, i) => (
              <div
                key={i}
                className="flex justify-between items-center border-b py-3"
              >
                <div>
                  <p className="font-medium">{exp.vendor || "N/A"}</p>
                  <p className="text-sm text-gray-500">
                    ₹{exp.amount} • {exp.category}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-sm ${getStatusStyle(
                    exp.status
                  )}`}
                >
                  {exp.status}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white text-black p-6 rounded-2xl">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>

          <div className="space-y-3">

            <button
              onClick={() => navigate("/raise")}
              className="w-full bg-black text-white py-2 rounded-lg"
            >
              + Raise Expense
            </button>

            <button
              onClick={() => navigate("/expenses")}
              className="w-full border py-2 rounded-lg hover:bg-gray-100"
            >
              View All Expenses
            </button>

            <button
              onClick={downloadReport}
              className="w-full border py-2 rounded-lg hover:bg-gray-100"
            >
              Download Report
            </button>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;