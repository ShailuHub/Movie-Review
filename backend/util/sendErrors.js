const sendError = (res, statusCode = 400, error) => {
  res.status(statusCode).json({
    error: error,
  });
};
export default sendError;
