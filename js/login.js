function CheckDataProtectionAndSubmit () {
  if (document.getElementById('checkbox1').checked) {
    document.getElementById('errorLabel').style.display = 'none'
    document.getElementById('loginForm').submit()
  } else {
    document.getElementById('errorLabel').style.display = 'block'
  }
}
