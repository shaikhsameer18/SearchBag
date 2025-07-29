"use client";
import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { useAppContext } from "@/context/AppContext";
import { useSearchParams } from "next/navigation";

const AllProducts = () => {
  const { products, category, setCategory } = useAppContext();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get category from URL if present
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setActiveFilter(categoryParam);
      setCategory(categoryParam);
    }

    // Filter products based on active filter
    if (activeFilter === "all") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) =>
          product.category.toLowerCase() === activeFilter.toLowerCase()
      );
      setFilteredProducts(filtered);
    }
  }, [products, activeFilter, searchParams, setCategory]);

  const categories = [
    { id: "all", name: "All Bags" },
    { id: "casual bags", name: "Casual Bags" },
    { id: "travel bags", name: "Travel Bags" },
    { id: "business bags", name: "Business Bags" },
    { id: "laptop bags", name: "Laptop Bags" },
    { id: "backpacks", name: "Backpacks" },
    { id: "handbags", name: "Handbags" },
    { id: "accessories", name: "Accessories" },
  ];

  return (
    <div className="bg-stone-50 min-h-screen">
      <div className="px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4 font-heading tracking-tight">
            Our Collection
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-teal-400 rounded-full mx-auto mb-6"></div>
          <p className="text-stone-600 max-w-2xl mx-auto text-lg leading-relaxed font-body">
            Explore our complete collection of premium bags, designed for every
            lifestyle and occasion
          </p>
        </div>

        {/* Filter Section */}
        <div className="mb-10">
          <div className="bg-white rounded-xl shadow-soft p-4 border border-stone-100">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-stone-800 mb-4 sm:mb-0 font-heading">
                Filter by Category
              </h2>
              <p className="text-stone-500 text-sm font-body">
                {filteredProducts.length} products found
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-200 whitespace-nowrap rounded-lg ${
                    activeFilter === cat.id
                      ? "bg-teal-600 text-white shadow-soft"
                      : "bg-white text-stone-700 hover:bg-stone-100 border border-stone-200"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts && filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        ) : (
          <div className="col-span-full text-center py-20">
            <div className="mx-auto max-w-md">
              <svg
                className="mx-auto h-12 w-12 text-stone-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-stone-900 font-heading">
                No products found
              </h3>
              <p className="mt-1 text-sm text-stone-500 font-body">
                We couldn't find any products in this category.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => setActiveFilter("all")}
                  className="px-6 py-3 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors duration-300 shadow-soft hover:shadow-md"
                >
                  View All Products
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
