import { Pagination } from "react-native-snap-carousel";
import * as color from "../constants/color";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { TutorialSlideType } from "@constants/types";
import { ChevronLeft } from "@src/svgs/ChevronLeft";
import { ChevronRight } from "@src/svgs/ChevronRight";
import { IconButton } from "@components/IconButton";

interface PaginationWrapperProps {
  tutorialSlides: Array<TutorialSlideType>;
  activeIndex: number;
  onPrevious: () => void;
  onNext: () => void;
}

export const PaginationWrapper: React.FC<PaginationWrapperProps> = ({
  tutorialSlides,
  activeIndex,
  onPrevious,
  onNext,
}) => {
  const tutorialSlideCount = tutorialSlides.length;
  const dotHorizontalMargin = 2.5;
  const maxAllowed = Math.floor(
    (viewportWidth - 120 - 20) / (dotWidth + 8 * 2 + 2 * dotHorizontalMargin)
  );
  let dotsLength =
    maxAllowed < tutorialSlideCount ? maxAllowed : tutorialSlideCount;
  const activeDotIndex = activeIndex % dotsLength;
  return (
    <View style={styles.bottomContainer} pointerEvents="box-none">
      <IconButton
        testID="left-arrow"
        disabled={activeIndex === 0}
        onPress={onPrevious}
        style={styles.arrowContainer}
      >
        <ChevronLeft />
      </IconButton>
      <View style={styles.paginationContainer} pointerEvents="none">
        <Pagination
          dotContainerStyle={styles.dotContainerStyle}
          activeDotIndex={activeDotIndex}
          dotsLength={dotsLength}
          dotColor={color.white}
          inactiveDotColor={color.white}
          inactiveDotScale={1}
          inactiveDotOpacity={0.3}
          dotStyle={styles.dot}
        />
      </View>
      <IconButton
        disabled={activeIndex === tutorialSlideCount - 1}
        testID="right-arrow"
        onPress={onNext}
        style={styles.arrowContainer}
      >
        <ChevronRight />
      </IconButton>
    </View>
  );
};

const { width: viewportWidth, height: viewportHeight } =
  Dimensions.get("window");

const isHeightSimilarToiPhoneOrSmaller = viewportHeight < 600;

const dotWidth = 10;

const styles = StyleSheet.create({
  bottomContainer: {
    height: viewportHeight * 0.1,
    width: viewportWidth,
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  dotContainerStyle: {
    width: dotWidth + 10,
  },
  paginationContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: color.transparent,
  },
  dot: {
    width: dotWidth,
    height: dotWidth,
    borderRadius: dotWidth / 2,
    marginTop: isHeightSimilarToiPhoneOrSmaller ? 60 : 2.5,
  },
  arrowContainer: {
    paddingHorizontal: 22,
    backgroundColor: "red",
  },
});
