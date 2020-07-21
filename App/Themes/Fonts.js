import Metrics from './Metrics'

const type = {
  regular: 'Montserrat-Regular',
  light: 'Montserrat-Light',
  medium: 'Montserrat-Medium',
  semibold: 'Montserrat-SemiBold',
  bold: 'Montserrat-Bold',
  black: 'Montserrat-Black',
  headerTitle: 'OpenSans-SemiBold'
}

const size = {
  ten: Metrics.screenWidth * 0.025,
  twelve: Metrics.screenWidth * 0.030,
  fourteen: Metrics.screenWidth * 0.035,
  sixteen: Metrics.screenWidth * 0.040,
  eighteen: Metrics.screenWidth * 0.045,
}

const style = {
  h1: {
    fontFamily: type.base,
    fontSize: size.h1
  },
  h2: {
    fontWeight: 'bold',
    fontSize: size.h2
  },
  h3: {
    fontFamily: type.emphasis,
    fontSize: size.h3
  },
  h4: {
    fontFamily: type.base,
    fontSize: size.h4
  },
  h5: {
    fontFamily: type.base,
    fontSize: size.h5
  },
  h6: {
    fontFamily: type.emphasis,
    fontSize: size.h6
  },
  normal: {
    fontFamily: type.base,
    fontSize: size.regular
  },
  description: {
    fontFamily: type.base,
    fontSize: size.medium
  }
}

export default {
  type,
  size,
  style
}
