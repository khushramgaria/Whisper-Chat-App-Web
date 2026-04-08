import React, { useState } from "react";
import { Alert, View } from "react-native";
import { useRouter } from "expo-router";
import BrandingSection from "@/components/auth/BrandingSection";
import Input from "@/components/ui/Input";
import PressableButton from "@/components/ui/PressableButton";
import { registerAPI } from "@/lib/api";
import axios from "axios";

const RegisterScreen = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    password: string;
  }>({
    name: "",
    email: "",
    password: "",
  });

  const registerHandler = async () => {
    try {
      const res = await axios.post(registerAPI, formData);

      if (res.data.success) {
        Alert.alert(
          "Register Successful",
          res.data.message || "You have registered successfully!",
          [
            {
              text: "OK",
              onPress: () => {
                router.push("/(auth)/login");
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
          placeholder="Name"
          onChangeText={(text) => setFormData({ ...formData, name: text })}
          value={formData.name}
        />

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
        />

        <PressableButton
          key="submit-register-button"
          name="Register"
          onPress={registerHandler}
        />
      </View>
    </View>
  );
};

export default RegisterScreen;
