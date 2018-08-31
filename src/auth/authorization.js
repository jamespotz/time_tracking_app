import jwt from 'jsonwebtoken'

const token = sessionStorage.getItem('user_token')

class Auth {
  static authHeader() {
    return `Bearer ${token}`
  }

  static signOut() {
    sessionStorage.removeItem('user_token')
  }

  static userProfile() {
    return jwt.decode(token)
  }
}

export default Auth