import React from "react";
import { router } from "../../app/routes";
import { Link as RouterLink } from "react-router-dom";

export interface LinkProps extends React.PropsWithChildren {
  url: string;
  className?: string;
  params?: Map<string, string>;
  target?: React.HTMLAttributeAnchorTarget;
}

export function Link(props: LinkProps) {
  let processedUrl = props.params
    ? router.getUrl(props.url, props.params)
    : props.url;

  return (
    <RouterLink
      to={processedUrl}
      className={`clickable ${props.className ?? ""}`}
      target={props.target}
    >
      {props.children}
    </RouterLink>
  );
}

export default Link;

