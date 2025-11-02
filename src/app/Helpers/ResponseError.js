const responseError = (res, message, status = 400, details = []) => {
  return res.status(status).json({
    success: false,
    message,
    details,
  });
};
export default responseError;
