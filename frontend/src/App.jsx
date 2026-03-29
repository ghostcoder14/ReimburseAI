import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ManagerPortal from "./components/managerPortal";
import Dashboard from "./components/Dashboard";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Profile from "./components/Profile";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Routes>

        {/* Employee Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="employee" element={<Dashboard />} />
          <Route path="raise" element={<ExpenseForm />} />
          <Route path="expenses" element={<ExpenseList />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* 🔥 Manager OUTSIDE Layout */}
        <Route path="/manager" element={<ManagerPortal />} />

      </Routes>
    </Router>
  );
}

export default App;