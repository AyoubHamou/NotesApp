import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import NoteCard from "../components/NoteCard.jsx";
import RateLimitedUI from "../components/RateLimited.jsx";
import NotesNotFound from "../components/NotesNotFound.jsx"
import toast from "react-hot-toast";
import api from "../lib/axios.js";

export const HomePage = () => {
  const [isRatelimited, SetisRatelimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [isloading, setisloading] = useState(true);
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        setNotes(res.data);
        SetisRatelimited(false);
      } catch (error) {
        console.log("Error` while fetching notes", error);
        if (error.response?.status === 429) SetisRatelimited(true);
        else toast.error("Failed to load notes");
      } finally {
        setisloading(false);
      }
    };
    fetchNotes();
  }, []);
  return (
    <div className="min-h-screen">
      <Navbar />
      {isRatelimited && <RateLimitedUI />}
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {isloading && <div className="text-center text-primary py-10">Loading notes...</div>}
        {notes.length === 0 && !isRatelimited && <NotesNotFound />}
        {notes.length > 0 && !isRatelimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default HomePage;
