import * as yup from 'yup';

const validationSchema = yup.object({
  email: yup.string().email().required('Please provide your email'),
  password: yup.string().required(),
});

export default validationSchema;
