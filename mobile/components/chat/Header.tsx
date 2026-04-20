import { View, Text, Pressable } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import SearchBar from "./SearchBar";

const Header = () => {
  const router = useRouter();
  return (
    <>
      <View className="px-5 pt-2 pb-4">
        <View className="flex-row items-center justify-between">
          <Text className="text-3xl font-semibold text-foreground">Chats</Text>
          <Pressable
            className="size-8 bg-primary rounded-full items-center justify-center"
            onPress={() => router.push("/(modals)/new-chat")}
          >
            <Ionicons name="add-outline" size={20} color="#0D0D0F" />
          </Pressable>
        </View>
      </View>
      <SearchBar />
    </>
  );
};

export default Header;
