import * as TimeLogController from '../../controllers/time_log_controller';
import authenticateUser from '../../middleware/authenticate_user';

export default app => {
  app.get('/api/time-logs', authenticateUser, TimeLogController.getAll);

  app.patch(
    '/api/time-log/:timeLogId',
    authenticateUser,
    TimeLogController.update,
  );

  app.post('/api/time-log', authenticateUser, TimeLogController.create);

  app.delete(
    '/api/time-log/:timeLogId',
    authenticateUser,
    TimeLogController.deleteTimeLog,
  );

  app.get(
    '/api/time-logs/filter',
    authenticateUser,
    TimeLogController.filterTimeLog,
  );
};
