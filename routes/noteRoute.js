import express from "express"
import { authToken } from "../middlewares/Auth.js";
import { addNotes, deleteNote, updateNote, getAllNotes, pinnedUpdateNote, getUser } from "../controllers/noteController.js";
const router = express.Router();

// // All Routers 
router.post("/add-notes",authToken, addNotes);
router.get("/all-notes",authToken, getAllNotes);
router.get("/get-user",authToken, getUser);
router.delete("/delete-notes/:noteId",authToken, deleteNote);
router.put("/update-notes/:noteId",authToken, updateNote);
router.put("/pinned-update/:noteId",authToken, pinnedUpdateNote);

export default router;
