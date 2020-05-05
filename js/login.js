async function Login () {
  const res = await apiPost({
    action: 'login',
    userName: document.getElementById('userNameInput').value,
    password: document.getElementById('passwordInput').value
  })
  if (res.success === true) {
    window.location.replace('/front_page')
  } else {
    document.getElementById('errorLabel').style.display = 'block'
  }
}
