const NotLoggedInException = class extends Error {}

function hashPassword (password, salt) {
  const hash = require('js-sha256').create()
  hash.update(salt + password)
  return hash.hex()
}

function generateRandomString (length) {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let retVal = ''
  const n = charset.length
  for (let i = 0; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n))
  }
  return retVal
}

const sessionTokenName = 'session_token'
const currentGroupCookieName = 'current_group_id'

function setSessionCookie (res, token) {
  res.cookie(sessionTokenName, token, {
    maxAge: 10 * 24 * 60 * 60 * 1000 // 10 days (unit is ms)
  })
}

function getSessionCookie (req) {
  const cookie = req.cookies[sessionTokenName]
  if (cookie === undefined) {
    return null
  } else {
    return cookie
  }
}

function getCurrentUser (req) {
  const token = getSessionCookie(req)
  if (token === null) {
    return null
  }

  let session
  try {
    session = require('./db/session').by_cookie_token(token)
  } catch (e) {
    return null
  }

  return require('./db/user').by_id(session.userId)
}

function requireLoggedInUser (req, res) {
  const user = getCurrentUser(req)
  if (user !== null) {
    return user
  } else {
    res.writeHead(302, { Location: '/login' })
    res.end()
    throw new NotLoggedInException('NotLoggedInException')
  }
}

function setGroup (res, groupId) {
  res.cookie(currentGroupCookieName, groupId, {
    maxAge: 100 * 24 * 60 * 60 * 1000 // 100 days (unit is ms)
  })
}

function getGroup (req) {
  const cookie = req.cookies[currentGroupCookieName]
  if (cookie === undefined) {
    return null
  } else {
    return cookie
  }
}

module.exports = {
  hash_password: hashPassword,
  generate_random_string: generateRandomString,
  set_session_cookie: setSessionCookie,
  get_session_cookie: getSessionCookie,
  get_current_user: getCurrentUser,
  require_logged_in_user: requireLoggedInUser,
  set_group: setGroup,
  get_group: getGroup
}
