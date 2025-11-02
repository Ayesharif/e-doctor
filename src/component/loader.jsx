import React from "react";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="flex items-center gap-5 bg-blue-100 p-4 px-6 rounded-lg shadow-lg">
        <div className="w-12 h-12 border-4 border-white border-t-black rounded-full animate-spin"></div>
        <span className="font-medium text-gray-800">Loading...</span>
      </div>
    </div>
  );
}
