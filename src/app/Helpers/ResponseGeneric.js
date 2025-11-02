const responseGeneric = (res, message, status = 400, success, details = []) => {
  return res.status(status).json({
    success,
    message,
    details,
  });
};
export default responseGeneric;
