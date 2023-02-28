/* TODO: the coding exercise is refactoring this file as you see fit */

import * as Animatable from "react-native-animatable";
import * as color from "../../../constants/color";
import * as devices from "../../../constants/devices";
import * as fontSizes from "../../../constants/fontSizes";
import * as customPropTypes from "../../../constants/customPropTypes";
import Carousel, { Pagination } from "react-native-snap-carousel";
import FullScreenModal from "../../modal_layout/FullScreenModal";
import { LinearGradient } from "expo-linear-gradient";
import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import StyledText from "../../controls/StyledText";
import TutorialSlide from "./TutorialSlide";
import currentDevice from "../../../lib/getDevice";
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { connect } from "react-redux";

const { width: viewportWidth, height: viewportHeight } =
  Dimensions.get("window");

const dotWidth = 10;
const dotHorizontalMargin = 2.5;
const isHeightSimilarToiPhoneOrSmaller = viewportHeight < 600;

const styles = StyleSheet.create({
  container: {
    height: viewportHeight,
  },
  skipButton: {
    padding: devices.deviceSizes[currentDevice] === devices.SMALL ? 10 : 20,
    position: "absolute",
    top: 20,
    right: 0,
    backgroundColor: color.transparent,
  },
  skipButtonText: {
    fontSize: fontSizes.tutorialSkip[devices.deviceSizes[currentDevice]],
    color: color.white,
  },
  bottomContainer: {
    height: viewportHeight * 0.1,
    width: viewportWidth,
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  arrowPlaceHolder: {
    width: 60,
  },
  arrowContainer: {
    paddingHorizontal: 22,
    backgroundColor: "red",
  },
  arrow: {
    width: 16,
    height: 40,
  },
  leftArrow: {
    transform: [{ rotate: "180deg" }],
  },
  dot: {
    width: dotWidth,
    height: dotWidth,
    borderRadius: dotWidth / 2,
    marginTop: isHeightSimilarToiPhoneOrSmaller ? 60 : 2.5,
  },
  paginationContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: color.transparent,
  },
  dotContainerStyle: {
    width: dotWidth + 10,
  },
});

const strings = {
  skip: "Skip",
};

const images = {
  arrow: require("../../../../assets/images/arrow-right-white-big.png"),
};

const gradientColors = [color.transparent, color.blackAlpha6];
const gradientLocations = [0, 1.0];
const gradientStart = { x: 0.5, y: 0 };
const gradientEnd = { x: 1, y: 1 };

export class Tutorial extends PureComponent {
  static propTypes = {
    tutorialSlides: PropTypes.arrayOf(customPropTypes.tutorialSlide).isRequired,
    visible: PropTypes.bool.isRequired,
    onFirstTutorialSlideNextAction: PropTypes.func.isRequired,
    onPrompt: PropTypes.func.isRequired,
  };

  static defaultProps = {
    tutorialSlides: [],
    visible: false,
  };

