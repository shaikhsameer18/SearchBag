"use client";
import React, { useState, useEffect, useRef } from "react";
import { useClerk, UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Search, User, MessageCircle } from "lucide-react"; // Lucide icons

// Multi-language brand component
const MultiLanguageBrand = () => {
  const languages = [
    { lang: "English", text: "Search Bags" },
    { lang: "Marathi", text: "सर्च बॅग्स" },
    { lang: "Gujarati", text: "સર્ચ બેગ્સ" },
    { lang: "Tamil", text: "சர்ச் பாக்ஸ்" }
  ];
  
  const [currentLangIndex, setCurrentLangIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLangIndex((prevIndex) => (prevIndex + 1) % languages.length);
    }, 3000); // Change language every 3 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <span className="text-2xl font-bold tracking-tight leading-none text-teal-700 transition-all duration-500 md:text-3xl font-logo">
      {languages[currentLangIndex].text}
    </span>
  );
};


const Navbar = () => {
  const router = useRouter();
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const isSeller = user?.publicMetadata?.role === "seller";

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.trim()) {
        try {
          const response = await axios.get(
            `/api/products/search?q=${encodeURIComponent(searchQuery)}`
          );
          setSearchResults(response.data);
        } catch (error) {
          console.error("Search error:", error);
          setSearchResults([]);
        }
      } else {
        setSearchResults([]);
      }
    };
    const debounceTimer = setTimeout(fetchSearchResults, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  return (
    <nav className="flex sticky top-0 z-50 justify-between items-center px-5 py-4 bg-white/95 border-b backdrop-blur-md text-stone-900 shadow-soft border-stone-200 md:px-16 lg:px-32">
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute right-0 left-0 top-full z-50 bg-white/95 backdrop-blur-md border-t shadow-md lg:hidden border-stone-200">
          <div className="flex flex-col p-5 space-y-5">
            {["/", "/all-products", "/about", "/contact"].map((path, index) => (
              <Link
                key={index}
                href={path}
                className="text-base font-semibold uppercase hover:text-teal-600 transition-colors duration-200 font-body"
                onClick={() => setMobileMenuOpen(false)}
              >
                {path === "/" ? "Home" : path.slice(1).replace("-", " ")}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Logo + Brand */}
      <div
        className="flex gap-3 items-center cursor-pointer md:gap-4"
        onClick={() => router.push("/")}
      >
        <div className="relative w-10 h-10 md:w-12 md:h-12">
          <Image
            src="/images/search.png"
            alt="Search Bags Logo"
            fill
            className="object-contain"
          />
        </div>
        <MultiLanguageBrand />
      </div>

      {/* Desktop Links */}
      <div className="hidden gap-8 items-center md:flex">
        {["/", "/all-products", "/about", "/contact"].map((path, index) => (
          <Link
            key={index}
            href={path}
            className="text-base font-semibold tracking-wide uppercase hover:text-teal-600 transition-colors duration-200 relative group font-body"
          >
            {path === "/" ? "Home" : path.slice(1).replace("-", " ")}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-600 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        ))}
        {isSeller && (
          <button
            onClick={() => router.push("/seller")}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-teal-600 rounded-full transition-all duration-300 hover:bg-teal-700 shadow-soft hover:shadow-hover hover:scale-105 font-body"
          >
            Seller Dashboard
          </button>
        )}
      </div>

      {/* Right Icons */}
      <ul className="hidden gap-6 items-center md:flex">
        {/* WhatsApp Chat */}
        <a
          href="https://wa.me/918828081163"
          target="_blank"
          rel="noopener noreferrer"
          className="flex gap-2 items-center text-green-600 hover:text-green-700 transition-colors duration-200 font-body"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm uppercase font-medium">Chat</span>
        </a>

        {/* Search */}
        <div className="relative" ref={searchRef}>
          <Search
            className="w-5 h-5 cursor-pointer text-stone-800 hover:text-teal-600 transition-colors duration-200"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          />
          {isSearchOpen && (
            <div className="absolute right-0 top-full z-50 mt-3 w-80 bg-white rounded-xl border border-stone-200 shadow-soft">
              <div className="p-4">
                <input
                  type="text"
                  placeholder="Search bags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-4 py-2.5 w-full rounded-lg border bg-stone-50 border-stone-200 text-stone-900 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-teal-500 font-body"
                  autoFocus
                />
              </div>
              {searchResults.length > 0 ? (
                <div className="overflow-y-auto max-h-64 border-t border-stone-200">
                  {searchResults.map((product) => (
                    <div
                      key={product._id}
                      className="p-3 transition-colors duration-150 cursor-pointer hover:bg-stone-100"
                      onClick={() => {
                        router.push(`/product/${product._id}`);
                        setIsSearchOpen(false);
                        setSearchQuery("");
                      }}
                    >
                      <div className="flex gap-3 items-center">
                        <Image
                          src={product.images?.[0] || product.image?.[0]}
                          alt={product.name}
                          width={40}
                          height={40}
                          className="object-cover rounded-md"
                        />
                        <div className="font-body">
                          <h4 className="text-sm font-medium text-stone-900 font-heading">
                            {product.name}
                          </h4>
                          <p className="text-xs font-medium text-teal-600">
                            {product.category}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                searchQuery && (
                  <div className="p-3 text-sm text-center text-stone-500 font-body">
                    No results found
                  </div>
                )
              )}
            </div>
          )}
        </div>

        {/* Auth */}
        {user ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <button
            onClick={openSignIn}
            className="flex gap-2 items-center transition-colors duration-200 hover:text-teal-600 font-body"
            aria-label="Account"
          >
            <User className="w-5 h-5" />
            <span className="text-sm uppercase">Account</span>
          </button>
        )}
      </ul>

      {/* Mobile View */}
      <div className="flex gap-3 items-center md:hidden">
        <a
          href="https://wa.me/918828081163"
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center items-center w-8 h-8 bg-green-600 text-white rounded-full shadow-soft hover:bg-green-700 transition-colors duration-200"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-4 h-4" />
        </a>

        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? (
            <X size={28} className="text-stone-900" />
          ) : (
            <Menu size={28} className="text-stone-900" />
          )}
        </button>

        {isSeller && (
          <button
            onClick={() => router.push("/seller")}
            className="text-xs bg-teal-600 text-white hover:bg-teal-700 px-4 py-1.5 rounded-full transition shadow-soft hover:shadow-hover font-body"
          >
            Seller
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
