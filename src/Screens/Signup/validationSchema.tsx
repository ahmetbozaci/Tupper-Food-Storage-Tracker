import * as yup from 'yup';

const validationSchema = yup.object({
  name: yup.string().required('Please, provide your name'),
  email: yup.string().email().required('Please provide your email'),
  zipcode: yup.string().required('Please provide your zipcode'),
  password: yup
    .string()
    .min(8, 'Password should minimum 8 characters.')
    .required(),
  passwordConfirmation: yup.string().when('password', {
    is: (val: string | any[]) => (val && val.length > 0 ? true : false),
    then: yup
      .string()
      .oneOf([yup.ref('password')], 'Both password need to be the same'),
  }),
});

export default validationSchema;
