import { ReactNode } from "react";
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";

interface IconButtonProps {
  disabled?: boolean;
  onPress?: () => void;
  testID?: string;
  children: ReactNode;
  style: StyleProp<ViewStyle>;
}

export const IconButton: React.FC<IconButtonProps> = ({
  disabled,
  onPress,
  testID,
  children,
  style,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[{ opacity: disabled ? 0.2 : 1 }, style]}
      onPress={onPress}
      testID={testID}
    >
      {children}
    </TouchableOpacity>
  );
};
