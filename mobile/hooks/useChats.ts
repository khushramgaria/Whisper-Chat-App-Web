import { getChatsAPI } from "@/lib/api";
import { useAPI } from "@/lib/axios";
import { Chat } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";

export const useChats = () => {
  const router = useRouter();
  const { apiWithAuth } = useAPI();

  return useQuery({
    queryKey: ["chats"],
    queryFn: async () => {
      const result = await apiWithAuth<Chat[]>({
        method: "GET",
        url: getChatsAPI,
      });

      console.log("Result: ", result);

      return result?.data;
    },
  });
};
