import jwt from 'jsonwebtoken'

export default (params) =>  {
  return jwt.sign(
    params,
    process.env.JWT_KEY, 
    {
      expiresIn: '24h'
    }
  )
}
