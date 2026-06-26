import React, { useState } from "react";

function IssueModal({ bookName, onConfirm, onCancel, loading }) {
  const [stuId, setStuId] = useState("");
  const [stuName, setStuName] = useState("");
  const [error, setError] = useState("");

  const handleConfirm = () => {
    if (!stuId.trim() || !stuName.trim()) {
      setError("Both student ID and student name are required");
      return;
    }
    onConfirm(stuId.trim(), stuName.trim());
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-icon">📖</div>
        <h3 className="modal-title">Issue this book</h3>
        <p className="modal-subtitle">{bookName}</p>

        <div className="modal-field">
          <label htmlFor="modal-stu-id">Student ID</label>
          <input
            id="modal-stu-id"
            type="text"
            value={stuId}
            onChange={(e) => {
              setStuId(e.target.value);
              setError("");
            }}
            
            className="input"
            autoFocus
          />
        </div>

        <div className="modal-field">
          <label htmlFor="modal-stu-name">Student name</label>
          <input
            id="modal-stu-name"
            type="text"
            value={stuName}
            onChange={(e) => {
              setStuName(e.target.value);
              setError("");
            }}
            
            className="input"
          />
        </div>

        {error && <p className="error-text modal-error">{error}</p>}

        <div className="modal-actions">
          <button
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? "Issuing..." : "Issue book"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default IssueModal;
