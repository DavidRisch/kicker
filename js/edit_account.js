/* global apiPost */

async function Submit() {
  // validate user input
  if (!await ValidateUserInput()) {
    return
  }
  // submit and save changes
  const data = {
    action: 'editAccount',
    name: document.getElementById('userNameInput').value,
    email: document.getElementById('mailInput').value,
    password: document.getElementById('passwordInput').value,
    telephone: document.getElementById('phoneNumberInput').value

  }
  const res = await apiPost(data)
  if (res.success) {
    window.location.replace('/account')
  }
}

async function LoadEntries() {
  // reset entries with user data
  document.getElementById('mailInput').value = "MAIL"
  document.getElementById('userNameInput').value ="NAME"
  document.getElementById('passwordInput').value = "supersecurepassword123"
  document.getElementById('phoneNumberInput').value = "PHONE NUMBER"

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
    label.innerHTML = 'Ungültige Email Adresse'
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

  return true
}
