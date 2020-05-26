// Burger menu
const stateModule = (function () {
  let state
  const pub = {}
  pub.changeState = function (newstate) {
    state = newstate
  }
  pub.getState = function () {
    return state
  }
  return pub
}())

function toggleButton () { // eslint-disable-line no-unused-vars
  const menu = document.querySelector('.hamburger')
  menu.classList.toggle('is-active')
  if (!stateModule.getState()) {
    openNav()
    stateModule.changeState(1)
  } else {
    closeNav()
    stateModule.changeState(0)
  }
}

function openNav () {
  document.getElementById('sidenav').style.marginLeft = '0'
  document.getElementById('sidenav').style.boxShadow = '3px 0px 20px #000000F0'
  closeGroups()
}

function closeNav () {
  document.getElementById('sidenav').style.marginLeft = '-300px'
  document.getElementById('sidenav').style.boxShadow = 'none'
}

// Group selection
/* Set the width of the sidebar to 300px (show it) */
function openGroups () { // eslint-disable-line no-unused-vars
  document.getElementById('group_select').style.width = '300px'
  if (stateModule.getState()) {
    toggleButton()
  }
}

/* Set the width of the sidebar to 0 (hide it) */
function closeGroups () { // eslint-disable-line no-unused-vars
  document.getElementById('group_select').style.width = '0'
}
