import { COPY } from "@constants/strings";
import * as DEVICES from "@constants/devices";
import * as FONTSIZE from "@constants/fontSizes";
import * as COLOR from "@constants/color";
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
      <StyledText style={styles.skipButtonText}>{COPY.en.skip}</StyledText>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  skipButton: {
    padding: DEVICES.deviceSizes[currentDevice] === DEVICES.SMALL ? 10 : 20,
    position: "absolute",
    top: 20,
    right: 0,
    backgroundColor: COLOR.transparent,
  },
  skipButtonText: {
    fontSize: FONTSIZE.tutorialSkip[DEVICES.deviceSizes[currentDevice]],
    color: COLOR.white,
  },
});
