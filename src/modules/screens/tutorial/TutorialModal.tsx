/* TODO: the coding exercise is refactoring this file as you see fit */

import * as Animatable from "react-native-animatable";
import * as color from "@constants/color";
import FullScreenModal from "@src/modules/modal_layout/FullScreenModal";
import { LinearGradient } from "expo-linear-gradient";
import React, { ReactNode, useState } from "react";
import { ColorValue, StyleSheet } from "react-native";

interface TutorialModalProps {
  bgColor: ColorValue;
  visible: boolean;
  children: ReactNode;
}

export const TutorialModal: React.FC<TutorialModalProps> = ({
  bgColor,
  visible,
  children,
}) => {
  return (
    <FullScreenModal
      visible={visible}
      side="bottom"
      style={styles.container}
      duration={250}
    >
      <Animatable.View
        style={[
          {
            flex: 1,
            backgroundColor: bgColor,
          },
        ]}
        transition="backgroundColor"
        duration={300}
      >
        <LinearGradient
          colors={[color.transparent, color.blackAlpha6]}
          locations={[0, 1.0]}
          style={StyleSheet.absoluteFill}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        {children}
      </Animatable.View>
    </FullScreenModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
