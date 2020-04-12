const Status = require('../const').ResponseStatus;

const handleError = (res, err) => {
  if (err.response) {
    console.error(err.response.data);
    return res.status(err.response.status).json(err.response.data);
  }

  console.log(err.message);
  return res.status(Status.INTERNAL_SERVER_ERROR).json(err.message);
};

module.exports = handleError;
