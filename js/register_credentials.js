async function CheckDataProtectionAndSubmit () {
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
    mail: document.getElementById('mailInput').value,
    password: document.getElementById('passwordInput').value,
    phoneNumber: document.getElementById('phoneNumberInput').value

  }
  const res = await apiPost(data)
  if (res.success) {
    window.location.replace('/login')
  }
}

async function ValidateUserInput () {
  const data = {
    action: 'validateInput',
    name: document.getElementById('userNameInput').value,
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
