import { useMutation,useQueryClient} from "@tanstack/react-query";
import { api } from "../api/axios";

export default function useCreateEvent(){
    const queryClient=useQueryClient();

    return useMutation({
        mutationFn:async(payload)=>{
            const response=await api.post("events/create",{payload})
            return response.data.data
        },
        onSuccess:()=>{
            queryClient.invalidateQueries(["events"])
        }
        
    })
}


