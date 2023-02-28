/* NO NEED TO CHANGE THIS FILE */

import React, { FunctionComponent } from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";

const TutorialSlide: FunctionComponent<TutorialSlideProps> = ({
  color,
  description,
  image1xUrl,
  image2xUrl,
  image3xUrl,
  buttonLabel,
  onPrompt,
  promptForLocationAccess,
  promptForPushNotifications,
}) => {
  const handlePress = () => {
    onPrompt(promptForLocationAccess, promptForPushNotifications);
  };

  return (
    <View style={{ backgroundColor: color, margin: 24, padding: 16 }}>
      <View style={{ marginBottom: 16 }}>
        <Text>{description}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <Image source={{ uri: image1xUrl }} style={styles.image} />
        <Image source={{ uri: image2xUrl }} style={styles.image} />
        <Image source={{ uri: image3xUrl }} style={styles.image} />
      </View>
      <View style={{ marginBottom: 16 }}>
        <Button onPress={handlePress} title={buttonLabel} />
      </View>
    </View>
  );
};

interface TutorialSlideProps {
  buttonLabel: string;
  color: string;
  description: string;
  image1xUrl: string;
  image2xUrl: string;
  image3xUrl: string;
  index: number;
  shouldClose: boolean;
  name: string;
  promptForLocationAccess: boolean;
  promptForPushNotifications: boolean;
  onPrompt: (
    promptForLocationAccess: boolean,
    promptForPushNotifications: boolean
  ) => void;
  onNext: () => void;
  showConsentText: boolean;
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
});

export default TutorialSlide;
