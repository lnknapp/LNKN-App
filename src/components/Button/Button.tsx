import { PropsWithChildren } from "react";
import { Button as NextButton} from "@nextui-org/react";

interface ButtonProps extends PropsWithChildren {
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
  size?: "sm" | "lg";
  className?: string;
  children?: React.ReactNode;
  onClick?: (e?: any) => void;
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  variant?: "solid" | "faded" | "bordered" | "light" | "flat" | "ghost" | "shadow";
  ref?: React.RefObject<HTMLButtonElement>;
}

export function Button({ isLoading, type, className, size, children, onClick, color, variant, ref }: Readonly<ButtonProps>) {
  return (

    <NextButton
      isLoading={isLoading}
      type={type}
      color={color}
      variant={variant}
      ref={ref}
      size={size}
      onPress={onClick}
      className={`btn ${className}`}
      style={{padding: "0.5rem 0.75rem", fontWeight: 600}}
    >
      {children}
    </NextButton>
  );
}

Button.defaultProps = {
  showSpinner: false,
  type: "button",
  size: "sm",
  color: "primary",
  variant: "solid",
}
