import { getAuthorization } from 'src/auth/index'
import { Notify } from 'quasar'

export const checkLoginRequired = (store) => {
  return async (to, from, next) => {
    if (to.path !== from.path) {
      if (!to.meta?.auth) {
        return next()
      }

      const auth = to.meta.auth
      const accessToken = getAuthorization()

      if (auth.loginRequired) {
        if (accessToken) {
          return next()
        } else {
          if (auth.redirect) {
            Notify.create({
              message: 'do not have token, it will redirect to auth.redirect'
            })
            console.log('the auth redirect', auth)
            return next({ ...auth.redirect })
          }
        }
      } else {
        if (accessToken && auth.redirect) {
          Notify.create({
            message: 'do not need token, it will redirect directly'
          })
          return next({ ...auth.redirect })
        } else {
          return next()
        }
      }
    } else {
      return next()
    }
  }
}
