const errorNotFound = (err, req, res, next) => {
  const error = new Error("route not found");
  error.statusCode = 404;
  throw error;
};
module.exports = errorNotFound;
