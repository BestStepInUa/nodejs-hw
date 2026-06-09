export const handleMongooseError = (error, doc, next) => {
  error.status = 400;
  next();
};
