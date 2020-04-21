module.exports = {
  isValidEmail: isValidEmail,
  isSecurePassword: isSecurePassword,
  isValidUserName: isValidUserName
}

function isValidEmail (emailString) {
//  https://www.ietf.org/rfc/rfc5322.txt
  const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
  var result = emailRegex.test(emailString)
  return result
}

function isSecurePassword (passwordText) {
//  Länge mindestens 8
//  Mind. 1 Sonderzeichen, 1 Großbuchstabe und 1 Zahl
//  A Modified version of https://stackoverflow.com/a/5142164
  const passwordRegex = new RegExp(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/)
  return passwordRegex.test(passwordText)
}

function isValidUserName (userNameText) {
  //  A-Z, a-z, 0-9, _ - ist erlaubt, mindestens 5 Zeichen
  const userNameRegex = new RegExp(/^([A-Za-z0-9_-]+){5,}$/)
  return userNameRegex.test(userNameText)
}
