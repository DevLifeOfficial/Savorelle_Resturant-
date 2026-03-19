import { useCartStore } from "@/store/cartStore";
import React from "react";

type MenuItemsProps = {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  is_available?: boolean;
};

export default function MenuItems({
  id,
  name,
  description,
  price,
  image_url,
  category,
  is_available,
}: MenuItemsProps) {
  if (!is_available) return null;

  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const cartPoduct = useCartStore((state) => state.cart);

 const isCartCheck = cartPoduct.some((item) => item.id === id);

  console.log(cartPoduct);
  return (
    <div className="bg-[#111] rounded-2xl overflow-hidden w-64 shadow-lg">
      {/* Image */}
      <img src={image_url} alt={name} className="w-full h-48 object-cover" />

      {/* Content */}
      <div className="p-4">
        <h3 className="text-white text-lg font-semibold">{name}</h3>

        {category && (
          <p className="text-xs text-gray-500 uppercase">{category}</p>
        )}

        {description && (
          <p className="text-sm text-gray-400 mt-2 line-clamp-2">
            {description}
          </p>
        )}

        <p className="text-white mt-3 font-bold">${price}</p>
      </div>

      <div
        onClick={() => {
          if (!isCartCheck) {
            addToCart({
              id,
              name,
              description,
              price,
              image_url,
              category,
            });
          } else removeFromCart(id);
        }}
        className="bg-orange-500 text-white text-md px-3 py-2"
      >
        {!isCartCheck ? "Add to Cart" : "Remove from Cart"}
      </div>

      
    </div>
  );
}
