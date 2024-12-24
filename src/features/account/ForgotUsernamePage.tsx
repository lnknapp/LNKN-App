import * as yup from 'yup';
import { Formik } from 'formik';
import { motion } from "framer-motion";
import { useForgotPassword } from "./hooks";
import { Button, Link } from "../../components";
import { routes } from "../../app/routes";
import { FloatingLabel, Form } from 'react-bootstrap';
import { ForgotPasswordRequest } from '../../models';
import { FaArrowLeft } from 'react-icons/fa';

export function ForgotUsernamePage() {
  const { forgotPassword: handleSubmit, showSpinner } = useForgotPassword();

  const validationSchema = yup.object().shape({
    email: yup.string().email("Email must be valid").required("Email is required")
  });

  return (
    <motion.div
      initial={{ y: "10px", opacity: 0 }}
      animate={{y: 0, opacity: 1 }}
      exit={{ y: "50%", opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut"}}
    >
      <h2 className="fs-1">Forgot Username?</h2>
      <h4 className="fs-5 text-muted mb-4 fw-lighter">No worries, we'll send you an email.</h4>
      <Formik
        validationSchema={validationSchema}
          initialValues={{
            email: ''
          }}
          onSubmit={async (values) => {
            handleSubmit({
              email: values.email
            } as ForgotPasswordRequest)
          }}
        >
          {({values, handleSubmit, handleChange, touched, errors}) => {
            return (
              <Form onSubmit={handleSubmit}>
                <div className="row">
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
                  <div className="col col-24 my-2">
                    <Button type="submit" showSpinner={showSpinner}>Submit</Button>
                  </div>
                  <div className="d-flex justify-content-center">
                    <Link className="text-decoration-none text-muted" url={routes.account.login}><FaArrowLeft/> Back to login</Link>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
    </motion.div>
  );
}


export default ForgotUsernamePage;
