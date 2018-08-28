import * as routes from './api'
export default (app) => {
  routes.SignUp(app)
  routes.TimeLog(app)
}