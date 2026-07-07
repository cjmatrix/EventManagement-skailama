


import { success } from "zod";
import eventServices from "../services/eventServices.js";
import AppError from "../utils/errorHandler.js";


export const createEvent=async(req,res)=>{

    const {payload}=req.body

    const result=await eventServices.createEvent(payload);

    res.status(201).json({success:true,data:result,message:"Event created successfully"})
}


export const getEventDetail=async(req,res)=>{

    const id=req.params.id

    if(!id){
        throw new AppError("Profile id is missing",400)
    }

    const result=await eventServices.getEvent(id)

    res.status(200).json({success:true,data:result,message:"Evenet fetched"});

}