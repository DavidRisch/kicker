// this script requires jquery

/* global apiPost $ myGroupInfo */

function returnToMainPage () { // eslint-disable-line no-unused-vars
  window.location.replace('/front_page')
}

async function onLeaveGroupBtnClicked () { // eslint-disable-line no-unused-vars
  const res = await apiPost({
    action: 'leaveGroup',
    group: myGroupInfo.id
  })
  if (res.success === true) {
    $('#returnButton').css('display', 'none')
    returnToMainPage()
  } else if (res.success === false) {
    $('#errorLabel').text('Fehler: ' + res.error)
    $('#returnButton').css('display', '')
  } else {
    $('#errorLabel').text('Unbekannter Fehler')
    $('#returnButton').css('display', '')
  }
}

function setUpLeaveButtonExampleText () {
  $('#groupLabel').text(myGroupInfo.name)
  if (myGroupInfo.id === 0) {
    $('#groupLabel').parent().text('Du kannst nur eine Gruppe verlassen, wenn du dich in einer befindest!')
    // send the user to the front page!
    $('#submitButton').click(function () { returnToMainPage() })
  }
}

$(document).ready(
  function () {
    setUpLeaveButtonExampleText()
  }
)
