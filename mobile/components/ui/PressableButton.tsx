import React from "react";
import {
  Text,
  Pressable,
  PressableProps,
  ActivityIndicator,
} from "react-native";

interface PressableButtonProps extends PressableProps {
  name: string;
  role?: "button" | "link";
  btnType?: "filled" | "outline";
  children?: React.ReactNode;
  isLoading?: boolean;
}

const PressableButton = ({
  onPress,
  children,
  name,
  disabled,
  role = "button",
  btnType = "filled",
  isLoading = false,
  ...rest
}: PressableButtonProps) => {
  return (
    <Pressable
      className={`flex-1 flex-row items-center justify-center gap-2 py-4 rounded-2xl active:scale-[0.97] ${btnType === "filled" ? "bg-white/95" : "bg-white/10 border border-white/20"}`}
      disabled={disabled}
      accessibilityRole={role}
      accessibilityLabel={name}
      onPress={onPress}
      {...rest}
    >
      {children}
      {isLoading && <ActivityIndicator size="small" color="#1a1a1a" />}
      <Text
        className={`${btnType === "filled" ? "text-gray-900" : "text-white"} font-semibold uppercase text-lg`}
      >
        {name}
      </Text>
    </Pressable>
  );
};

export default PressableButton;
