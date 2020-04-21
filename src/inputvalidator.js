module.exports = {
    'isValidEmail'    : isValidEmail,
    'isSecurePassword': isSecurePassword,
    'isValidUserName' : isValidUserName
}
  
function isValidEmail(emailString){
    //https://www.ietf.org/rfc/rfc5322.txt
    const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    var result = emailRegex.test(emailString);
    return result;
}

function isSecurePassword(passwordText){
    //Länge mindestens 8
    //Mind. 1 Sonderzeichen, 1 Großbuchstabe und 1 Zahl
    const passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
    return passwordRegex.test(passwordRegex);
}

function isValidUserName(userNameText){
    //A-Z, a-z, 0-9, _ - ist erlaubt, mindestens 5 Zeichen
    const userNameRegex = new RegExp(/^([A-Za-z0-9\_\-]+){5,}$/);
    return userNameRegex.test(userNameText);
}
