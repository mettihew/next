// src/components/Footer.tsx
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 p-6 text-center bg-gray-500">
      <div className="flex justify-center space-x-6 mb-4">
        <a 
          href="https://github.com/yourusername" 
          className="text-gray-600 hover:text-black"
          aria-label="GitHub"
        >
          <Github size={20} />
        </a>
        <a 
          href="https://linkedin.com/in/yourusername" 
          className="text-gray-600 hover:text-blue-700"
          aria-label="LinkedIn"
        >
          <Linkedin size={20} />
        </a>
        <a 
          href="https://twitter.com/yourusername" 
          className="text-gray-600 hover:text-blue-400"
          aria-label="Twitter"
        >
          <Twitter size={20} />
        </a>
        <a 
          href="mailto:you@example.com" 
          className="text-gray-600 hover:text-red-500"
          aria-label="Email"
        >
          <Mail size={20} />
        </a>
      </div>
      <p className="text-sm text-gray-600">
        © {new Date().getFullYear()} Mettihew. All rights reserved.
      </p>
    </footer>
  );
}