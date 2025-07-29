export type ButtonProps = {
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};
