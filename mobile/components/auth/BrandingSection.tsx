import { View, Text } from "react-native";
import React from "react";
import { Image } from "expo-image";

const BrandingSection = () => {
  return (
    <View className="items-center pt-10">
      <Image
        source={require("../../assets/images/logo.png")}
        style={{ width: 120, height: 120 }}
      />
      <Text className="text-4xl font-bold text-primary font-serif tracking-wide uppercase">
        Whisper
      </Text>
    </View>
  );
};

export default BrandingSection;
