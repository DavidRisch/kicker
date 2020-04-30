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
  const rawResponse = await fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      action: 'validateInput',
      name: document.getElementById('nameInput').value,
      email: document.getElementById('mailInput').value,
      password: document.getElementById('passwordInput').value
    })
  })

  const content = await rawResponse.json()
  const label = document.getElementById('errorLabel')

  if (!content['valid-email']) {
    label.innerHTML = 'Ungültige Email Addresse'
    return false
  }

  if (!content['valid-password']) {
    label.innerHTML = 'Ungültiges Password'
    return false
  }

  if (!content['valid-name']) {
    label.innerHTML = 'Ungültiger Nutzername'
    return false
  }

  label.innerHTML = ''
  return true
}
