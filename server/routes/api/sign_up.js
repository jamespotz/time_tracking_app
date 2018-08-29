import UsersController from '../../controllers/users_controller'

export default (app) => {
  app.post('/api/sign-up', UsersController.signUpUser)

  app.post('/api/sign-in', UsersController.signInUser)
}