import mongoose from "mongoose";
import { User } from "./user.js";

const schema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    isCompleted:{
        type:Boolean,
        default:false
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        reference:User,
        required:true
    }
})

export const Task = mongoose.model("Task",schema)