import TimeLog from '../models/time_log'
import getIp from '../operations/get_client_ip'

exports.getAll = (req, res, next) => {
  const userId = req.currentUser.userId
  const pageOpts = {
    page: req.query.page || 0,
    limit: req.query.limit || 10
  }

  TimeLog.find({
      user_id: userId
    }, null, {
      sort: {
        createdAt: -1
      }
    })
    .limit(Number(pageOpts.limit))
    .skip(pageOpts.page * pageOpts.limit)
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
            updatedAt: result.updatedAt,
            ip_address: result.ipAddress
          }
        })
      }

      res.status(200).json(response)
    })
}

exports.update = (req, res, next) => {
  const id = req.params.timeLogId
  let ipAddress = getIp(req)
  const updateOps = {}
  for (const ops in req.body) {
    updateOps[ops] = req.body[ops]
  }
  updateOps['ipAddress'] = ipAddress

  TimeLog.updateOne({
      _id: id
    }, {
      $set: updateOps
    })
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
}

exports.create = (req, res, next) => {
  let ipAddress = getIp(req)
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
    user_id: currentUser.userId,
    ipAddress: ipAddress
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
}

exports.delete = (req, res, next) => {
  const id = req.params.timeLogId

  TimeLog.deleteOne({
      _id: id
    })
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
}




