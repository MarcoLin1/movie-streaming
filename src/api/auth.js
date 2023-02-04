import { signInWithPopup, signOut, GoogleAuthProvider, FacebookAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { firebaseAuth } from 'src/boot/firebase'
import { setAuthorization, clearAuthorization } from 'src/auth'
import useError from 'src/composables/useError'

export default function useAuth () {
  const { errorHandler } = useError()
  const providerGoogle = new GoogleAuthProvider()
  const providerFacebook = new FacebookAuthProvider()

  async function googleLogin () {
    try {
      const result = await signInWithPopup(firebaseAuth, providerGoogle)
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential.accessToken
      setAuthorization(token, 36000)
    } catch (error) {
      const message = 'google login failed !'
      errorHandler(message)
    }
  }

  async function logout () {
    try {
      await signOut(firebaseAuth)
      clearAuthorization()
    } catch (error) {
      const message = 'logout failed, please try again.'
      errorHandler(message)
    }
  }

  async function facebookLogin () {
    try {
      const result = await signInWithPopup(firebaseAuth, providerFacebook)
      const credential = FacebookAuthProvider.credentialFromResult(result)
      const token = credential.accessToken
      setAuthorization(token, 36000)
    } catch (error) {
      const message = 'facebook login failed !'
      errorHandler(message)
    }
  }

  async function emailRegister (email, password) {
    try {
      await createUserWithEmailAndPassword(firebaseAuth, email, password)
    } catch (error) {
      const message = 'register failed, please confirm your email and password'
      errorHandler(message)
    }
  }

  async function emailLogin (email, password) {
    try {
      const result = await signInWithEmailAndPassword(firebaseAuth, email, password)
      setAuthorization(result.user.accessToken, 36000)
    } catch (error) {
      const message = 'login failed, please try again'
      errorHandler(message)
    }
  }

  return {
    googleLogin,
    logout,
    facebookLogin,
    emailRegister,
    emailLogin
  }
}
