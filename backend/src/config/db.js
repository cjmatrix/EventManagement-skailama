
import mongoose from "mongoose"

async function connectDatabase(){
    return await mongoose.connect(process.env.MONGOURL)
}


export default connectDatabase