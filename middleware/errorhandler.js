const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode ?? 500;
  const resObject = { error: err.message };
  if (err.data) {
    resObject.data = err.data;
  }
  res.staus(statusCode);
  res.json(resObject);
};
module.exports = errorHandler;
