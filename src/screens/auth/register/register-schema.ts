import * as Yup from 'yup';

const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .max(255, 'Email can not longer then 255 characters')
    .required('Email can not be empty'),
  password: Yup.string()
    .min(8, 'Password should be longer than 8 characters')
    .required('Password can not be empty'),
});

export default RegisterSchema;
