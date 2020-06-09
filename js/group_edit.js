// this script requires jquery
/* global apiPost $ Dropzone myGroupInfo */

// Configure Dropzone
Dropzone.options.group_member_select = {
  paramName: 'groupImage', // Name of the transferred file
  maxFilesize: 8, // MB
  uploadMultiple: false,
  clickable: true,
  acceptedFiles: 'image/jpeg,image/png',
  dictDefaultMessage: null
}
// Chosen init script
$(function () {
  $('.group_members').tokenize2({
    // max number of tags
    tokensMaxItems: 0,

    // allow you to create custom tokens
    tokensAllowCustom: false,

    // max items in the dropdown
    dropdownMaxItems: 10,

    // minimum/maximum of characters required to start searching
    searchMinLength: 0,
    searchMaxLength: 0,

    // specify if Tokenize2 will search from the beginning of a string
    searchFromStart: true,

    // choose if you want your search highlighted in the result dropdown
    searchHighlight: true,

    // custom delimiter
    delimiter: ';',

    // display no results message
    displayNoResultsMessage: false,
    noResultsMessageText: 'Keine Ergebnisse zu "%s" gefunden.',

    // data source
    dataSource: 'select',

    // waiting time between each search
    debounce: 0,

    // custom placeholder text
    placeholder: false,

    // enable sortable
    // requires jQuery UI
    sortable: false,

    // tabIndex
    tabIndex: 0,

    // allows empty values
    allowEmptyValues: false,

    // z-index
    zIndexMargin: 500
  })
})

function alertUserIsNotPartOfGroup () {
  window.alert('Du bist nicht teil dieser Gruppe!')
}

function alertInvalidGroup () {
  window.alert('Ungültige Gruppe!')
}

function alertNotYetImplemented () {
  window.alert('Nicht Implementiert')
}

async function onLeaveGroupConfirmed () { // eslint-disable-line no-unused-vars
  const res = await apiPost({
    action: 'leaveGroup',
    group: myGroupInfo.id
  })
  if (res.success === true) {
    window.alert('Du hast die Gruppe erfolgreich verlassen!')
    returnToMainPage()
  } else if (res.success === false) {
    window.alert('Fehler: ' + res.error)
  } else {
    window.alert('Unbekannter Fehler')
  }
}

async function validateUserInput (data) { // eslint-disable-line no-unused-vars
  // check if group name is valid
  if (data.groupName === null) {
    console.log('Missing group name detected')
    window.alert('Gib einen Gruppennamen ein!')
    return false
  }

  // check if new user set is empty
  if (data.newUsers.size === 0) {
    console.log('Empty set of group members detected')
    window.alert('Die Gruppe muss mindestens ein Mitglied enthalten!')
    return false
  }

  return true
}

async function checkAndUpdateGroup () { // eslint-disable-line no-unused-vars
  if (myGroupInfo.success === true) {
    if (myGroupInfo.userIsPartOfGroup !== true) {
      alertUserIsNotPartOfGroup()
    }
  }

  // get set of old users
  const oldUserSet = new Set(myGroupInfo.users_in_group)

  // get set of new users
  const newUserSet = new Set($('#group_members').val())

  // compute set difference of old users and new users
  const deletedUserSet = new Set(oldUserSet.filter(x => !newUserSet.has(x)));

  const data = {
    action: 'editGroup',
    groupName: document.getElementById('groupNameInput').value ? document.getElementById('groupNameInput').value : null,
    groupDesc: document.getElementById('groupDescriptionInput').value,
    newUsers: newUserSet,
    deletedUsers: deletedUserSet
  }

  // validate entered data
  if (!await validateUserInput(data)) {
    return
  }

  const res = await apiPost(data)
  if (res.success) {
    console.log('Group was successfully edited!')
    // redirect to matches page
    returnToMainPage()
  }
}

function returnToMainPage () { // eslint-disable-line no-unused-vars
  window.location.replace('/front_page')
}

function abortGroupEdit () { // eslint-disable-line no-unused-vars
  returnToMainPage()
}

async function deleteGroup () { // eslint-disable-line no-unused-vars
  alertNotYetImplemented()
}

function onLeaveGroupRequested () { // eslint-disable-line no-unused-vars
  openLeaveGroupDialog()
}

function openLeaveGroupDialog () {
  $('#leaveDialog').show()
}

function onCloseLeaveGroupDialog () { // eslint-disable-line no-unused-vars
  $('#leaveDialog').hide()
}

function leaveGroup () { // eslint-disable-line no-unused-vars
  if (myGroupInfo.success === true) {
    if (myGroupInfo.userIsPartOfGroup !== true) {
      alertUserIsNotPartOfGroup()
    } else {
      onLeaveGroupRequested()
    }
  } else {
    alertInvalidGroup()
  }
}

function initEditInfo () {
  var disableButtons = false
  if (myGroupInfo.success !== true) {
    window.alert('Error: ' + myGroupInfo.error)
    disableButtons = true
  } else {
    $('#groupNameInput').val(myGroupInfo.name)
    $('#groupDescriptionInput').val(myGroupInfo.description)
    // print all users in group to the console
    console.log('Users in group: ' + myGroupInfo.users_in_group)
    // Deactivate Buttons if user is not in the group!
    if (!myGroupInfo.userIsPartOfGroup) {
      disableButtons = true
    }
  }
  if (disableButtons === true) {
    const buttonsToDeactivate = [$('#updateGroupBtn'), $('#deleteGroupBtn'), $('#leaveGroupBtn')]
    buttonsToDeactivate.forEach(element => {
      element.css('opacity', '50%')
      element.css('pointer-events', 'none')
    })
  }
}

$(document).ready(
  function () {
    initEditInfo()
  }
)
