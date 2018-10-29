import User from '../models/user';

export const getAll = (req, res, next) => {
  const pageOpts = {
    page: req.query.page || 0,
    limit: req.query.limit || 10,
  };

  User.find()
    .limit(Number(pageOpts.limit))
    .skip(pageOpts.page * pageOpts.limit)
    .exec()
    .then(results => {
      const response = {
        count: results.length,
        userLists: results.map(result => {
          return {
            email: result.email,
            _id: result._id,
            first_name: result.first_name,
            last_name: result.last_name,
            createdAt: result.createdAt,
            is_admin: result.is_admin,
          };
        }),
      };

      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
