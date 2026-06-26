import axios from "axios";

const BASE_URL = "http://localhost:8080";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a new book
export const addBook = (book) => {
  return api.post("/api/books", book);
};

// Get / search books with optional title & author query params
export const getBooks = (params = {}) => {
  // Remove empty values so we don't send empty query params
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== "" && v !== null && v !== undefined)
  );
  return api.get("/api/books", { params: cleanParams });
};

// Issue a book by id, with the student's id and name
export const issueBook = (id, stuId, stuName) => {
  return api.put(`/api/books/${id}/${stuId}/${encodeURIComponent(stuName)}/issue`);
};

// Return a book by id
export const returnBook = (id) => {
  return api.put(`/api/books/${id}/return`);
};

// Delete a book by id
export const deleteBook = (id) => {
  return api.delete(`/api/books/${id}/delete`);
};

export default api;
