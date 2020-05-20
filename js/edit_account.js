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
  const data = {
    action: 'getUserData'
  }
  const res = await apiPost(data)
  document.getElementById('mailInput').value = res.mail
  document.getElementById('userNameInput').value = res.name
  document.getElementById('phoneNumberInput').value = res.telephone

  /*/
  document.getElementById('mailInput').value = "MAIL"
  document.getElementById('userNameInput').value ="NAME"
  document.getElementById('passwordInput').value = ""
  document.getElementById('phoneNumberInput').value = "PHONE NUMBER"
*/


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
  if (document.getElementById('passwordInput').value !== ''){
    if (!res.validPassword) {
      label.innerHTML = 'Ungültiges Passwort (mindestens 1 Großbuchstabe, 1 Zahl, 1 Sonderzeichen)'
      return false
    }
  }

  if (!res.validName) {
    label.innerHTML = 'Ungültiger Nutzername (mindestens 5 Zeichen)'
    return false
  }

  return true
}
