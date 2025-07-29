
import { InputProps } from "@/types/Input_Props";

export default function Input({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder = "",
}: InputProps) {
  const id = name;

  return (
    <div className="mb-5">
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                   focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      />
    </div>
  );
}