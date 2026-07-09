import { ZodError } from 'zod';

import AppError from '../utils/errorHandler.js';

const validateSchema = (schema) => {
  return (req,_, next) => {
    try {
      console.log(req.body)
      schema.parse(req.body);
      
      next();
    } catch (error) {
      if (error instanceof ZodError) {
           console.log(error)
        const errorMsg = error.errors
          .map((err) => `${err.path.join('.')}: ${err.message}`)
          .join(', ');

          return next(new AppError(`Validation Error - ${errorMsg}`, 400));
      }

      return next(new AppError("Internal Server Error during validation", 500));
   
    }
  };
};


export default validateSchema
