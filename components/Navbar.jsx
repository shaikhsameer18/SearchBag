"use client";
import React, { useState, useEffect, useRef } from "react";
import { useClerk, UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Search, User } from "lucide-react"; // Lucide icons

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
    <nav className="sticky top-0 z-50 bg-white text-stone-900 shadow-soft border-b border-stone-200 px-6 md:px-16 lg:px-32 py-3 flex items-center justify-between backdrop-blur-md">
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-stone-200 shadow-md z-50">
          <div className="flex flex-col p-5 space-y-4">
            {["/", "/all-products", "/about", "/contact"].map((path, index) => (
              <Link
                key={index}
                href={path}
                className="hover:text-teal-600 font-semibold uppercase text-sm font-body"
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
        className="flex items-center gap-2 md:gap-3 cursor-pointer"
        onClick={() => router.push("/")}
      >
        <Image
          src="/images/search.png"
          alt="Search Bags Logo"
          width={50}
          height={50}
          className="object-contain"
        />
        <span className="text-3xl md:text-4xl text-black font-logo font-semibold tracking-tight leading-none">
          Search Bags
        </span>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-10">
        {["/", "/all-products", "/about", "/contact"].map((path, index) => (
          <Link
            key={index}
            href={path}
            className="text-sm font-medium uppercase tracking-wide hover:text-teal-600 font-body"
          >
            {path === "/" ? "Home" : path.slice(1).replace("-", " ")}
          </Link>
        ))}
        {isSeller && (
          <button
            onClick={() => router.push("/seller")}
            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-full text-xs font-semibold shadow-soft hover:shadow-hover transition font-body"
          >
            Seller Dashboard
          </button>
        )}
      </div>

      {/* Right Icons */}
      <ul className="hidden md:flex items-center gap-6">
        {/* Search */}
        <div className="relative" ref={searchRef}>
          <Search
            className="w-5 h-5 text-stone-800 cursor-pointer hover:text-teal-600"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          />
          {isSearchOpen && (
            <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-stone-200 rounded-lg shadow-soft z-50">
              <div className="p-3">
                <input
                  type="text"
                  placeholder="Search bags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-md text-stone-900 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-teal-500 font-body"
                />
              </div>
              {searchResults.length > 0 ? (
                <div className="max-h-64 overflow-y-auto border-t border-stone-200">
                  {searchResults.map((product) => (
                    <div
                      key={product._id}
                      className="p-3 hover:bg-stone-100 cursor-pointer transition-colors duration-150"
                      onClick={() => {
                        router.push(`/product/${product._id}`);
                        setIsSearchOpen(false);
                        setSearchQuery("");
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <Image
                          src={product.images?.[0] || product.image?.[0]}
                          alt={product.name}
                          width={40}
                          height={40}
                          className="rounded-md object-cover"
                        />
                        <div className="font-body">
                          <h4 className="text-sm font-medium text-stone-900 font-heading">
                            {product.name}
                          </h4>
                          <p className="text-xs text-teal-600 font-medium">
                            {product.category}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                searchQuery && (
                  <div className="p-3 text-center text-sm text-stone-500 font-body">
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
            className="flex items-center gap-2 hover:text-teal-600 transition font-body"
          >
            <User className="w-5 h-5" />
            <span className="uppercase text-sm">Account</span>
          </button>
        )}
      </ul>

      {/* Mobile View */}
      <div className="flex items-center md:hidden gap-3">
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
