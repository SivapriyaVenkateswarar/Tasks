import axios from "axios";
import { useMutation } from "@tanstack/react-query";

export function useExtractEmail() {
  return useMutation({
    mutationFn: async ({ model, text }) => {
      const { data } = await axios.post("http://localhost:3000/api/extract-email-details", {
        model,
        text,
      });
      return data;
    },
  });
}
