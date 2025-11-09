const responseGeneric = (res, msg, status = 400, success, details = []) => {
  return res.status(status).json({
    success,
    msg,
    details,
  });
};
export default responseGeneric;
