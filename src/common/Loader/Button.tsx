import React from "react";
interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "outline";
  fullWidth?: boolean;
  onClick?: () => void;
}
export const Button = ({
  children,
  variant = "primary",
  fullWidth = false,
  onClick,
}: ButtonProps) => {
  const baseClasses =
    "py-2 px-6 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-1 ";
  const variantClasses = {
    primary:
      "bg-[#0077B6] hover:bg-[#FFFFFF] hover:text-[#0077B6] text-white border-1 border-[#FFFFFF] hover:outline hover:outline-1 hover:outline-[#0077B6]",
    outline:
      "bg-[#FFFFFF] hover:bg-[#0077B6] text-[#000000] hover:text-[#FFFFFF] outline outline-1 outline-[#023E8A] hover:outline-[#39A7FF]",
  };
  const widthClass = fullWidth ? "w-full" : "";
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${widthClass}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
