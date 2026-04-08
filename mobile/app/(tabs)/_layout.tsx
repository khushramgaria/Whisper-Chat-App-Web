import React from "react";
import { NativeTabs, Icon, Label } from "expo-router/unstable-native-tabs";
import { Redirect } from "expo-router";

const TabsLayout = () => {
  const isSignedIn = true; // TODO: Implement actual sign-in logic

  if (!isSignedIn) return <Redirect href={"/(auth)"} />;

  return (
    <NativeTabs
      labelStyle={{
        fontSize: 12,
        fontWeight: 600,
      }}
      minimizeBehavior="automatic"
      iconColor={{ default: "#1A1A1D", selected: "#F4A261" }}
      backgroundColor="#0D0D0F"
    >
      <NativeTabs.Trigger name="index">
        <Label>Chat</Label>
        <Icon
          sf={{
            default: "bubble.left.and.bubble.right",
            selected: "bubble.left.and.bubble.right.fill",
          }}
          drawable="custom_chats_drawable"
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="profile">
        <Icon
          sf={{
            default: "person",
            selected: "person.fill",
          }}
          drawable="custom_profile_drawable"
        />
        <Label>Profile</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
};

export default TabsLayout;
