import React from "react";
import { View, ViewProps } from "react-native";

interface ButtonGroupProps extends ViewProps {
  children: React.ReactNode;
  gap?: number;
}

const ButtonGroup = ({
  children,
  gap = 16,
  style,
  ...rest
}: ButtonGroupProps) => {
  return (
    <View style={[{ flexDirection: "row", gap }, style]} {...rest}>
      {children}
    </View>
  );
};

export default ButtonGroup;
