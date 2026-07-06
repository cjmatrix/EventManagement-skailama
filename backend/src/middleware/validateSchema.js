import { ZodError } from 'zod';

import AppError from '../utils/errorHandler.js';

const validateSchema = (schema) => {
  return (req,_, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {

        const errorMsg = error.errors
          .map((err) => `${err.path.join('.')}: ${err.message}`)
          .join(', ');
      }

      throw new AppError(`Validation Error - ${errorMsg}`,400)
    }
  };
};


export default validateSchema
