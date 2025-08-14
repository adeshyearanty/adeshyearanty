"use client";

import type React from "react";

import { motion, useScroll } from "framer-motion";
import {
  Briefcase,
  Building,
  Calendar,
  ChevronDown,
  Cloud,
  Code,
  Database,
  ExternalLink,
  Github,
  GraduationCap,
  Mail,
  MapPin,
  Menu,
  MessageSquare,
  Phone,
  Send,
  User,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    phone: "",
    company: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const { scrollYProgress } = useScroll();

  // Add progress bar at the top of the page
  useEffect(() => {
    const progressBar = document.createElement("div");
    progressBar.className =
      "fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 z-50 transform origin-left";
    document.body.appendChild(progressBar);

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      progressBar.style.transform = `scaleX(${latest})`;
    });

    return () => {
      unsubscribe();
      if (document.body.contains(progressBar)) {
        document.body.removeChild(progressBar);
      }
    };
  }, [scrollYProgress]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "hero",
        "about",
        "education",
        "skills",
        "experience",
        "projects",
        "contact",
      ];
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
  }, []);

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (result.success) {
        setSubmitStatus("success");
      } else {
        setSubmitStatus("error");
      }
    } catch (err) {
      console.error(err);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
        {/* Floating animated elements - Better mobile positioning */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-20 sm:w-32 md:w-64 h-20 sm:h-32 md:h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute top-3/4 right-1/4 w-24 sm:w-48 md:w-96 h-24 sm:h-48 md:h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute top-1/2 left-3/4 w-16 sm:w-24 md:w-48 h-16 sm:h-24 md:h-48 bg-pink-500/5 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "4s" }}
          />
        </div>
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:20px_20px] sm:bg-[size:25px_25px] md:bg-[size:50px_50px]" />
      </div>

      {/* Enhanced Navigation */}
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
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-sm font-bold">
                A
              </div>
              <span className="text-lg lg:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Adesh Yearanty
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 xl:px-6 py-2 xl:py-3 rounded-full font-medium transition-all duration-300 ${
                    activeSection === item.id
                      ? "text-white bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30"
                      : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
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
              ))}
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
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: isMenuOpen ? 1 : 0,
                    x: isMenuOpen ? 0 : -20,
                  }}
                  transition={{ duration: 0.3 }}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeSection === item.id
                      ? "text-white bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30"
                      : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
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

      {/* Hero Section - Mobile First Responsive */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center pt-20 lg:pt-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Mobile: Image first, Desktop: Text first */}
            <div className="order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-4 sm:space-y-6 lg:space-y-8 text-center lg:text-left"
              >
                <div>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-sm sm:text-base lg:text-lg text-blue-400 font-medium mb-2 lg:mb-4"
                  >
                    Hello, I&apos;m
                  </motion.p>
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-2 lg:mb-4 leading-tight"
                  >
                    <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                      Yearanty Sri
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                      Sai Adesh
                    </span>
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-base sm:text-lg lg:text-2xl text-gray-300 mb-3 lg:mb-6"
                  >
                    Full-Stack Developer & Computer Science Engineer
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-sm sm:text-base lg:text-lg text-gray-400 leading-relaxed max-w-xl mx-auto lg:mx-0"
                  >
                    Passionate about creating scalable web solutions with modern
                    technologies. Currently working as Full-Stack Developer at
                    Miraki Technologies.
                  </motion.p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="flex flex-col space-y-2 sm:space-y-1 text-xs sm:text-sm text-gray-300 justify-center lg:justify-start"
                >
                  <div className="flex items-center gap-2 justify-center lg:justify-start">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 flex-shrink-0" />
                    <span>Hyderabad, India</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center lg:justify-start">
                    <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400 flex-shrink-0" />
                    <span className="text-xs sm:text-sm">
                      adesh.yearanty@gmail.com
                    </span>
                  </div>
                  <div className="flex items-center gap-2 justify-center lg:justify-start">
                    <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
                    <span>+91 97000 15263</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
                >
                  <button
                    onClick={() => scrollToSection("projects")}
                    className="px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-semibold text-sm sm:text-base hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    View My Work
                  </button>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 border-2 border-gray-600 rounded-full text-white font-semibold text-sm sm:text-base hover:border-blue-400 hover:text-blue-400 transition-all duration-300"
                  >
                    Let&apos;s Connect
                  </button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="flex gap-3 sm:gap-4 justify-center lg:justify-start"
                >
                  <a
                    href="https://github.com/adeshyearanty"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-800/50 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 transition-all duration-300 hover:scale-110 flex items-center justify-center"
                  >
                    <Github className="w-5 h-5 sm:w-6 sm:h-6" />
                  </a>
                  <a
                    href="mailto:adesh.yearanty@gmail.com"
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-800/50 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 transition-all duration-300 hover:scale-110 flex items-center justify-center"
                  >
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                  </a>
                </motion.div>
              </motion.div>
            </div>

            {/* Right side - Image and stats */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative order-1 lg:order-2"
            >
              <div className="relative z-10">
                {/* Main image container - Better responsive sizing */}
                <div className="relative w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 mx-auto">
                  <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 rotate-6 transform"></div>
                  <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 -rotate-6 transform"></div>
                  <div className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden bg-gray-800 border-2 border-gray-700">
                    <img
                      className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-4xl font-bold text-white"
                      src="/Photo.jpg"
                      alt="Adesh Yearanty"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
                  </div>
                </div>

                {/* Floating stats cards - Better mobile positioning */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="absolute -top-1 -left-1 sm:-top-2 sm:-left-2 md:-top-4 md:-left-4 bg-gray-800/90 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 border border-gray-700 shadow-lg"
                >
                  <div className="text-center">
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-blue-400">
                      9.28
                    </div>
                    <div className="text-xs text-gray-400">CGPA</div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 md:-bottom-4 md:-right-4 bg-gray-800/90 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 border border-gray-700 shadow-lg"
                >
                  <div className="text-center">
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-purple-400">
                      2025
                    </div>
                    <div className="text-xs text-gray-400">Graduate</div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1.4 }}
                  className="absolute top-1/2 -left-2 sm:-left-4 md:-left-8 transform -translate-y-1/2 bg-gray-800/90 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 border border-gray-700 shadow-lg"
                >
                  <div className="text-center">
                    <div className="text-sm sm:text-lg md:text-2xl font-bold text-green-400">
                      Full-Stack
                    </div>
                    <div className="text-xs text-gray-400">Developer</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <button
              onClick={() => scrollToSection("about")}
              className="animate-bounce flex flex-col items-center gap-1 sm:gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-300"
            >
              <span className="text-xs sm:text-sm">Scroll Down</span>
              <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="relative py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              About Me
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="text-base lg:text-lg text-gray-300 leading-relaxed">
                I&apos;m a passionate Computer Science Engineering graduate from
                Chaitanya Bharathi Institute of Technology with an outstanding
                CGPA of 9.28/10.00. Currently working as a Full-Stack Developer
                at Miraki Technologies, where I develop innovative CRM solutions
                and web applications.
              </p>
              <p className="text-base lg:text-lg text-gray-300 leading-relaxed">
                My expertise spans across modern web technologies including
                NestJS, Next.js, React.js, and cloud services. I&apos;m
                passionate about creating scalable, efficient solutions that
                drive business growth and enhance user experiences.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300">
                <h3 className="text-xl font-semibold mb-4 text-blue-400">
                  Current Role
                </h3>
                <div>
                  <p className="font-medium">Full-Stack Developer</p>
                  <p className="text-gray-400">Miraki Technologies</p>
                  <p className="text-sm text-gray-500">Aug 2024 - Present</p>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
                <h3 className="text-xl font-semibold mb-4 text-purple-400">
                  Achievements
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-sm">CGPA: 9.28/10.00</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-sm">Leading CRM Development</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-sm">Full-Stack Expertise</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Education Section with Timeline */}
      <section
        id="education"
        className="relative py-16 lg:py-20 bg-gray-800/30 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Education
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 lg:left-1/2 transform lg:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>

            <div className="space-y-8 lg:space-y-12">
              {/* Bachelor's Degree */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative flex items-center"
              >
                <div className="absolute left-4 lg:left-1/2 transform lg:-translate-x-1/2 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-gray-900 z-10"></div>
                <div className="ml-12 lg:ml-0 lg:w-1/2 lg:pr-8">
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      <GraduationCap className="w-6 h-6 text-blue-400" />
                      <span className="text-sm text-blue-400 font-medium">
                        2021 - 2025
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      BE in Computer Science and Engineering
                    </h3>
                    <p className="text-gray-300 mb-2">
                      Chaitanya Bharathi Institute of Technology
                    </p>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm text-gray-400">CGPA:</span>
                      <span className="text-lg font-bold text-green-400">
                        9.3/10.00
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      Completed: June 2025
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Intermediate */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative flex items-center lg:justify-end"
              >
                <div className="absolute left-4 lg:left-1/2 transform lg:-translate-x-1/2 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-4 border-gray-900 z-10"></div>
                <div className="ml-12 lg:ml-0 lg:w-1/2 lg:pl-8">
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      <Calendar className="w-6 h-6 text-purple-400" />
                      <span className="text-sm text-purple-400 font-medium">
                        2019 - 2021
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Intermediate (MPC)
                    </h3>
                    <p className="text-gray-300 mb-2">
                      Narayana Junior College
                    </p>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm text-gray-400">Percentage:</span>
                      <span className="text-lg font-bold text-green-400">
                        98.6%
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">Completed: May 2021</p>
                  </div>
                </div>
              </motion.div>

              {/* High School */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="relative flex items-center"
              >
                <div className="absolute left-4 lg:left-1/2 transform lg:-translate-x-1/2 w-4 h-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-full border-4 border-gray-900 z-10"></div>
                <div className="ml-12 lg:ml-0 lg:w-1/2 lg:pr-8">
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 hover:border-green-500/50 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      <Calendar className="w-6 h-6 text-green-400" />
                      <span className="text-sm text-green-400 font-medium">
                        2019
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      High School
                    </h3>
                    <p className="text-gray-300 mb-2">
                      Sri Sai Grammar High School
                    </p>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm text-gray-400">GPA:</span>
                      <span className="text-lg font-bold text-green-400">
                        9.8/10.0
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">Completed: May 2019</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section - Enhanced with 3D Effects */}
      <section
        id="skills"
        className="relative py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + i * 0.2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.1,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Skills & Technologies
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Mastering the art of full-stack development with cutting-edge
              technologies
            </p>
          </motion.div>

          {/* Skills Constellation */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
            {/* Programming Languages */}
            <motion.div
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
              }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-500 transform-gpu perspective-1000"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Glowing background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <Code className="w-12 h-12 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                </div>

                <h3 className="text-xl font-semibold mb-4 group-hover:text-blue-400 transition-colors duration-300">
                  Programming Languages
                </h3>

                <div className="space-y-3">
                  {[
                    "JavaScript",
                    "TypeScript",
                    "Java",
                    "Python",
                    "C Language",
                  ].map((lang, index) => (
                    <motion.div
                      key={lang}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.05, x: 5 }}
                      transition={{ duration: 0.3, delay: 1.2 + index * 0.1 }}
                      className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors duration-300 cursor-pointer"
                    >
                      <div className="w-2 h-2 bg-blue-400 rounded-full group-hover:animate-pulse" />
                      <span className="text-sm">{lang}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Web Technologies */}
            <motion.div
              initial={{ opacity: 0, y: 50, rotateY: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              whileHover={{
                scale: 1.05,
                rotateY: -5,
                boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)",
              }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-500 transform-gpu"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <Zap className="w-12 h-12 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
                </div>

                <h3 className="text-xl font-semibold mb-4 group-hover:text-purple-400 transition-colors duration-300">
                  Web Technologies
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    "NestJS",
                    "Next.js",
                    "React.js",
                    "Express.js",
                    "Node.js",
                    "Laravel",
                  ].map((tech, index) => (
                    <motion.div
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                      className="bg-gray-700/50 rounded-lg p-2 text-center text-sm font-medium text-gray-300 hover:text-purple-400 hover:bg-purple-500/20 transition-all duration-300 cursor-pointer"
                    >
                      {tech}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Databases */}
            <motion.div
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                boxShadow: "0 20px 40px rgba(34, 197, 94, 0.3)",
              }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-green-500/50 transition-all duration-500 transform-gpu"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <Database className="w-12 h-12 text-green-400 group-hover:scale-110 transition-transform duration-300" />
                </div>

                <h3 className="text-xl font-semibold mb-4 group-hover:text-green-400 transition-colors duration-300">
                  Databases & Cloud
                </h3>

                <div className="space-y-4">
                  {[
                    { name: "MongoDB", icon: "🍃" },
                    { name: "AWS S3 SDK", icon: "☁️" },
                    { name: "AWS Amplify Lambda", icon: "⚡" },
                  ].map((db, index) => (
                    <motion.div
                      key={db.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      whileHover={{ x: 5, scale: 1.02 }}
                      transition={{ duration: 0.3, delay: 1 + index * 0.1 }}
                      className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg hover:bg-green-500/20 transition-all duration-300 cursor-pointer"
                    >
                      <span className="text-2xl">{db.icon}</span>
                      <div>
                        <div className="font-medium text-gray-300">
                          {db.name}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Cloud & Tools */}
            <motion.div
              initial={{ opacity: 0, y: 50, rotateY: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              whileHover={{
                scale: 1.05,
                rotateY: -5,
                boxShadow: "0 20px 40px rgba(249, 115, 22, 0.3)",
              }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-orange-500/50 transition-all duration-500 transform-gpu"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <Cloud className="w-12 h-12 text-orange-400 group-hover:scale-110 transition-transform duration-300" />
                </div>

                <h3 className="text-xl font-semibold mb-4 group-hover:text-orange-400 transition-colors duration-300">
                  Tools & Platforms
                </h3>

                <div className="space-y-3">
                  {[
                    "Razorpay Integration",
                    "RESTful APIs",
                    "Microservices Architecture",
                    "Git",
                    "Docker",
                  ].map((tool, index) => (
                    <motion.div
                      key={tool}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.05, x: 5 }}
                      transition={{ duration: 0.3, delay: 1.2 + index * 0.1 }}
                      className="flex items-center gap-2 text-gray-300 hover:text-orange-400 transition-colors duration-300 cursor-pointer"
                    >
                      <div className="w-2 h-2 bg-orange-400 rounded-full group-hover:animate-pulse" />
                      <span className="text-sm">{tool}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Interactive Skill Badges */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-2xl font-bold mb-8 text-gray-300">
              Additional Technologies
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { name: "Express.js", color: "from-green-400 to-emerald-500" },
                { name: "Laravel", color: "from-red-400 to-orange-500" },
                { name: "Tailwind CSS", color: "from-cyan-400 to-blue-500" },
                { name: "Framer Motion", color: "from-purple-400 to-pink-500" },
                { name: "HTML5", color: "from-orange-400 to-red-500" },
                { name: "CSS3", color: "from-blue-400 to-purple-500" },
                { name: "Weather API", color: "from-yellow-400 to-orange-500" },
                {
                  name: "Third-party APIs",
                  color: "from-indigo-400 to-purple-500",
                },
              ].map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  whileHover={{
                    scale: 1.1,
                    y: -5,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.6 + index * 0.05,
                    type: "spring",
                    stiffness: 300,
                  }}
                  className={`px-6 py-3 bg-gradient-to-r ${tech.color} rounded-full text-white font-semibold text-sm cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  {tech.name}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section with Timeline */}
      <section
        id="experience"
        className="relative py-16 lg:py-20 bg-gray-800/30 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Experience
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 lg:left-1/2 transform lg:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>

            <div className="space-y-8 lg:space-y-12">
              {/* Full-time Role */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative flex items-center"
              >
                <div className="absolute left-4 lg:left-1/2 transform lg:-translate-x-1/2 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-gray-900 z-10"></div>
                <div className="ml-12 lg:ml-0 lg:w-1/2 lg:pr-8">
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      <Briefcase className="w-6 h-6 text-blue-400" />
                      <span className="text-sm text-blue-400 font-medium">
                        Aug 2024 - Present
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Full-Stack Developer
                    </h3>
                    <p className="text-gray-300 mb-4">Miraki Technologies</p>

                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                        <p className="text-sm text-gray-300">
                          Leading development of Salesastra CRM with NestJS
                          microservices and Next.js frontend
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                        <p className="text-sm text-gray-300">
                          Architecting scalable solutions for 1000+ leads
                          management
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                        <p className="text-sm text-gray-300">
                          Implementing advanced filtering and task management
                          features
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Internship */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative flex items-center lg:justify-end"
              >
                <div className="absolute left-4 lg:left-1/2 transform lg:-translate-x-1/2 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-4 border-gray-900 z-10"></div>
                <div className="ml-12 lg:ml-0 lg:w-1/2 lg:pl-8">
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      <Briefcase className="w-6 h-6 text-purple-400" />
                      <span className="text-sm text-purple-400 font-medium">
                        Feb 2024 -
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Associate Full-Stack Developer - Intern
                    </h3>
                    <p className="text-gray-300 mb-4">Miraki Technologies</p>

                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                        <p className="text-sm text-gray-300">
                          Resolved feature requests and bug tickets for Kind
                          India platform
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                        <p className="text-sm text-gray-300">
                          Developed dynamic pages for Sohum Spa with Razorpay
                          integration
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                        <p className="text-sm text-gray-300">
                          Implemented responsive design for Vaishnaoi Group with
                          AWS Lambda
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section - Enhanced 3D Showcase */}
      <section
        id="projects"
        className="relative py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        {/* Dynamic background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800/30 to-gray-900/30" />
          {/* Floating geometric shapes */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 border border-blue-400/20"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 4 + i * 0.3,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Innovative solutions that push the boundaries of web development
            </p>
          </motion.div>

          {/* Projects Grid with 3D Effects */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Salesastra CRM - Enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 50, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              whileHover={{
                y: -10,
                rotateX: 5,
                rotateY: 5,
                scale: 1.02,
                boxShadow: "0 25px 50px rgba(59, 130, 246, 0.3)",
              }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 hover:border-blue-500/50 transition-all duration-500 transform-gpu"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Project mockup/preview */}
              <div className="relative h-48 lg:h-56 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
                <motion.div
                  className="absolute inset-4 bg-gray-900 rounded-lg border border-gray-600 overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Simulated browser window */}
                  <div className="flex items-center gap-2 p-3 bg-gray-800 border-b border-gray-600">
                    <div className="flex gap-1">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="flex-1 bg-gray-700 rounded px-3 py-1 text-xs text-gray-400">
                      dev-app.salesastra.ai
                    </div>
                  </div>
                  {/* Simulated dashboard content */}
                  <div className="p-4 space-y-3">
                    <div className="flex gap-3">
                      <div className="w-16 h-3 bg-blue-500/50 rounded"></div>
                      <div className="w-24 h-3 bg-purple-500/50 rounded"></div>
                      <div className="w-12 h-3 bg-green-500/50 rounded"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={i}
                          className="h-8 bg-gray-700/50 rounded animate-pulse"
                          style={{ animationDelay: `${i * 0.1}s` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Live indicator */}
                <div className="absolute top-4 right-4 flex items-center gap-2 bg-green-500/20 backdrop-blur-sm rounded-full px-3 py-1 border border-green-500/30">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-400 font-medium">
                    Live
                  </span>
                </div>
              </div>

              <div className="p-6 lg:p-8 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl lg:text-3xl font-bold text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                    Gamyam AI CRM
                  </h3>
                  <motion.a
                    href="https://dev-app.salesastra.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-blue-500/20 hover:bg-blue-500/30 rounded-full flex items-center justify-center transition-all duration-300"
                  >
                    <ExternalLink className="w-5 h-5 text-blue-400" />
                  </motion.a>
                </div>

                <p className="text-gray-300 mb-6 text-sm lg:text-base leading-relaxed">
                  Lead Management System built with NestJS microservices and
                  Next.js, supporting 1000+ leads with advanced filtering, task
                  management, and file handling through AWS S3 integration.
                </p>

                {/* Tech stack with animated badges */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: "NestJS", color: "from-red-500 to-pink-500" },
                    { name: "Next.js", color: "from-blue-500 to-purple-500" },
                    { name: "MongoDB", color: "from-green-500 to-emerald-500" },
                    { name: "AWS S3", color: "from-orange-500 to-red-500" },
                  ].map((tech, index) => (
                    <motion.span
                      key={tech.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                      className={`px-3 py-1 bg-gradient-to-r ${tech.color} rounded-full text-white text-sm font-medium cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300`}
                    >
                      {tech.name}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* E-Commerce Backend - Enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              whileHover={{
                y: -10,
                rotateX: -5,
                rotateY: -5,
                scale: 1.02,
                boxShadow: "0 25px 50px rgba(139, 92, 246, 0.3)",
              }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all duration-500 transform-gpu"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* API visualization */}
              <div className="relative h-48 lg:h-56 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20" />
                <div className="absolute inset-4 bg-gray-900 rounded-lg border border-gray-600 p-4">
                  {/* API endpoints visualization */}
                  <div className="space-y-2">
                    {[
                      {
                        method: "GET",
                        endpoint: "/api/products",
                        status: "200",
                      },
                      {
                        method: "POST",
                        endpoint: "/api/auth/login",
                        status: "201",
                      },
                      {
                        method: "PUT",
                        endpoint: "/api/cart/update",
                        status: "200",
                      },
                      {
                        method: "DELETE",
                        endpoint: "/api/wishlist",
                        status: "204",
                      },
                    ].map((api, index) => (
                      <motion.div
                        key={api.endpoint}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        className="flex items-center gap-3 text-xs"
                      >
                        <span
                          className={`px-2 py-1 rounded font-mono ${
                            api.method === "GET"
                              ? "bg-green-500/20 text-green-400"
                              : api.method === "POST"
                              ? "bg-blue-500/20 text-blue-400"
                              : api.method === "PUT"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {api.method}
                        </span>
                        <span className="text-gray-300 font-mono flex-1">
                          {api.endpoint}
                        </span>
                        <span className="text-green-400">{api.status}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="absolute top-4 right-4 flex items-center gap-2 bg-purple-500/20 backdrop-blur-sm rounded-full px-3 py-1 border border-purple-500/30">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-purple-400 font-medium">
                    API
                  </span>
                </div>
              </div>

              <div className="p-6 lg:p-8 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl lg:text-3xl font-bold text-purple-400 group-hover:text-purple-300 transition-colors duration-300">
                    E-Commerce Backend
                  </h3>
                  <motion.a
                    href="https://github.com/adeshyearanty/ecommerce-backend"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-purple-500/20 hover:bg-purple-500/30 rounded-full flex items-center justify-center transition-all duration-300"
                  >
                    <ExternalLink className="w-5 h-5 text-purple-400" />
                  </motion.a>
                </div>

                <p className="text-gray-300 mb-6 text-sm lg:text-base leading-relaxed">
                  Scalable RESTful API architecture powering modern e-commerce
                  experiences with advanced authentication, real-time inventory,
                  and optimized performance for 100+ concurrent users.
                </p>

                <div className="flex flex-wrap gap-2">
                  {[
                    {
                      name: "Express.js",
                      color: "from-green-500 to-emerald-500",
                    },
                    { name: "MongoDB", color: "from-green-600 to-green-400" },
                    { name: "Node.js", color: "from-green-500 to-lime-500" },
                  ].map((tech, index) => (
                    <motion.span
                      key={tech.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                      className={`px-3 py-1 bg-gradient-to-r ${tech.color} rounded-full text-white text-sm font-medium cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300`}
                    >
                      {tech.name}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Book Store Application - Enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 50, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              whileHover={{
                y: -10,
                rotateX: 5,
                rotateY: 5,
                scale: 1.02,
                boxShadow: "0 25px 50px rgba(34, 197, 94, 0.3)",
              }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 hover:border-green-500/50 transition-all duration-500 transform-gpu"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Book store interface mockup */}
              <div className="relative h-48 lg:h-56 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-emerald-600/20" />
                <div className="absolute inset-4 bg-gray-900 rounded-lg border border-gray-600 p-4">
                  {/* Book grid simulation */}
                  <div className="grid grid-cols-4 gap-2">
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: i * 0.1 }}
                        className="aspect-[3/4] bg-gradient-to-b from-green-400/30 to-green-600/30 rounded border border-green-500/30"
                      />
                    ))}
                  </div>
                </div>

                <div className="absolute top-4 right-4 flex items-center gap-2 bg-green-500/20 backdrop-blur-sm rounded-full px-3 py-1 border border-green-500/30">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-400 font-medium">
                    CRUD
                  </span>
                </div>
              </div>

              <div className="p-6 lg:p-8 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl lg:text-3xl font-bold text-green-400 group-hover:text-green-300 transition-colors duration-300">
                    Book Store App
                  </h3>
                  <motion.a
                    href="https://book-store-mern-project-66hw.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-green-500/20 hover:bg-green-500/30 rounded-full flex items-center justify-center transition-all duration-300"
                  >
                    <ExternalLink className="w-5 h-5 text-green-400" />
                  </motion.a>
                </div>

                <p className="text-gray-300 mb-6 text-sm lg:text-base leading-relaxed">
                  Full-featured book management system with real-time inventory
                  tracking, advanced search capabilities, and intuitive CRUD
                  operations for seamless library management.
                </p>

                <div className="flex flex-wrap gap-2">
                  {[
                    { name: "React.js", color: "from-blue-500 to-cyan-500" },
                    {
                      name: "Express.js",
                      color: "from-green-500 to-emerald-500",
                    },
                    { name: "MongoDB", color: "from-green-600 to-green-400" },
                  ].map((tech, index) => (
                    <motion.span
                      key={tech.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                      className={`px-3 py-1 bg-gradient-to-r ${tech.color} rounded-full text-white text-sm font-medium cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300`}
                    >
                      {tech.name}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Weather Application - Enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              whileHover={{
                y: -10,
                rotateX: -5,
                rotateY: -5,
                scale: 1.02,
                boxShadow: "0 25px 50px rgba(249, 115, 22, 0.3)",
              }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 hover:border-orange-500/50 transition-all duration-500 transform-gpu"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-yellow-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Weather app interface */}
              <div className="relative h-48 lg:h-56 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-yellow-600/20" />
                <div className="absolute inset-4 bg-gray-900 rounded-lg border border-gray-600 p-4">
                  {/* Weather widget simulation */}
                  <div className="text-center space-y-2">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{
                        duration: 8,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                      className="w-12 h-12 mx-auto bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center"
                    >
                      ☀️
                    </motion.div>
                    <div className="text-2xl font-bold text-orange-400">
                      25°C
                    </div>
                    <div className="text-sm text-gray-400">Sunny</div>
                    <div className="flex justify-center gap-2 mt-3">
                      {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, i) => (
                        <div key={day} className="text-xs text-center">
                          <div className="text-gray-400">{day}</div>
                          <div className="text-orange-400">{20 + i}°</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="absolute top-4 right-4 flex items-center gap-2 bg-orange-500/20 backdrop-blur-sm rounded-full px-3 py-1 border border-orange-500/30">
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-orange-400 font-medium">
                    Real-time
                  </span>
                </div>
              </div>

              <div className="p-6 lg:p-8 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl lg:text-3xl font-bold text-orange-400 group-hover:text-orange-300 transition-colors duration-300">
                    Weather App
                  </h3>
                  <motion.a
                    href="https://github.com/adeshyearanty/Weather-Application"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-orange-500/20 hover:bg-orange-500/30 rounded-full flex items-center justify-center transition-all duration-300"
                  >
                    <ExternalLink className="w-5 h-5 text-orange-400" />
                  </motion.a>
                </div>

                <p className="text-gray-300 mb-6 text-sm lg:text-base leading-relaxed">
                  Intelligent weather forecasting application with
                  location-based services, real-time updates, and comprehensive
                  error handling for reliable global weather data.
                </p>

                <div className="flex flex-wrap gap-2">
                  {[
                    { name: "React.js", color: "from-blue-500 to-cyan-500" },
                    {
                      name: "Weather API",
                      color: "from-orange-500 to-yellow-500",
                    },
                    { name: "CSS3", color: "from-pink-500 to-purple-500" },
                  ].map((tech, index) => (
                    <motion.span
                      key={tech.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                      className={`px-3 py-1 bg-gradient-to-r ${tech.color} rounded-full text-white text-sm font-medium cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300`}
                    >
                      {tech.name}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="relative py-16 lg:py-20 bg-gray-800/30 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <p className="text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto mb-8 lg:mb-12">
              I&apos;m always open to discussing new opportunities and
              interesting projects. Let&apos;s connect and create something
              amazing together!
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="grid gap-6 lg:gap-8 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 p-4 bg-gray-800/30 rounded-lg border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
                >
                  <div className="w-14 h-14 lg:w-16 lg:h-16 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 lg:w-8 lg:h-8 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Email</h3>
                    <p className="text-gray-300 text-sm lg:text-base">
                      adesh.yearanty@gmail.com
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 p-4 bg-gray-800/30 rounded-lg border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300"
                >
                  <div className="w-14 h-14 lg:w-16 lg:h-16 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 lg:w-8 lg:h-8 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Phone</h3>
                    <p className="text-gray-300 text-sm lg:text-base">
                      +91 97000 15263
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 p-4 bg-gray-800/30 rounded-lg border border-gray-700/50 hover:border-green-500/50 transition-all duration-300"
                >
                  <div className="w-14 h-14 lg:w-16 lg:h-16 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Github className="w-6 h-6 lg:w-8 lg:h-8 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">GitHub</h3>
                    <p className="text-gray-300 text-sm lg:text-base">
                      github.com/adeshyearanty
                    </p>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-center lg:text-left"
              >
                <a
                  href="mailto:adesh.yearanty@gmail.com"
                  className="inline-flex items-center gap-2 px-6 lg:px-8 py-3 lg:py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <Mail className="w-5 h-5" />
                  Quick Email
                </a>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 lg:p-8 border border-gray-700"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Your Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your name"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Subject
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="What's this about?"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Phone (optional)
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Company (optional)
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your company name"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Message
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full pl-12 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Tell me about your project or just say hello!"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white font-semibold hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>

                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 text-center"
                  >
                    Thank you! Your message has been sent successfully.
                    I&apos;ll get back to you soon.
                  </motion.div>
                )}

                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-center"
                  >
                    Oops! Something went wrong. Please try again or reach out
                    directly via email.
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-6 lg:py-8 border-t border-gray-800 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-gray-400 text-sm lg:text-base"
          >
            © 2025 Yearanty Sri Sai Adesh. Built with Next.js and Framer Motion.
          </motion.p>
        </div>
      </footer>
    </div>
  );
}
