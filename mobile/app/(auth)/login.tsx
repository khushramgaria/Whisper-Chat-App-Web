import { ActivityIndicator, Alert, Pressable, Text, View } from "react-native";
import React, { useState } from "react";
import BrandingSection from "@/components/auth/BrandingSection";
import Input from "@/components/ui/Input";
import PressableButton from "@/components/ui/PressableButton";
import { useRouter } from "expo-router";
import axios from "axios";
import { loginAPI } from "@/lib/api";
import ButtonGroup from "@/components/ui/ButtonGroup";
import BackButton from "@/components/ui/BackButton";
import SignInSignUpSections from "@/components/ui/SignInSignUpSections";
import { saveToken } from "@/lib/token";
import { useAuth } from "@/context/AuthContext";

const LoginScreen = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState<{ email: string; password: string }>(
    {
      email: "",
      password: "",
    },
  );
  const [loading, setLoading] = useState(false);

  const loginHandler = async () => {
    if (!formData.email || !formData.password) {
      Alert.alert("Missing Fields", "Please enter your email and password.");
      return;
    }
    setLoading(true);
    try {
      await login(formData.email, formData.password);
      router.replace("/(tabs)");
    } catch (error: unknown) {
      const errMsg =
        (error as Error)?.response?.data?.message ||
        "An error occurred while logging in. Please try again.";

      console.log("Error logging in: ", errMsg);
      console.log("Error logging in: ", (error as Error)?.message);
      Alert.alert("Login Failed", errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-surface-dark">
      {/* Back Button */}
      <BackButton router={router} />

      {/* Branding Section */}
      <BrandingSection />

      <View className="flex-1 px-6 mt-4">
        <SignInSignUpSections router={router} type="login">
          {/* Inputs */}
          <Input
            placeholder="Email"
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            value={formData.email}
            keyboardType="email-address"
            inputMode="email"
            autoComplete="email"
            textContentType="emailAddress"
            autoCapitalize="none"
            returnKeyType="next"
          />

          <Input
            placeholder="Password"
            onChangeText={(text) =>
              setFormData({ ...formData, password: text })
            }
            value={formData.password}
            secureTextEntry
            textContentType="password"
            returnKeyType="done"
            onSubmitEditing={loginHandler}
          />

          {/* Forgot Password */}
          <Pressable className="self-end mb-6 -mt-2">
            <Text className="text-primary text-sm">Forgot Password?</Text>
          </Pressable>

          {/* Login Button */}
          <ButtonGroup>
            <PressableButton
              name={loading ? "" : "Login"}
              onPress={loginHandler}
              disabled={loading}
              isLoading={loading}
            />
          </ButtonGroup>
        </SignInSignUpSections>
      </View>
    </View>
  );
};

export default LoginScreen;
