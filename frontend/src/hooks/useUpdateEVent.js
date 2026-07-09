import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { api } from "../api/axios";
import toast from "react-hot-toast";

export default function useUpdateEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await api.patch(`/events/${id}/update`, data);
    },
    onSuccess: (data, variables) => {
      toast.success("Event is updated");
      queryClient.invalidateQueries(["events", variables.eventId]);
    },
    onError: (error) => {
      console.log(error);
      const errorMessage =
        error.response?.data?.message || "Failed to update event.";
      toast.error(errorMessage);
    },
  });
}
