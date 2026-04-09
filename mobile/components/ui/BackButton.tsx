import React from "react";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const BackButton = ({ router }: { router: ReturnType<typeof useRouter> }) => {
  return (
    <Pressable
      className="absolute top-12 left-6 z-10 p-2"
      onPress={() => router.back()}
    >
      <Ionicons name="arrow-back" size={24} color="white" />
    </Pressable>
  );
};

export default BackButton;
