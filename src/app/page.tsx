"use client";

import { motion, useScroll } from "framer-motion";
import {
  ChevronDown,
  Cloud,
  Code,
  Database,
  ExternalLink,
  Github,
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
    message: "",
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
        "skills",
        "experience",
        "projects",
        "contact",
      ];
      const scrollPosition = window.scrollY + 120; // Increased offset to account for nav height

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
      const navHeight = 100; // Account for fixed nav height
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

        {/* Floating animated elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute top-1/2 left-3/4 w-48 h-48 bg-pink-500/5 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "4s" }}
          />
        </div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* Enhanced Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-xl border-b border-gray-700/50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center py-6">
            {/* Logo/Brand */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
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
                  className={`relative px-6 py-3 rounded-full font-medium transition-all duration-300 ${
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
            <div className="flex items-center space-x-4">
              {/* Social Links - Hidden on mobile */}
              <div className="hidden sm:flex items-center space-x-3">
                <motion.a
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  href="https://github.com/adeshyearanty"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 bg-gray-800/80 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <Github className="w-5 h-5" />
                </motion.a>
                <motion.a
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  href="mailto:adesh.yearanty@gmail.com"
                  className="w-11 h-11 bg-gray-800/80 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <Mail className="w-5 h-5" />
                </motion.a>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden w-11 h-11 bg-gray-800/80 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 rounded-full flex items-center justify-center transition-all duration-300"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
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
            <div className="py-6 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-6 py-4 rounded-lg font-medium transition-all duration-300 ${
                    activeSection === item.id
                      ? "text-white bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30"
                      : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                  }`}
                >
                  {item.label}
                </button>
              ))}

              {/* Mobile Social Links */}
              <div className="flex items-center justify-center space-x-4 pt-4 border-t border-gray-700/50 mt-4">
                <a
                  href="https://github.com/adeshyearanty"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 bg-gray-800/80 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 rounded-full flex items-center justify-center transition-all duration-300"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="mailto:adesh.yearanty@gmail.com"
                  className="w-11 h-11 bg-gray-800/80 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 rounded-full flex items-center justify-center transition-all duration-300"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section - Redesigned */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center pt-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-lg text-blue-400 font-medium mb-4"
                >
                  Hello, I'm
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-4xl md:text-6xl font-bold mb-4"
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
                  className="text-xl md:text-2xl text-gray-300 mb-6"
                >
                  Full-Stack Developer & Computer Science Engineer
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="text-lg text-gray-400 leading-relaxed max-w-xl"
                >
                  Passionate about creating scalable web solutions with modern
                  technologies. Currently leading CRM development at Miraki
                  Technologies.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap gap-4 text-sm text-gray-300"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  <span>Hyderabad, India</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-purple-400" />
                  <span>adesh.yearanty@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-green-400" />
                  <span>+91 97000 15263</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="flex flex-wrap gap-4"
              >
                <button
                  onClick={() => scrollToSection("projects")}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  View My Work
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="px-8 py-4 border-2 border-gray-600 rounded-full text-white font-semibold hover:border-blue-400 hover:text-blue-400 transition-all duration-300"
                >
                  Let's Connect
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex gap-4"
              >
                <a
                  href="https://github.com/adeshyearanty"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-gray-800/50 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 transition-all duration-300 hover:scale-110 flex items-center justify-center"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href="mailto:adesh.yearanty@gmail.com"
                  className="w-12 h-12 rounded-full bg-gray-800/50 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 transition-all duration-300 hover:scale-110 flex items-center justify-center"
                >
                  <Mail className="w-6 h-6" />
                </a>
              </motion.div>
            </motion.div>

            {/* Right side - Image and stats */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="relative z-10">
                {/* Main image container */}
                <div className="relative w-80 h-80 mx-auto">
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 rotate-6 transform"></div>
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 -rotate-6 transform"></div>
                  <div className="relative w-full h-full rounded-3xl overflow-hidden bg-gray-800 border-2 border-gray-700">
                    <img
                      src="/Photo.jpg"
                      alt="Yearanty Sri Sai Adesh"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
                  </div>
                </div>

                {/* Floating stats cards */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="absolute -top-4 -left-4 bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 border border-gray-700 shadow-lg"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">9.28</div>
                    <div className="text-xs text-gray-400">CGPA</div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="absolute -bottom-4 -right-4 bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 border border-gray-700 shadow-lg"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">
                      2025
                    </div>
                    <div className="text-xs text-gray-400">Graduate</div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1.4 }}
                  className="absolute top-1/2 -left-8 transform -translate-y-1/2 bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 border border-gray-700 shadow-lg"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">
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
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <button
              onClick={() => scrollToSection("about")}
              className="animate-bounce flex flex-col items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-300"
            >
              <span className="text-sm">Scroll Down</span>
              <ChevronDown className="w-6 h-6" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              About Me
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                I'm a passionate Computer Science Engineering student at
                Chaitanya Bharathi Institute of Technology with an outstanding
                CGPA of 9.28/10.00. Currently working as an Associate Full-Stack
                Developer Intern at Miraki Technologies, where I lead the
                development of innovative CRM solutions.
              </p>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                My expertise spans across modern web technologies including
                NestJS, Next.js, React.js, and cloud services. I'm passionate
                about creating scalable, efficient solutions that drive business
                growth and enhance user experiences.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-semibold mb-4 text-blue-400">
                  Education
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium">
                      BE in Computer Science and Engineering
                    </p>
                    <p className="text-gray-400">
                      Chaitanya Bharathi Institute of Technology
                    </p>
                    <p className="text-sm text-gray-500">
                      CGPA: 9.28/10.00 | 2021-2025
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-semibold mb-4 text-purple-400">
                  Current Role
                </h3>
                <div>
                  <p className="font-medium">
                    Associate Full-Stack Developer - Intern
                  </p>
                  <p className="text-gray-400">Miraki Technologies</p>
                  <p className="text-sm text-gray-500">Feb 2025 - Present</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative py-20 bg-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Skills & Technologies
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 hover:border-blue-500 transition-colors duration-300"
            >
              <Code className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-4">
                Programming Languages
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>JavaScript</span>
                  <span className="text-green-400">Expert</span>
                </div>
                <div className="flex justify-between">
                  <span>TypeScript</span>
                  <span className="text-blue-400">Proficient</span>
                </div>
                <div className="flex justify-between">
                  <span>Java</span>
                  <span className="text-blue-400">Proficient</span>
                </div>
                <div className="flex justify-between">
                  <span>Python</span>
                  <span className="text-yellow-400">Intermediate</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 hover:border-purple-500 transition-colors duration-300"
            >
              <Zap className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Web Technologies</h3>
              <div className="space-y-2 text-gray-300">
                <div>NestJS</div>
                <div>Next.js</div>
                <div>React.js</div>
                <div>Express.js</div>
                <div>Node.js</div>
                <div>Laravel</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 hover:border-green-500 transition-colors duration-300"
            >
              <Database className="w-12 h-12 text-green-400 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Databases</h3>
              <div className="space-y-2 text-gray-300">
                <div>MongoDB</div>
                <div>MySQL</div>
                <div>PostgreSQL</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 hover:border-orange-500 transition-colors duration-300"
            >
              <Cloud className="w-12 h-12 text-orange-400 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Cloud & Tools</h3>
              <div className="space-y-2 text-gray-300">
                <div>AWS S3 SDK</div>
                <div>AWS Amplify Lambda</div>
                <div>Razorpay Integration</div>
                <div>RESTful APIs</div>
                <div>Microservices</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Experience
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-gray-700"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-blue-400 mb-2">
                  Associate Full-Stack Developer - Intern
                </h3>
                <p className="text-xl text-gray-300 mb-2">
                  Miraki Technologies
                </p>
                <p className="text-gray-400">Feb 2025 - Present</p>
              </div>
            </div>

            <div className="space-y-4 text-gray-300">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                <p>
                  Leading development of Gamyam AI's CRM product with NestJS
                  microservices and Next.js, focusing on API design and modular
                  architecture
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                <p>
                  Resolved feature requests and bug tickets for Kind India,
                  contributing to both Laravel backend and Next.js frontend
                  improvements
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                <p>
                  Developed dynamic pages and backend APIs for Sohum Spa with
                  integrated Razorpay payment flow
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
                <p>
                  Implemented responsive design and contact form APIs with AWS
                  Amplify Lambda functions for Vaishnaoi Group
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-20 bg-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-blue-400">
                  Gamyam AI CRM
                </h3>
                <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors duration-300" />
              </div>
              <p className="text-gray-300 mb-4">
                Comprehensive Lead Management System with NestJS microservices
                and Next.js frontend, supporting 1000+ leads with advanced
                filtering and task management capabilities.
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="w-2 h-2 bg-green-400 rounded-full" />
                  <span>60% increase in user productivity</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="w-2 h-2 bg-blue-400 rounded-full" />
                  <span>500+ document uploads monthly</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="w-2 h-2 bg-purple-400 rounded-full" />
                  <span>45% boost in lead conversion rates</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                  NestJS
                </span>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
                  Next.js
                </span>
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                  MongoDB
                </span>
                <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm">
                  AWS S3
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-purple-400">
                  E-Commerce Backend
                </h3>
                <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors duration-300" />
              </div>
              <p className="text-gray-300 mb-4">
                Architected RESTful e-commerce APIs with Express.js supporting
                product listing, authentication, user management, cart, and
                wishlist functionality for 100+ concurrent users.
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="w-2 h-2 bg-green-400 rounded-full" />
                  <span>50% reduction in API response time</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="w-2 h-2 bg-blue-400 rounded-full" />
                  <span>Enhanced security with middleware</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                  Express.js
                </span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                  MongoDB
                </span>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
                  Node.js
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 hover:border-green-500 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-green-400">
                  Book Store Application
                </h3>
                <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-green-400 transition-colors duration-300" />
              </div>
              <p className="text-gray-300 mb-4">
                Comprehensive book store management application with full CRUD
                operations, real-time inventory tracking, and responsive UI with
                search and filter capabilities.
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="w-2 h-2 bg-green-400 rounded-full" />
                  <span>90% reduction in manual data entry</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="w-2 h-2 bg-blue-400 rounded-full" />
                  <span>200+ book entries management</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                  React.js
                </span>
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                  Express.js
                </span>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
                  MongoDB
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700 hover:border-orange-500 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-orange-400">
                  Weather Application
                </h3>
                <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-orange-400 transition-colors duration-300" />
              </div>
              <p className="text-gray-300 mb-4">
                Responsive weather application with React.js featuring
                location-based weather reporting, integrating third-party
                weather API with comprehensive error handling.
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="w-2 h-2 bg-green-400 rounded-full" />
                  <span>50+ global locations supported</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="w-2 h-2 bg-blue-400 rounded-full" />
                  <span>99% uptime reliability</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                  React.js
                </span>
                <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm">
                  Weather API
                </span>
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                  CSS
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12">
              I'm always open to discussing new opportunities and interesting
              projects. Let's connect and create something amazing together!
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="grid gap-8 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <Mail className="w-8 h-8 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Email</h3>
                    <p className="text-gray-300">adesh.yearanty@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <Phone className="w-8 h-8 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Phone</h3>
                    <p className="text-gray-300">+91 97000 15263</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                    <Github className="w-8 h-8 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">GitHub</h3>
                    <p className="text-gray-300">github.com/adeshyearanty</p>
                  </div>
                </div>
              </div>

              <div className="text-center lg:text-left">
                <a
                  href="mailto:adesh.yearanty@gmail.com"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
                >
                  <Mail className="w-5 h-5" />
                  Quick Email
                </a>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-gray-700"
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
                  <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 text-center">
                    Thank you! Your message has been sent successfully. I'll get
                    back to you soon.
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-center">
                    Oops! Something went wrong. Please try again or reach out
                    directly via email.
                  </div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2025 Yearanty Sri Sai Adesh. Built with Next.js and Framer Motion.
          </p>
        </div>
      </footer>
    </div>
  );
}
