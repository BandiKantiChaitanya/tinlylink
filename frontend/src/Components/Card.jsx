import React from "react";
import { Link, Links } from "react-router-dom";

export default function Card({ link, onDelete }) {
  const fullShort = `bitly/${link.shortCode}`;
  const API_URL=import.meta.env.VITE_BASE_URL
  return (
    <div className="card shadow-sm p-3">
      <h5 className="fw-bold text-primary">
        {fullShort}
        <button
          className="btn btn-sm btn-outline-secondary ms-2"
          onClick={() => navigator.clipboard.writeText(`${API_URL}/${link.shortCode}`)}
        >
          Copy
        </button>
      </h5>

      <p className="text-muted" style={{ fontSize: "14px" }}>
        <strong>Original Url:</strong>{link.originalUrl.length > 40
          ? link.originalUrl.slice(0, 40) + "..."
          : link.originalUrl}
      </p>

      <div className="mb-2">
        <span className="me-3">📈 {link.clicks} clicks</span>
        <span>🕒{link.lastClicked ? new Date(link.lastClicked).toLocaleString() : "Never"}</span>
      </div>

      <div className="mb-2">
        <span>Created At : { new Date(link.createdAt).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }) } </span>
      </div>

      <div>
        <Link to={`/code/${link.shortCode}`} className="btn btn-sm btn-info me-2">
          View Status
        </Link>

        <button
          className="btn btn-sm btn-danger"
          onClick={() => onDelete(link.shortCode)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
