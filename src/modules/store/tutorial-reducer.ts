/* NO NEED TO CHANGE THIS FILE */

export const TutorialReducer = (
  state = { isVisible: false },
  action: any
): TutorialReducerState => {
  switch (action.type) {
    case "OPEN_TUTORIAL":
      return {
        ...state,
        isVisible: true,
      };
    default:
      return state;
  }
};

export interface TutorialReducerState {
  isVisible: boolean;
}

export interface RootReducerState {
  tutorial: TutorialReducerState;
}
