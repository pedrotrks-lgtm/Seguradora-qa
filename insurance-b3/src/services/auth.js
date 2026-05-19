export function saveSession(data) {
  localStorage.setItem(
    'b3_auth',
    JSON.stringify(data)
  )
}

export function getSession() {
  return JSON.parse(
    localStorage.getItem('b3_auth')
  )
}

export function logout() {
  localStorage.removeItem('b3_auth')
}