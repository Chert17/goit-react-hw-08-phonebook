import { object, string } from 'yup';

export const loginSchema = object({
  email: string()
    .matches(/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid email')
    .required('Email is a required'),
  password: string()
    .min(6, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is a required'),
});

export const registrationSchema = object({
  ...loginSchema.fields,
  name: string()
    .min(3, ({ min }) => `Name must be at least ${min} characters`)
    .max(30, ({ max }) => `Name must be at most ${max} characters`)
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      'Name may contain only letters, apostrophe, dash and spaces.'
    )
    .required('Name is required'),
});
