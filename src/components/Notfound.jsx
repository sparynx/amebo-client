import React from "react";
import { Link } from "react-router-dom";

const Notfound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-6">
      <h1 className="text-8xl font-bold text-blue-500">404</h1>
      <h2 className="text-3xl font-semibold text-gray-800 mt-4">
        Calm down, Amebo is not available!
      </h2>
      <p className="text-lg text-gray-600 mt-2">
        Maybe it's hiding or just chilling—try again later. 🚶🏾‍♂️
      </p>

      <Link
        to="/"
        className="mt-6 px-6 py-3 text-lg font-medium text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default Notfound;
