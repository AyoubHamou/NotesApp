import Note from "../models/Note.js";

export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({createdAt: -1});
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes");
    res.status(500).json({ message: "internal server error" });
  }
}

export async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.status(200).json(note);
  } catch (error) {
    if (error.name === "CastError") {
        return res.status(400).json({ message: "Invalid note ID" });
      }
    console.error("Error in getNoteById");
    res.status(500).json({ message: "internal server error" });
  }
}

export async function CreateNote(req, res) {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error in createNote");
    res.status(500).json({ message: "internal server error" });
  }
}

export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const updateNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    if (!updateNote) return res.status(404).json({ message: "Note not found" });
    res.status(200).json(updateNote);
  } catch (error) {
    if (error.name === "CastError" && error.kind === "ObjectId") {
        return res.status(400).json({ message: "Invalid note ID" });
      }
    console.error("Error in updateNote");
    res.status(500).json({ message: "internal server error" });
  }
}

export async function deleteNote(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote)
        return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note deleted Successfully" });
  } catch (error) {
    if (error.name === "CastError" && error.kind === "ObjectId") {
        return res.status(400).json({ message: "Invalid note ID" });
      }
    console.error("Error in deleteNote");
    res.status(500).json({ message: "internal server error" });
  }
}
