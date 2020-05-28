/* global apiPost */

async function CheckDataProtectionAndSubmit () { // eslint-disable-line no-unused-vars
  // check data protection
  if (document.getElementById('checkbox1').checked) {
    // validate user input
    if (await ValidateUserInput()) {
      SubmitForm()
    }
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
    errorLabel.style.display = 'block'

    if (res.message === 'duplicateUserException') {
      errorLabel.innerHTML = 'Nutzername wird bereits verwendet'
    } else {
      errorLabel.innerHTML = res.message
    }
  }
}

async function ValidateUserInput () {
  const label = document.getElementById('errorLabel')
  const password = document.getElementById('passwordInput').value
  const confirmPassword = document.getElementById('passwordConfirmInput').value

  if (password !== confirmPassword) {
    label.innerHTML = 'Passwörter stimmen nicht überein'
    return false
  }

  const data = {
    action: 'validateInput',
    name: document.getElementById('userNameInput').value,
    email: document.getElementById('mailInput').value,
    password: document.getElementById('passwordInput').value
  }

  const res = await apiPost(data)

  if (!res.validEmail) {
    label.innerHTML = 'Ungültige E-Mail Addresse'
    return false
  }

  if (!res.validPassword) {
    label.innerHTML = 'Ungültiges Passwort'
    return false
  }

  if (!res.validName) {
    label.innerHTML = 'Ungültiger Nutzername'
    return false
  }

  label.innerHTML = ''
  return true
}
