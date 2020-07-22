import Metrics from './Metrics'

const type = {
  regular: 'ProximaNova-Regular',
  bold: 'ProximaNova-Bold',
  light: 'ProximaNova-Light',
  regular_italic: 'ProximaNova-Regular-Italic',
  light_italic: 'ProximaNova-Light-Italic',
  bold_italic: 'ProximaNova-Bold-Italic',
  brand: 'BerkshireSwash-Regular'
}

const size = {
  ten: Metrics.width * 0.027,
  twelve: Metrics.width * 0.032,
  fourteen: Metrics.width * 0.037,
  sixteen: Metrics.width * 0.042,
  eighteen: Metrics.width * 0.047,
  twenty: Metrics.width * 0.052,
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
