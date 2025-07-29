import React from "react";
import Image from "next/image";
import Link from "next/link";
import { assets } from "@/assets/assets";

const ProductCard = ({ product }) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY;
  const rating = 4.0;

  const handleWhatsAppClick = (e) => {
    e.preventDefault();
    const message = `Hello, I'm interested in ${product.name} (${currency}${product.offerPrice}). Is it still available?`;
    const whatsappUrl = `https://wa.me/${product.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

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
          <button
            onClick={handleWhatsAppClick}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-teal-500 to-teal-600 text-white px-5 py-2 rounded-full text-sm font-medium tracking-wide shadow-soft hover:shadow-hover opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center gap-2 hover:from-teal-600 hover:to-teal-700 active:scale-95 transition-transform font-body"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.4054 3.4875C18.1607 1.2428 15.1714 0 11.9946 0C5.4375 0 0.101786 5.33571 0.101786 11.8929C0.101786 13.9875 0.648214 16.0286 1.67143 17.8393L0 24L6.30536 22.3607C8.04107 23.3036 9.99643 23.8018 11.9893 23.8018H11.9946C18.5464 23.8018 24 18.4661 24 11.9089C24 8.73214 22.65 5.73214 20.4054 3.4875ZM11.9946 21.8036C10.2161 21.8036 8.475 21.3268 6.95357 20.4268L6.6 20.2179L2.86071 21.1875L3.84643 17.5286L3.61607 17.1589C2.62499 15.5732 2.10535 13.7571 2.10535 11.8929C2.10535 6.43929 6.54107 2.00357 12 2.00357C14.6518 2.00357 17.1321 3.02679 19.0179 4.91786C20.9036 6.80893 21.9964 9.28928 21.9911 11.9089C21.9911 17.3679 17.4482 21.8036 11.9946 21.8036ZM17.4214 14.3839C17.1321 14.2393 15.6643 13.5214 15.3964 13.4286C15.1286 13.3304 14.9357 13.2857 14.7375 13.5804C14.5393 13.875 13.9768 14.5446 13.8054 14.7428C13.6393 14.9357 13.4679 14.9571 13.1786 14.8125C11.4964 13.9714 10.3768 13.3036 9.25178 11.3839C8.94642 10.8643 9.56785 10.9018 10.1411 9.75C10.2339 9.55178 10.1893 9.37499 10.1196 9.23035C10.05 9.08571 9.44464 7.61785 9.20357 7.03928C8.96785 6.47678 8.72678 6.55714 8.55 6.54643C8.38392 6.53571 8.19643 6.53571 8.00357 6.53571C7.81071 6.53571 7.49464 6.60535 7.22678 6.89464C6.95892 7.18928 6.19285 7.90714 6.19285 9.375C6.19285 10.8428 7.25892 12.2625 7.39821 12.4553C7.54285 12.6482 9.43392 15.5786 12.3482 16.8857C14.1214 17.7 14.7857 17.7857 15.6375 17.6357C16.1357 17.5446 17.3143 16.9071 17.5554 16.2321C17.7964 15.5571 17.7964 14.9786 17.7268 14.8607C17.6625 14.7321 17.4696 14.6518 17.4214 14.3839Z" />
            </svg>
            Inquire Now
          </button>
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
                <span className="text-xs text-stone-500 font-body">{rating}</span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-teal-600 font-bold text-lg font-heading">
                  {currency || "₹"}{product.offerPrice}
                </span>
                {product.price > product.offerPrice && (
                  <span className="text-stone-500 text-sm line-through font-body">
                    {currency || "₹"}{product.price}
                  </span>
                )}
              </div>
            </div>

            <div className="bg-teal-50 text-teal-700 text-xs font-medium px-2 py-1 rounded-md font-body">
              {Math.round(
                ((product.price - product.offerPrice) / product.price) * 100
              )}% OFF
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
