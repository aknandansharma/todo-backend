import Note from "../models/notesModel.js";
import User from "../models/userModel.js"

// Add Note
export const addNotes = async (req, res) => {
    const { title, content } = req.body;
    const { user } = req.user;

    if (!title) {
        return res.status(400).json({ error: true, message: "Title is required!" });
    }
    if (!content) {
        return res.status(400).json({ error: true, message: "Content is required!" });
    }
    if (!user) {
        return res.status(400).json({ error: true, message: "User is not authenticated!" });
    }

    try {
        const note = new Note({
            title,
            content,
            userId: user._id,
        });

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note added successfully!"
        });
    } catch (error) {
        console.log("Error in addNotes:", error);
        res.status(500).send({
            error: true,
            message: "Error in creating Tasks.",
            details: error.message
        });
    }
};


// delete note
export const deleteNote = async (req, res) => {
    try {
        const noteId = req.params.noteId;
        const { user } = req.user;

        const note = await Note.findOne({_id: noteId, userId: user._id});

        if(!note) {
            return res.status(404).json({error: true, message: "Note not found"});
        }

        await Note.deleteOne({_id: noteId, userId: user._id});
         return res.json({
            error: false,
            message: "Task is deleted Successfully!."
         })

    } catch (error) {
        console.log("Error in addNotes:", error);
        res.status(500).send({
            error: true,
            message: "Error in Deleting Tasks.",
            details: error.message
        });
    }
}

// Update note
export const updateNote = async (req, res) => {
    try {
        const noteId = req.params.noteId;
        const { title, content, isPinned } = req.body;
        const { user } = req.user;

        if(!title && !content) {
            return res.status(400).json({error: true, message: "No change Provided."})
        }

        const note = await Note.findOne({_id: noteId, userId: user._id});
        if(!note) {
            return res.status(404).json({error: true, message: "Note are not foud."});
        }

        if(title) note.title = title;
        if(content) note.content = content;
        if(isPinned) note.isPinned = isPinned;

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note updated successfully!"
        });

    } catch (error) {
        console.log("Error in addNotes:", error);
        res.status(500).send({
            error: true,
            message: "Error in Update Tasks.",
            details: error.message
        });
    }
}

// Get All note
export const getAllNotes = async (req, res) => {
    try {
        const { user } = req.user;
        if (!user) {
            return res.status(400).json({ error: true, message: "User is not authenticated!" });
        }
        const notes = await Note.find({ userId: user._id }).sort({isPinned: -1});
        if (!notes.length) {
            return res.status(404).json({ error: true, message: "No notes found." });
        }
        return res.json({
            error: false,
            notes,
            message: "Notes retrieved successfully!"
        });

    } catch (error) {
        console.log("Error in getAllNotes:", error);
        res.status(500).send({
            error: true,
            message: "Error in retrieving notes.",
            details: error.message
        });
    }
};

// Get All note
export const pinnedUpdateNote = async (req, res) => {
    try {
        const noteId = req.params.noteId;
        const { isPinned } = req.body;
        const { user } = req.user;
        const note = await Note.findOne({_id: noteId, userId: user._id});
        if(!note) {
            return res.status(404).json({error: true, message: "Note are not foud."});
        }

        note.isPinned = isPinned;

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Pinned Note updated successfully!"
        });

    } catch (error) {
        console.log("Error in getAllNotes:", error);
        res.status(500).send({
            error: true,
            message: "Error in Pinned Note Update notes.",
            details: error.message
        });
    }
};

// Get USER
export const getUser = async (req, res) => {
    try {
        const { user } = req.user;
         const isUser = await User.findOne({_id: user._id});

         if(!isUser) {
            return res.sendStatus(401);
         }

        return res.json({
            user: isUser,
            message: "user find successfully!"
        });

    } catch (error) {
        console.log("Error in getAllNotes:", error);
        res.status(500).send({
            error: true,
            message: "Error in get user notes.",
            details: error.message
        });
    }
};



// Update note status
export const updateNoteStatus = async (req, res) => {
    try {
        const noteId = req.params.noteId;
        const { status } = req.body;
        const { user } = req.user;

        // Check if the status is provided and is valid
        if (!status || !['Todo', 'InProgress', 'Done'].includes(status)) {
            return res.status(400).json({ error: true, message: "Invalid status provided." });
        }

        const note = await Note.findOne({ _id: noteId, userId: user._id });
        if (!note) {
            return res.status(404).json({ error: true, message: "Note not found." });
        }

        // // Check the status transition
        // if (
        //     (note.status === 'Todo' && status !== 'InProgress') ||
        //     (note.status === 'InProgress' && status !== 'Done') ||
        //     (note.status === 'Done')
        // ) {
        //     return res.status(400).json({ error: true, message: "Invalid status transition." });
        // }

        note.status = status;
        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note status updated successfully!"
        });

    } catch (error) {
        console.log("Error in updateNoteStatus:", error);
        res.status(500).send({
            error: true,
            message: "Error in updating note status.",
            details: error.message
        });
    }
};



