import { routes } from "../../app/routes";
import * as yup from 'yup';
import { Formik } from 'formik';
import { Button, Link } from "../../components";
import { useAuthentication } from "./hooks";
import { motion } from "framer-motion";
import { Form, Checkbox, Input } from "@nextui-org/react";


export function LoginPage() {

  const { loginUser, showSpinner } = useAuthentication();

  const validationSchema = yup.object().shape({
    emailOrUsername: yup.string().required("Email or Username is required"),
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
      <div className="flex flex-col items-center lg:items-start">
        <h2 className="text-3xl">Log in to Your Account</h2>
        <h4 className="text-lg text-gray-500 mb-4">Welcome back! Please enter your details.</h4>
      </div>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          emailOrUsername: "",
          password: "",
          rememberMe: false
        }}
        onSubmit={async (values) => { loginUser(values.emailOrUsername, values.password, values.rememberMe) }}
      >
        {({values, handleSubmit, handleChange, errors, touched, setFieldValue}) => {
          return (
            <Form className="w-full" onSubmit={handleSubmit}>
              <div className="mb-3 w-full">
                <Input
                  type="string"
                  label="Email or Username"
                  name="emailOrUsername"
                  errorMessage={errors.emailOrUsername}
                  value={values.emailOrUsername}
                  onChange={handleChange}
                  isInvalid={touched.emailOrUsername && !!errors.emailOrUsername}
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
              <div className="flex justify-between mb-3 w-full">
                <Checkbox
                  type="checkbox"
                  id="rememberMe"
                  isSelected={values.rememberMe}
                  onValueChange={(value) => {setFieldValue("rememberMe", value)}}
                >
                  Remember me
                </Checkbox>
                <div>
                  <Link className="no-underline text-primary" url={routes.account.username.forgot.index}>Forgot username?</Link>
                  <span className="mx-2">·</span>
                  <Link className="no-underline text-primary" url={routes.account.password.forgot.index}>Forgot password?</Link>
                </div>
              </div>

              <div className="w-full">
                <Button className='py-2 w-full' type="submit" isLoading={showSpinner}>Login</Button>
              </div>
              <div className="mt-3 w-full">
                <span>Don't have an account? <Link className="no-underline text-primary" url={routes.account.register.index}>Sign up</Link>.</span>
              </div>
            </Form>
          )
        }}
      </Formik>
    </motion.div>
  );
}


export default LoginPage;

