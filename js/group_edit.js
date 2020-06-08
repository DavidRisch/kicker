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

async function onLeaveGroupRequested () {
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

function checkAndUpdateGroup () { // eslint-disable-line no-unused-vars
  if (myGroupInfo.success === true) {
    if (myGroupInfo.userIsPartOfGroup !== true) {
      alertUserIsNotPartOfGroup()
    }
  }
  alertNotYetImplemented()
}

function returnToMainPage () { // eslint-disable-line no-unused-vars
  window.location.replace('/front_page')
}

function abortGroupEdit () { // eslint-disable-line no-unused-vars
  returnToMainPage()
}

function deleteGroup () { // eslint-disable-line no-unused-vars
  alertNotYetImplemented()
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
