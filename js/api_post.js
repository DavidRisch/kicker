async function apiPost (data) {
  const rawResponse = await fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  return rawResponse.json()
}
