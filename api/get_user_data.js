function process (req) {
  const user = require('../src/account_util').get_current_user(req)
  if (user === null) {
    return {
      success: false,
      errorReason: 'user does not exist'
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
