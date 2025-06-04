import React from "react";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage.jsx";
import CreatePage from "./pages/CreatePage.jsx";
import NoteDetailsPage from "./pages/NoteDetailsPage.jsx";

export const App = () => {
  return (
    <div data-theme="sunset" className="min-h-screen bg-base-200">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailsPage />} />
      </Routes>
    </div>
  );
};

export default App;
