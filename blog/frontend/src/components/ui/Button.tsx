import { ButtonProps } from "@/types/Button_Props";

export default function Button({
  type = "button",
  children,
  className = "",
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded ${className}`}
    >
      {children}
    </button>
  );
}