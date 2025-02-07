"use client";
import React, { useEffect, useState } from "react";
import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import Navbar from "../components/Navbar"; // Ensure correct path

const sanity = sanityClient({
  projectId: "5q8erzvb",
  dataset: "production",
  apiVersion: "2024-01-04",
  useCdn: true,
});

// Initialize the image URL builder
const builder = imageUrlBuilder(sanity);

// Helper function to build image URLs
const urlFor = (source: string) => {
  if (!source) return "/placeholder.png";
  return builder.image(source).url();
};
interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  discountPercentage?: number;
  tags: string[];
}

const ProductCards: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = `*[_type == "product"] {_id, name, price, description, "image": productImage.asset->url, discountPercentage, tags}`;
        const data = await sanity.fetch(query);
        if (!data) throw new Error("No data found");
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar cart={cart} removeFromCart={removeFromCart} />

      {/* Product List */}
      <div className="p-6 bg-gray-50 min-h-screen">
        <h2 className="text-gray-800 text-3xl font-extrabold text-center mb-10">Our Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
              <Image
                src={urlFor(product.image) || "/placeholder.png"}
                alt={product.name}
                width={300}
                height={300}
                className="w-full h-56 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-3 leading-relaxed">{product.description.slice(0, 100)}...</p>
              <div className="flex items-center justify-between mb-4">
                <p className="text-xl font-semibold text-blue-600">${product.price.toFixed(2)}</p>
                {product.discountPercentage && (
                  <span className="text-xs text-red-500 font-semibold bg-red-100 px-2 py-1 rounded">
                    {product.discountPercentage}% OFF
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {product.tags.map((tag, index) => (
                  <span key={index} className="text-xs bg-gray-200 text-gray-700 rounded-full px-3 py-1">
                    {tag}
                  </span>
                ))}
              </div>
              <button
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCards;
