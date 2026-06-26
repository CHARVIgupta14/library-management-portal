import React, { useState, useEffect, useCallback } from "react";
import AddBook from "../components/AddBook.jsx";
import BookTable from "../components/BookTable.jsx";
import { getBooks } from "../services/bookService.js";

function StaffPage({ onBack, showToast }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getBooks();
      setBooks(response.data || []);
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to fetch books. Is the backend running?";
      showToast(message, "error");
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleRefresh = () => {
    fetchBooks();
  };

  return (
    <div className="page">
      <button className="btn btn-secondary back-btn" onClick={onBack}>
        ← Back
      </button>
      <h2 className="page-heading">Library Staff Portal</h2>

      <AddBook onBookAdded={handleRefresh} showToast={showToast} />
      <BookTable
        books={books}
        loading={loading}
        onRefresh={handleRefresh}
        showToast={showToast}
      />
    </div>
  );
}

export default StaffPage;
