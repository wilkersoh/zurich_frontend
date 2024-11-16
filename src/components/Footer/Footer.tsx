import React from "react";

export const Footer = () => {
  return (
    <footer className="mt-auto py-8 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          <p className="text-gray-600 text-sm">
            © 2024 Zurich. All rights reserved.
          </p>
          <div className="mt-2 flex space-x-4">
            <a href="#" className="text-gray-500 hover:text-gray-700">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700">
              Terms of Service
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
