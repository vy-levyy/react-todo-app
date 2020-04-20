import * as yup from 'yup';

const validationSchemasMap = new Map([
  ['email', yup.string().email().required()],
  ['password',
    yup
      .string()
      .min(6)
      .max(25)
      .matches(/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g)
      .required()
  ]
]);

export default validationSchemasMap;
