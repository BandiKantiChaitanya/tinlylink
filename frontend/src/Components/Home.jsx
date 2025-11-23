import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import CreateLinkModal from "./CreateLinkModal";
import Loader from "./Loader";
import { getLinks, deleteLink } from "../api";
import Swal from 'sweetalert2'
import '../App.css'

export default function Home() {
  const [links, setLinks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Function to fetch all links from backend
  const loadData = async () => {
    setLoading(true);
    try {
      const res = await getLinks();
      setLinks(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

 const handleDelete = async (code) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "This link will be permanently deleted!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    await deleteLink(code);
    loadData();
    Swal.fire("Deleted!", "Your link has been deleted.", "success");
  }
};


  return (
    <>
      {/* Header with modal trigger */}
      <Header onOpen={() => setModalOpen(true)} />

      {/* Main container */}
      <div className="container py-4" style={{ marginTop: "100px" }}>
        <h3 className="mb-3">Your Links</h3>

        {loading ? (
          <Loader />
        ) : links.length === 0 ? (
          <p className="text-muted mt-4">No links created yet.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <thead>
                <tr>
                  <th>Short Code</th>
                  <th>Target URL</th>
                  <th>Total Clicks</th>
                  <th>Last Clicked</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {links.map((link) => (
                  <tr key={link._id}>
                    <td><a href={`${import.meta.env.VITE_BASE_URL}/${link.shortCode}`} target="_blank" rel="noopener noreferrer">
                    {link.shortCode}
                    </a></td>
                    <td className="url-column">
                      <a
                        href={link.originalUrl}
                        target="_blank"
                        rel="noreferrer"
                        title={link.originalUrl}
                      >
                        {link.originalUrl}
                      </a>
                    </td>
                    <td>{link.clicks}</td>
                    <td>{link.lastClicked ? new Date(link.lastClicked).toLocaleString() : "-"}</td>
                    <td>
                      <button
                        className="btn btn-info btn-sm me-2"
                        onClick={() => navigate(`/code/${link.shortCode}`)}
                      >
                        View Stats
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(link.shortCode)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal to create new link */}
      <CreateLinkModal
        show={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={loadData}
      />
    </>
  );
}
