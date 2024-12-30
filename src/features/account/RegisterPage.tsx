import * as yup from 'yup';
import { Formik } from 'formik';
import { Button, Link } from "../../components";
import { useRegistration } from "./hooks";
import { routes } from "../../app/routes";
import { motion } from 'framer-motion';
import { RegisterRequest } from '../../models';
import { Form, Input, Checkbox } from "@nextui-org/react";

export function RegisterPage() {

  const {
    registerUser: handleSubmit,
    showSpinner,
    checkUsernameExists,
    checkEmailExists
  } = useRegistration();

  const validationSchema = yup.object().shape({
    email: yup.string().email("Email must be valid").required("Email is required")
      .test('checkEmailExists', 'Email already exists', async (value) => {
        if (!value) return false;
        const exists = await checkEmailExists(value);
        return !exists;
      }),
    userName: yup.string().required("Username is required")
      .test('checkUsernameExists', 'Username already exists', async (value) => {
        if (!value) return false;
        const exists = await checkUsernameExists(value);
        return !exists;
      }),
    password: yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .matches(/[^A-Za-z0-9]/, "Password must contain at least one non-alphanumeric character"),
    confirmPassword: yup.string()
      .required("Confirm Password is required")
      .oneOf([yup.ref('password')], 'Passwords do not match'),
    termsAndConditions: yup.boolean().required("You must agree to the Terms and Conditions")
  });

  return (
    <motion.div
      initial={{ y: "10px", opacity: 0 }}
      animate={{y: 0, opacity: 1 }}
      exit={{ y: "50%", opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut"}}
    >
      <h2 className="text-3xl">Create Your Account</h2>
      <h4 className="text-lg text-gray-500 mb-4">Register now and get started!</h4>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          email: '',
          userName: '',
          password: '',
          confirmPassword: '',
          termsAndConditions: false
        }}
        onSubmit={async (values) => {
          handleSubmit({
            email: values.email,
            userName: values.userName,
            password: values.password,
            confirmPassword: values.confirmPassword,
          } as RegisterRequest)
        }}
      >
        {({ values, handleSubmit, handleChange, touched, errors }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <div className="mb-3 w-full">
                <Input
                  type="string"
                  label="Email or Username"
                  name="emailOrUsername"
                  errorMessage={errors.email}
                  value={values.email}
                  onChange={handleChange}
                  isInvalid={touched.email && !!errors.email}
                  variant="bordered"
                />
              </div>
              <div className="mb-3 w-full">
                <Input
                  type="string"
                  label="Username"
                  name="userName"
                  errorMessage={errors.userName}
                  value={values.userName}
                  onChange={handleChange}
                  isInvalid={touched.userName && !!errors.userName}
                  variant="bordered"
                />
              </div>
              <div className="mb-3 w-full">
                <Input
                  type="password"
                  label="Password"
                  name="password"
                  errorMessage={errors.password}
                  value={values.password}
                  onChange={handleChange}
                  isInvalid={touched.password && !!errors.password}
                  variant="bordered"
                />
              </div>
              <div className="mb-3 w-full">
                <Input
                  type="password"
                  label="Confirm Password"
                  name="confirmPassword"
                  errorMessage={errors.confirmPassword}
                  value={values.confirmPassword}
                  onChange={handleChange}
                  isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                  variant="bordered"
                />
              </div>
              <div className="mb-3 w-full">
                <Checkbox
                  type="checkbox"
                  id="termsAndConditions"
                  isSelected={values.termsAndConditions}
                  onValueChange={handleChange}
                >
                  I agree to the <Link className="no-underline text-primary" url={"routes.terms"}>Terms and Conditions</Link>.
                </Checkbox>
              </div>
              <div className="w-full">
                <Button className='py-2 w-full' type="submit" isLoading={showSpinner}>Register</Button>
              </div>
              <div className="mt-3 w-full">
                <span className="text-muted">Already have an account? <Link className="no-underline text-primary" url={routes.account.login}>Login</Link>.</span>
              </div>
            </Form>
          )
        }}
      </Formik>
    </motion.div>
  );
}

// #endregion

export default RegisterPage;

