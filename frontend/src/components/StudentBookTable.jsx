import React, { useState } from "react";
import { issueBook, returnBook } from "../services/bookService.js";
import IssueModal from "./IssueModal.jsx";

function StudentBookTable({ books, loading, onRefresh, showToast }) {
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [issueBookTarget, setIssueBookTarget] = useState(null);

  const handleConfirmIssue = async (stuId, stuName) => {
    const id = issueBookTarget.bookId;
    setActionLoadingId(id);
    try {
      await issueBook(id, stuId, stuName);
      showToast("Book issued successfully!", "success");
      setIssueBookTarget(null);
      onRefresh();
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to issue book.";
      showToast(message, "error");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleReturn = async (id) => {
    setActionLoadingId(id);
    try {
      await returnBook(id);
      showToast("Book returned successfully!", "success");
      onRefresh();
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to return book.";
      showToast(message, "error");
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <section className="card">
      <h2 className="card-title">Books</h2>

      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading books...</p>
        </div>
      ) : books.length === 0 ? (
        <p className="empty-state">No books found.</p>
      ) : (
        <div className="table-wrapper">
          <table className="book-table">
            <thead>
              <tr>
                <th>Book Name</th>
                <th>Author</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.bookId}>
                  <td>{book.bookName}</td>
                  <td>{book.author}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn btn-success btn-small"
                        onClick={() => setIssueBookTarget(book)}
                        disabled={actionLoadingId === book.bookId}
                      >
                        Issue
                      </button>
                      <button
                        className="btn btn-warning btn-small"
                        onClick={() => handleReturn(book.bookId)}
                        disabled={actionLoadingId === book.bookId}
                      >
                        {actionLoadingId === book.bookId ? "..." : "Return"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {issueBookTarget && (
        <IssueModal
          bookName={issueBookTarget.bookName}
          loading={actionLoadingId === issueBookTarget.bookId}
          onConfirm={handleConfirmIssue}
          onCancel={() => setIssueBookTarget(null)}
        />
      )}
    </section>
  );
}

export default StudentBookTable;
