// HomeProducts.jsx
"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const HomeProducts = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get("/api/product/list");
        if (data.success) {
          const bagProducts = data.products.filter(
            (product) =>
              product.category?.toLowerCase().includes("bag") ||
              product.name?.toLowerCase().includes("bag")
          );
          setProducts(bagProducts);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col items-center pt-20 pb-16 px-4 sm:px-6">
      <div className="flex flex-col items-center w-full max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-heading text-stone-900 tracking-tight">
            DISCOVER OUR COLLECTION
          </h2>
          <div className="w-32 h-1.5 bg-gradient-to-r from-teal-500 to-teal-600 mx-auto rounded-full"></div>
          <p className="mt-8 text-stone-700 max-w-2xl mx-auto text-lg leading-relaxed font-body">
            Handcrafted bags designed for every occasion, combining premium
            materials with timeless elegance
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden aspect-[3/4] animate-pulse border border-stone-100 shadow-soft"
              >
                <div className="bg-stone-200 h-3/4 w-full"></div>
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-stone-200 rounded w-3/4"></div>
                  <div className="h-4 bg-stone-200 rounded w-1/2"></div>
                  <div className="h-5 bg-stone-200 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full">
              {products.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>
            <button
              onClick={() => router.push("/all-products")}
              className="mt-16 px-10 py-4 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-full hover:from-teal-500 hover:to-teal-600 transition-all duration-300 font-medium uppercase tracking-wider text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:ring-2 focus:ring-teal-300 focus:ring-offset-2 focus:outline-none"
            >
              Explore All Collections
            </button>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="bg-gradient-to-br from-white to-stone-50 p-10 rounded-2xl max-w-md mx-auto border border-stone-100 shadow-soft">
              <div className="bg-teal-100/30 p-5 rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-20 w-20 mx-auto text-teal-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mt-4 mb-3 text-stone-900 font-heading">
                New Collections Coming Soon
              </h3>
              <p className="text-stone-700 mb-6 leading-relaxed font-body">
                We're preparing our latest designs. Sign up to be the first to
                know when we launch.
              </p>
              <button
                onClick={() => router.push("/")}
                className="px-8 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-full text-base font-medium hover:from-teal-500 hover:to-teal-600 transition-all duration-300 shadow-soft hover:shadow-md"
              >
                Return Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeProducts;
