import React from "react";
import { UserService } from "../services";
import { Role } from "../models";
import Forbidden from "./error/client/Forbidden";
import { Outlet } from "react-router-dom";

interface SecurityOutletProps extends React.PropsWithChildren {
  roles: Role[];
}

export function SecurityOutlet(props: Readonly<SecurityOutletProps>) {
  const allowed = props.roles.some((role) => UserService.isInRole(role));

  if (!allowed) return <Forbidden />;

  return props.children ? <>{props.children}</> : <Outlet />;
}

export default SecurityOutlet;

