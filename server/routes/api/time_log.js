import TimeLog from '../../models/time_log'
import authenticateUser from '../../middleware/authenticate_user'

export default (app) => {
  app.get('/api/time-logs', authenticateUser, (req, res, next) => {
    const userId = req.currentUser.userId
    TimeLog.find({ user_id: userId }).sort({ createdAt: -1 })
      .exec()
      .then(results => {
        const response = {
          count: results.length,
          timeLogs: results.map(result => {
            return {
              description: result.description,
              _id: result._id,
              time_in: result.time_in,
              time_out: result.time_out,
              createdAt: result.createdAt,
              updatedAt: result.updatedAt
            }
          })
        }

        res.status(200).json(response)
      })
  })

  app.patch('/api/time-log/:timeLogId', authenticateUser, (req, res, next) => {
    const id = req.params.timeLogId
    const updateOps = {}
    for (const ops in req.body) {
      updateOps[ops] = req.body[ops]
    }
    
    TimeLog.updateOne({ _id: id }, { $set: updateOps })
      .exec()
      .then(result => {
        res.status(200).json({
          message: 'TimeLog updated'
        })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          error: err
        });
      })
  })

  app.post('/api/time-log', authenticateUser, (req, res, next) => {
    const {
      description,
      time_in,
      time_out,
    } = req.body
    const currentUser = req.currentUser

    const timeLog = new TimeLog({
      description: description,
      time_in: time_in,
      time_out: time_out,
      user_id: currentUser.userId
    })

    timeLog.save().then(result => {
      res.status(201).json({
        message: "TimeLog created",
        _id: result._id
      });
    }).catch(err => {
      console.log(err)
      return res.status(500).json({
        message: err
      })
    })
  })

  app.delete('/api/time-log/:timeLogId', authenticateUser, (req, res, next) => {
    const id = req.params.timeLogId

    TimeLog.deleteOne( { _id: id })
      .exec()
      .then(result => {
        res.status(200).json({
          message: 'TimeLog deleted'
        })
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      })
  })
};