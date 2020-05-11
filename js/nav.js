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

function toggleButton () {
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
  document.getElementById('sidenav').style.width = '300px'
  document.getElementById('nav').style.marginLeft = '300px'
  document.getElementById('main').style.marginLeft = '300px'
}

function closeNav () {
  document.getElementById('sidenav').style.width = '0'
  document.getElementById('nav').style.marginLeft = '0'
  document.getElementById('main').style.marginLeft = '0'
}

// Group selection
/* Set the width of the sidebar to 300px (show it) */
function openGroups () {
  document.getElementById('group_select').style.width = '300px'
}

/* Set the width of the sidebar to 0 (hide it) */
function closeGroups () {
  document.getElementById('group_select').style.width = '0'
}
