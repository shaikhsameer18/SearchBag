import React from "react";
import Image from "next/image";
import Link from "next/link";
import { assets } from "@/assets/assets";

const ProductCard = ({ product }) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY;
  const rating = 4.0;

  return (
    <Link href={`/product/${product._id}`}>
      <div className="group bg-white rounded-xl overflow-hidden shadow-soft hover:shadow-hover transition-all duration-300 border border-stone-100 h-full flex flex-col hover:border-teal-100">
        {/* Image Section */}
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image?.[0] || assets.placeholder_image}
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            width={400}
            height={400}
            priority
          />
          <div className="absolute top-3 right-3 bg-teal-600 text-white text-xs font-medium px-3 py-1 rounded-full tracking-wide opacity-90 font-body">
            {product.category}
          </div>
        </div>

        {/* Product Info */}
        <div className="p-5 flex-grow flex flex-col">
          <h3 className="font-heading font-semibold text-stone-900 group-hover:text-teal-600 transition-colors duration-300 tracking-tight text-lg mb-2">
            {product.name}
          </h3>
          <p className="text-stone-600 text-sm mb-4 line-clamp-2 flex-grow font-body">
            {product.description}
          </p>

          <div className="flex justify-between items-end mt-auto">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div key={star} className="w-4 h-4">
                      {star <= Math.floor(rating) ? (
                        <svg
                          className="w-full h-full text-teal-500"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ) : star - 0.5 <= rating ? (
                        <svg
                          className="w-full h-full text-teal-500"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <defs>
                            <linearGradient
                              id="half-star"
                              x1="0"
                              x2="100%"
                              y1="0"
                              y2="0"
                            >
                              <stop offset="50%" stopColor="currentColor" />
                              <stop offset="50%" stopColor="#E5E7EB" />
                            </linearGradient>
                          </defs>
                          <path
                            fill="url(#half-star)"
                            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-full h-full text-stone-300"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
                <span className="text-xs text-stone-500 font-body">
                  {rating}
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-teal-600 font-bold text-lg font-heading">
                  {currency || "₹"}
                  {product.offerPrice}
                </span>
                {product.price > product.offerPrice && (
                  <span className="text-stone-500 text-sm line-through font-body">
                    {currency || "₹"}
                    {product.price}
                  </span>
                )}
              </div>
            </div>

            <div className="bg-teal-50 text-teal-700 text-xs font-medium px-2 py-1 rounded-md font-body">
              {Math.round(
                ((product.price - product.offerPrice) / product.price) * 100
              )}
              % OFF
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
