"use client";

import { chrustyRock } from "@/app/fonts";
import React, { useState } from "react";
import MenuItems from "../ui/menuItems";
import Modal from "../ui/model";
import FormBuilder from "../ui/form";
import { menuFields } from "@/config/menuFields";
import {
  createProduct,
  MenuItemsProps,
  ProductUploadImage,
} from "@/helpers/menu.helper";

export default function MenuCard() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [menuItems, setMenuItems] = useState<MenuItemsProps[]>([]);

  const handleSubmit = async (values: Record<string, string | File>) => {
    setLoading(true);
    try {
      const file = values.image_url as File;

      if (!file) {
        setLoading(false);
        throw new Error("Image file is required");
      }
      const imageFile = await ProductUploadImage(file);

      const newProduct = await createProduct({
        name: values.name as string,
        description: values.description as string,
        price: Number(values.price),
        image_url: imageFile,
        category: values.category as string,
      });

      setMenuItems((prev) => [...prev, newProduct]);

      setIsOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen p-6">
      <div className="flex flex-row items-center justify-between gap-2 px-2 py-5">
        <h2 className={`${chrustyRock.className} text-6xl`}>
          Indulge in <br /> Culinary Artistry
        </h2>
        <p className="text-md italic font-normal  text-white/80">
          Explore our finest selections, crafted to <br /> perfection by
          world-class chefs.
        </p>
      </div>

      <div className="flex justify-end px-4 mb-2">
        <button
          type="button"
          title="Add Menu"
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1 rounded-md text-xs font-semibold tracking-wide shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:from-orange-600 hover:to-orange-700 transition-all duration-300 active:scale-95"
        >
          Add Menu
        </button>
      </div>
      <div className="relative flex gap-6 justify-center flex-wrap bg-black p-8">
        <div className="flex gap-6 flex-wrap">
          {menuItems.map((item) => (
            <MenuItems key={item.id} {...item} />
          ))}
        </div>
      </div>

      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="p-4 w-full max-w-lg mx-auto">
          <h2 className="text-xl font-semibold text-white mb-4 tracking-wide">
            Create Slider
          </h2>

          <FormBuilder
            fields={menuFields}
            onSubmit={handleSubmit}
            buttonText={loading ? "Creating..." : "Create Item"}
            direction="grid"
            size="max-w-2xl"
          />
        </div>
      </Modal>
    </div>
  );
}
