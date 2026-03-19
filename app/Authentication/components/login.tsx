"use client";

import React, { useEffect, useState } from "react";
import FormBuilder from "@/components/ui/form";
import { loginFields } from "@/config/loginFields";
import { registerFields } from "@/config/registerFields";
import { supabase } from "@/lib/supabaseClient";
import { redirect } from "next/navigation";

export default function AuthPage() {
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = async (values: Record<string, string>) => {
    try {
      if (isRegister) {
        if (values.password !== values.confirmPassword) {
          return "Passwords do not match";
        }

        const { data, error } = await supabase.auth.signUp({
          email: values.email,
          password: values.password,
          options: {
            data: {
              name: values.name,
            },
          },
        });

        if (error) return error.message;
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        });

        if (error) return error.message;

        if (data.session) {
          redirect("/Home");
        }
      }
    } catch (err) {
      console.log(err);
      return "Something went wrong";
    }
  };

  const loginWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/Home",
      },
    });

    if (error) {
      console.log(error.message);
    }
  };

  const loginWithGitHub = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "http://localhost:3000/Home",
      },
    });
  };

  const fields = isRegister ? registerFields : loginFields;

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* LEFT IMAGE */}
      <div className="md:w-[70%] w-full h-75 md:h-screen">
        <img
          src="/LoginImage.png"
          className="w-full h-full object-cover"
          alt="auth image"
        />
      </div>

      {/* RIGHT FORM */}
      <div className="md:w-[30%] w-full flex items-center justify-center bg-white px-8 py-10">
        <div className="w-full max-w-sm space-y-6">
          {/* TITLE */}
          <div className="space-y-2 text-center md:text-left">
            <h1 className="text-3xl font-bold">
              {isRegister ? "Create Account" : "Welcome Back"}
            </h1>

            <p className="text-gray-500 text-sm">
              {isRegister
                ? "Register to start using the platform"
                : "Login to your account"}
            </p>
          </div>

          {/* FORM */}
          <FormBuilder
            fields={fields}
            onSubmit={handleSubmit}
            buttonText={isRegister ? "Register" : "Login"}
          />

          {/* SOCIAL AUTH */}
          <div className="space-y-3">
            <div className="text-center text-sm text-gray-500">
              OR CONTINUE WITH
            </div>

            <div className="flex gap-3">
              <button
                onClick={loginWithGoogle}
                className="flex items-center justify-center gap-2 border w-full py-2 rounded-md hover:bg-gray-50"
              >
                <img src="/google.png" alt="google" className="w-5 h-5" />
                Google
              </button>

              <button
                onClick={loginWithGitHub}
                className="flex items-center justify-center gap-2 border w-full py-2 rounded-md hover:bg-gray-50"
              >
                <img src="/github.png" alt="github" className="w-5 h-5" />
                GitHub
              </button>
            </div>
          </div>

          {/* TOGGLE LOGIN / REGISTER */}
          <div className="text-center text-sm">
            {isRegister ? (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setIsRegister(false)}
                  className="text-blue-600 font-medium"
                >
                  Login
                </button>
              </>
            ) : (
              <>
                Don’t have an account?{" "}
                <button
                  onClick={() => setIsRegister(true)}
                  className="text-blue-600 font-medium"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