  state = {
    activeIndex: 0,
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.visible && !nextProps.visible) {
      this._refs.carousel.snapToItem(0);
    }
  }

  _scrolling = false;

  _refs = {};

  _setCarouselRef = (r) => (this._refs.carousel = r);

  _stoppedScrolling = () => (this._scrolling = false);

  _setActiveIndex = (activeIndex) => {
    if (activeIndex === this.state.activeIndex + 1) {
      this.props.onPrompt(
        this.props.tutorialSlides[this.state.activeIndex]
          .promptForLocationAccess,
        this.props.tutorialSlides[this.state.activeIndex]
          .promptForPushNotifications
      );
    }
    this.setState({ activeIndex }, this._stoppedScrolling);
  };

  _onPrevious = () => {
    if (!this._scrolling) {
      this._scrolling = true;
      this._refs.carousel.snapToItem(this.state.activeIndex - 1);
      this._setActiveIndex(this.state.activeIndex - 1);
    }
  };

  _onNext = () => {
    if (this.state.activeIndex === 0) {
      this.props.onFirstTutorialSlideNextAction();
    }
    if (!this._scrolling) {
      this._scrolling = true;
      this._refs.carousel.snapToItem(this.state.activeIndex + 1);
      this._setActiveIndex(this.state.activeIndex + 1);
    }
  };

  _onSkipTutorial = () => this.props.onPrompt(true, true, true);

  _renderItem = ({ item, index }) => (
    <TutorialSlide
      buttonLabel={item.buttonLabel}
      color={item.backgroundColor}
      description={item.description}
      image1xUrl={item.image1xUrl}
      image2xUrl={item.image2xUrl}
      image3xUrl={item.image3xUrl}
      index={index}
      shouldClose={index === this.props.tutorialSlides.length - 1}
      name={item.name}
      promptForLocationAccess={item.promptForLocationAccess}
      promptForPushNotifications={item.promptForPushNotifications}
      onPrompt={this.props.onPrompt}
      onNext={this._onNext}
      showConsentText={index === 0}
    />
  );

  _renderSkipButton = () => (
    <TouchableOpacity
      style={styles.skipButton}
      onPress={this._onSkipTutorial}
      testID="skip-tutorial-button"
    >
      <StyledText style={styles.skipButtonText}>{strings.skip}</StyledText>
    </TouchableOpacity>
  );

  _renderLeftArrow = () => {
    if (this.state.activeIndex === 0) {
      return <View style={styles.arrowPlaceHolder} />;
    }
    return (
      <View>
        <TouchableOpacity
          style={styles.arrowContainer}
          onPress={this._onPrevious}
          testID="left-arrow"
        >
          <Image
            source={images.arrow}
            style={[styles.arrow, styles.leftArrow]}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    );
  };

  _renderRightArrow = () => {
    if (this.state.activeIndex === this.props.tutorialSlides.length - 1) {
      return <View style={styles.arrowPlaceHolder} />;
    }
    return (
      <View>
        <TouchableOpacity style={styles.arrowContainer} onPress={this._onNext}>
          <Image
            source={images.arrow}
            style={styles.arrow}
            resizeMode="contain"
            testID="left-arrow"
          />
        </TouchableOpacity>
      </View>
    );
  };

  _renderBottom = () => {
    if (!this.props.visible) {
      return null;
    }
    const maxAllowed = Math.floor(
      (viewportWidth - 120 - 20) / (dotWidth + 8 * 2 + 2 * dotHorizontalMargin)
    );
    let dotsLength =
      maxAllowed < this.props.tutorialSlides.length
        ? maxAllowed
        : this.props.tutorialSlides.length;
    const activeDotIndex = this.state.activeIndex % dotsLength;
    if (
      this.props.tutorialSlides.length % maxAllowed !== 0 &&
      this.state.activeIndex >=
        this.props.tutorialSlides.length -
          (this.props.tutorialSlides.length % maxAllowed)
    ) {
      dotsLength = this.props.tutorialSlides.length % maxAllowed;
    }
    return (
      <View style={styles.bottomContainer} pointerEvents="box-none">
        {this._renderLeftArrow()}
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
        {this._renderRightArrow()}
      </View>
    );
  };

  render() {
    const backgroundColor =
      this.props.tutorialSlides.length > 0
        ? {
            backgroundColor:
              this.props.tutorialSlides[this.state.activeIndex].backgroundColor,
          }
        : null;
    return (
      <FullScreenModal
        visible={this.props.visible}
        side="bottom"
        style={styles.container}
        duration={250}
      >
        <Animatable.View
          style={[backgroundColor, { flex: 1 }]}
          transition="backgroundColor"
          duration={300}
        >
          <LinearGradient
            colors={gradientColors}
            locations={gradientLocations}
            style={StyleSheet.absoluteFill}
            start={gradientStart}
            end={gradientEnd}
          />
          <Carousel
            ref={this._setCarouselRef}
            data={this.props.tutorialSlides}
            renderItem={this._renderItem}
            sliderWidth={viewportWidth}
            itemWidth={viewportWidth}
            onSnapToItem={this._setActiveIndex}
            scrollEnabled={this.state.activeIndex === 0 ? false : true}
          />
          {this.state.activeIndex !== 0 ? this._renderSkipButton() : null}
          {this._renderBottom()}
        </Animatable.View>
      </FullScreenModal>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    visible: state.tutorial.isVisible,
  };
};

export default connect(mapStateToProps)(Tutorial);
