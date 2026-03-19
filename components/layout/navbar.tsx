"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowTopRightIcon,
  Cross2Icon,
  HamburgerMenuIcon,
} from "@radix-ui/react-icons";
import { galaferaMed } from "@/app/fonts";
import { useCartStore } from "@/store/cartStore";


export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "About Us", href: "/about" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  const cart = useCartStore((state) => state.cart);

  return (
    <nav className="w-full fixed top-0 left-0 z-50">
      <div className="flex items-center justify-between px-6 md:px-12 py-4 text-white">
        {/* Logo */}
        <h1 className={`${galaferaMed.className} text-2xl md:text-3xl`}>
          Savorelle
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 items-center text-sm tracking-wide">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className={`${galaferaMed.className} hover:text-orange-400 font-medium transition italic`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          {/* Cart */}
          <div className="relative">
            <button title="cart" type="button">
              <img src="/shopping-cart.png" alt="cart" className="w-6 h-6" />
            </button>

            {/* Cart Count Badge */}
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-xs px-1.5 rounded-full">
                {cart.length}
              </span>
            )}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 transition px-3 py-2 rounded-full text-sm font-medium">
              Order Now
              <span className="rounded-full bg-black p-2">
                <ArrowTopRightIcon className="w-4 h-4" />
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <Cross2Icon /> : <HamburgerMenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-black text-white px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block text-lg border-b border-white/20 pb-2"
              onClick={() => setOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          <button className="w-full mt-4 bg-orange-500 py-3 rounded-full">
            Order Now →
          </button>
        </div>
      )}
    </nav>
  );
}
