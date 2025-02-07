"use client";
import React, { useState, useEffect } from "react";

const Wishlist = () => {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://hackathon-apis.vercel.app/api/products"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Could not fetch products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();

    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Toggle Wishlist
  const toggleWishlist = (product) => {
    if (wishlist.some((item) => item._id === product._id)) {
      // Remove from wishlist
      setWishlist((prevWishlist) =>
        prevWishlist.filter((item) => item._id !== product._id)
      );
    } else {
      // Add to wishlist
      setWishlist((prevWishlist) => [...prevWishlist, product]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Product List</h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="bg-gray-200 animate-pulse h-64 rounded-lg"
            ></div>
          ))}
        </div>
      ) : (
       
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={product.id || product._id || index} // Use a fallback if product.id is not defined
              className="bg-white shadow-md rounded-lg overflow-hidden border"
            >
              <img
                src={product.image || "https://via.placeholder.com/150"}
                alt={product.name || "Placeholder"}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600">${product.price.toFixed(2)}</p>
                <button
                  aria-label={
                    wishlist.some((item) => item._id === product._id)
                      ? `Remove ${product.name} from Wishlist`
                      : `Add ${product.name} to Wishlist`
                  }
                  aria-pressed={wishlist.some(
                    (item) => item._id === product._id
                  )}
                  className={`mt-4 w-full py-2 px-4 rounded-lg text-white font-semibold transition-colors ${
                    wishlist.some((item) => item._id === product._id)
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                  onClick={() => toggleWishlist(product)}
                >
                  {wishlist.some((item) => item._id === product._id)
                    ? "Remove from Wishlist"
                    : "Add to Wishlist"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Your Wishlist</h2>
        {wishlist.length > 0 ? (
          <ul className="space-y-4">
            {wishlist.map((item) => (
              <li
                key={item._id}
                className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg shadow"
              >
                <img
                  src={item.image || "https://via.placeholder.com/150"}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">Your wishlist is empty!</p>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
