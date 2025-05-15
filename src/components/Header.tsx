'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { title: 'Início', href: '/' },
    { title: 'Sobre', href: '#sobre' },
    { title: 'Projetos', href: '#projetos' },
    { title: 'Contato', href: '#contato' },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-[200] transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-md py-3 shadow-md'
          : 'bg-white py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold font-[family-name:var(--font-geist-mono)]">
          DEV<span className="text-purple-500">VIBE</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-gray-800">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-all hover:text-purple-500 ${
                pathname === link.href ? 'text-purple-500 font-medium' : ''
              }`}
              style={{ position: 'relative', zIndex: 201 }}
            >
              {link.title}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            className="flex flex-col space-y-1.5 z-50 text-gray-800"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-current transform transition-transform ${
                isMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-current transition-opacity ${
                isMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-current transform transition-transform ${
                isMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            ></span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`fixed inset-0 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center space-y-8 transition-all duration-300 z-[200] ${
            isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          } md:hidden`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xl font-medium text-gray-800 hover:text-purple-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
              style={{ position: 'relative', zIndex: 201 }}
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
} 