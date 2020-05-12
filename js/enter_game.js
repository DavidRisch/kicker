// helper functions
function hideElment (id, hide) {
  const element = document.getElementById(id) // textinput A
  if (hide) {
    element.style.display = 'none'
  } else {
    element.style.display = 'inline'
  }
}

function disableElment (id, disable) {
  const element = document.getElementById(id) // textinput A
  element.disabled = disable
}

function setCheckbox (id, checked) {
  const element = document.getElementById(id) // textinput A
  element.checked = checked
}

// to keep track of the states for the checkboxes
var isAhidden = false
var isBhidden = false

function oneVsOne () {
  console.log('1 vs 1')

  // toggle buttons
  disableElment('1v1', true)
  disableElment('2v2', false)

  // disable inputs for second players
  hideElment('playerA2', true) // textinput A
  hideElment('playerB2', true) // textinput B
  hideElment('checkboxA', true) // checkbox A
  hideElment('checkboxB', true) // checkbox B

  // uncheck checkboxes
  setCheckbox('checkboxA', false) // checkbox A
  setCheckbox('checkboxB', false) // checkbox B
}

function twoVsTwo () {
  console.log('2 vs 2')

  // toggle buttons
  disableElment('1v1', false)
  disableElment('2v2', true)

  // disable inputs for second players
  hideElment('playerA2', false) // textinput A
  hideElment('playerB2', false) // textinput B
  hideElment('checkboxA', false) // checkbox A
  hideElment('checkboxB', false) // checkbox B

  // check checkboxes
  setCheckbox('checkboxA', true) // checkbox A
  setCheckbox('checkboxB', true) // checkbox B
}

function teamAHas2ndPlayer () { // textinput A
  if (isAhidden) {
    hideElment('playerA2', false)
    isAhidden = false
  } else {
    hideElment('playerA2', true)
    isAhidden = true
  }
}

function teamBHas2ndPlayer () { // textinput B
  if (isBhidden) {
    hideElment('playerB2', false)
    isBhidden = false
  } else {
    hideElment('playerB2', true)
    isBhidden = true
  }
}
