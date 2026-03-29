import { useState, useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

export default function ManagerPortal() {
  const { expenses, updateExpense } = useContext(ExpenseContext);

  const [search, setSearch] = useState("");
  const [aiResults, setAiResults] = useState({});

  // 🔍 Safe filter
  const filtered = expenses.filter((req) =>
    (req.employee || "").toLowerCase().includes(search.toLowerCase()) ||
    (req.vendor || "").toLowerCase().includes(search.toLowerCase())
  );

  const pending = expenses.filter((r) => !r.finalStatus).length;
  const approved = expenses.filter((r) => r.finalStatus === "Approved").length;
  const rejected = expenses.filter((r) => r.finalStatus === "Rejected").length;

  // ✅ FIXED (use id instead of index)
  const updateStatus = (id, status) => {
    updateExpense(id, { finalStatus: status });
  };

  // 🧠 AI FUNCTION
  const runAI = (req) => {
    const result =
      Number(req.amount) > 1500
        ? {
            decision: "Reject",
            reason: "Amount exceeds allowed limit",
            risk: "High",
          }
        : {
            decision: "Approve",
            reason: "Within allowed expense range",
            risk: "Low",
          };

    setAiResults((prev) => ({
      ...prev,
      [req.id]: result,
    }));
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Manager Portal</h1>
          <p className="text-sm text-gray-400">Welcome Manager</p>
        </div>

        {/* TITLE */}
        <div>
          <h2 className="text-3xl font-bold">Dashboard</h2>
          <p className="text-gray-400">
            Manage and review employee reimbursements
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white text-black p-6 rounded-2xl">
            <p>Pending</p>
            <h2 className="text-2xl font-bold">{pending}</h2>
          </div>

          <div className="bg-white text-black p-6 rounded-2xl">
            <p>Approved</p>
            <h2 className="text-2xl font-bold">{approved}</h2>
          </div>

          <div className="bg-white text-black p-6 rounded-2xl">
            <p>Rejected</p>
            <h2 className="text-2xl font-bold">{rejected}</h2>
          </div>
        </div>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search employee or vendor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white text-black p-3 rounded-xl"
        />

        {/* MAIN GRID */}
        <div className="grid grid-cols-3 gap-6">

          {/* REQUEST LIST */}
          <div className="col-span-2 bg-white text-black p-6 rounded-2xl">
            <h2 className="text-lg font-semibold mb-4">
              Reimbursement Requests
            </h2>

            {filtered.length === 0 ? (
              <p className="text-gray-500">No requests found</p>
            ) : (
              filtered.map((req) => (
                <div key={req.id} className="border-b py-4 space-y-2">

                  {/* TOP ROW */}
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{req.employee}</p>
                      <p className="text-sm text-gray-500">
                        ₹{req.amount} • {req.vendor}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        !req.finalStatus
                          ? "bg-yellow-200 text-yellow-800"
                          : req.finalStatus === "Approved"
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {req.finalStatus || "Pending"}
                    </span>
                  </div>

                  {/* AI BUTTON */}
                  <button
                    onClick={() => runAI(req)}
                    className="px-3 py-1 bg-black text-white rounded text-sm"
                  >
                    Analyze with AI
                  </button>

                  {/* AI PANEL */}
                  {aiResults[req.id] && (
                    <div className="p-3 bg-gray-100 rounded text-black">
                      <p>
                        🧠 AI Suggestion:
                        <span className="ml-2 font-semibold">
                          {aiResults[req.id].decision}
                        </span>
                      </p>

                      <p className="text-sm text-gray-600">
                        Reason: {aiResults[req.id].reason}
                      </p>

                      <p className="mt-1">
                        {aiResults[req.id].risk === "High"
                          ? "⚠️ High Risk"
                          : "✅ Low Risk"}
                      </p>
                    </div>
                  )}

                  {/* ACTIONS */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateStatus(req.id, "Approved")}
                      className="px-3 py-1 border rounded hover:bg-black hover:text-white"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => updateStatus(req.id, "Rejected")}
                      className="px-3 py-1 border rounded hover:bg-black hover:text-white"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* SIDE PANEL */}
          <div className="bg-white text-black p-6 rounded-2xl space-y-4">
            <h2 className="text-lg font-semibold">Manager Actions</h2>

            <button className="w-full bg-black text-white py-2 rounded-lg">
              Review All Requests
            </button>

            <button className="w-full border py-2 rounded-lg">
              View Analytics
            </button>

            <button className="w-full border py-2 rounded-lg">
              Export Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}