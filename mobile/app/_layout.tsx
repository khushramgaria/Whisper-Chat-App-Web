import { Stack } from "expo-router";
import "../global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <SafeAreaView style={{ flex: 1 }} edges={["top"]}> */}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(auth)" />
      </Stack>
      {/* </SafeAreaView> */}
    </QueryClientProvider>
  );
}
