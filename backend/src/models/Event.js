
import mongoose from "mongoose";


const updateLogSchema = new mongoose.Schema(
  {
    previousData:{
      type: mongoose.Schema.Types.Mixed,
    },
    newData:{
      type:mongoose.Schema.Types.Mixed,
    },
  },
  {timestamps:true}
);




const eventsSchema=new mongoose.Schema({
    profiles:[
        {type:mongoose.Schema.Types.ObjectId,
        ref:"Profile"
        }
    ],
    startTime:{
        type:Date,
        required:[true,"start time is required"]
    },
    endTime: {
      type: Date,
      required: [true, 'End time is required'],
    },
    timezone: {
      type: String,
      required: [true, 'Event timezone is required'],
    },
    updateLogs:[updateLogSchema]
},{timestamps:true})

eventsSchema.index({ profiles:1});


export default mongoose.model("Event",eventsSchema)