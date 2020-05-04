/* global fetch */

async function apiPost (data) { // eslint-disable-line no-unused-vars
  const rawResponse = await fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  return rawResponse.json()
}
