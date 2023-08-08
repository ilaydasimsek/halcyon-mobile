import { Dimensions } from 'react-native';

// Guideline width based on the design sizes. Uses iPhone 13 as the base
const guidelineBaseWidth = 390;
const guidelineBaseHeight = 844;

// Width and Height values based on device screen
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default {
  guidelineBaseHeight,
  guidelineBaseWidth,
  windowHeight,
  windowWidth,
};
