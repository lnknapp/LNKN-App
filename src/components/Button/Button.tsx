import { PropsWithChildren } from "react";
import { Button as BSButton, Spinner} from "react-bootstrap";

interface ButtonProps extends PropsWithChildren {
  showSpinner?: boolean;
  type?: "button" | "submit" | "reset";
  size?: "sm" | "lg";
  className?: string;
  children?: React.ReactNode;
  onClick?: (e?: any) => void;
  variant?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "cancel";
  ref?: React.RefObject<HTMLButtonElement>;
}

export function Button({ showSpinner, type, className, size, children, onClick, variant, ref }: Readonly<ButtonProps>) {
  return (

    <BSButton
      type={type}
      variant={variant}
      ref={ref}
      size={size}
      onClick={onClick}
      className={`btn w-100 ${className}`}
      style={{padding: "0.5rem 0.75rem"}}
    >
      {
        showSpinner ?
          (<Spinner size="sm" animation="border" variant="light" as="span" role="output" aria-hidden="true" />) :
          children
      }
    </BSButton>
  );
}

Button.defaultProps = {
  showSpinner: false,
  type: "button",
  size: "sm",
  variant: "primary"
}
