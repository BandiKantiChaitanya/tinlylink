import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getLinkStats } from "../api";
import Loader from "./Loader";
import Header from "./Header";
import CreateLinkModal from "./CreateLinkModal";

export default function Stats() {
  const { code } = useParams();
  const [data, setData] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getLinkStats(code);
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    fetchData();
  }, [code]);

  




  const fullLink = `${import.meta.env.VITE_BASE_URL}/${code}`;
    
  return (
    <>
    <Header onOpen={() => setModalOpen(true)} />
    
    {
        loading?(
            <div style={{marginTop:'350px'}} >
                <Loader/>
            </div>
        ):data ?(
            <div className="container py-5" style={{marginTop:'70px'}} >
    
      <Link to="/" className="btn btn-secondary mb-4">← Back</Link>

      <div className="card p-4 shadow">
        <h3 className="fw-bold text-primary">{fullLink}</h3>

        <p className="mt-2">
          <strong>Original URL:</strong><br />
          {data.link.originalUrl}
        </p>

        <hr />

        <p><strong>Status:</strong> {data.message}</p>
        <p><strong>Total Clicks:</strong> {data.link.clicks}</p>
        <p><strong>Last Clicked:</strong> {data.link.lastClicked ? new Date(data.link.lastClicked).toLocaleString() : "Never"}</p>
        <p><strong>Created:</strong> {new Date(data.link.createdAt).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}</p>

        <button
          className="btn btn-outline-primary mt-3"
          onClick={() => navigator.clipboard.writeText(fullLink)}
        >
          Copy Short Link
        </button>
      </div>
    </div>
        ):(
             <div style={{marginTop:'350px'}} >
                <p className="text-center mt-5 text-danger">Link not found</p>
             </div>
        )
    }
    <CreateLinkModal
    show={modalOpen}
    onClose={() => setModalOpen(false)}
    onSuccess={()=>{}}
    />
    </>
  );
}
