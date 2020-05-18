window.onload = initPage

function initPage () {
  document.getElementById('groupLabel').innerHTML = groupName
}

function returnToMainPage () {
  window.location.replace('/front_page')
}

async function submitForm () {
  const token = urlParams.token
  const res = await apiPost({
    action: 'join_group',
    token: token
  })

  if (res.success === true) {
    window.location.replace('/front_page')
  } else {
    const errorLabel = document.getElementById('errorLabel')
    document.getElementById('returnButton').style.display = 'block'

    if (res.error === 'invalidToken') {
      errorLabel.innerHTML = 'Dieser Link wurde bereits verwendet oder ist ungültig'
    } else {
      errorLabel.innerHTML = 'Sie sind dieser Gruppe bereits beigetreten'
    }
  }
}
