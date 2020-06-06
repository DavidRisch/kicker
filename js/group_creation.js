/* global Dropzone $ users apiPost */

let groupID

// Configure Dropzone
Dropzone.options.groupImageDropzone = {
  paramName: 'image', // Name of the transferred file
  maxFilesize: 8, // MB
  uploadMultiple: false,
  clickable: true,
  acceptedFiles: 'image/*',
  dictDefaultMessage: null,
  autoProcessQueue: false,
  maxFiles: 1,
  thumbnailWidth: 200, // image width in px
  thumbnailHeight: 200 // image height in px
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

  // populate options
  document.getElementById('group_members').innerHTML = users

  // append fields on upload
  const dropzone = document.getElementById('groupImageDropzone').dropzone
  dropzone.on('sending', function (file, xhr, formData) {
    formData.append('action', 'uploadGroupImage')
    formData.append('group', groupID)
  })

  // replace file (limit to single file)
  dropzone.on('maxfilesexceeded', function (file) {
    this.removeAllFiles()
    this.addFile(file)
  })
  // max file size
  dropzone.on('error', function (file, message) {
    if (message === 'You can not upload any more files.') {
      return
    }

    alert(message) // eslint-disable-line no-undef
    this.removeFile(file)
  })
})

async function checkAndCreateGroup () { // eslint-disable-line no-unused-vars
  const memberList = document.getElementById('group_members')
  const membersHTML = memberList.selectedOptions
  const members = []
  for (let i = 0; i < membersHTML.length; i++) {
    members.push(membersHTML[i].value)
  }
  const groupName = document.getElementById('groupNameInput').value
  const groupDesc = document.getElementById('groupDescriptionInput').value

  // null checking
  const errorLabel = document.getElementById('errorLabel')
  errorLabel.style.display = 'none'
  if (groupName === '') {
    errorLabel.innerHTML = 'Ungültiger Gruppenname'
    errorLabel.style.display = 'block'
    return
  }

  const res = await apiPost({
    action: 'createGroup',
    groupName: groupName,
    groupDesc: groupDesc,
    groupMembers: members
  })

  if (res.success === true) {
    // upload image
    groupID = res.group._id
    document.getElementById('groupImageDropzone').dropzone.processQueue()
    alert('Gruppe erfolgreich erstellt') // eslint-disable-line no-undef
    return
  } else if (res.error === 'duplicateGroupName') {
    errorLabel.innerHTML = 'Gruppenname wird bereits verwendet'
  } else if (res.error === 'userNotAuthenticated') {
    errorLabel.innerHTML = 'Benutzer nicht Authentifiziert'
  } else {
    errorLabel.innerHTML = res.error
  }
  errorLabel.style.display = 'block'
}
