import * as yup from 'yup';
import { Formik } from 'formik';
import { Button, Link } from "../../components";
import { useRegistration } from "./hooks";
import { routes } from "../../app/routes";
import { motion } from 'framer-motion';
import { RegisterRequest } from '../../models';
import { FloatingLabel, Form } from 'react-bootstrap';

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
      .oneOf([yup.ref('password')], 'Passwords do not match')
  });

  return (
    <motion.div
      initial={{ y: "10px", opacity: 0 }}
      animate={{y: 0, opacity: 1 }}
      exit={{ y: "50%", opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut"}}
    >
      <h2 className="fs-1">Create Your Account</h2>
      <h4 className="fs-5 text-muted mb-4 fw-lighter">Register now and get started!</h4>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          email: '',
          userName: '',
          password: '',
          confirmPassword: ''
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
            <Form onSubmit={handleSubmit} noValidate>
              <div className="row mb-3">
                <div className="col col-24">
                  <FloatingLabel label="Email" className="mb-3">
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder='Email'
                        value={values.email}
                        onChange={handleChange}
                        isInvalid={touched.email && !!errors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                  </FloatingLabel>
                </div>
                <div className="col col-24">
                  <FloatingLabel label="Username" className="mb-3">
                    <Form.Control
                        type="string"
                        name="userName"
                        placeholder='Username'
                        value={values.userName}
                        onChange={handleChange}
                        isInvalid={touched.userName && !!errors.userName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.userName}
                      </Form.Control.Feedback>
                  </FloatingLabel>
                </div>
                <div className="col col-24">
                  <FloatingLabel label="Password" className="mb-3">
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder='Password'
                        value={values.password}
                        onChange={handleChange}
                        isInvalid={touched.password && !!errors.password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                  </FloatingLabel>
                </div>
                <div className="col col-24">
                  <FloatingLabel label="Confirm Password" className="mb-3">
                    <Form.Control
                        type="password"
                        name="confirmPassword"
                        placeholder='Confirm Password'
                        value={values.confirmPassword}
                        onChange={handleChange}
                        isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.confirmPassword}
                      </Form.Control.Feedback>
                  </FloatingLabel>
                </div>
                <div className="col">
                  <Button type="submit" showSpinner={showSpinner}>Register</Button>
                  <div className="d-flex justify-content-start mt-3">
                    <span className="text-muted">Already have an account? <Link className="text-decoration-none" url={routes.account.login}>Login</Link>.</span>
                  </div>
                </div>
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

