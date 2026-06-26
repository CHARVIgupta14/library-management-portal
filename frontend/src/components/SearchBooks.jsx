import React, { useState } from "react";

function SearchBooks({ onSearch, onReset }) {
  const [titleSearch, setTitleSearch] = useState("");
  const [authorSearch, setAuthorSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({ title: titleSearch.trim(), author: authorSearch.trim() });
  };

  const handleReset = () => {
    setTitleSearch("");
    setAuthorSearch("");
    onReset();
  };

  const hasQuery = titleSearch.trim() || authorSearch.trim();

  return (
    <section className="card search-card">
      <div className="search-header">
        <span className="search-icon" aria-hidden="true">🔍</span>
        <h2 className="card-title">Find a book</h2>
      </div>

      <form onSubmit={handleSearch} className="search-form">
        <div className="search-field">
          <span className="search-field-icon" aria-hidden="true">📖</span>
          <input
            id="titleSearch"
            type="text"
            value={titleSearch}
            onChange={(e) => setTitleSearch(e.target.value)}
            placeholder="Search by title..."
            className="search-input"
          />
        </div>

        <div className="search-field">
          <span className="search-field-icon" aria-hidden="true">✍️</span>
          <input
            id="authorSearch"
            type="text"
            value={authorSearch}
            onChange={(e) => setAuthorSearch(e.target.value)}
            placeholder="Search by author..."
            className="search-input"
          />
        </div>

        <div className="search-actions">
          <button type="submit" className="btn btn-primary search-btn">
            Search
          </button>
          {hasQuery && (
            <button
              type="button"
              className="btn btn-secondary search-btn"
              onClick={handleReset}
            >
              Reset
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default SearchBooks;
