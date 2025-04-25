"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { SITE_NAME } from "../constants";

export default function Navbar({}) {
  const pathname = usePathname();

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-orange-500">
                {SITE_NAME}
              </Link>
            </div>
            <div className="ml-6 flex space-x-4">
              <Link
                href="/rankings"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  pathname === "/rankings"
                    ? "border-orange-500 text-gray-400"
                    : "border-transparent text-gray-200  hover:border-gray-300 hover:text-gray-400"
                }`}
              >
                Rankings
              </Link>
              <Link
                href="/matches"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  pathname === "/matches"
                    ? "border-orange-500 text-gray-400"
                    : "border-transparent text-gray-200  hover:border-gray-300 hover:text-gray-400"
                }`}
              >
                Super Matches
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
