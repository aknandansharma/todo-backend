import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        isPinned: {
            type: Boolean,
            default: false,
        },
        userId: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['Todo', 'InProgress', 'Done'],
            default: 'Todo'
        },
        createdOn: {
            type: Date,
            default: new Date().getTime(),
        },
    },
    { timestamps: true }
);

export default mongoose.model("Note", noteSchema);
