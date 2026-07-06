
import { useQuery } from "@tanstack/react-query";
import { api } from "../api/axios";


export function useGetProfile(){
    
    return useQuery({
        queryKey:["profiles"],
        queryFn:async()=>{
            const response=await api.get("/profiles")
           
            return response.data.data
        }
    })
}