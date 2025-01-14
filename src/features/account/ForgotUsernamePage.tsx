import * as yup from 'yup';
import { Formik } from 'formik';
import { motion } from "framer-motion";
import { useForgotUsername } from "./hooks";
import { Button, Link } from "../../components";
import { routes } from "../../app/routes";
import { Input } from "@nextui-org/react";
import { ForgotUsernameRequest } from '../../models';
import { FaArrowLeft } from 'react-icons/fa';

export function ForgotUsernamePage() {
  const { forgotUsername: handleSubmit, showSpinner } = useForgotUsername();

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
      <h2 className="text-3xl">Forgot Username?</h2>
      <h4 className="text-lg text-gray-500 mb-4">No worries, we'll send you an email.</h4>
      <Formik
        validationSchema={validationSchema}
          initialValues={{
            email: ''
          }}
          onSubmit={async (values) => {
            handleSubmit({
              email: values.email
            } as ForgotUsernameRequest)
          }}
        >
          {({values, handleSubmit, handleChange, touched, errors}) => {
            return (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div>
                  <Input
                    type="string"
                    label="Email"
                    name="email"
                    errorMessage={errors.email}
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={touched.email && !!errors.email}
                    variant="bordered"
                  />
                </div>
                <Button
                  type="submit"
                  isLoading={showSpinner}
                  className="py-2 w-full"
                >
                  Submit
                </Button>
                <div className="flex justify-center">
                  <Link className="no-underline text-gray-500 flex items-center" url={routes.account.login}>
                    <FaArrowLeft className="mr-2" /> <span>Back to login</span>
                  </Link>
                </div>
              </form>
            );
          }}
        </Formik>
    </motion.div>
  );
}


export default ForgotUsernamePage;
