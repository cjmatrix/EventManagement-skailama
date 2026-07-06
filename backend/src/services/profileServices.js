
import Profile from "../models/Profile.js";


const create=async(name)=>{

    const profile =await Profile.create({name});

    return profile
}


const getProfile=async ()=>{
    const profiles=await Profile.find();

    return profiles
}


export default {create, getProfile}