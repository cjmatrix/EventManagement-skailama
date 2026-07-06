import mongoose, { model } from "mongoose";


const profileSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
        trim:true,
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    defaultTimezone:{
        type:String,
        required:[true,"Timezone required"],
        default:"UTC"
    },
},{timestamps:true})


export default mongoose.model("Profile",profileSchema);