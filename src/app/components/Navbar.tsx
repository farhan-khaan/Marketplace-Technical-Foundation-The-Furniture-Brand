"use client";
import React, { useState } from "react";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { FaRegUserCircle } from "react-icons/fa";
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import { motion } from "framer-motion";
import { SignInWithMetamaskButton } from "@clerk/nextjs";
import CheckoutButton from "../components/checkoutbutton";

// ✅ Initialize Sanity Client
const sanity = createClient({
  projectId: "5q8erzvb",
  dataset: "production",
  apiVersion: "2024-01-04",
  useCdn: true,
});

const builder = imageUrlBuilder(sanity);

// ✅ Helper function to generate image URLs safely
const urlFor = (source: any) => {
  if (!source) return "";
  try {
    return builder.image(source).url();
  } catch (error) {
    console.error("Error generating image URL:", error);
    return "";
  }
};

// ✅ Product Interface
interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: { asset: { _ref: string } }; // Sanity image reference
  discountPercentage?: number;
  tags: string[];
}

interface NavbarProps {
  cart: Product[];
  removeFromCart: (id: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ cart, removeFromCart }) => {
  const [cartOpen, setCartOpen] = useState(false);

  // ✅ Calculate total number of items
  const totalItems = cart.length;

  // ✅ Calculate total amount with discount handling
  const totalAmount = cart.reduce((sum, item) => {
    const discountedPrice = item.discountPercentage
      ? item.price - (item.price * item.discountPercentage) / 100
      : item.price;
    return sum + discountedPrice;
  }, 0);

  return (
    <div>
      {/* ✅ Navbar */}
      <nav className="flex items-center justify-between px-5 py-4 bg-white shadow-md">
        <div className="text-2xl font-semibold text-slate-900 underline">
          The Furniture Brand
        </div>
        <div className="flex space-x-4">
          {/* ✅ Cart Icon with Badge */}
          <div className="relative cursor-pointer" onClick={() => setCartOpen(!cartOpen)}>
            <HiOutlineShoppingCart size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                {totalItems}
              </span>
            )}
          </div>

          {/* ✅ Sign In Button */}
          <SignInWithMetamaskButton mode="modal">
            <button>
              <FaRegUserCircle size={24} />
            </button>
          </SignInWithMetamaskButton>
        </div>
      </nav>

      {/* ✅ Shopping Cart Sidebar */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: cartOpen ? "0%" : "100%" }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 right-0 w-80 h-full bg-white shadow-lg p-5 z-50 ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Shopping Cart</h2>
          <button onClick={() => setCartOpen(false)} className="text-xl font-bold cursor-pointer">
            ✕
          </button>
        </div>

        <div className="mt-4 h-[calc(100%-120px)] overflow-y-auto">
          {cart.length > 0 ? (
            <>
              <ul className="space-y-4">
                {cart.map((item) => (
                  <li key={item._id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow">
                    <div>
                      <p className="text-gray-900 font-medium">{item.name}</p>
                      <p className="text-blue-600 font-bold text-sm">${item.price.toFixed(2)}</p>
                    </div>
                    {/* ✅ Display Product Image (with proper Sanity image handling) */}
                    {item.image && item.image.asset && (
                      <Image
                        src={urlFor(item.image.asset)}
                        alt={item.name}
                        width={50}
                        height={50}
                        className="rounded-lg"
                        unoptimized // Add this if you encounter issues with external images
                      />
                    )}
                    <button className="text-red-500 font-semibold hover:underline" onClick={() => removeFromCart(item._id)}>
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-gray-500 text-center">Your cart is empty!</p>
          )}
        </div>

        {/* ✅ Fixed Checkout Section */}
        <div className="absolute bottom-0 left-0 right-0 bg-white p-5 border-t border-gray-200">
          <p className="text-gray-900 font-medium">Total Items: {totalItems}</p>
          <p className="text-gray-900 font-medium">Total Amount: Rs. {totalAmount.toFixed(2)}</p>

          {/* ✅ Fixed Checkout Button */}
          <CheckoutButton />
        </div>
      </motion.div>
    </div>
  );
};

export default Navbar;