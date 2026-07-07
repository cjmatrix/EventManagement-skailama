import { useQuery } from "@tanstack/react-query";
import { api } from "../api/axios";


export function useGetEventDetail(id){

    return useQuery({
        queryKey:["events",id],

        queryFn:async()=>{
            const response=await api.get(`/events/${id}`)
            
            return response.data.data||[]
        },
        enabled:!!id
    })
}