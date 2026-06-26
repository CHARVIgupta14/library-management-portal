import React, { useState, useEffect, useCallback } from "react";
import SearchBooks from "../components/SearchBooks.jsx";
import StudentBookTable from "../components/StudentBookTable.jsx";
import { getBooks } from "../services/bookService.js";

function StudentPage({ onBack, showToast }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({ title: "", author: "" });

  const fetchBooks = useCallback(
    async (params = searchParams) => {
      setLoading(true);
      try {
        const response = await getBooks(params);
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
    },
    [searchParams, showToast]
  );

  useEffect(() => {
    fetchBooks({ title: "", author: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (params) => {
    setSearchParams(params);
    fetchBooks(params);
  };

  const handleReset = () => {
    const resetParams = { title: "", author: "" };
    setSearchParams(resetParams);
    fetchBooks(resetParams);
  };

  const handleRefresh = () => {
    fetchBooks(searchParams);
  };

  return (
    <div className="page">
      <button className="btn btn-secondary back-btn" onClick={onBack}>
        ← Back
      </button>
      <h2 className="page-heading">Student Portal</h2>

      <SearchBooks onSearch={handleSearch} onReset={handleReset} />
      <StudentBookTable
        books={books}
        loading={loading}
        onRefresh={handleRefresh}
        showToast={showToast}
      />
    </div>
  );
}

export default StudentPage;
