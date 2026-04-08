import { Alert, View } from "react-native";
import React, { useState } from "react";
import BrandingSection from "@/components/auth/BrandingSection";
import Input from "@/components/ui/Input";
import PressableButton from "@/components/ui/PressableButton";
import { useRouter } from "expo-router";
import axios from "axios";
import { loginAPI } from "@/lib/api";

const LoginScreen = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<{ email: string; password: string }>(
    {
      email: "",
      password: "",
    },
  );

  const loginHandler = async () => {
    try {
      const res = await axios.post(loginAPI, formData);

      if (res.data.success) {
        Alert.alert(
          "Login Successful",
          res.data.message || "You have logged in successfully!",
          [
            {
              text: "OK",
              onPress: () => {
                router.push("/(tabs)");
              },
            },
          ],
        );
      }
    } catch (error: unknown) {
      const errMsg =
        (error as Error)?.response?.data?.message ||
        "An error occurred while logging in. Please try again.";

      console.log("Error logging in: ", errMsg);
      console.log("Error logging in: ", (error as Error)?.message);
      Alert.alert("Login Failed", errMsg);
    }
  };

  return (
    <View className="flex-1 bg-surface-dark">
      <BrandingSection />

      <View className="py-10 px-6">
        <Input
          placeholder="Email"
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          value={formData.email}
          keyboardType="email-address"
          inputMode="email"
          autoComplete="email"
          textContentType="emailAddress"
        />

        <Input
          placeholder="Password"
          onChangeText={(text) => setFormData({ ...formData, password: text })}
          value={formData.password}
          secureTextEntry
        />

        <PressableButton
          key="submit-login-button"
          name="Login"
          onPress={loginHandler}
        />
      </View>
    </View>
  );
};

export default LoginScreen;
