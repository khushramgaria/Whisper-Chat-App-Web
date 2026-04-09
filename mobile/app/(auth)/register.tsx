import React, { useState } from "react";
import { ActivityIndicator, Alert, View } from "react-native";
import { useRouter } from "expo-router";
import BrandingSection from "@/components/auth/BrandingSection";
import Input from "@/components/ui/Input";
import PressableButton from "@/components/ui/PressableButton";
import { registerAPI } from "@/lib/api";
import axios from "axios";
import BackButton from "@/components/ui/BackButton";
import SignInSignUpSections from "@/components/ui/SignInSignUpSections";
import ButtonGroup from "@/components/ui/ButtonGroup";

const RegisterScreen = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
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
        <SignInSignUpSections type="register" router={router}>
          <Input
            placeholder="Name"
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            value={formData.name}
            returnKeyType="next"
          />

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
            onSubmitEditing={registerHandler}
          />

          <ButtonGroup>
            <PressableButton
              key="submit-register-button"
              name={loading ? "" : "Register"}
              onPress={registerHandler}
              disabled={loading}
              isLoading={loading}
            />
          </ButtonGroup>
        </SignInSignUpSections>
      </View>
    </View>
  );
};

export default RegisterScreen;
