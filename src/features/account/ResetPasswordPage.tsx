import * as yup from 'yup';
import { Formik } from 'formik';
import { motion } from "framer-motion";
import { FloatingLabel, Form } from "react-bootstrap";
import { Button } from "../../components";
import { UrlService } from "../../services";
import { useResetPassword } from "./hooks";
import { ResetPasswordRequest } from "../../models";

export function ResetPasswordPage() {
  const { resetPassword: handleSubmit, showSpinner } = useResetPassword();

  const validationSchema = yup.object().shape({
    email: yup.string().email('Email must be valid').required("Email Address is required"),
    password: yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .matches(/[^A-Za-z0-9]/, "Password must contain at least one non-alphanumeric character"),
    confirmPassword: yup.string()
      .required("Confirm Password is required")
      .oneOf([yup.ref('password')], 'Passwords do not match')
  });

  const code = UrlService.getQueryParams<string>("code")!;

  return (
    <motion.div
      initial={{ y: "10px", opacity: 0 }}
      animate={{y: 0, opacity: 1 }}
      exit={{ y: "50%", opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut"}}
    >
      <h2 className="fs-1">Reset Password</h2>
      <h4 className="fs-5 text-muted mb-4 fw-lighter">Enter a new password.</h4>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
          code: ""
        }}
        onSubmit={async (values) => {
          handleSubmit({
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword,
            code: code
          } as ResetPasswordRequest)
        }}
      >
        {({values, handleSubmit, handleChange, touched, errors}) => {
          return (
            <Form onSubmit={handleSubmit} noValidate>
              <div className="row">
                <div className="col col-24">
                  <FloatingLabel label="Email" className="mb-3">
                    <Form.Control
                        type="email"
                        placeholder="Email"
                        name="email"
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
                  <FloatingLabel label="Password" className="mb-3">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={values.password}
                      size="lg"
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
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      value={values.confirmPassword}
                      size="lg"
                      onChange={handleChange}
                      isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.confirmPassword}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </div>
                <div className="col col-24">
                  <Button className='py-2' type="submit" showSpinner={showSpinner}>Submit</Button>
                </div>
              </div>
            </Form>
          )
        }}
      </Formik>
    </motion.div>
  );
}

export default ResetPasswordPage;
