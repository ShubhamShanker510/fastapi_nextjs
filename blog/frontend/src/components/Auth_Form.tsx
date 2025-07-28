"use client";

import Link from "next/link";
import { useState } from "react";

type AuthFormProps = {
  isLogin: boolean;
};

export default function AuthForm({ isLogin }: AuthFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    repeatPassword: "",
    userName: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLogin && formData.password !== formData.repeatPassword) {
      setError("Passwords do not match");
      return;
    }

    if (isLogin) {
      console.log("Logging in with:", {
        email: formData.email,
        password: formData.password,
      });
    } else {
      console.log("Registering:", formData);
    }
  };

  return (
    <form
      className="z-20 relative max-w-md mx-auto p-4"
      onSubmit={handleSubmit}
    >
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {!isLogin && (
      <Input
        label="Username"
        name="userName"
        value={formData.userName}
        onChange={handleChange}
        required
      />
      )}
      <Input
        label="Email address"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <Input
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      {!isLogin && (
        <>
          <Input
            label="Confirm Password"
            type="password"
            name="repeatPassword"
            value={formData.repeatPassword}
            onChange={handleChange}
            required
          />
        </>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
      >
        {isLogin ? "Login" : "Register"}
      </button>
      {
        (!isLogin? <> <p className="text-sm text-center mt-4">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600 hover:underline">
          Click here to login
        </Link>
      </p></> : <> <p className="text-sm text-center mt-4">
        Dont have an account?{" "}
        <Link href="/register" className="text-blue-600 hover:underline">
          Click here to register
        </Link>
      </p></>)
      }
     
    </form>
  );
}

type InputProps = {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  pattern?: string;
};

function Input({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  pattern,
}: InputProps) {
  const id = name;
  return (
    <div className="relative z-0 w-full mb-5 group">
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        required={required}
        pattern={pattern}
      />
      <label
        htmlFor={id}
        className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600"
      >
        {label}
      </label>
    </div>
  );
}
