import { LinkTextProps } from "@/types/Link_Props";
import Link from "next/link";

export default function LinkText({
  textBefore = "",
  href,
  linkText,
  className = "text-sm text-center mt-4",
}: LinkTextProps) {
  return (
    <p className={className}>
      {textBefore && <span>{textBefore} </span>}
      <Link href={href} className="text-blue-600 hover:underline">
        {linkText}
      </Link>
    </p>
  );
}