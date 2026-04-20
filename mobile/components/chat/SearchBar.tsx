import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  return (
    <View className="pt-3 pb-2 bg-surface">
      <View className="flex-row items-center bg-surface-card rounded-full px-3 py-1.5 gap-2 border border-surface-light">
        <Ionicons name="search" size={18} color="#6B6B70" />
        <TextInput
          placeholder="Search User"
          placeholderTextColor="#6B6B70"
          className="flex-1 text-foreground text-sm"
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
        />
      </View>
    </View>
  );
};

export default SearchBar;
