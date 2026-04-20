import { View, Text, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const NewChatHeader = () => {
  const router = useRouter();
  return (
    <View className="flex-row px-5 py-4 bg-surface gap-4 border-b border-b-surface-light items-center">
      <Pressable
        onPress={() => router.back()}
        className="bg-surface-card rounded-full w-10 h-10 items-center justify-center"
      >
        <Ionicons name="close" size={28} color="#F4A261" />
      </Pressable>
      <View>
        <Text className="text-2xl font-semibold text-foreground">New chat</Text>
        <Text className="text-muted-foreground">
          Search for a user to start chatting
        </Text>
      </View>
    </View>
  );
};

export default NewChatHeader;
