import trae from 'trae'

trae.baseUrl('http://localhost:8989')

trae.before((config) => {
  const token = window.localStorage.token

  if (token) {
    config.headers['authorization'] = `Bearer ${token}`
  }

  return config
})

const api = {}

api.authenticate = function (email, password) {
  return trae.post('/auth', { email, password })
    .then(res => res.data)
    .catch(err => console.log('[ERROR]', err))
}

api.getStatus = function () {
  return trae.get('/')
    .then(res => res.data)
    .catch(err => console.log('[ERROR]', err))
}

api.checkToken = function () {
  return trae.get('/check')
    .then(res => res.data)
    .catch(err => console.log('[ERROR]', err))
}

export default api
