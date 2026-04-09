import React from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";

const SignInSignUpSections = ({
  type = "login",
  children,
  router,
}: {
  type: string;
  children: React.ReactNode;
  router: ReturnType<typeof useRouter>;
}) => {
  return (
    <>
      <View className="mt-6 mb-4">
        <Text className="text-white/50 text-center text-base mt-1">
          {type === "login"
            ? "Sign in to continue to Whisper"
            : "Create an account to get started with Whisper"}
        </Text>
      </View>
      {children}
      {/* Divider */}
      <View className="flex-row items-center my-6">
        <View className="flex-1 h-px bg-white/10" />
        <Text className="text-white/30 mx-4 text-sm">OR</Text>
        <View className="flex-1 h-px bg-white/10" />
      </View>

      {/* redirect */}
      <View className="flex-row justify-center items-center">
        <Text className="text-white/50 text-base">
          {type === "login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
        </Text>
        <Pressable
          onPress={() =>
            type === "login"
              ? router.push("/(auth)/register")
              : router.push("/(auth)/login")
          }
        >
          <Text className="text-primary font-semibold text-base">
            {type === "login" ? "Sign Up" : "Sign In"}
          </Text>
        </Pressable>
      </View>
    </>
  );
};

export default SignInSignUpSections;
