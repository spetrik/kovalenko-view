module.exports = errorHandler;

function errorHandler (err, req, res, next) {
  if (typeof (err) === 'string') {
    // custom application error
    return res.status(400).send(err);
  }
  return res.status(err.status).send(err.message || err.toLocaleString());
}