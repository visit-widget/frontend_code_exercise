import React from "react";
import { StyleSheet } from "react-native";
import TutorialSlide, {
  TutorialSlideProps,
} from "@src/modules/screens/tutorial/TutorialSlide";

interface CarouselItemProps {
  item: TutorialSlideProps;
  index: number;
  color: string;
  slidesTotal: number;
  onPrompt: (_a?: any, _b?: any, _c?: any) => void;
  onNext: () => void;
}

export const CarouselItem: React.FC<CarouselItemProps> = ({
  item,
  index,
  color,
  slidesTotal,
  onPrompt,
  onNext,
}) => {
  return (
    <TutorialSlide
      buttonLabel={item.buttonLabel}
      color={color}
      description={item.description}
      image1xUrl={item.image1xUrl}
      image2xUrl={item.image2xUrl}
      image3xUrl={item.image3xUrl}
      index={index}
      shouldClose={index === slidesTotal}
      name={item.name}
      promptForLocationAccess={item.promptForLocationAccess}
      promptForPushNotifications={item.promptForPushNotifications}
      onPrompt={onPrompt}
      onNext={onNext}
      showConsentText={index === 0}
    />
  );
};

const styles = StyleSheet.create({});
