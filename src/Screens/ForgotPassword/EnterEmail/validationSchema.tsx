import * as yup from 'yup';

const validationSchema = yup.object({
  email: yup.string().email().required('Please provide your email'),
});

export default validationSchema;
