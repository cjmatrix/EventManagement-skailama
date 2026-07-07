
import { useQuery } from "@tanstack/react-query";
import { api } from "../api/axios";


export function useGetProfile(queryText){
    
    return useQuery({
        queryKey:["profiles",queryText],
        queryFn:async()=>{
            const response=await api.get(`/profiles?q=${queryText}`)
           
            return response.data.data
        }
    })
}