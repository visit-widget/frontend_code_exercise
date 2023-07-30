import Carousel from "react-native-snap-carousel";
import React, { ForwardedRef } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { TutorialSlideType } from "@constants/types";
import { CarouselItem } from "@components/CarouselItem";

interface CarouselWrapperProps {
  tutorialSlides: Array<TutorialSlideType>;
  setActiveIndex: (idx: number) => void;
  scrollEnabled: boolean;
  ref: React.MutableRefObject<null>;
  onPrompt: (_a?: any, _b?: any, _c?: any) => void;
  onNext: () => void;
}

const { width: viewportWidth, height: viewportHeight } =
  Dimensions.get("window");

export const CarouselWrapper = React.forwardRef(
  (
    {
      tutorialSlides,
      setActiveIndex,
      scrollEnabled,
      onNext,
      onPrompt,
    }: CarouselWrapperProps,
    ref: ForwardedRef<any> // use the ForwardedRef generic here
  ) => {
    const tutorialSlideCount = tutorialSlides.length;

    return (
      <Carousel
        ref={ref}
        data={tutorialSlides}
        renderItem={({ item, index }) => (
          <CarouselItem
            item={item}
            index={index}
            color={item.backgroundColor}
            slidesTotal={tutorialSlideCount}
            onPrompt={onPrompt}
            onNext={onNext}
          />
        )}
        sliderWidth={viewportWidth}
        itemWidth={viewportWidth}
        onSnapToItem={(idx) => {
          setActiveIndex(idx);
        }}
        scrollEnabled={scrollEnabled}
      />
    );
  }
);

const styles = StyleSheet.create({});
