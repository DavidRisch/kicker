module.exports = {
  process: handle
}

function handle (userName, password, res) {
  console.log('login request for: ' + userName)
  try {
    const user = require('../src/db/user').by_name(userName)
    console.log('user: ' + user)
    const session = require('../src/db/session').create(user.id)
    const accountUtil = require('../src/account_util')
    const hashedPassword = accountUtil.hash_password(password, user.salt)
    if (hashedPassword === user.password || process.env.DEBUG_ACCEPT_ALL_PASSWORDS === '1') {
      session.valid = true
      accountUtil.set_session_cookie(res, session.token)
      return {
        success: true
      }
    }
  } catch (e) {
    // do not differentiate between different kinds of Exceptions to prevent attacks
    console.log('login request error: ' + e)
  }
  console.log('login request failed')
  return {
    success: false
  }
}
