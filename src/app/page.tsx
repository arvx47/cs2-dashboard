import Link from "next/link";
import { SITE_NAME } from "../constants";

export default function Home() {
  return (
    <div>
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-4">Welcome to {SITE_NAME}</h1>
          <p className="text-xl mb-8">I will add something here soon</p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/rankings"
              className="bg-white text-orange-600 hover:bg-gray-100 px-6 py-3 rounded-md font-medium transition-colors"
            >
              View Rankings
            </Link>
            <Link
              href="/matches"
              className="bg-transparent hover:bg-orange-700 border border-white px-6 py-3 rounded-md font-medium transition-colors"
            >
              Explore Matches
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-light text-black mb-4">
              Player Rankings
            </h2>
            <p className="text-gray-600 mb-6">
              See who&apos;s leading the competition with our up-to-date player
              rankings.
            </p>
            <a
              href="/rankings"
              className="text-orange-500 hover:text-orange-700 font-medium inline-flex items-center"
            >
              View Full Rankings
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
          </div>

          <div className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-light text-black mb-4">
              Super Matches
            </h2>
            <p className="text-gray-600 mb-6">
              Stay updated with the latest super matches and never miss an
              exciting game.
            </p>
            <a
              href="/matches"
              className="text-orange-500 hover:text-orange-700 font-medium inline-flex items-center"
            >
              View All Matches
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
