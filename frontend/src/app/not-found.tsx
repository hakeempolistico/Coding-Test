import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-yellow-300 to-orange-500 text-white">
      <h1 className="text-7xl font-extrabold">404</h1>
      <p className="text-2xl mt-2 font-semibold">Oops! Page not found.</p>
      <p className="mt-2 text-lg">The page you are looking for doesn&apos;t exist.</p>

      <Link
        href="/"
        className="mt-6 px-6 py-3 bg-white text-orange-500 rounded-lg shadow-md font-semibold text-lg 
                   hover:bg-gray-100 transition-all"
      >
        Go Back Home
      </Link>
    </div>
  );
}