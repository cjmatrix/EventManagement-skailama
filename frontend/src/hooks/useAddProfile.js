import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/axios";

export function useAddProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body) => {
      await api.post("profiles/create", body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
    },
  });
}
