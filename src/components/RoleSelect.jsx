import React from "react";

function RoleSelect({ onSelectRole }) {
  return (
    <div className="role-select">
      <h2 className="role-select-title">Who are you?</h2>
      <p className="role-select-subtitle">Choose your role to continue</p>

      <div className="role-cards">
        <button
          className="role-card"
          onClick={() => onSelectRole("student")}
        >
          <span className="role-icon" aria-hidden="true">🎓</span>
          <span className="role-label">Student</span>
          <span className="role-desc">Search books, issue or return</span>
        </button>

        <button
          className="role-card"
          onClick={() => onSelectRole("staff")}
        >
          <span className="role-icon" aria-hidden="true">🗂️</span>
          <span className="role-label">Library Staff</span>
          <span className="role-desc">Add and manage books</span>
        </button>
      </div>
    </div>
  );
}

export default RoleSelect;
