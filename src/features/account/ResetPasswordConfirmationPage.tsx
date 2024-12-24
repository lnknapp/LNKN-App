import { motion } from "framer-motion";
import { router, routes } from "../../app/routes";
import { Button } from "../../components";

export function ResetPasswordConfirmationPage() {
  return (
    <motion.div
      initial={{ y: "10px", opacity: 0 }}
      animate={{y: 0, opacity: 1 }}
      exit={{ y: "50%", opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut"}}
    >
      <h2 className="fs-1">Password reset successful</h2>
      <h4 className="fs-5 text-muted mb-4 fw-lighter">You can now log in with your new password.</h4>
      <Button className="btn-primary" onClick={() => { router.navigate(routes.account.login) }}>Login</Button>
    </motion.div>
  );
}
export default ResetPasswordConfirmationPage;

