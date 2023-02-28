/* NO NEED TO CHANGE THIS FILE */

import React from "react";
import { Button, View } from "react-native";
import Tutorial from "./src/modules/screens/tutorial/Tutorial";
import { Provider, useDispatch } from "react-redux";
import { store } from "./src/modules/store/store";

/**
 * Simple wrapper for setting up the app and providing a button to open the modal
 */
export default function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

const Home = () => {
  const dispatch = useDispatch();
  const handleOpenTutorial = () => {
    dispatch({ type: "OPEN_TUTORIAL" });
  };

  return (
    <>
      <View
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          right: 0,
          top: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button title="Open Tutorial" onPress={handleOpenTutorial} />
      </View>

      <Tutorial
        onFirstTutorialSlideNextAction={() => {}}
        onPrompt={(_a, _b, _c) => {}}
        tutorialSlides={[
          {
            backgroundColor: "#FFFDDD",
            buttonLabel: "First",
            description: "The first slide",
            image1xUrl: "https://via.placeholder.com/300.png",
            image2xUrl: "https://via.placeholder.com/300.png",
            image3xUrl: "https://via.placeholder.com/300.png",
            name: "first",
            promptForLocationAccess: true,
            promptForPushNotifications: true,
          },
          {
            backgroundColor: "#FFF",
            buttonLabel: "Second",
            description: "The second slide",
            image1xUrl: "https://via.placeholder.com/300.png",
            image2xUrl: "https://via.placeholder.com/300.png",
            image3xUrl: "https://via.placeholder.com/300.png",
            name: "second",
            promptForLocationAccess: true,
            promptForPushNotifications: true,
          },
          {
            backgroundColor: "#DDDFFF",
            buttonLabel: "Third",
            description: "The third slide",
            image1xUrl: "https://via.placeholder.com/300.png",
            image2xUrl: "https://via.placeholder.com/300.png",
            image3xUrl: "https://via.placeholder.com/300.png",
            name: "third",
            promptForLocationAccess: true,
            promptForPushNotifications: true,
          },
        ]}
      />
    </>
  );
};
