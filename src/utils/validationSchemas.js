import * as Yup from 'yup';

// Common Reusable Fields
export const requiredString = (fieldName) => Yup.string().required(`${fieldName} is required`);
export const requiredNumber = (fieldName) => Yup.number()
    .required(`${fieldName} is required`)
    .typeError(`${fieldName} must be a number`)
    .positive('Must be positive');