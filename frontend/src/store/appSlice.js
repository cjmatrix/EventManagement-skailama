import {createSlice} from "@reduxjs/toolkit"


const initialState={
    currentProfile:null
}


const appSlice=createSlice({
    name:"app",
    initialState,
    reducers:{
        setCurrentProfile:(state,actiion)=>{

            state.currentProfile=actiion.payload
        }
    }
})


export const{setCurrentProfile}=appSlice.actions

export default appSlice.reducer