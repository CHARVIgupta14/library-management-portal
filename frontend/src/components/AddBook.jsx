import React, { useState } from "react";
import { addBook } from "../services/bookService.js";

function AddBook({ onBookAdded, showToast }) {
  const [formData, setFormData] = useState({ title: "", author: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.author.trim()) newErrors.author = "Author is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await addBook({
        title: formData.title.trim(),
        author: formData.author.trim(),
      });
      setFormData({ title: "", author: "" });
      setErrors({});
      showToast("Book added successfully!", "success");
      if (onBookAdded) onBookAdded();
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to add book. Please try again.";
      showToast(message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card">
      <h2 className="card-title">Add New Book</h2>
      <form onSubmit={handleSubmit} className="form" noValidate>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter book title"
              className={errors.title ? "input error" : "input"}
            />
            {errors.title && <span className="error-text">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input
              id="author"
              name="author"
              type="text"
              value={formData.author}
              onChange={handleChange}
              placeholder="Enter author name"
              className={errors.author ? "input error" : "input"}
            />
            {errors.author && <span className="error-text">{errors.author}</span>}
          </div>

          <div className="form-group form-group-button">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Adding..." : "Add Book"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

export default AddBook;
