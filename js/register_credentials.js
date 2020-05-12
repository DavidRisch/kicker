/* global apiPost */

async function CheckDataProtectionAndSubmit () { // eslint-disable-line no-unused-vars
  // validate user input
  if (!await ValidateUserInput()) {
    return
  }
  // check data protection
  if (document.getElementById('checkbox1').checked) {
    document.getElementById('errorLabel').style.display = 'none'
    SubmitForm()
  } else {
    document.getElementById('errorLabel').innerHTML = 'Bitte akzeptiere zuerst die Datenschutzbedingungen.'
  }
}

async function SubmitForm () {
  const data = {
    action: 'registerCredentials',
    name: document.getElementById('userNameInput').value,
    email: document.getElementById('mailInput').value,
    password: document.getElementById('passwordInput').value,
    telephone: document.getElementById('phoneNumberInput').value

  }
  const res = await apiPost(data)
  if (res.success) {
    window.location.replace('/login')
  } else {
    const errorLabel = document.getElementById('errorLabel')
    errorLabel.innerHTML = 'Nutzername wird bereits verwendet'
    errorLabel.style.display = 'block'
  }
}

async function ValidateUserInput () {
  const data = {
    action: 'validateInput',
    name: document.getElementById('userNameInput').value,
    email: document.getElementById('mailInput').value,
    password: document.getElementById('passwordInput').value
  }

  const res = await apiPost(data)
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
