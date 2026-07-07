import Event from "../models/Event.js";



const createEvent=async(payload)=>{

    const event=await Event.create(payload);

    return event
}


const getEvent=async (profileId)=>{

    const event=await Event.find({profiles:profileId}).populate("profiles","name")

    return event


}

export default {createEvent,getEvent}