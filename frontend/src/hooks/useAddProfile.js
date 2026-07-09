import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/axios";
import toast from "react-hot-toast";
export function useAddProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body) => {
      await api.post("profiles/create", body);
    },
    onSuccess: () => {
      toast.success("Profile created successfully ");
      queryClient.invalidateQueries({ queryKey: ["profiles"] });


    },
    onError: (error) => {
      console.log(error)
      const errorMessage = error.response?.data?.message || "Failed to create profile.";
      toast.error(errorMessage);
    }
  });
}
