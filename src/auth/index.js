import { Cookies } from 'quasar'
import { MODULE_NAME } from 'src/constant/module'

function getAuthorization (module = MODULE_NAME) {
  return Cookies.get(module)
}

function setAuthorization (accessToken, expiresIn, module = MODULE_NAME) {
  Cookies.set(module, accessToken, Object.assign({
    expires: `${expiresIn}s`,
    path: '/'
  }))
}

function clearAuthorization (module = MODULE_NAME) {
  return Cookies.remove(module, Object.assign({
    path: '/'
  }))
}

export {
  getAuthorization,
  setAuthorization,
  clearAuthorization
}
