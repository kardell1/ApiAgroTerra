const responseGeneric = (res, msg, status = 400, success, details = []) => {
     // console.log("usando la respuesta generica ");

     console.log(res);
     return res.status(status).json({
          success,
          msg,
          details,
     });
};
export default responseGeneric;
