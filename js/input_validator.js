function isValidEmail (emailString) {
//  Source: https://emailregex.com/
  const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
  var result = emailRegex.test(emailString)
  return result
}

function isSecurePassword (passwordText) {
//  minimum length: 8
//  min. 1 symbol, 1 capital letter, 1 small letter 1 number
//  A Modified version of https://stackoverflow.com/a/5142164
//  (?=.*[A-Z]) Capital letter from A to Z
//  (?=.*[^A-Za-z0-9]) All Symbols except A-Z a-z and 0-9
//  (?=.*[0-9]) All numbers between 0-9
//  (?=.*[a-z]) Small letters, from a to z
//  .{8,} Repeat this at least 8 times
  const passwordRegex = new RegExp(/^(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.*[0-9])(?=.*[a-z]).{8,}$/)
  return passwordRegex.test(passwordText)
}

function isValidUserName (userNameText) {
//  min. 5 characters
//  A-Z, a-z, 0-9, _ - are allowed,
//  {5,} Repeat this at least 5 times
  const userNameRegex = new RegExp(/^([A-Za-z0-9_-]+){5,}$/)
  return userNameRegex.test(userNameText)
}
