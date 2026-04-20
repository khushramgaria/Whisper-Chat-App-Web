import { getUsersAPI } from "@/lib/api";
import { useAPI } from "@/lib/axios";
import { User } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";

export const useUsers = () => {
  const router = useRouter();
  const { apiWithAuth } = useAPI();

  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const result = await apiWithAuth<User[]>({
        method: "GET",
        url: getUsersAPI,
      });

      console.log("Result: ", result);

      return result?.data;
    },
  });
};
