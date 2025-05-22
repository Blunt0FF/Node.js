import { Response, Request } from "express";
import { ITaskDocument, ITask, Task } from "../models/Task.model";

export const getAllTasks = async(req: Request, res: Response) => {
    try {
        const tasks: ITaskDocument[] = await Task.find()
        if(!tasks){
            res.status(404).json({error: "Tasks were not found"})
            return
        }
        res.status(200).json({message: "Tasks were found successfully", tasks})
    } catch (error: any) {
        res.status(500).json({error: error.message})
    }
}

export const addNewTask = async(req: Request, res: Response) => {
    try {
        const {title, completed} = req.body as Partial<ITask> //Partial - делает обязательные поля необязательными
        if(!title){
            res.status(404).json({error: "Title not found"})
            return
        }
        const newTask = await Task.create({title, completed: completed ?? false}) // проверка на undefined (??)
        res.status(201).json({message: "Task created successfully", newTask})
    } catch (error: any) {
        res.status(500).json({error: error.message})
    }
}

export const updateTask = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, completed } = req.body as Partial<ITask>;
        const updated = req.body as Partial<ITask>
        const updateTask : ITaskDocument | null = await Task.findByIdAndUpdate(id,
        updated, {new:true})
        if(!updateTask){
            res.status(404).json({error: "Task not found"})
            return
        }
        res.status(200).json({message: "Task updated successfully", updateTask})
    } catch (error: any) {
        res.status(500).json({error: error.message})
    }
}

export const deleteTask = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedTask : ITaskDocument | null = await Task.findByIdAndDelete(id)
        if(!deletedTask){
            res.status(404).json({error: "Task not found"})
            return
        }
        res.status(200).json({message: "Task deleted successfully", deletedTask})
    } catch (error: any) {
        res.status(500).json({error: error.message})
    }
}