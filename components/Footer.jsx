import React from "react";
import Link from "next/link";
import Image from "next/image";
import { assets } from "@/assets/assets";
import {
  Facebook,
  Twitter,
  Instagram,
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white text-stone-800 py-8 sm:py-10 px-4 sm:px-6 md:px-8 border-t border-stone-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Logo and Description */}
          <div className="space-y-3 sm:space-y-4 col-span-2 sm:col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-1.5 sm:gap-2">
              <Image
                src="/images/search.png"
                alt="Search Bags Logo"
                width={32}
                height={32}
                className="object-contain w-8 h-8 sm:w-10 sm:h-10"
              />
              <span className="text-xl sm:text-2xl text-black font-logo font-semibold tracking-tight">
                Search Bags
              </span>
            </Link>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-body">
              Premium bags for every occasion. Discover our curated collection
              of high-quality bags designed for style and functionality.
            </p>
            <div className="flex gap-2 sm:gap-3">
              {[Facebook, Twitter, Instagram].map((Icon, index) => (
                <Link
                  key={index}
                  href="#"
                  className="p-1.5 sm:p-2 bg-stone-100 rounded-full hover:bg-teal-500 hover:text-white transition-colors duration-300 text-stone-600"
                >
                  <Icon size={14} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wide text-teal-600">
              Company
            </h3>
            <ul className="space-y-1.5 sm:space-y-2">
              {["About Us", "Contact", "Collections", "Privacy Policy"].map(
                (item, index) => (
                  <li key={index}>
                    <Link
                      href="#"
                      className="text-xs sm:text-sm text-stone-600 hover:text-teal-600 transition-colors duration-200"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wide text-teal-600">
              Categories
            </h3>
            <ul className="space-y-1.5 sm:space-y-2">
              {["Travel", "Business", "Student", "Casual", "Luxury"].map(
                (item, index) => (
                  <li key={index}>
                    <Link
                      href="#"
                      className="text-xs sm:text-sm text-stone-600 hover:text-teal-600 transition-colors duration-200"
                    >
                      {item} Bags
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3 sm:space-y-4 col-span-2 sm:col-span-2 md:col-span-1">
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wide text-teal-600">
              Contact
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              <li className="flex items-start gap-2 sm:gap-3 text-stone-600">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm">
                  Byculla (West), Mumbai, Maharashtra, India
                </span>
              </li>
              <li className="flex items-center gap-2 sm:gap-3 text-stone-600">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-teal-500 flex-shrink-0" />
                <span className="text-xs sm:text-sm">+91 88280 81163</span>
              </li>
              <li className="flex items-center gap-2 sm:gap-3 text-stone-600">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-teal-500 flex-shrink-0" />
                <span className="text-xs sm:text-sm">searchbags789@gmail.com</span>
              </li>
              <li className="flex items-center gap-2 sm:gap-3 text-stone-600">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-teal-500 flex-shrink-0" />
                <span className="text-xs sm:text-sm">Mon-Sat: 10:00 AM - 7:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 sm:mt-10 pt-4 sm:pt-6 border-t border-stone-200 text-center">
          <p className="text-xs sm:text-sm text-stone-500">
            © {new Date().getFullYear()} Search Bags. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
