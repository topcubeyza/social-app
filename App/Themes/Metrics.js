import {Dimensions, Platform} from 'react-native'

const { width, height } = Dimensions.get('window')

// Used via Metrics.baseMargin
const Metrics = {
  width,
  height,
  marginHorizontal: width * 0.05,
  marginHorizontalLarge: width * 0.1,
  marginVertical: width * 0.05,
  horizontalLineHeight: 1,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: (Platform.OS === 'ios') ? 64 : 54,
  borderRadiusFullRound: 50,
  borderRadiusStandard: 5 ,
  buttonHeight: width * 0.12
}

export default Metrics
