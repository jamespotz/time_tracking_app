import jwt from 'jsonwebtoken'

class Auth {
  static header() {
    return `Bearer ${sessionStorage.getItem('user_token')}`
  }

  static signedIn() {
    return !!sessionStorage.getItem('user_token')
  }

  static signOut() {
    sessionStorage.removeItem('user_token')
  }

  static userProfile() {
    return jwt.decode(sessionStorage.getItem('user_token'))
  }
}

export default Auth