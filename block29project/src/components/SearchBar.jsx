import React from "react";

export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div style={{ marginBottom: "1rem" }} className="search">
      <input
        type="text"
        placeholder="Search players by name or breed..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "0.5rem",
          width: "100%",
          maxWidth: "400px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
    </div>
  );
}