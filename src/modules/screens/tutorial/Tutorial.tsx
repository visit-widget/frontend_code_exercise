/* TODO: the coding exercise is refactoring this file as you see fit */

import React, { useState, useRef } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { LinearGradient } from 'expo-linear-gradient'
import PropTypes from 'prop-types'
import * as color from '../../../constants/color'
import * as devices from '../../../constants/devices'
import * as fontSizes from '../../../constants/fontSizes'
import * as customPropTypes from '../../../constants/customPropTypes'
import currentDevice from '../../../lib/getDevice'
import StyledText from '../../controls/StyledText'
import TutorialSlide from './TutorialSlide'
import FullScreenModal from '../../modal_layout/FullScreenModal'

const { width: viewportWidth, height: viewportHeight } =
  Dimensions.get('window')
const dotWidth = 10
const dotHorizontalMargin = 2.5
const isHeightSimilarToiPhoneOrSmaller = viewportHeight < 600

const styles = StyleSheet.create({
  container: {
    height: viewportHeight,
  },
  skipButton: {
    padding: devices.deviceSizes[currentDevice] === devices.SMALL ? 10 : 20,
    position: 'absolute',
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
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowPlaceHolder: {
    width: 60,
  },
  arrowContainer: {
    paddingHorizontal: 22,
    backgroundColor: 'red',
  },
  arrow: {
    width: 16,
    height: 40,
  },
  leftArrow: {
    transform: [{ rotate: '180deg' }],
  },
  dot: {
    width: dotWidth,
    height: dotWidth,
    borderRadius: dotWidth / 2,
    marginTop: isHeightSimilarToiPhoneOrSmaller ? 60 : 2.5,
  },
  paginationContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: color.transparent,
  },
  dotContainerStyle: {
    width: dotWidth + 10,
  },
})

const strings = {
  skip: 'Skip',
}

const images = {
  arrow: require('../../../../assets/images/arrow-right-white-big.png'),
}

const gradientColors = [color.transparent, color.blackAlpha6]
const gradientLocations = [0, 1.0]
const gradientStart = { x: 0.5, y: 0 }
const gradientEnd = { x: 1, y: 1 }

interface TutorialProps {
  tutorialSlides: (typeof customPropTypes.tutorialSlide)[]
  visible: boolean
  onFirstTutorialSlideNextAction: () => void
  onPrompt: (
    promptForLocationAccess: boolean,
    promptForPushNotifications: boolean
  ) => void
}

const Tutorial: React.FC<TutorialProps> = ({
  tutorialSlides,
  visible,
  onFirstTutorialSlideNextAction,
  onPrompt,
}) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const carouselRef = useRef<typeof customPropTypes.tutorialSlide | null>(null)
  const scrollingRef = useRef(false)

  const handlePrevious = () => {
    if (!scrollingRef.current && activeIndex > 0) {
      scrollingRef.current = true
      carouselRef.current?.snapToItem(activeIndex - 1)
      setActiveIndex(activeIndex - 1)
    }
  }

  const handleNext = () => {
    if (activeIndex === 0) {
      onFirstTutorialSlideNextAction()
    }
    if (!scrollingRef.current && activeIndex < tutorialSlides.length - 1) {
      scrollingRef.current = true
      carouselRef.current?.snapToItem(activeIndex + 1)
      setActiveIndex(activeIndex + 1)
    }
  }

  const handleScrollEnd = () => {
    scrollingRef.current = false
  }

  const renderSkipButton = () => (
    <TouchableOpacity
      style={styles.skipButton}
      onPress={() => onPrompt(true, true)}
      testID='skip-tutorial-button'>
      <StyledText style={styles.skipButtonText}>{strings.skip}</StyledText>
    </TouchableOpacity>
  )

  const renderLeftArrow = () => {
    if (activeIndex === 0) {
      return <View style={styles.arrowPlaceHolder} />
    }
    return (
      <View>
        <TouchableOpacity
          style={styles.arrowContainer}
          onPress={handlePrevious}
          testID='left-arrow'>
          <Image
            source={images.arrow}
            style={[styles.arrow, styles.leftArrow]}
            resizeMode='contain'
          />
        </TouchableOpacity>
      </View>
    )
  }

  const renderRightArrow = () => {
    if (activeIndex === tutorialSlides.length - 1) {
      return <View style={styles.arrowPlaceHolder} />
    }
    return (
      <View>
        <TouchableOpacity style={styles.arrowContainer} onPress={handleNext}>
          <Image
            source={images.arrow}
            style={styles.arrow}
            resizeMode='contain'
            testID='right-arrow'
          />
        </TouchableOpacity>
      </View>
    )
  }

  const renderBottom = () => {
    if (!visible) {
      return null
    }
    const maxAllowed = Math.floor(
      (viewportWidth - 120 - 20) / (dotWidth + 8 * 2 + 2 * dotHorizontalMargin)
    )
    let dotsLength =
      maxAllowed < tutorialSlides.length ? maxAllowed : tutorialSlides.length
    const activeDotIndex = activeIndex % dotsLength
    if (
      tutorialSlides.length % maxAllowed !== 0 &&
      activeIndex >=
        tutorialSlides.length - (tutorialSlides.length % maxAllowed)
    ) {
      dotsLength = tutorialSlides.length % maxAllowed
    }
    return (
      <View style={styles.bottomContainer} pointerEvents='box-none'>
        {renderLeftArrow()}
        <View style={styles.paginationContainer} pointerEvents='none'>
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
        {renderRightArrow()}
      </View>
    )
  }

  const backgroundColor =
    tutorialSlides.length > 0
      ? { backgroundColor: tutorialSlides[activeIndex].backgroundColor }
      : null

  return (
    <FullScreenModal
      visible={visible}
      side='bottom'
      style={styles.container}
      duration={250}>
      <View style={[backgroundColor, { flex: 1 }]}>
        <LinearGradient
          colors={gradientColors}
          locations={gradientLocations}
          style={StyleSheet.absoluteFill}
          start={gradientStart}
          end={gradientEnd}
        />
        <Carousel
          ref={(ref) => (carouselRef.current = ref)}
          data={tutorialSlides}
          renderItem={renderItem}
          sliderWidth={viewportWidth}
          itemWidth={viewportWidth}
          onSnapToItem={setActiveIndex}
          onScrollEndDrag={handleScrollEnd}
          scrollEnabled={activeIndex === 0 ? false : true}
        />
        {activeIndex !== 0 ? renderSkipButton() : null}
        {renderBottom()}
      </View>
    </FullScreenModal>
  )
}

Tutorial.propTypes = {
  tutorialSlides: PropTypes.arrayOf(customPropTypes.tutorialSlide).isRequired,
  visible: PropTypes.bool.isRequired,
  onFirstTutorialSlideNextAction: PropTypes.func.isRequired,
  onPrompt: PropTypes.func.isRequired,
}

Tutorial.defaultProps = {
  tutorialSlides: [],
  visible: false,
}

const mapStateToProps = (state: any) => {
  return {
    visible: state.tutorial.isVisible,
  }
}

export default connect(mapStateToProps)(Tutorial)
