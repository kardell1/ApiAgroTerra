const responseError = (res, msg, status = 400, details = []) => {
  return res.status(status).json({
    success: false,
    msg,
    details,
  });
};
export default responseError;
