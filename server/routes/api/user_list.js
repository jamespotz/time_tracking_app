import * as UserController from '../../controllers/user_lists_controller';
import authenticateUser from '../../middleware/authenticate_user';

export default app => {
  app.get('/api/user-lists', authenticateUser, UserController.getAll);
};
