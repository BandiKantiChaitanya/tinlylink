import React, { useState } from "react";
import { createLink } from "../api";

export default function CreateLinkModal({ show, onClose, onSuccess }) {
  const [originalUrl, setUrl] = useState("");
  const [shortCode, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await createLink({ originalUrl, shortCode });
      onSuccess();
      onClose();
      setUrl("");
      setCode("");
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="" style={{ zIndex: "99" }}>
      <div
        className="modal d-block"
        tabIndex="-1"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">Create New Link</h5>
              <button className="btn-close" onClick={onClose}></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                {error && <div className="alert alert-danger">{error}</div>}

                <label>Original URL</label>
                <input
                  type="text"
                  className="form-control mb-3"
                  value={originalUrl}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  required
                />

                <label>Custom Code (6–8 chars)</label>
                <input
                  type="text"
                  className="form-control"
                  value={shortCode}
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button className="btn btn-primary" disabled={loading}>
                  {loading ? "Creating..." : "Create Link"}
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}
