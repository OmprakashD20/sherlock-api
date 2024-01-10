const handleError = (res, err, statusCode = 500) => {
  console.error(err);
  res.status(statusCode).json({ error: err });
};

const handleSuccess = (res, msg, data = {}, statusCode = 200) => {
  res
    .status(statusCode)
    .json(Object.keys(data).length > 0 ? data : { message: msg });
};

module.exports = {
  handleError,
  handleSuccess,
};
