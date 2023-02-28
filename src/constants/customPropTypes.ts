/* NO NEED TO CHANGE THIS FILE */

import PropTypes from "prop-types";

export const tutorialSlide = PropTypes.shape({
  backgroundColor: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string,
  description: PropTypes.string,
  image1xUrl: PropTypes.string,
  image2xUrl: PropTypes.string,
  image3xUrl: PropTypes.string,
  name: PropTypes.string.isRequired,
  promptForLocationAccess: PropTypes.bool.isRequired,
  promptForPushNotifications: PropTypes.bool.isRequired,
});
