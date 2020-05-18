function process (req, name, email, password, telephone) {
  const user = require('../src/account_util').get_current_user(req)
  if (user === null) {
    return {
      success: false,
      errorReason: 'login failed'
    }
  }

  const validator = require('../src/input_validator')

  if (validator.is_valid_email(email) && validator.is_valid_user_name(name)) {
    user.email = email
    user.name = name
    user.telephone = telephone
  } else {
    return {
      success: false,
      errorReason: 'validation failed'
    }
  }
  if (password !== '') {
    if (validator.is_secure_password(password)) {
      user.setPassword(password)
    } else {
      return {
        success: false,
        errorReason: 'validation failed (password)'
      }
    }
  }

  return {
    success: true
  }
}

module.exports = {
  process: process
}
