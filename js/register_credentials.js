async function CheckDataProtectionAndSubmit () {
  // validate user input
  if (!await ValidateUserInput()) {
    return
  }
  // check data protection
  if (document.getElementById('checkbox1').checked) {
    document.getElementById('errorLabel').style.display = 'none'
    document.getElementById('loginForm').submit()
  } else {
    document.getElementById('errorLabel').innerHTML = 'Bitte akzeptiere zuerst die Datenschutzbedingungen.'
  }
}

async function ValidateUserInput () {
  const data = {
    action: 'validateInput',
    name: document.getElementById('nameInput').value,
    email: document.getElementById('mailInput').value,
    password: document.getElementById('passwordInput').value
  }

  var res = await apiPost(data)
  const label = document.getElementById('errorLabel')

  if (!res.validEmail) {
    label.innerHTML = 'Ungültige Email Addresse'
    return false
  }

  if (!res.validPassword) {
    label.innerHTML = 'Ungültiges Password'
    return false
  }

  if (!res.validName) {
    label.innerHTML = 'Ungültiger Nutzername'
    return false
  }

  label.innerHTML = ''
  return true
}
