import React, { useState } from "react";
import { issueBook, returnBook, deleteBook } from "../services/bookService.js";
import IssueModal from "./IssueModal.jsx";

function formatDate(dateStr) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleString();
}

function BookTable({ books, loading, onRefresh, showToast }) {
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [issueBookTarget, setIssueBookTarget] = useState(null); // the book object being issued

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

  const handleDeleteClick = (id) => {
    setConfirmDeleteId(id);
  };

  const handleConfirmDelete = async (id) => {
    setActionLoadingId(id);
    try {
      await deleteBook(id);
      showToast("Book deleted successfully!", "success");
      onRefresh();
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to delete book.";
      showToast(message, "error");
    } finally {
      setActionLoadingId(null);
      setConfirmDeleteId(null);
    }
  };

  const handleCancelDelete = () => {
    setConfirmDeleteId(null);
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
                <th>Book ID</th>
                <th>Book Name</th>
                <th>Author</th>
                <th>Status</th>
                <th>Student ID</th>
                <th>Student Name</th>
                <th>Date Added</th>
                <th>Last Modified</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.bookId}>
                  <td>{book.bookId}</td>
                  <td>{book.bookName}</td>
                  <td>{book.author}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        book.issued ? "status-issued" : "status-available"
                      }`}
                    >
                      {book.issued ? "Issued" : "Available"}
                    </span>
                  </td>
                  <td>{book.issued ? (book.stuId ?? "-") : "-"}</td>
                  <td>{book.issued ? (book.stuName || "-") : "-"}</td>
                  <td>{formatDate(book.dateAdded)}</td>
                  <td>{formatDate(book.lastModified)}</td>
                  <td>
                    <div className="action-buttons">
                      {confirmDeleteId === book.bookId ? (
                        <div className="confirm-box">
                          <span>Delete this book?</span>
                          <button
                            className="btn btn-danger btn-small"
                            onClick={() => handleConfirmDelete(book.bookId)}
                            disabled={actionLoadingId === book.bookId}
                          >
                            Yes
                          </button>
                          <button
                            className="btn btn-secondary btn-small"
                            onClick={handleCancelDelete}
                          >
                            No
                          </button>
                        </div>
                      ) : (
                        <>
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
                          <button
                            className="btn btn-danger btn-small"
                            onClick={() => handleDeleteClick(book.bookId)}
                            disabled={actionLoadingId === book.bookId}
                          >
                            Delete
                          </button>
                        </>
                      )}
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

export default BookTable;
