import AppError from "../utils/errorHandler.js"

import profileServices from "../services/profileServices.js"
import { success } from "zod";
import { PROFILE_MESSAGES } from "../contsants/messages.js";
import { StatusCodes } from "http-status-codes";


export const createProfile= async (req,res)=>{

    const {name}=req.body
    

    const result= await profileServices.create(name);
    
    res.status(StatusCodes.CREATED).json({success:true,data:result,message:PROFILE_MESSAGES.CREATED})

}

export const getProfile=async (req,res)=>{
     const queryText=req.query.q ||"";
     
    const result=await profileServices.getProfile(queryText);

    res.status(StatusCodes.OK).json({success:true,data:result,message:PROFILE_MESSAGES.FETCHED});

}