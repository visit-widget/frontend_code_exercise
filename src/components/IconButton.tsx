import { ReactNode } from "react";
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";

interface IconButtonProps {
  disabled?: boolean;
  onPress?: () => void;
  testId?: string;
  children: ReactNode;
  style: StyleProp<ViewStyle>;
}

export const IconButton: React.FC<IconButtonProps> = ({
  disabled,
  onPress,
  testId,
  children,
  style,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[{ opacity: disabled ? 0.2 : 1 }, style]}
      onPress={onPress}
      testID={testId}
    >
      {children}
    </TouchableOpacity>
  );
};
