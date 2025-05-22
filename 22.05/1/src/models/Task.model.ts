import mongoose, { model, Schema, Document } from "mongoose";

export interface ITask {
    title: string,
    completed: boolean,
    createdAt?: Date,
    updatedAt?: Date
}

export interface ITaskDocument extends ITask, Document {}

const taskSchema = new mongoose.Schema<ITaskDocument>({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

export const Task = model<ITaskDocument>('Task', taskSchema)
// export const Task = mongoose.model('Task', taskSchema)