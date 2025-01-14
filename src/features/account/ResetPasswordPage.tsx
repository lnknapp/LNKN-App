import * as yup from 'yup';
import { Formik } from 'formik';
import { motion } from "framer-motion";
import { Input } from "@nextui-org/react";
import { UrlService } from "../../services";
import { Button } from "../../components";
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
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "50%", opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <h2 className="text-3xl font-bold">Reset Password</h2>
      <h4 className="text-lg text-gray-500 mb-4">Enter a new password.</h4>
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
        {({ values, handleSubmit, handleChange, touched, errors }) => {
          return (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <Input
                  type="email"
                  label="Email"
                  placeholder="Email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  isInvalid={touched.email && !!errors.email}
                  errorMessage={errors.email}
                  fullWidth
                  className="mb-3"
                />
              </div>
              <div>
                <Input
                  type="password"
                  label="Password"
                  placeholder="Password"
                  name="password"
                  value={values.password}
                  errorMessage={errors.password}
                  onChange={handleChange}
                  isInvalid={touched.password && !!errors.password}
                  fullWidth
                  className="mb-3"
                />
              </div>
              <div>
                <Input
                  type="password"
                  label="Confirm Password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  errorMessage={errors.confirmPassword}
                  onChange={handleChange}
                  isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                  fullWidth
                  className="mb-3"
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <div className="text-red-500 text-sm">{errors.confirmPassword}</div>
                )}
              </div>
              <Button
                type="submit"
                isLoading={showSpinner}
                className="py-2 w-full"
              >
                Reset Password
              </Button>
            </form>
          );
        }}
      </Formik>
    </motion.div>
  );
}

export default ResetPasswordPage;
