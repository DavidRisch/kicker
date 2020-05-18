async function Login () {
  const res = await apiPost({
    action: 'login',
    userName: document.getElementById('userNameInput').value,
    password: document.getElementById('passwordInput').value
  })
  if (res.success === true) {
    // get cookie
    const redirectCookie = getCookieValue('redirect')
    if (redirectCookie) {
      // expire cookie and redirect
      document.cookie = 'redirect=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      window.location.replace(redirectCookie)
    } else {
      window.location.replace('/front_page')
    }
  } else {
    document.getElementById('errorLabel').style.display = 'block'
  }
}
