export type TutorialSlideType = {
  backgroundColor: string;
  buttonLabel?: string;
  description?: string;
  image1xUrl?: string;
  image2xUrl?: string;
  image3xUrl?: string;
  name: string;
  promptForLocationAccess: boolean;
  promptForPushNotifications: boolean;
};

export type TutorialSlidesType = {
  tutorialSlides: Array<TutorialSlideType>;
  visible: boolean;
  onFirstTutorialSlideNextAction: () => void;
  onPrompt: (_a?: any, _b?: any, _c?: any) => void;
};
