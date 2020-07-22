import Metrics from './Metrics'

const type = {
  regular: 'Proxima Nova Reg',
  light: 'Proxima Nova Light',
  bold: 'Proxima Nova Bold',
  regular_italic: 'Proxima Nova Reg It',
  light_italic: 'Proxima Nova Light It',
  bold_italic: 'Proxima Nova Bold It',
}

const size = {
  ten: Metrics.width * 0.025,
  twelve: Metrics.width * 0.030,
  fourteen: Metrics.width * 0.035,
  sixteen: Metrics.width * 0.040,
  eighteen: Metrics.width * 0.045,
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
