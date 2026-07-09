import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/axios";
import toast from "react-hot-toast";
export default function useCreateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const response = await api.post("events/create", { payload });
      return response.data.data;
    },
    onSuccess: () => {
      toast.success("Event is created");
      queryClient.invalidateQueries(["events"]);
    },
    onError: (error) => {
      console.log(error);
      const errorMessage =
        error.response?.data?.message || "Failed to create event.";
      toast.error(errorMessage);
    },
  });
}
