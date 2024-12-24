import { PropsWithChildren } from "react";
import logo from "../../images/branding/logo-brown-text-white-inline.svg";
import { routes, router } from "../../app/routes";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store/store";
import {
  LinkLooksLike,
} from "..";
import { motion } from "framer-motion";

interface AppTopbarProps extends PropsWithChildren {
  showToggle: boolean;
  onToggle?: () => void;
}

export function AppTopbar(props: Readonly<AppTopbarProps>) {
  const isLoggedIn = useSelector((state: RootState) => state.authentication.isSignedIn);

  const menuToggle = (e: any) => {
    props.onToggle?.call(null);
  };

  const logoClick = () => {
    router.navigate(routes.home);
  };

  return (
    <nav
      className={`navbar navbar-expand-lg bg-primary py-2 px-3 ${isLoggedIn ? 'justify-content-between' : 'justify-content-center'}`}
    >
      <LinkLooksLike
        className="text-lg text-light toggle lg-invisible"
        onClick={menuToggle}
      >
        <span>menu</span>
      </LinkLooksLike>
      <span className={`cursor-pointer py-2 lh-5 fs-3 me-0 ms-3`} onClick={logoClick}>
        <motion.div
          className="box"
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
        </motion.div>
      </span>
    </nav>
  );
}

export default AppTopbar;

