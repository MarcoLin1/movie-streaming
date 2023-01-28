import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth'
import { firebaseAuth } from 'src/boot/firebase'
import { setAuthorization, clearAuthorization } from 'src/auth'

export default function useAuth () {
  const providerGoogle = new GoogleAuthProvider()
  const providerFacebook = new FacebookAuthProvider()

  async function googleLogin () {
    try {
      const result = await signInWithPopup(firebaseAuth, providerGoogle)
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential.accessToken
      const user = result.user
      console.log('result =>', result)
      console.log('credential =>', credential)
      console.log('token =>', token)
      console.log('user =>', user)
      setAuthorization(token, 36000)
    } catch (error) {
      console.log('google login error', error)
    }
  }

  async function logout () {
    try {
      onAuthStateChanged(firebaseAuth, (user) => {
        console.log('now the user', user)
      })
      const result = await signOut(firebaseAuth)
      console.log('sign out result', result)
      clearAuthorization()
    } catch (error) {
      console.log('google logout error', error)
    }
  }

  async function facebookLogin () {
    try {
      const result = await signInWithPopup(firebaseAuth, providerFacebook)
      const credential = FacebookAuthProvider.credentialFromResult(result)
      const token = credential.accessToken
      const user = result.user
      console.log('fb user ?', user)
      setAuthorization(token, 36000)
    } catch (error) {
      console.log('facebook login failed', error)
    }
  }

  return {
    googleLogin,
    logout,
    facebookLogin
  }
}
