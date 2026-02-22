import * as yup from 'yup';
import { Formik } from 'formik';
import { motion } from 'framer-motion';
import { Input } from '@nextui-org/react';
import { Button } from '../../components';
import { useResetPassword } from './hooks';

export function ResetPasswordPage() {
  const { resetPassword: handleSubmit, showSpinner } = useResetPassword();

  const validationSchema = yup.object().shape({
    password: yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters long')
      .matches(/[^A-Za-z0-9]/, 'Password must contain at least one non-alphanumeric character'),
    confirmPassword: yup.string()
      .required('Confirm Password is required')
      .oneOf([yup.ref('password')], 'Passwords do not match'),
  });

  return (
    <motion.div
      initial={{ y: '10px', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: '50%', opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <h2 className="text-3xl font-bold">Reset Password</h2>
      <h4 className="text-lg text-gray-500 mb-4">Enter a new password.</h4>
      <Formik
        validationSchema={validationSchema}
        initialValues={{ password: '', confirmPassword: '' }}
        onSubmit={async (values) => handleSubmit({ password: values.password })}
      >
        {({ values, handleSubmit, handleChange, touched, errors }) => (
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <Input
              type="password"
              label="New Password"
              name="password"
              value={values.password}
              errorMessage={errors.password}
              onChange={handleChange}
              isInvalid={touched.password && !!errors.password}
              variant="bordered"
            />
            <Input
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              value={values.confirmPassword}
              errorMessage={errors.confirmPassword}
              onChange={handleChange}
              isInvalid={touched.confirmPassword && !!errors.confirmPassword}
              variant="bordered"
            />
            <Button type="submit" isLoading={showSpinner} className="py-2 w-full">
              Reset Password
            </Button>
          </form>
        )}
      </Formik>
    </motion.div>
  );
}

export default ResetPasswordPage;
