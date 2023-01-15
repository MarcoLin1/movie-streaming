import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider } from 'firebase/auth'
import { firebaseAuth } from 'src/boot/firebase'
import { setAuthorization, clearAuthorization } from 'src/auth'

export default function useAuth () {
  const providerGoogle = new GoogleAuthProvider()

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

  async function googleLogout () {
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

  return {
    googleLogin,
    googleLogout
  }
}
