"use client";

import { useState, useEffect } from "react";
import { PostFormProps } from "@/types/PostForm_Props";
import Input from "./ui/Input";
import Button from "./ui/Button";

export default function PostForm({ initialData, onSubmit }: PostFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // onSubmit(formData);
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {initialData ? "Edit Blog Post" : "Create Blog Post"}
        </h2>

        <div className="mb-5">
           <Input
                    label="Title"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
        </div>

        <div className="mb-5">
          <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            rows={5}
            value={formData.content}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Write your blog content..."
            required
          />
        </div>

        <Button type="submit">
                   {initialData ? "Update Post" : "Submit Post"}
       
                </Button>
         
      </form>
    </div>
  );
}
