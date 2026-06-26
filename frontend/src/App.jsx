import React, { useState, useCallback } from "react";
import Navbar from "./components/Navbar.jsx";
import RoleSelect from "./components/RoleSelect.jsx";
import StudentPage from "./pages/StudentPage.jsx";
import StaffPage from "./pages/StaffPage.jsx";
import "./App.css";

function App() {
  const [role, setRole] = useState(null); // null | "student" | "staff"
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  }, []);

  const handleBack = () => setRole(null);

  return (
    <div className="app">
      <Navbar />

      <main className="main-content">
        {role === null && <RoleSelect onSelectRole={setRole} />}
        {role === "student" && (
          <StudentPage onBack={handleBack} showToast={showToast} />
        )}
        {role === "staff" && (
          <StaffPage onBack={handleBack} showToast={showToast} />
        )}
      </main>

      {toast && (
        <div className={`toast toast-${toast.type}`}>
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}

export default App;
