"useclient";
import React, { useEffect, useState } from "react";
import sanityClient from "@sanity/client";
import Image from "next/image";

const sanity = sanityClient({
  projectId: "5q8erzvb",
  dataset: "production", 
  apiVersion: "2024-01-04", 
  useCdn: true, 
});

interface Product {
  _id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  slug: { current: string };
  tags: string[];
}

const ProductCards: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);

  // Fetch products by slug
  const fetchProducts = async (slug: string) => {
    try {
      const query = `*[_type == "product" && slug.current == $slug] {
        _id,
        title,
        price,
        description,
        "image": productImage.asset->url,
        tags,
        slug
      }`;

      const params = { slug }; // Dynamic slug parameter
      const data: Product[] = await sanity.fetch(query, params);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  // Fetch all products (for demonstration)
  const fetchAllProducts = async () => {
    try {
      const query = `*[_type == "product"] {
        _id,
        title,
        price,
        description,
        "image": productImage.asset->url,
        tags,
        slug
      }`;

      const data: Product[] = await sanity.fetch(query);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchAllProducts(); // Fetch all products initially
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-gray-800 text-3xl font-bold mb-8">Our Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
          >
            <Image
              src={product.image || "/placeholder.png"}
              alt={product.title}
              width={300}
              height={300}
              className="w-full h-48 object-cover rounded-md"
            />
            <h3 className="text-lg font-semibold text-gray-800 mt-4">
              {product.title}
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              {product.description.slice(0, 50)}...
            </p>
            <p className="text-blue-600 font-bold mt-2">
              ${product.price.toFixed(2)}
            </p>
            <button
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
              onClick={() => fetchProducts(product.slug.current)} // Fetch by slug
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCards;
