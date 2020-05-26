function process (req) {
  const user = require('../src/account_util').get_current_user(req)
  if (user === null) {
    return {
      success: false,
      errorReason: 'not logged in'
    }
  }
  return {
    success: true,
    name: user.name,
    email: user.email,
    telephone: user.telephone
  }
}

module.exports = {
  process: process
}
