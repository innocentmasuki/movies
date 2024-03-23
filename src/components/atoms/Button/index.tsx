import React from "react";

const Button = ({
  text,
  onClick,
  icon,
  iconPosition = "left",
}: {
  text?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}) => {
  return (
    <button
      onClick={onClick}
      className={`bg-gray-800 rounded-full duration-75 gap-2 px-4 py-2 flex justify-start${iconPosition === "left" ? "flex-row" : "flex-row-reverse"} text-white hover:bg-red-700`}
    >
      {icon}
      {text}
    </button>
  );
};
export default Button;
