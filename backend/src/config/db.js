
import mongoose from "mongoose"

async function connectDatabase(){
    return await mongoose.connect(process.env.MONGOURI)
}


export default connectDatabase