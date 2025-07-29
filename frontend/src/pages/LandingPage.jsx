import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  LayoutTemplate,
  Zap,
  Download,
  Menu,
  X,
  Check,
  Award,
  FileText,
} from "lucide-react";
import SignUp from "../components/SignUp";
import Login from "../components/Login";
import Modal from "../components/Modal";
import { UserContext } from "../context/userContext";
import { ProfileInfoCard } from "../components/Cards";
import heroImg from "../assets/heroImg.png";

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCTA = () => {
    if (!user) setOpenAuthModal(true);
    else navigate("/dashboard");
  };

  const handleViewTemplates = () => {
    const section = document.getElementById('features-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white text-gray-900">
      {/* Header */}
      <header className="w-full bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xl font-bold text-blue-700">
            <LayoutTemplate className="text-blue-600" />
            <span>ResumeXpert</span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {user ? (
              <ProfileInfoCard />
            ) : (
              <button
                onClick={() => setOpenAuthModal(true)}
                className="px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full font-medium hover:opacity-90 transition shadow-md"
              >
                Get Started
              </button>
            )}
          </div>

          <button
            className="md:hidden text-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-sm border-t px-4 pb-4">
            {user ? (
              <button
                onClick={() => {
                  navigate("/dashboard");
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2 rounded-xl mt-2 shadow-md"
              >
                Go to Dashboard
              </button>
            ) : (
              <button
                onClick={() => {
                  setOpenAuthModal(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2 rounded-xl mt-2 shadow-md"
              >
                Get Started
              </button>
            )}
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="w-full py-20 px-6 md:px-12 lg:px-24">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 max-w-7xl mx-auto">
          {/* Left */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full mb-4">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-medium">TRUSTED BY PROFESSIONALS WORLDWIDE</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
              <span className="text-gray-900">Craft </span>
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 text-transparent bg-clip-text">
                Job-Winning
              </span>{" "}
              <span className="text-gray-900">Resumes</span>
            </h1>
            <p className="text-gray-600 text-lg mb-8 max-w-xl">
              Build stunning, ATS-friendly resumes in minutes with recruiter-approved templates that help you stand out from the competition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={handleCTA}
                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:opacity-90 text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 transition shadow-lg hover:shadow-xl"
              >
                Start Building <ArrowRight size={18} />
              </button>
              <button
                onClick={handleViewTemplates}
                className="border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-full font-medium transition shadow-sm hover:shadow-md"
              >
                View Templates
              </button>
            </div>

            <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
              {['ATS Optimized', '30+ Templates', 'Instant Download'].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-gray-600">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="flex-1 relative">
            <div className="absolute -top-6 -right-6 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob"></div>
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-blue-50 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-2000"></div>
            <img
              src={heroImg}
              alt="Resume builder"
              className="w-full max-w-[500px] mx-auto drop-shadow-2xl rounded-lg relative z-10"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features-section" className="py-20 px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="text-blue-600">ResumeXpert?</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to create a professional resume that lands interviews at top companies.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8 text-blue-600" />,
                title: "Lightning Fast",
                desc: "Create professional resumes in under 5 minutes with our intuitive flow.",
                bg: "bg-blue-50",
              },
              {
                icon: <LayoutTemplate className="w-8 h-8 text-blue-500" />,
                title: "Pro Templates",
                desc: "Choose from dozens of ATS-ready, recruiter-approved designs.",
                bg: "bg-blue-50",
              },
              {
                icon: <Download className="w-8 h-8 text-blue-400" />,
                title: "Instant Export",
                desc: "Download PDF resumes instantly with perfect formatting.",
                bg: "bg-blue-50",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`p-8 ${item.bg} rounded-2xl text-left transition-all hover:-translate-y-2 hover:shadow-lg`}
              >
                <div className={`w-12 h-12 ${item.bg.replace('50', '100')} rounded-lg flex items-center justify-center mb-4`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Success <span className="text-blue-600">Stories</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from professionals who landed their dream jobs with ResumeXpert
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "ResumeXpert helped me create a resume that got me interviews at 3 FAANG companies!",
                name: "Sarah K.",
                role: "Software Engineer at Google",
              },
              {
                quote: "I went from no responses to multiple interview offers after using ResumeXpert's templates.",
                name: "Michael T.",
                role: "Marketing Director",
              },
              {
                quote: "The ATS optimization feature is a game changer. Got my first interview in a week!",
                name: "Priya M.",
                role: "Data Analyst at Microsoft",
              },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
                <Award className="w-8 h-8 text-blue-500 mb-4" />
                <p className="text-gray-600 italic mb-6">"{item.quote}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Call-to-Action */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-blue-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Build Your Standout Resume?
          </h2>
          <p className="mb-8 text-lg text-blue-100 max-w-2xl mx-auto">
            Join thousands of professionals who landed jobs at top companies using ResumeXpert
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleCTA}
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition shadow-lg"
            >
              Start Building Now
            </button>
            <button
              onClick={handleCTA}
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition"
            >
              View Examples
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 text-xl font-bold text-white mb-4">
              <LayoutTemplate className="text-blue-400" />
              <span>ResumeXpert</span>
            </div>
            <p className="text-sm mb-4">
              The professional resume builder that helps you land interviews at top companies.
            </p>
            <div className="flex gap-4">
              {['Twitter', 'LinkedIn', 'Facebook'].map((item) => (
                <a key={item} href="#" className="text-gray-400 hover:text-white transition">
                  {item}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-white font-medium mb-4">Product</h3>
            <ul className="space-y-2">
              {['Features', 'Templates', 'Pricing', 'Examples'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              {['Blog', 'Resume Tips', 'Career Advice', 'FAQ'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-medium mb-4">Company</h3>
            <ul className="space-y-2">
              {['About Us', 'Contact', 'Privacy Policy', 'Terms'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-gray-800 text-sm text-center">
          <p>
            &copy; {new Date().getFullYear()} ResumeXpert. Crafted with ❤️ by{" "}
            <a
              href="https://hexagondigitalservices.com"
              className="text-blue-400 hover:text-blue-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hexagon Digital Services
            </a>
          </p>
        </div>
      </footer>

      {/* Auth Modal */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div>
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "signup" && <SignUp setCurrentPage={setCurrentPage} />}
        </div>
      </Modal>
    </div>
  );
};

export default LandingPage;