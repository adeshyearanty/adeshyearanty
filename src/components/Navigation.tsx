"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Mail, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  id: string;
  label: string;
  href?: string;
}

export function Navigation() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isMainPage = pathname === "/";

  const navItems: NavItem[] = [
    { id: "hero", label: "Home", href: "/#hero" },
    { id: "about", label: "About", href: "/#about" },
    { id: "education", label: "Education", href: "/#education" },
    { id: "skills", label: "Skills", href: "/#skills" },
    { id: "experience", label: "Experience", href: "/#experience" },
    { id: "projects", label: "Projects", href: "/#projects" },
    { id: "writing", label: "Writing", href: "/blog" },
    { id: "contact", label: "Contact", href: "/#contact" },
  ];

  useEffect(() => {
    if (!isMainPage) return;

    const handleScroll = () => {
      const sections = ["hero", "about", "education", "skills", "experience", "projects", "contact"];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMainPage]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = window.innerWidth >= 1024 ? 100 : 80;
      const elementPosition = element.offsetTop - navHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
    setIsMenuOpen(false);
  };

  const isActive = (id: string) => {
    if (!isMainPage) {
      if (id === "writing") return pathname?.includes("/blog");
      return false;
    }
    return activeSection === id;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-xl border-b border-gray-700/50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 lg:py-6">
          {/* Logo/Brand */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center space-x-2 lg:space-x-3"
          >
            <Link href="/" className="flex items-center space-x-2 lg:space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-sm font-bold">
                A
              </div>
              <span className="text-lg lg:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Adesh Yearanty
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => {
              const isItemActive = isActive(item.id);
              const button = (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onClick={() => {
                    if (!item.href) {
                      scrollToSection(item.id);
                    }
                  }}
                  className={`relative px-4 xl:px-6 py-2 xl:py-3 rounded-full font-medium transition-all duration-300 ${
                    isItemActive
                      ? "text-white bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30"
                      : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                  }`}
                >
                  {item.label}
                  {isItemActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-400/20"
                      initial={false}
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </motion.button>
              );

              if (item.href && (item.href.startsWith("/blog") || !item.href.startsWith("#"))) {
                return (
                  <Link key={item.id} href={item.href}>
                    {button}
                  </Link>
                );
              }
              return button;
            })}
          </div>

          {/* Social Links & Mobile Menu */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            {/* Social Links - Hidden on mobile */}
            <div className="hidden sm:flex items-center space-x-2">
              <motion.a
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                href="https://github.com/adeshyearanty"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 lg:w-11 lg:h-11 bg-gray-800/80 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Github className="w-4 h-4 lg:w-5 lg:h-5" />
              </motion.a>
              <motion.a
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                href="mailto:adesh.yearanty@gmail.com"
                className="w-9 h-9 lg:w-11 lg:h-11 bg-gray-800/80 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Mail className="w-4 h-4 lg:w-5 lg:h-5" />
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden w-9 h-9 bg-gray-800/80 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 rounded-full flex items-center justify-center transition-all duration-300"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{
            height: isMenuOpen ? "auto" : 0,
            opacity: isMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="lg:hidden overflow-hidden border-t border-gray-700/50"
        >
          <div className="py-4 space-y-1">
            {navItems.map((item) => {
              const isItemActive = isActive(item.id);
              return (
                <div key={item.id}>
                  {item.href ? (
                    <Link href={item.href}>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{
                          opacity: isMenuOpen ? 1 : 0,
                          x: isMenuOpen ? 0 : -20,
                        }}
                        transition={{ duration: 0.3 }}
                        className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                          isItemActive
                            ? "text-white bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30"
                            : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                        }`}
                      >
                        {item.label}
                      </motion.div>
                    </Link>
                  ) : (
                    <motion.button
                      initial={{ opacity: 0, x: -20 }}
                      animate={{
                        opacity: isMenuOpen ? 1 : 0,
                        x: isMenuOpen ? 0 : -20,
                      }}
                      transition={{ duration: 0.3 }}
                      onClick={() => scrollToSection(item.id)}
                      className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                        isItemActive
                          ? "text-white bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30"
                          : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                      }`}
                    >
                      {item.label}
                    </motion.button>
                  )}
                </div>
              );
            })}
            {/* Mobile Social Links */}
            <div className="flex items-center justify-center space-x-4 pt-4 border-t border-gray-700/50 mt-4">
              <a
                href="https://github.com/adeshyearanty"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800/80 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 rounded-full flex items-center justify-center transition-all duration-300"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:adesh.yearanty@gmail.com"
                className="w-10 h-10 bg-gray-800/80 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 rounded-full flex items-center justify-center transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </nav>
  );
}
