import { useEffect } from "react";
import { useState } from "react";



export default function useCustomDebounceHook(input){
    const [finalInput,setFinalInput]=useState('')


    useEffect(()=>{

       let id= setTimeout(()=>{

            setFinalInput(input)
        },500)

        return ()=>clearTimeout(id)

    },[input])

    return {finalInput}

}