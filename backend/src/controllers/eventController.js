



import { EVENT_MESSAGES, PROFILE_MESSAGES } from "../contsants/messages.js";
import eventServices from "../services/eventServices.js";
import AppError from "../utils/errorHandler.js";
import {StatusCodes} from "http-status-codes"

export const createEvent=async(req,res)=>{

    const {payload}=req.body

    const result=await eventServices.createEvent(payload);

    res.status(StatusCodes.CREATED).json({success:true,data:result,message:EVENT_MESSAGES.CREATED})
}


export const getEventDetail=async(req,res)=>{

    const id=req.params.id

    if(!id){
        throw new AppError(PROFILE_MESSAGES.ID_MISSING,StatusCodes.BAD_REQUEST)
    }

    const result=await eventServices.getEvent(id)

    res.status(StatusCodes.OK).json({success:true,data:result,message:EVENT_MESSAGES.FETCHED});

}


export const updateEventDetail=async(req,res)=>{

    
    const updateData=req.body

    const id=req.params.id
    if(!id){
        throw new AppError(EVENT_MESSAGES.NOT_FOUND,StatusCodes.BAD_REQUEST)
    }

    const result=await eventServices.updateEvent(id,updateData)

    res.status(StatusCodes.OK).json({success:true,data:result,message:EVENT_MESSAGES.UPDATED})
}