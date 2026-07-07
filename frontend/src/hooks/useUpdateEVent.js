import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { api } from "../api/axios";


export default function useUpdateEvent(){
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn:async({id,data})=>{
            const response =await api.patch(`/events/${id}/update`,data)
            
        },
        onSuccess:(data, variables)=>{
            queryClient.invalidateQueries(["events",variables.eventId])
        }
    })
}