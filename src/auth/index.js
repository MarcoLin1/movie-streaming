import { Cookies } from 'quasar'

const moduleName = 'movie-streaming'

function getAuthorization (module = moduleName) {
  return Cookies.get(module)
}

function setAuthorization (accessToken, expiresIn, module = moduleName) {
  Cookies.set(module, accessToken, Object.assign({
    expires: `${expiresIn}s`,
    path: '/'
  }))
}

function clearAuthorization (module = moduleName) {
  return Cookies.remove(module, Object.assign({
    path: '/'
  }))
}

export {
  getAuthorization,
  setAuthorization,
  clearAuthorization
}
