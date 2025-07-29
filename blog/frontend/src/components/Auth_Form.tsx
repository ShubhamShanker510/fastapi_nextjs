"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Input from "./ui/Input";
import Button from "./ui/Button";
import LinkText from "./ui/Link";
import { tryLoadManifestWithRetries } from "next/dist/server/load-components";
import { loginUser, registerUser } from "@/services/auth_api";

type AuthFormProps = {
  isLogin: boolean;
};

export default function AuthForm({ isLogin }: AuthFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    repeatPassword: "",
    username: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLogin && formData.password !== formData.repeatPassword) {
      setError("Passwords do not match");
      return;
    }

    if (isLogin) {
      try {
        const data = await loginUser(formData.email, formData.password);
        console.log("✅ Login successfully:", data);
        router.push("/posts");
      } catch (error: any) {
        console.error(
          "❌ Login failed:",
          error.response?.data || error.message
        );
      }
    } else {
      try {
        const data = await registerUser(
          formData.username,
          formData.email,
          formData.password
        );
        console.log("✅ Registered successfully:", data);
        router.push("/login");
      } catch (error: any) {
        console.error(
          "❌ Registration failed:",
          error.response?.data || error.message
        );
      }
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-gray-100">
      <form
        className="bg-white p-8 rounded-lg shadow-md max-w-md w-full"
        onSubmit={handleSubmit}
      >
        {error && <p className="text-red-600 mb-4">{error}</p>}

        {!isLogin && (
          <Input
            label="Username"
            name="username"
            value={formData.username}
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
          <Input
            label="Confirm Password"
            type="password"
            name="repeatPassword"
            value={formData.repeatPassword}
            onChange={handleChange}
            required
          />
        )}

        <Button type="submit">{isLogin ? "Login" : "Register"}</Button>

        <LinkText
          textBefore={
            isLogin ? "Don’t have an account?" : "Already have an account?"
          }
          href={isLogin ? "/register" : "/login"}
          linkText={isLogin ? "Click here to register" : "Click here to login"}
        />
      </form>
    </div>
  );
}
