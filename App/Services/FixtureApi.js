export default {
  // Functions return fixtures
  getUser: () => {
    // This fixture only supports gantman
    const gantmanData = require('../Fixtures/gantman.json')
    return {
      ok: true,
      data: gantmanData
    }
  }
}
