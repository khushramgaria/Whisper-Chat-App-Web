import React from "react";
import { Redirect, Stack } from "expo-router";

const AuthLayout = () => {
  const isSignedIn = false; // TODO: Implement actual sign-in logic

  if (isSignedIn) return <Redirect href={"/(tabs)"} />;

  return <Stack screenOptions={{ headerShown: false }} />;
};

export default AuthLayout;
