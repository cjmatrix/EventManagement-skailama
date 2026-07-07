



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


export const updateEventDetail=async(req,res)=>{

    
    const updateData=req.body

    const id=req.params.id
    if(!id){
        throw new AppError("Eventid is not found")
    }

    const result=await eventServices.updateEvent(id,updateData)

    res.status(200).json({success:true,data:result,message:"Event successfully updated"})
}