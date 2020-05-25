/* global apiPost, urlParams, groupName */

window.onload = initPage

function initPage () {
  if (groupName !== '') {
    document.getElementById('groupLabel').innerHTML = groupName
  } else {
    document.getElementById('errorLabel').innerHTML = 'Dieser Link ist ungültig'
    document.getElementById('returnButton').style.display = 'block'
    const header = document.getElementById('headRegion')
    header.style.height = 0
    header.style.display = 'none'
  }
}

function returnToMainPage () { // eslint-disable-line no-unused-vars
  window.location.replace('/front_page')
}

async function submitForm () { // eslint-disable-line no-unused-vars
  const token = urlParams.token
  const res = await apiPost({
    action: 'joinGroup',
    token: token
  })

  if (res.success === true) {
    window.location.replace('/front_page')
  } else {
    const errorLabel = document.getElementById('errorLabel')
    document.getElementById('returnButton').style.display = 'block'
    document.getElementById('submitButton').disabled = true

    if (res.error === 'invalidToken') {
      errorLabel.innerHTML = 'Dieser Link wurde bereits verwendet oder ist ungültig'
    } else if (res.error === 'userAlreadyInGroup') {
      errorLabel.innerHTML = 'Sie sind dieser Gruppe bereits beigetreten'
    } else if (res.error === 'userNotAuthenticated') {
      errorLabel.innerHTML = 'Bitte melden sie sich an, um diese Funktion verwenden zu können'
    } else {
      // unexpected error
      errorLabel.innerHTML = 'Unbekannter Fehler: ' + res.error
    }
  }
}
