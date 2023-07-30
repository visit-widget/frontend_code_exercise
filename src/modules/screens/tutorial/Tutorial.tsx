/* TODO: the coding exercise is refactoring this file as you see fit */
import React, { useRef, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { connect } from "react-redux";
import { TutorialSlideType } from "@constants/types";
import { TutorialModal } from "@src/modules/screens/tutorial/TutorialModal";
import { PaginationWrapper } from "@components/PaginationWrapper";
import { CarouselWrapper } from "@components/CarouselWrapper";
import { SkipButton } from "@components/SkipButton";

interface TutorialProps {
  tutorialSlides: Array<TutorialSlideType>;
  visible: boolean;
  onFirstTutorialSlideNextAction: () => void;
  onPrompt: (_a?: any, _b?: any, _c?: any) => void;
}

const Tutorial: React.FC<TutorialProps> = ({
  tutorialSlides,
  visible,
  onFirstTutorialSlideNextAction,
  onPrompt,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrolling, setScrolling] = useState(false);
  const carouselRef = useRef(null);

  const onNextEvent = () => {
    if (activeIndex === 0) {
      onFirstTutorialSlideNextAction();
    }
    if (!scrolling) {
      setScrolling(true);
      carouselRef.current.snapToItem(activeIndex + 1);
      setActiveIndex((prev) => prev + 1);
      setScrolling(false);
    }
  };
  const onPreviousEvent = () => {
    if (!scrolling) {
      setScrolling(true);
      carouselRef.current.snapToItem(activeIndex - 1);
      setActiveIndex((prev) => prev - 1);
      setScrolling(false);
    }
  };
  return (
    <TutorialModal
      bgColor={tutorialSlides[activeIndex]?.backgroundColor}
      visible={visible}
    >
      <Text style={{ color: "black" }}>"Hello world"</Text>
      <CarouselWrapper
        tutorialSlides={tutorialSlides}
        setActiveIndex={setActiveIndex}
        scrollEnabled={activeIndex !== 0}
        ref={carouselRef}
        onPrompt={onPrompt}
        onNext={onNextEvent}
      />
      <SkipButton
        onPress={() => {
          onPrompt(true, true, true);
        }}
        disabled={activeIndex === 0}
        testID="skip-tutorial-button"
      />
      <PaginationWrapper
        tutorialSlides={tutorialSlides}
        activeIndex={activeIndex}
        onPrevious={onPreviousEvent}
        onNext={onNextEvent}
      />
    </TutorialModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapStateToProps = (state: any) => {
  return {
    visible: state.tutorial.isVisible,
  };
};

export default connect(mapStateToProps)(Tutorial);
