// this script requires jquery
/* global apiPost, urlParams */

function returnToMainPage () { // eslint-disable-line no-unused-vars
  window.location.replace('/front_page')
}

async function onLeaveGroupBtnClicked () {  
  const res = await apiPost({
    action: 'leaveGroup',
    group: myGroupInfo.id
  })
  if (res.success === true) {
    window.location.replace('/front_page')
  } else {
    $('errorLabel').innerHTML = 'Fehler: ' + res.error
  }
}

$('groupLabel').text = myGroupInfo.name;
