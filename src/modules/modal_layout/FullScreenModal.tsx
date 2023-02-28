/* NO NEED TO CHANGE THIS FILE */

import React, { FunctionComponent, ReactNode } from "react";
import { View } from "react-native";
import type { ViewStyle } from "react-native";

/**
 * Faux modal, is not animated as props would suggest. Also, I am guessing the modal would have a close button but kept out of scope
 */
const FullScreenModal: FunctionComponent<FullScreenModalProps> = ({
  children,
  style,
  visible,
}) => {
  if (!visible) {
    return <></>;
  }
  return <View style={style}>{children}</View>;
};

interface FullScreenModalProps {
  visible: boolean;
  side: "bottom" | "top";
  style: ViewStyle;
  duration: number;
  children?: ReactNode;
}

export default FullScreenModal;
