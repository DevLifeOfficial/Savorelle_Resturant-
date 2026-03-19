"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import React, { useEffect } from "react";

type ModalProps = {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
};

export default function Modal({ children, open, onClose }: ModalProps) {

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* modal */}
      <div className="relative bg-black rounded-xl shadow-xl p-6 w-full max-w-lg animate-fadeIn border">
        <button
          type="button"
          title="close"
          onClick={onClose}
          className="absolute top-3 right-3 hover:bg-red-600 text-white p-2 transform transition-all duration-300 ease-in-out rounded-4xl"
        >
          <Cross2Icon className="font-medium " />
        </button>

        {children}
      </div>
    </div>
  );
}
