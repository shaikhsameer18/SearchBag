"use client";
import { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import { useParams } from "next/navigation";
import Loading from "@/components/Loading";
import { useAppContext } from "@/context/AppContext";
import React from "react";

const Product = () => {
  const { id } = useParams();
  const { products, router, addToCart, user } = useAppContext();
  const [mainImage, setMainImage] = useState(null);
  const [productData, setProductData] = useState(null);

  const fetchProductData = async () => {
    const product = products.find((product) => product._id === id);
    setProductData(product);
  };

  useEffect(() => {
    if (products && products.length > 0) {
      fetchProductData();
    }
  }, [id, products]);

  return productData ? (
    <div className="bg-stone-50 min-h-screen animate-fadeIn">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 pb-12 sm:pb-20 space-y-8 sm:space-y-16 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-16">
          {/* Product Images */}
          <div className="px-2 sm:px-4 lg:px-8">
            <div className="rounded-xl overflow-hidden bg-white border border-stone-200 p-3 sm:p-6 mb-4 sm:mb-6 shadow-soft hover:shadow-lg transition-all duration-300">
              <Image
                src={mainImage || productData.image[0]}
                alt={productData.name}
                className="w-full h-auto object-contain max-h-[250px] sm:max-h-[350px] md:max-h-[400px]"
                width={1280}
                height={720}
                priority
              />
            </div>

            <div className="grid grid-cols-4 gap-2 sm:gap-4">
              {productData.image.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setMainImage(image)}
                  className={`cursor-pointer rounded-lg overflow-hidden bg-white border p-1 sm:p-2 transition-all ${
                    mainImage === image
                      ? "border-teal-500 shadow-md scale-105"
                      : "border-stone-200 hover:border-teal-300"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${productData.name} - Image ${index + 1}`}
                    className="w-full h-auto object-contain"
                    width={300}
                    height={300}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col px-2 sm:px-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-stone-900 mb-3 sm:mb-4 tracking-tight">
              {productData.name}
            </h1>

            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="flex items-center gap-0.5 text-teal-500">
                <Image
                  className="h-4 w-4 sm:h-5 sm:w-5"
                  src={assets.star_icon}
                  alt="star_icon"
                />
                <Image
                  className="h-4 w-4 sm:h-5 sm:w-5"
                  src={assets.star_icon}
                  alt="star_icon"
                />
                <Image
                  className="h-4 w-4 sm:h-5 sm:w-5"
                  src={assets.star_icon}
                  alt="star_icon"
                />
                <Image
                  className="h-4 w-4 sm:h-5 sm:w-5"
                  src={assets.star_icon}
                  alt="star_icon"
                />
                <Image
                  className="h-4 w-4 sm:h-5 sm:w-5"
                  src={assets.star_dull_icon}
                  alt="star_dull_icon"
                />
              </div>
              <p className="text-xs sm:text-sm font-medium text-stone-500">(4.0)</p>
            </div>

            <div className="flex flex-wrap items-baseline gap-2 sm:gap-3 mb-4 sm:mb-6">
              <span className="text-2xl sm:text-3xl font-bold text-teal-600">
                ₹{productData.offerPrice}
              </span>
              <span className="text-base sm:text-lg text-stone-500 line-through">
                ₹{productData.price}
              </span>
              <span className="text-xs sm:text-sm font-medium bg-teal-100 text-teal-800 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full">
                {Math.round(
                  ((productData.price - productData.offerPrice) /
                    productData.price) *
                    100
                )}
                % OFF
              </span>
            </div>

            <div className="mb-4 sm:mb-6 bg-white p-4 sm:p-6 rounded-xl border border-stone-200 shadow-soft">
              <h3 className="text-lg sm:text-xl font-bold text-stone-800 mb-2 sm:mb-3 tracking-tight">
                Description
              </h3>
              <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-body text-balance">
                {productData.description}
              </p>
            </div>

            <div className="border-t border-b border-stone-200 py-4 sm:py-6 my-4 sm:my-6">
              <table className="table-auto border-collapse w-full">
                <tbody className="divide-y divide-stone-100">
                  <tr className="py-2">
                    <td className="py-2 sm:py-3 text-stone-600 font-medium text-xs sm:text-sm tracking-wide">
                      BRAND
                    </td>
                    <td className="py-2 sm:py-3 text-stone-800 font-body text-sm sm:text-base">SearchBag</td>
                  </tr>
                  <tr className="py-2">
                    <td className="py-2 sm:py-3 text-stone-600 font-medium text-xs sm:text-sm tracking-wide">
                      CATEGORY
                    </td>
                    <td className="py-2 sm:py-3">
                      <span className="bg-teal-100 text-teal-800 text-xs px-2 py-0.5 sm:px-2.5 sm:py-1 font-medium rounded-full">
                        {productData.category}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <button
              onClick={() => {
                const message = `Hi, I'm interested in the ${productData.name}. Could you provide more information about it?`;
                const phoneNumber = productData.whatsappNumber || "+918828081163";
                const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
                  message
                )}`;
                window.open(whatsappUrl, "_blank");
              }}
              className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl transition duration-300 shadow-md hover:shadow-lg text-base sm:text-lg font-medium mt-4 transform hover:scale-[1.02]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 sm:h-5 sm:w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.4054 3.4875C18.1607 1.2428 15.1714 0 11.9946 0C5.4375 0 0.101786 5.33571 0.101786 11.8929C0.101786 13.9875 0.648214 16.0286 1.67143 17.8393L0 24L6.30536 22.3607C8.04107 23.3036 9.99643 23.8018 11.9893 23.8018H11.9946C18.5464 23.8018 24 18.4661 24 11.9089C24 8.73214 22.65 5.73214 20.4054 3.4875ZM11.9946 21.8036C10.2161 21.8036 8.475 21.3268 6.95357 20.4268L6.6 20.2179L2.86071 21.1875L3.84643 17.5286L3.61607 17.1589C2.62499 15.5732 2.10535 13.7571 2.10535 11.8929C2.10535 6.43929 6.54107 2.00357 12 2.00357C14.6518 2.00357 17.1321 3.02679 19.0179 4.91786C20.9036 6.80893 21.9964 9.28928 21.9911 11.9089C21.9911 17.3679 17.4482 21.8036 11.9946 21.8036ZM17.4214 14.3839C17.1321 14.2393 15.6643 13.5214 15.3964 13.4286C15.1286 13.3304 14.9357 13.2857 14.7375 13.5804C14.5393 13.875 13.9768 14.5446 13.8054 14.7428C13.6393 14.9357 13.4679 14.9571 13.1786 14.8125C11.4964 13.9714 10.3768 13.3036 9.25178 11.3839C8.94642 10.8643 9.56785 10.9018 10.1411 9.75C10.2339 9.55178 10.1893 9.37499 10.1196 9.23035C10.05 9.08571 9.44464 7.61785 9.20357 7.03928C8.96785 6.47678 8.72678 6.55714 8.55 6.54643C8.38392 6.53571 8.19643 6.53571 8.00357 6.53571C7.81071 6.53571 7.49464 6.60535 7.22678 6.89464C6.95892 7.18928 6.19285 7.90714 6.19285 9.375C6.19285 10.8428 7.25892 12.2625 7.39821 12.4553C7.54285 12.6482 9.43392 15.5786 12.3482 16.8857C14.1214 17.7 14.7857 17.7857 15.6375 17.6357C16.1357 17.5446 17.3143 16.9071 17.5554 16.2321C17.7964 15.5571 17.7964 14.9786 17.7268 14.8607C17.6625 14.7321 17.4696 14.6518 17.4214 14.3839Z" />
              </svg>
              Chat on WhatsApp
            </button>
          </div>
        </div>

        {/* Related Products */}
        <div className="flex flex-col items-center mt-8 sm:mt-16">
          <div className="flex flex-col items-center mb-6 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-stone-900 tracking-tight text-center">
              You May Also Like
            </h2>
            <div className="w-24 sm:w-32 h-0.5 bg-teal-500 mt-2"></div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6 mt-6 sm:mt-8 w-full">
            {products
              .filter(
                (p) => p._id !== id && p.category === productData.category
              )
              .slice(0, 5)
              .map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
          </div>

          <button
            onClick={() => router.push("/all-products")}
            className="mt-8 sm:mt-12 px-6 sm:px-8 py-2.5 sm:py-3 border-2 border-teal-500 text-teal-600 hover:bg-teal-500 hover:text-white transition duration-300 text-xs sm:text-sm font-medium rounded-lg shadow-soft hover:shadow-md"
          >
            View All Products
          </button>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Product;
