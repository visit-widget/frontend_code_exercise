import { copy } from "@constants/strings";
import * as devices from "@constants/devices";
import * as fontSizes from "@constants/fontSizes";
import * as color from "@constants/color";
import currentDevice from "@src/lib/getDevice";
import StyledText from "@src/modules/controls/StyledText";
import { TouchableOpacity, StyleSheet } from "react-native";

interface SkipButtonProps {
  onPress: () => void;
  disabled: boolean;
  testID: string;
}

export const SkipButton: React.FC<SkipButtonProps> = ({
  onPress,
  disabled,
  testID,
}) => {
  return (
    <TouchableOpacity
      style={[styles.skipButton, { opacity: disabled ? 0.2 : 1 }]}
      onPress={onPress}
      disabled={disabled}
      testID={testID}
    >
      <StyledText style={styles.skipButtonText}>{copy.en.skip}</StyledText>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  skipButton: {
    padding: devices.deviceSizes[currentDevice] === devices.SMALL ? 10 : 20,
    position: "absolute",
    top: 20,
    right: 0,
    backgroundColor: color.transparent,
  },
  skipButtonText: {
    fontSize: fontSizes.tutorialSkip[devices.deviceSizes[currentDevice]],
    color: color.white,
  },
});
