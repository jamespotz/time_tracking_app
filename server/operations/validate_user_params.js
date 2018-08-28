export default ({ first_name, last_name, email, password }) => {
  return new Promise((resolve, reject) => {
    if (!email) {
      reject('Email can\'t be blank')
    }
  
    if (!password) {
      reject('Password can\'t be blank')
    }
  
    if (!first_name) {
      reject('First name can\'t be blank')
    }
  
    if (!last_name) {
      reject('Last name can\'t be blank')
    }
  
    resolve(true)
  })
}
