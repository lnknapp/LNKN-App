import { routes } from "../../app/routes";
import * as yup from 'yup';
import { Formik } from 'formik';
import { Button, Link, Toggle } from "../../components";
import { useAuthentication } from "./hooks";
import { motion } from "framer-motion";
import { FloatingLabel, Form } from "react-bootstrap";

export function LoginPage() {

  const { loginUser, showSpinner } = useAuthentication();

  const validationSchema = yup.object().shape({
    email: yup.string().email("Email must be valid").required("Email Address is required"),
    password: yup.string().required("Password is required"),
    rememberMe: yup.boolean().notRequired()
  })

  return (

    <motion.div
      initial={{ y: "10px", opacity: 0 }}
      animate={{y: 0, opacity: 1 }}
      exit={{ y: "50%", opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut"}}
    >
      <div className="d-flex flex-column align-items-center align-items-lg-start">
        <h2 className="fs-1">Log in to Your Account</h2>
        <h4 className="fs-5 text-muted mb-4 fw-lighter">Welcome back! Please enter your details.</h4>
      </div>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          email: "",
          password: "",
          rememberMe: false
        }}
        onSubmit={async (values) => { loginUser(values.email, values.password, values.rememberMe) }}
      >
        {({values, handleSubmit, handleChange, errors, touched, setFieldValue}) => {
          return (
            <Form onSubmit={handleSubmit} noValidate>
              <div className="row">
                <div className="col col-24">
                  <FloatingLabel label="Email or username" className="mb-3">
                    <Form.Control
                        type="email"
                        placeholder="Email or username"
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
                      onChange={handleChange}
                      isInvalid={touched.password && !!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <Toggle
                    type="checkbox"
                    id="rememberMe"
                    description="Remember me"
                    initialValue={values.rememberMe}
                    onChange={(value) => {setFieldValue("rememberMe", value)}}
                  />
                  <div>
                    <Link className="text-decoration-none" url={routes.account.username.forgot.index}>Forgot username?</Link>
                    <span className="mx-2">·</span>
                    <Link className="text-decoration-none" url={routes.account.password.forgot.index}>Forgot password?</Link>
                  </div>
                </div>
                <div className="col col-24">
                  <Button className='py-2' type="submit" showSpinner={showSpinner}>Login</Button>
                </div>
                <div className="mt-3">
                  <span>Don't have an account? <Link className="text-decoration-none" url={routes.account.register.index}>Sign up</Link>.</span>
                </div>
              </div>
            </Form>
          )
        }}
      </Formik>
    </motion.div>
  );
}


export default LoginPage;

