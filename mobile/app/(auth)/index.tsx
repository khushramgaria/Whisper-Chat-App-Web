import React from "react";
import { Dimensions, Text, View } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import PressableButton from "@/components/ui/PressableButton";
import BrandingSection from "@/components/auth/BrandingSection";

const { width, height } = Dimensions.get("window");

const AuthScreen = () => {
  const router = useRouter();
  return (
    <View className="flex-1 bg-surface-dark">
      <View className="absolute inset-0 overflow-hidden"></View>

      {/* Top Section - Branding */}
      <BrandingSection />

      {/* CENTER SECTION - HERO IMG */}
      <View className="flex-1 justify-center items-center px-6">
        <Image
          source={require("../../assets/images/auth.png")}
          style={{
            width: width - 48,
            height: height * 0.3,
          }}
          contentFit="contain"
        />

        {/* Headline */}
        <View className="mt-6 items-center">
          <Text className="text-5xl font-bold text-foreground text-center font-sans">
            Connect & Chat
          </Text>
          <Text className="text-3xl font-bold text-primary font-mono">
            Seamlessly
          </Text>
        </View>

        {/* AUTH BUTTONS */}
        <View className="flex-row gap-4 mt-10">
          {/* Login BTN */}
          <PressableButton
            key="login-button"
            name="Login"
            onPress={() => router.push("/(auth)/login")}
          />

          {/* Register BTN */}
          <PressableButton
            key="register-button"
            name="Register"
            onPress={() => router.push("/(auth)/register")}
            btnType="outline"
          />
        </View>
      </View>
    </View>
  );
};

export default AuthScreen;
