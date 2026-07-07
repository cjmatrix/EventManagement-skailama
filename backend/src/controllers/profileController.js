import AppError from "../utils/errorHandler.js"

import profileServices from "../services/profileServices.js"
import { success } from "zod";


export const createProfile= async (req,res)=>{

    const {name}=req.body
   

    const result= await profileServices.create(name);
    
    res.status(201).json({success:true,data:result,message:"Profile successfully created"})

}

export const getProfile=async (req,res)=>{
     const queryText=req.query.q ||"";
     
    const result=await profileServices.getProfile(queryText);

    res.status(200).json({success:true,data:result,message:"profile fetched"});

}