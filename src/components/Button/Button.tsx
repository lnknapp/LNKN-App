import { PropsWithChildren } from "react";
import { Button as NextButton} from "@nextui-org/react";

interface ButtonProps extends PropsWithChildren {
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
  size?: "sm" | "lg";
  className?: string;
  children?: React.ReactNode;
  onClick?: (e?: any) => void;
  variant?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  ref?: React.RefObject<HTMLButtonElement>;
}

export function Button({ isLoading, type, className, size, children, onClick, variant, ref }: Readonly<ButtonProps>) {
  return (

    <NextButton
      isLoading={isLoading}
      type={type}
      color={variant}
      ref={ref}
      size={size}
      onClick={onClick}
      className={`btn w-full ${className}`}
      style={{padding: "0.5rem 0.75rem"}}
    >
      {children}
    </NextButton>
  );
}

Button.defaultProps = {
  showSpinner: false,
  type: "button",
  size: "sm",
  variant: "primary"
}
