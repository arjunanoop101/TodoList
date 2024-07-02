import ErrorHandler from "../middleware/error.js";
import {Task} from "../models/task.js"



export const newTask = async(req,res,next)=>{
    try {
        console.log("Inside new task")
    const {title,description} = req.body

    await Task.create({
        title,description,user:req.user
    });

    res.status(201).json({
        success:true,
        message:"Task added successfuly"
    })
        
    } catch (error) {
        next(error)
    }

}

export const getMyTask = async(req,res,next)=>{
    try {
        const userid = req.user._id
    const tasks = await Task.find({user:userid})
    res.status(200).json({
        success:true,
        tasks,
    })
        
    } catch (error) {
        next(error)
    }
}

export const deleteTask = async(req,res,next)=>{
 try {
    console.log("delete task")
    console.log(req)
    const task  =  await Task.findById(req.params._id)
    console.log(task)
    
    if(!task){
        return next(new ErrorHandler("error",404))
    }
    await task.deleteOne()

    res.status(200).json({
        success:true,
        message:"Taske deleted successfully"
    })
    
 } catch (error) {
        next(error)
 }  
    
} 


export const updateTask = async(req,res,next)=>{
    try {
        const task  =  await Task.findById(req.params.id)
    if(!task){
        return next(new ErrorHandler("Task not found error"))
    }
    task.isCompleted = (!task.isCompleted)
    await task.save()

    res.status(200).json({
        success:true,
        message:"Task updated successfully"
    })
        
    } catch (error) {
        next(error)
    }
}