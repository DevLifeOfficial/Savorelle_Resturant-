"use client";

import React, { useState } from "react";
import { FieldConfig } from "@/config/loginFields";
import { validateField } from "@/utils/validation";

type FormValues = Record<string, string | File>;

type Props = {
  fields: FieldConfig[];
  onSubmit: (values: FormValues) => Promise<void>;
  buttonText: string;
  direction: string;
  size: string;
};

export default function FormBuilder({
  fields,
  onSubmit,
  buttonText,
  direction,
  size,
}: Props) {
  const [values, setValues] = useState<FormValues>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [preview, setPreview] = useState<Record<string, string>>({});

  const handleChange = (name: string, value: string | File) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (name: string, file: File | null) => {
    if (!file) return;

    handleChange(name, file);

    const url = URL.createObjectURL(file);
    setPreview((prev) => ({ ...prev, [name]: url }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let newErrors: Record<string, string> = {};

    fields.forEach((field) => {
      const value = values[field.name];

      if (field.type !== "file") {
        const error = validateField(
          field,
          (value as string) || "",
          values as Record<string, string>,
        );
        if (error) newErrors[field.name] = error;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit(values);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full mx-auto ${size || "max-w-2xl"}  ${direction === "grid" ? "grid grid-cols-1 sm:grid-cols-2 gap-4" : "flex flex-col gap-4"}`}
    >
      {fields.map((field) => (
        <div key={field.name} className="flex flex-col gap-1 w-full">
          <label className="text-sm font-medium mb-1 text-gray-500">
            {field.label}
          </label>

          {field.type === "file" ? (
            <>
              <input
                title={field.name}
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleFileChange(field.name, e.target.files?.[0] || null)
                }
                className="w-full bg-[#0f0f0f]/80 border border-white/10 text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-orange-500 file:text-white file:cursor-pointer hover:file:bg-orange-600 rounded-xl cursor-pointer"
              />

              {preview[field.name] && (
                <img
                  src={preview[field.name]}
                  alt={field.name}
                  className="mt-2 w-40 h-24 object-cover rounded"
                />
              )}
            </>
          ) : field.type === "select" ? (
            <select
              title={values[field.name] as string}
              value={
                (values[field.name] as string) ?? field.options?.[0]?.value
              }
              onChange={(e) => handleChange(field.name, e.target.value)}
              className="w-full bg-[#0f0f0f]/80 border border-white/10 text-white px-4 py-2.5 rounded-xl outline-none focus:border-orange-500/60 focus:ring-2 focus:ring-orange-500/20"
            >
              <option value="" disabled>
                {field.placeholder || "Select an option"}
              </option>

              {field.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              placeholder={field.placeholder}
              value={(values[field.name] as string) || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className="w-full bg-[#0f0f0f]/80 border border-white/10 text-white placeholder:text-gray-400 px-4 py-2.5 rounded-xl outline-none transition-all duration-300 focus:border-orange-500/60 focus:ring-2 focus:ring-orange-500/20 hover:border-white/20"
            />
          )}

          {errors[field.name] && (
            <span className="text-red-500 text-xs mt-1">
              {errors[field.name]}
            </span>
          )}
        </div>
      ))}

      <button
        type="submit"
        className={`
    w-full
    ${direction === "grid" ? "sm:col-span-2" : ""}
    bg-gradient-to-r from-orange-500 to-orange-600
    text-white
    py-3
    rounded-xl
    font-semibold
    tracking-wide
    transition-all duration-300
    hover:from-orange-600 hover:to-orange-700
    hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]
    active:scale-[0.98]
  `}
      >
        {buttonText}
      </button>
    </form>
  );
}
