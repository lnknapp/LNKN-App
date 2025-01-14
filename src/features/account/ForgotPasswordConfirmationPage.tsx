import { motion } from "framer-motion";
import { router, routes } from "../../app/routes";
import { Button, Link } from "../../components";
import { FaArrowLeft } from "react-icons/fa";

export function ForgotPasswordConfirmationPage() {
  return (
    <motion.div
      initial={{ y: "10px", opacity: 0 }}
      animate={{y: 0, opacity: 1 }}
      exit={{ y: "50%", opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut"}}
    >
      <h2 className="text-3xl">Please check your email</h2>
      <h4 className="text-lg text-gray-500 mb-4">We sent you a secured link to reset your password.</h4>
      <p>If you don't receive the email within a few minutes, please check your spam folder before trying again.</p>
      <Button className="mb-3" onClick={() => { router.navigate(routes.account.password.forgot.index) }}>Resend</Button>
      <div className="flex justify-center">
        <Link className="no-underline text-gray-500" url={routes.account.login}><FaArrowLeft/> Back to login</Link>
      </div>
    </motion.div>
  );
}

export default ForgotPasswordConfirmationPage;
