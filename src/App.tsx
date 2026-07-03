// App.tsx - Fixed version
import React, { useEffect, useState } from 'react';
import { Route, Routes, Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import './App.css';

// ===== TYPES =====
interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  link: string;
}

interface Solution {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  company: string;
  rating: number;
  companyLogo?: string;
}

interface TeamMember {
  id: number;
  name: string;
  role: string;
  photo: string;
  bio: string;
}

interface Partner {
  id: number;
  name: string;
  description: string;
  logo: string;
  website: string;
}

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
}

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  image: string;
}

interface Package {
  id: number;
  name: string;
  description: string;
  price: string;
  features: string[];
  recommended?: boolean;
}

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  highlights: string[];
}

// ===== DATA =====
const SERVICES_DATA: Service[] = [
  {
    id: 1,
    title: 'ERP Implementation',
    description: 'End-to-end ERP system implementation tailored to your business processes and requirements.',
    icon: 'fa-cogs',
    link: '/services'
  },
  {
    id: 2,
    title: 'Training and Consultancy',
    description: 'Transform your data into actionable insights with our advanced analytics solutions.',
    icon: 'fa-chart-line',
    link: '/services'
  },
  {
    id: 3,
    title: 'I.T Services',
    description: 'Migrate your operations to the cloud with our secure and scalable solutions.',
    icon: 'fa-cloud',
    link: '/services'
  }
];

const SOLUTIONS_DATA: Solution[] = [
  {
    id: 1,
    title: 'IT Services',
    description: 'Streamline production, inventory, and supply chain management.',
    image: 'images/sol4.jpg'
  },
  {
    id: 2,
    title: 'ERP Consulting',
    description: 'Optimize point-of-sale, inventory, and customer relationship management.',
    image: 'images/sol5.jpg'
  },
  {
    id: 3,
    title: 'Training and Support',
    description: 'Enhance patient care with integrated healthcare management systems.',
    image: 'images/sol3.jpg'
  },
  {
    id: 4,
    title: 'Administrative Services',
    description: 'Secure, compliant solutions for banking and financial institutions.',
    image: 'images/sol1.jpg'
  }
];

interface TestimonialWithLogo extends Testimonial {
  companyLogo?: string;
}

const TESTIMONIALS_DATA: TestimonialWithLogo[] = [
  {
    id: 1,
    quote: 'Mupuma transformed our business operations. Their ERP implementation was seamless and the team was incredibly supportive throughout the process.',
    author: 'John Mukuka',
    company: 'Zambezi Holdings',
    rating: 5,
    companyLogo: '/images/sage1.png'
  },
  {
    id: 2,
    quote: 'The training and consultancy services provided by Mupuma have significantly improved our team\'s efficiency and data management capabilities.',
    author: 'Sarah Mwansa',
    company: 'Lusaka Tech Solutions',
    rating: 5,
    companyLogo: '/images/napsa.png'
  },
  {
    id: 3,
    quote: 'Their cloud migration services were top-notch. We now have a secure, scalable infrastructure that supports our growing business needs.',
    author: 'Michael Banda',
    company: 'Copperbelt Manufacturing',
    rating: 4,
    companyLogo: '/images/nhima.png'
  }
];

const TEAM_DATA: TeamMember[] = [
  {
    id: 1,
    name: 'Shem Sinkala',
    role: 'Director & Lead Consultant',
    photo: 'images/testimonials/shem.jpg',
    bio: 'With over 20 years of experience in business technology, Dr. Mwale leads our strategic vision.'
  },
  {
    id: 2,
    name: 'Litia Maboshe',
    role: 'Director & Senior Consultant',
    photo: 'images/testimonials/litia.jpg',
    bio: 'Certified ERP specialist with extensive experience in Oracle and Sage implementations.'
  },
  {
    id: 3,
    name: 'Isaac Sindazi',
    role: 'Manager - ERP & Development',
    photo: 'images/testimonials/isaac.jpg',
    bio: 'Expert in business process optimization and digital transformation strategies.'
  },
  {
    id: 4,
    name: 'Cheushi Mwangala',
    role: 'Administrative Associate',
    photo: 'images/testimonials/cheushi.jpg',
    bio: 'Full-stack developer with a focus on enterprise-scale applications and cloud infrastructure.'
  },
  {
    id: 5,
    name: 'Brighton Banda',
    role: 'Senior Developer',
    photo: 'images/testimonials/brighton.jpg',
    bio: 'Full-stack developer with a focus on enterprise-scale applications and cloud infrastructure.'
  }
];

const PARTNERS_DATA: Partner[] = [
  {
    id: 1,
    name: 'Sage',
    description: 'Global leader in business management software and accounting solutions.',
    logo: '/images/sage1.png',
    website: 'https://www.sage.com'
  },
  {
    id: 2,
    name: 'NAPSA',
    description: 'National Pension Scheme Authority partner for payroll solutions.',
    logo: '/images/napsa.png',
    website: 'https://www.napsa.co.zm'
  },
  {
    id: 3,
    name: 'NHIMA',
    description: 'Healthcare management and insurance integration partner.',
    logo: '/images/nhima.png',
    website: 'https://www.nhima.zm'
  },
  {
    id: 4,
    name: 'NPA',
    description: 'Port authority and logistics integration partner.',
    logo: '/images/npa.jpeg',
    website: 'https://www.npa.com.zm'
  },
  {
    id: 5,
    name: 'Infratel',
    description: 'Telecommunications and IT infrastructure partner.',
    logo: '/images/infratel.png',
    website: 'https://www.infratel.zm'
  },
  {
    id: 6,
    name: 'Prospero',
    description: 'Business solutions and consulting partner.',
    logo: '/images/prospero.png',
    website: 'https://www.prospero.zm'
  },
  {
    id: 7,
    name: 'Zampost',
    description: 'Postal and courier services integration.',
    logo: '/images/zampost.png',
    website: 'https://www.zampost.zm'
  },
  {
    id: 8,
    name: 'ZDA',
    description: 'Development agency and grants administration partner.',
    logo: '/images/zda.png',
    website: 'https://www.zda.org.zm'
  }
];

const BLOG_DATA: BlogPost[] = [
  {
    id: 1,
    title: 'The Future of ERP in Zambia',
    excerpt: 'Exploring how ERP systems are transforming businesses across the continent.',
    image: 'images/blog1.jpg',
    date: '2026-06-15',
    author: 'Dr. Chanda Tembo'
  },
  {
    id: 2,
    title: 'Digital Transformation Strategies',
    excerpt: 'Key considerations for successful digital transformation in traditional industries.',
    image: 'images/blog2.jpg',
    date: '2026-06-10',
    author: 'Mulenga Phiri'
  },
  {
    id: 3,
    title: 'Cloud Migration Best Practices',
    excerpt: 'A comprehensive guide to moving your business operations to the cloud securely.',
    image: 'images/sage1.png',
    date: '2026-06-05',
    author: 'Mufechi Chileshe'
  }
];

const EVENTS_DATA: Event[] = [
  {
    id: 1,
    title: 'ERP Implementation Summit',
    description: 'Join us for a comprehensive workshop on ERP implementation best practices.',
    date: '2026-07-20',
    location: 'Lusaka, Zambia',
    image: 'https://picsum.photos/400/250?random=30'
  },
  {
    id: 2,
    title: 'Digital Transformation Forum',
    description: 'Industry leaders discuss the future of business technology in Zambia.',
    date: '2026-08-15',
    location: 'Virtual Event',
    image: 'https://picsum.photos/400/250?random=31'
  }
];

const PACKAGES_DATA: Package[] = [
  {
    id: 1,
    name: 'Starter',
    description: 'Perfect for small businesses getting started with ERP.',
    price: '$499',
    features: ['Basic ERP setup', 'User training (5 users)', 'Email support', 'Monthly reporting']
  },
  {
    id: 2,
    name: 'Professional',
    description: 'Comprehensive solution for growing businesses.',
    price: '$999',
    features: ['Full ERP implementation', 'User training (20 users)', '24/7 phone support', 'Custom reporting', 'Quarterly reviews'],
    recommended: true
  },
  {
    id: 3,
    name: 'Enterprise',
    description: 'Complete solution for large organizations.',
    price: 'Custom',
    features: ['Enterprise-grade ERP', 'Unlimited users', 'Dedicated support team', 'Custom integrations', 'Annual strategic review']
  }
];

const PRODUCTS_DATA: Product[] = [
  {
    id: 1,
    name: 'Computer Products',
    description: 'Reliable hardware solutions for businesses that need fast, dependable technology.',
    category: 'Hardware',
    highlights: ['Laptops', 'Desktops', 'Workstations', 'Printers']
  },
  {
    id: 2,
    name: 'CRM Packages',
    description: 'Tailored customer engagement tools that help teams manage leads and relationships effectively.',
    category: 'Sales & CRM',
    highlights: ['Lead tracking', 'Pipeline visibility', 'Customer history']
  },
  {
    id: 3,
    name: 'Finance & Accounting ERP Packages',
    description: 'End-to-end financial management modules for budgeting, reporting, and compliance.',
    category: 'ERP',
    highlights: ['General ledger', 'Accounts payable', 'Budgeting']
  },
  {
    id: 4,
    name: 'Human Resource & Payroll ERP',
    description: 'Integrated HR and payroll workflows designed to simplify workforce administration.',
    category: 'HR',
    highlights: ['Payroll processing', 'Leave management', 'Employee records']
  },
  {
    id: 5,
    name: 'API Integrations',
    description: 'Secure integrations that connect your systems, payment gateways, and third-party applications.',
    category: 'Integration',
    highlights: ['Bank integrations', 'Sage connectors', 'Custom APIs']
  },
  {
    id: 6,
    name: 'Recruitment Central & SwiftCart POS',
    description: 'Specialized tools for recruitment workflows, retail operations, and employee time management.',
    category: 'Business Apps',
    highlights: ['Recruitment workflows', 'Point of sale', 'Timesheets']
  }
];

// ===== COMPONENTS =====

// ===== 1. PAGE TRANSITION WRAPPER =====
const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// ===== 2. PAGE SECTION COMPONENT =====
interface PageSectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}

const PageSection: React.FC<PageSectionProps> = ({ title, description, children, className = '' }) => {
  return (
    <motion.section 
      className={`py-5 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <div className="text-center mb-5">
          <motion.h2 
            className="fw-bold section-title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {title}
          </motion.h2>
          <motion.p 
            className="lead text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {description}
          </motion.p>
        </div>
        <div className="page-content">
          {children}
        </div>
      </div>
    </motion.section>
  );
};

// ===== 3. NAVBAR COMPONENT =====

interface NavLinkItem {
  to: string;
  label: string;
}

interface NavDropdownGroup {
  label: string;
  items: NavLinkItem[];
}

const NAV_STRUCTURE: (NavLinkItem | NavDropdownGroup)[] = [
  { to: '/', label: 'Home' },
  {
    label: 'Company',
    items: [
      { to: '/about', label: 'About' },
      { to: '/team', label: 'Team' },
      { to: '/blog', label: 'Blog' },
      { to: '/events', label: 'Events' },
      { to: '/culture', label: 'Culture' },
    ],
  },
  {
    label: 'Products',
    items: [
      { to: '/products', label: 'Products' },
      { to: '/solutions', label: 'Solutions' },
      { to: '/services', label: 'Services' },
      { to: '/packages', label: 'Packages' },
    ],
  },
  { to: '/partners', label: 'Partners' },
  { to: '/testimonials', label: 'Testimonials' },
  // { to: '/careers', label: 'Careers' },
  { to: '/contact', label: 'Contact' },
];

function isDropdownGroup(item: NavLinkItem | NavDropdownGroup): item is NavDropdownGroup {
  return (item as NavDropdownGroup).items !== undefined;
}

// ---- Dropdown sub-component ----
const NavDropdown: React.FC<{ group: NavDropdownGroup; onNavigate: () => void }> = ({ group, onNavigate }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = React.useRef<HTMLLIElement>(null);

  const isGroupActive = group.items.some((item) => location.pathname === item.to);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <li
      className="nav-item dropdown"
      ref={dropdownRef}
      onMouseEnter={() => window.innerWidth >= 992 && setOpen(true)}
      onMouseLeave={() => window.innerWidth >= 992 && setOpen(false)}
    >
      <button
        type="button"
        className={`nav-link dropdown-toggle-custom ${isGroupActive ? 'active' : ''}`}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        {group.label}
        <i className={`fas fa-chevron-down ms-1 dropdown-caret ${open ? 'open' : ''}`}></i>
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            className="dropdown-menu-custom"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            {group.items.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) => `dropdown-item-custom ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    setOpen(false);
                    onNavigate();
                  }}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
};

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg fixed-top ${scrolled ? 'navbar-dark bg-dark scrolled' : 'navbar-dark bg-transparent'}`}>
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img
            src="/images/logo.png"
            alt="Mupuma Logo"
            className="me-2"
            style={{ maxHeight: '40px' }}
          />
          <span className="fw-bold">Mupuma Management Solutions</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${mobileMenuOpen ? 'show' : ''}`} id="navbar">
          <ul className="navbar-nav ms-auto">
            {NAV_STRUCTURE.map((item) =>
              isDropdownGroup(item) ? (
                <NavDropdown key={item.label} group={item} onNavigate={() => setMobileMenuOpen(false)} />
              ) : (
                <li className="nav-item" key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

// ===== 4. FOOTER COMPONENT =====
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear(); 
  return (
    <footer className="bg-dark text-white py-5 mt-5">
      <div className="container">
        <div className="row g-4">

          {/* Company Info */}
          <div className="col-lg-4">
            <h5 className="fw-bold mb-3 text-white">Mupuma Management Solutions</h5>
            <p className="text-white">
              Technology-driven business solutions tailored to your operational needs.
              We specialize in ERP implementations, business intelligence, and digital transformation.
            </p>

            <div className="d-flex gap-3 mt-3">
              <a
                href="https://www.facebook.com/pages/category/Company/Mupuma-Management-Solutions-Ltd-129279700952968/"
                className="text-primary me-3"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-facebook-f fs-4"></i>
              </a>

              <a
                href="https://twitter.com/MupumaMS"
                className="text-primary me-3"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-twitter fs-4"></i>
              </a>

              <a
                href="https://www.linkedin.com/company/mupuma-management-solutions"
                className="text-primary me-3"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-linkedin-in fs-4"></i>
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div className="col-lg-2">
            <h6 className="fw-bold mb-3 text-white">Company</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/about" className="text-white text-decoration-none">About</Link></li>
              <li className="mb-2"><Link to="/team" className="text-white text-decoration-none">Team</Link></li>
              <li className="mb-2"><Link to="/careers" className="text-white text-decoration-none">Careers</Link></li>
              <li className="mb-2"><Link to="/culture" className="text-white text-decoration-none">Culture</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="col-lg-2">
            <h6 className="fw-bold mb-3 text-white">Services</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/services" className="text-white text-decoration-none">ERP Implementation</Link></li>
              <li className="mb-2"><Link to="/services" className="text-white text-decoration-none">Consultancy</Link></li>
              <li className="mb-2"><Link to="/services" className="text-white text-decoration-none">I.T Services</Link></li>
              <li className="mb-2"><Link to="/products" className="text-white text-decoration-none">Products</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-lg-4">
            <h6 className="fw-bold mb-3 text-white">Contact</h6>
            <ul className="list-unstyled text-white">
              <li className="mb-2"><i className="fas fa-map-marker-alt me-2 text-primary"></i> Plot 16 500 Lusaka, Zambia</li>
              <li className="mb-2"><i className="fas fa-phone me-2 text-primary"></i> +260 977 795 334</li>
              <li className="mb-2"><i className="fas fa-envelope me-2 text-primary"></i> info@mupuma.com</li>
              <li className="mb-2"><i className="fas fa-clock me-2 text-primary"></i> Mon-Fri: 8:00 AM - 5:00 PM</li>
            </ul>
          </div>

        </div>

        <hr className="border-secondary my-4" />

        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <p className="text-white mb-0">
              &copy; {currentYear} Mupuma Management Solutions. All rights reserved.
            </p>
          </div>

          <div className="col-md-6 text-center text-md-end">
            <Link to="/privacy" className="text-white text-decoration-none me-3">Privacy Policy</Link>
            <Link to="/terms" className="text-white text-decoration-none">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );}

// ===== 5. CHAT WIDGET COMPONENT =====
const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{text: string, sender: 'user' | 'support', time: string}>>([
    { text: 'Hello! How can we help you today?', sender: 'support', time: new Date().toLocaleTimeString() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    const newMessage = {
      text: inputValue,
      sender: 'user' as const,
      time: new Date().toLocaleTimeString()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    
    // Simulate auto-reply
    setTimeout(() => {
      const reply = {
        text: 'Thank you for your message. Our team will get back to you shortly.',
        sender: 'support' as const,
        time: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, reply]);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-widget">
      <motion.div 
        className="chat-button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-comments'}`}></i>
      </motion.div>
      
      <motion.div 
        className={`chat-container ${isOpen ? 'show' : ''}`}
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ 
          opacity: isOpen ? 1 : 0, 
          y: isOpen ? 0 : 50,
          scale: isOpen ? 1 : 0.9,
          display: isOpen ? 'flex' : 'none'
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="chat-header">
          <h5><i className="fas fa-comment-dots me-2"></i>Chat with Us</h5>
          <button className="close-chat" onClick={() => setIsOpen(false)}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="chat-body">
          <div className="messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                <div>{msg.text}</div>
                <div className="time">{msg.time}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <div className="chat-footer">
          <div className="chat-input">
            <input 
              type="text" 
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button onClick={handleSendMessage}>
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// ===== 6. PAGE COMPONENTS =====

// ===== ANIMATED HOME PAGE =====
// Replace the existing `const HomePage: React.FC = () => { ... }` block in App.tsx with this.
// Uses the same video already referenced on the Services page as a hero placeholder.

const useCountUp = (end: number, duration = 2, startWhen = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startWhen) return;
    let startTime: number | null = null;
    let frame: number;

    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [startWhen, end, duration]);

  return count;
};

const StatCounter: React.FC<{ end: number; suffix?: string; label: string; delay?: number }> = ({
  end,
  suffix = '',
  label,
  delay = 0,
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const count = useCountUp(end, 2, isInView);

  return (
    <motion.div
      ref={ref}
      className="col-6 col-md-3 text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      <h2 className="display-4 fw-bold text-primary mb-0">
        {count}
        {suffix}
      </h2>
      <p className="text-white-50 mb-0">{label}</p>
    </motion.div>
  );
};

const FloatingShape: React.FC<{
  size: number;
  top: string;
  left?: string;
  right?: string;
  delay: number;
  duration: number;
}> = ({ size, top, left, right, delay, duration }) => (
  <motion.div
    style={{
      position: 'absolute',
      top,
      left,
      right,
      width: size,
      height: size,
      borderRadius: '50%',
      background: 'radial-gradient(circle at 30% 30%, var(--primary-ghost), transparent 70%)',
      filter: 'blur(2px)',
      pointerEvents: 'none',
      zIndex: 0,
    }}
    animate={{
      y: [0, -25, 0],
      x: [0, 15, 0],
      rotate: [0, 20, 0],
    }}
    transition={{ duration, repeat: Infinity, delay, ease: 'easeInOut' }}
  />
);

const HERO_FEATURES = [
  { icon: 'fa-rocket', title: 'Transform Your Business', text: 'Mupuma helps organizations modernize operations with ERP, consultancy, and technology services.', link: '/about', label: 'Read More', btn: 'btn-outline-primary' },
  { icon: 'fa-tools', title: 'Solutions', text: 'From CRM implementation to ERP strategy and IT support, the company offers a full-stack delivery model.', link: '/services', label: 'Read More', btn: 'btn-cta' },
  { icon: 'fa-handshake', title: 'Trusted Partnerships', text: 'Delivery is supported by long-term partnerships with clients and technology providers.', link: '/partners', label: 'Explore Insights', btn: 'btn-outline-primary' },
];

const HomePage: React.FC = () => {
  const heroRef = React.useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.9]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const partnersRef = React.useRef(null);
  const partnersInView = useInView(partnersRef, { once: true, margin: '-80px' });

  return (
    <div className="home-page">
      {/* ===== HERO SECTION WITH VIDEO ===== */}
      <div
        ref={heroRef}
        className="hero-video-section position-relative overflow-hidden"
        style={{ height: '85vh', minHeight: 520 }}
      >
        <motion.video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '115%',
            objectFit: 'cover',
            y: videoY,
          }}
        >
          <source src="/images/VID-20250718-WA0002.mp4" type="video/mp4" />
        </motion.video>

        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.75) 100%)',
            opacity: overlayOpacity,
          }}
        />

        {/* floating decorative shapes */}
        <FloatingShape size={140} top="10%" left="6%" delay={0} duration={7} />
        <FloatingShape size={90} top="60%" right="10%" delay={1.2} duration={5.5} />
        <FloatingShape size={60} top="30%" right="25%" delay={0.6} duration={6.5} />

        <motion.div
          className="position-relative h-100 d-flex align-items-center"
          style={{ y: heroTextY, opacity: heroTextOpacity }}
        >
          <div className="container text-center text-white">
            <motion.span
              className="badge bg-primary bg-opacity-75 px-3 py-2 mb-3 d-inline-block"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Technology-Driven Business Solutions
            </motion.span>

            <motion.h1
              className="display-3 fw-bold mb-3"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              Welcome to{' '}
              <motion.span
                className="text-primary d-inline-block"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                Mupuma
              </motion.span>
            </motion.h1>

            <motion.p
              className="lead col-lg-8 mx-auto mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              ERP implementation, IT services, and consultancy built to help your business run smarter, every single day.
            </motion.p>

            <motion.div
              className="d-flex gap-3 justify-content-center flex-wrap"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
            >
              <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.96 }}>
                <Link to="/services" className="btn btn-cta btn-lg px-4">
                  Explore Services
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.96 }}>
                <Link to="/contact" className="btn btn-outline-light btn-lg px-4">
                  Get in Touch
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* scroll cue */}
        <motion.div
          className="position-absolute start-50 translate-middle-x text-white"
          style={{ bottom: 24 }}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          <i className="fas fa-chevron-down fs-4"></i>
        </motion.div>
      </div>

      {/* ===== STATS STRIP ===== */}
      <div className="py-5" style={{ background: 'linear-gradient(135deg, #10131a, #1c2230)' }}>
        <div className="container">
          <div className="row g-4">
            <StatCounter end={12} suffix="+" label="Years of Experience" delay={0} />
            <StatCounter end={150} suffix="+" label="Projects Delivered" delay={0.1} />
            <StatCounter end={40} suffix="+" label="Active Clients" delay={0.2} />
            <StatCounter end={8} suffix="+" label="Strategic Partners" delay={0.3} />
          </div>
        </div>
      </div>

      {/* ===== FEATURE CARDS ===== */}
      <PageSection title="What We Do" description="Technology-driven business solutions for the modern enterprise">
        <div className="row g-4">
          {HERO_FEATURES.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="col-md-4"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: index * 0.12 }}
            >
              <motion.div
                className="card h-100 border-0 shadow-sm hover-shadow"
                whileHover={{ y: -10, boxShadow: '0 18px 40px rgba(0,0,0,0.12)' }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              >
                <div className="card-body text-center p-4">
                  <motion.div
                    className="icon-box bg-primary bg-opacity-10 text-primary rounded-circle p-3 mx-auto mb-3"
                    style={{ width: '60px', height: '60px' }}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <i className={`fas ${feature.icon} fs-4`}></i>
                  </motion.div>
                  <h5 className="fw-bold">{feature.title}</h5>
                  <p className="text-muted">{feature.text}</p>
                  <Link to={feature.link} className={`btn ${feature.btn} btn-sm mt-3`}>
                    {feature.label}
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </PageSection>

      {/* ===== SOLUTIONS PREVIEW STRIP ===== */}
      <div className="py-5 bg-light overflow-hidden">
        <div className="container">
          <motion.div
            className="text-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="fw-bold">Solutions Built Around Your Industry</h3>
            <p className="text-muted">A quick look at how we support different areas of your business</p>
          </motion.div>
          <div className="row g-4">
            {SOLUTIONS_DATA.map((solution, index) => (
              <motion.div
                key={solution.id}
                className="col-6 col-lg-3"
                initial={{ opacity: 0, scale: 0.85, rotate: -2 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.div
                  className="card border-0 shadow-sm overflow-hidden h-100"
                  whileHover={{ scale: 1.04 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <img src={solution.image} className="card-img-top" alt={solution.title} style={{ height: 140, objectFit: 'cover' }} />
                  <div className="card-body p-3">
                    <h6 className="fw-bold mb-1">{solution.title}</h6>
                    <p className="text-muted small mb-0">{solution.description}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== PARTNER LOGO MARQUEE ===== */}
      <div ref={partnersRef} className="py-5 overflow-hidden">
        <div className="container mb-4 text-center">
          <motion.h4
            className="fw-bold"
            initial={{ opacity: 0 }}
            animate={partnersInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            Trusted By Leading Organizations
          </motion.h4>
        </div>
        <motion.div
          className="d-flex gap-5 align-items-center"
          style={{ width: 'max-content' }}
          animate={partnersInView ? { x: ['0%', '-50%'] } : {}}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        >
          {[...PARTNERS_DATA, ...PARTNERS_DATA].map((partner, index) => (
            <img
              key={`${partner.id}-${index}`}
              src={partner.logo}
              alt={partner.name}
              style={{ height: 50, objectFit: 'contain', opacity: 0.85 }}
            />
          ))}
        </motion.div>
      </div>

      {/* ===== CTA BANNER ===== */}
      <motion.div
        className="py-5 text-center text-white position-relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, var(--primary), #0b3d91)' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <FloatingShape size={180} top="-20%" left="-5%" delay={0} duration={8} />
        <FloatingShape size={120} top="40%" right="0%" delay={1} duration={6} />
        <div className="container position-relative">
          <motion.h3
            className="fw-bold mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Ready to transform how your business runs?
          </motion.h3>
          <motion.p
            className="mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Let's talk about the right ERP, IT, and consultancy fit for your team.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.div className="d-inline-block" whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.96 }}>
              <Link to="/contact" className="btn btn-light btn-lg px-4">
                Book a Consultation
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

// About Page
const AboutPage: React.FC = () => {
  return (
    <PageSection title="About Us" description="We help organizations navigate change with practical technology, training, and implementation support.">
      <div className="row align-items-center g-4">
        <motion.div 
          className="col-lg-6"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img 
            src="images/brd2.jpg" 
            alt="About Mupuma" 
            className="img-fluid rounded shadow"
          />
        </motion.div>
        <motion.div 
          className="col-lg-6"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3>Who We Are</h3>
          <p>Mupuma Management Solutions is a full-service consulting firm helping businesses improve efficiency through tailored ERP, IT services, and digital transformation support.</p>
          <h3 className="mt-4">Our Approach</h3>
          <p>We combine implementation expertise, training, and consultancy so our clients can focus on growth while their present operations remain secure and stable.</p>
          <p className="mt-3">We have high standards in all we do. Our people bring decades of experience to solving complex business challenges in an agile, practical way.</p>
          <ul className="list-unstyled mt-3">
            <li className="mb-2"><i className="fas fa-check-circle text-primary me-2"></i> Certified ERP specialists</li>
            <li className="mb-2"><i className="fas fa-check-circle text-primary me-2"></i> Customized business solutions</li>
            <li className="mb-2"><i className="fas fa-check-circle text-primary me-2"></i> End-to-end implementation support</li>
            <li className="mb-2"><i className="fas fa-check-circle text-primary me-2"></i> Ongoing maintenance and training</li>
          </ul>
        </motion.div>
      </div>
    </PageSection>
  );
};

// Services Page
const ServicesPage: React.FC = () => {
  return (
    <PageSection title="Our Services" description="Comprehensive solutions to drive your business forward">
      <div className="mb-5 p-4 rounded-4 bg-light">
        <h3 className="fw-bold mb-3">Practical support for every stage of your growth</h3>
        <p className="text-muted mb-0">We help businesses modernize through ERP implementation, hands-on training, and dependable IT services that reduce complexity and strengthen day-to-day operations.</p>
      </div>
      <motion.div
        className="mb-5 rounded-4 overflow-hidden shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <video width="100%" height="auto" controls className="w-100" style={{ maxHeight: '600px', objectFit: 'cover' }}>
          <source src="/images/VID-20250718-WA0002.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>
      <div className="row g-4">
        {SERVICES_DATA.map((service, index) => (
          <motion.div 
            key={service.id} 
            className="col-md-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="card h-100 border-0 shadow-sm hover-shadow">
              <div className="card-body p-4 text-center">
                <div className="icon-box bg-primary bg-opacity-10 text-primary rounded-circle p-3 mx-auto mb-3" style={{ width: '60px', height: '60px' }}>
                  <i className={`fas ${service.icon} fs-4`}></i>
                </div>
                <h4 className="fw-bold mb-3">{service.title}</h4>
                <p className="text-muted">{service.description}</p>
                <div className="service-actions justify-content-center">
                  <a className="btn btn-cta" href={`mailto:info@mupuma.co.zm?subject=Book%20Demo%20-%20${encodeURIComponent(service.title)}`}>Book Demo</a>
                  <a className="btn btn-outline-cta" target="_blank" rel="noreferrer" href={`https://wa.me/260977795334?text=${encodeURIComponent('Hi, I\'d like to book a demo for ' + service.title)}`}>WhatsApp</a>
                  {/* <Link to={service.link} className="btn btn-link text-primary align-self-center">Read More <i className="fas fa-arrow-right ms-2"></i></Link> */}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </PageSection>
  );
};

// Solutions Page
const SolutionsPage: React.FC = () => {
  return (
    <PageSection title="Our Solutions" description="Industry-specific solutions designed for your success">
      <div className="row g-4">
        {SOLUTIONS_DATA.map((solution, index) => (
          <motion.div 
            key={solution.id} 
            className="col-md-6 col-lg-3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="card h-100 border-0 shadow-sm hover-shadow overflow-hidden">
              <img src={solution.image} className="card-img-top" alt={solution.title} />
              <div className="card-body">
                <h5 className="fw-bold">{solution.title}</h5>
                <p className="text-muted">{solution.description}</p>
                <Link to={`/solutions/${solution.id}`} className="btn btn-outline-primary btn-sm">
                  Learn More
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </PageSection>
  );
};

// Products Page
const ProductsPage: React.FC = () => {
  return (
    <PageSection title="Products" description="Whatever the size of your business, we have software and services to fit your needs.">
      <div className="row g-4">
        {PRODUCTS_DATA.map((product, index) => (
          <motion.div
            key={product.id}
            className="col-md-6 col-lg-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="card h-100 border-0 shadow-sm hover-shadow">
              <div className="card-body p-4">
                <p className="text-primary small fw-bold text-uppercase">{product.category}</p>
                <h4 className="fw-bold mb-3">{product.name}</h4>
                <p className="text-muted">{product.description}</p>
                <ul className="list-unstyled mt-3">
                  {product.highlights.map((highlight) => (
                    <li key={highlight} className="mb-2"><i className="fas fa-check-circle text-primary me-2"></i>{highlight}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </PageSection>
  );
};

// Team Page
const TeamPage: React.FC = () => {
  return (
    <PageSection title="Our Team" description="Our team combines consulting expertise, industry understanding, and technical delivery capability.">
      <div className="row g-4">
        {TEAM_DATA.map((member, index) => (
          <motion.div 
            key={member.id} 
            className="col-md-6 col-lg-3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="card h-100 border-0 shadow-sm hover-shadow text-center">
              <img 
                src={member.photo} 
                className="card-img-top rounded-circle mx-auto mt-3" 
                alt={member.name}
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="fw-bold">{member.name}</h5>
                <p className="text-primary">{member.role}</p>
                <p className="text-muted small">{member.bio}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </PageSection>
  );
};

// Partners Page
const PartnersPage: React.FC = () => {
  return (
    <PageSection title="Our Partners" description="Strategic collaborations help us deliver better technology outcomes.">
      <div className="row g-4">
        {PARTNERS_DATA.map((partner, index) => (
          <motion.div 
            key={partner.id} 
            className="col-md-6 col-lg-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <motion.div 
              className="card h-100 border-0 shadow-sm hover-shadow text-center p-4"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
            >
              <motion.img 
                src={partner.logo} 
                alt={partner.name} 
                className="img-fluid mb-3" 
                style={{ maxHeight: '80px', objectFit: 'contain' }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.15 }}
              />
              <h5 className="fw-bold">{partner.name}</h5>
              <p className="text-muted small">{partner.description}</p>
              <a href={partner.website} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-sm">
                Visit Website <i className="fas fa-external-link-alt ms-1"></i>
              </a>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </PageSection>
  );
};

// Testimonials Page
const TestimonialsPage: React.FC = () => {
  return (
    <PageSection title="Testimonials" description="Client feedback highlights the value of trusted guidance and dependable delivery.">
      <div className="row g-4">
        {TESTIMONIALS_DATA.map((testimonial, index) => (
          <motion.div 
            key={testimonial.id} 
            className="col-md-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="card h-100 border-0 shadow-sm hover-shadow p-4">
              {testimonial.companyLogo && (
                <motion.img
                  src={testimonial.companyLogo}
                  alt={testimonial.company}
                  className="img-fluid mb-3"
                  style={{ maxHeight: '50px', objectFit: 'contain' }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
              <div className="mb-3 text-warning">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className={`fas fa-star ${i < testimonial.rating ? 'text-warning' : 'text-muted'}`}></i>
                ))}
              </div>
              <p className="font-italic">\"{ testimonial.quote }\"</p>
              <div className="mt-auto">
                <h6 className="fw-bold mb-0">{testimonial.author}</h6>
                <p className="text-muted small">{testimonial.company}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        className="mt-5 p-5 rounded-4 text-center"
        style={{ background: 'linear-gradient(135deg, var(--primary-ghost), var(--light))' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h3 className="fw-bold mb-4">Trusted by Leading Organizations</h3>
        <div className="row g-4">
          {PARTNERS_DATA.slice(0, 4).map((partner, index) => (
            <motion.div
              key={partner.id}
              className="col-md-3 col-sm-6"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
            >
              <img src={partner.logo} alt={partner.name} className="img-fluid" style={{ maxHeight: '60px', objectFit: 'contain' }} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </PageSection>
  );
};

// Blog Page
const BlogPage: React.FC = () => {
  return (
    <PageSection title="Blog" description="Insights, updates, and practical perspectives around technology and business transformation.">
      <div className="row g-4">
        {BLOG_DATA.map((post, index) => (
          <motion.div 
            key={post.id} 
            className="col-md-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="card h-100 border-0 shadow-sm hover-shadow overflow-hidden">
              <img src={post.image} className="card-img-top" alt={post.title} />
              <div className="card-body">
                <p className="text-muted small mb-2">
                  <i className="far fa-calendar-alt me-1"></i> {new Date(post.date).toLocaleDateString()}
                  <span className="ms-3"><i className="far fa-user me-1"></i> {post.author}</span>
                </p>
                <h5 className="fw-bold">{post.title}</h5>
                <p className="text-muted">{post.excerpt}</p>
                <Link to={`/blog/${post.id}`} className="btn btn-link text-primary p-0">
                  Read More <i className="fas fa-arrow-right ms-1"></i>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </PageSection>
  );
};

// Events Page
const EventsPage: React.FC = () => {
  return (
    <PageSection title="Events" description="Upcoming discussions, workshops, and engagements focused on business technology.">
      <div className="row g-4">
        {EVENTS_DATA.map((event, index) => (
          <motion.div 
            key={event.id} 
            className="col-md-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="card border-0 shadow-sm hover-shadow overflow-hidden">
              <div className="row g-0">
                <div className="col-md-4">
                  <img src={event.image} className="img-fluid h-100 object-fit-cover" alt={event.title} />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="fw-bold">{event.title}</h5>
                    <p className="text-muted small">{event.description}</p>
                    <p className="mb-1"><i className="far fa-calendar me-2 text-primary"></i> {new Date(event.date).toLocaleDateString()}</p>
                    <p className="mb-3"><i className="fas fa-map-marker-alt me-2 text-primary"></i> {event.location}</p>
                    <button className="btn btn-primary btn-sm">Register Now</button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </PageSection>
  );
};

// Packages Page
const PackagesPage: React.FC = () => {
  return (
    <PageSection title="Packages" description="Flexible delivery options for organizations at different stages of their technology journey.">
      <div className="row g-4 align-items-end">
        {PACKAGES_DATA.map((pkg, index) => (
          <motion.div 
            key={pkg.id} 
            className={`col-md-4 ${pkg.recommended ? 'mt-n3' : ''}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className={`card h-100 border-0 shadow-sm hover-shadow ${pkg.recommended ? 'border-primary border-2' : ''}`}>
              {pkg.recommended && (
                <div className="card-header bg-primary text-white text-center py-2">
                  <span className="small fw-bold">RECOMMENDED</span>
                </div>
              )}
              <div className="card-body p-4 text-center">
                <h4 className="fw-bold">{pkg.name}</h4>
                <p className="text-muted small">{pkg.description}</p>
                <h2 className="display-6 fw-bold text-primary mb-4">{pkg.price}</h2>
                <ul className="list-unstyled text-start">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="mb-2">
                      <i className="fas fa-check-circle text-primary me-2"></i> {feature}
                    </li>
                  ))}
                </ul>
                <button className={`btn ${pkg.recommended ? 'btn-primary' : 'btn-outline-primary'} w-100 mt-3`}>
                  Get Started
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </PageSection>
  );
};

// Careers Page
const CareersPage: React.FC = () => {
  return (
    <PageSection title="Careers" description="Build your career in consulting, technology implementation, and business transformation.">
      <div className="row g-4">
        <motion.div 
          className="col-md-6"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="card border-0 shadow-sm p-4">
            <h4><i className="fas fa-briefcase text-primary me-2"></i> Join the Team</h4>
            <p>We are looking for professionals who enjoy solving operational and strategic technology challenges.</p>
            <ul className="list-unstyled mt-3">
              <li className="mb-2"><i className="fas fa-check-circle text-primary me-2"></i> ERP Consultants</li>
              <li className="mb-2"><i className="fas fa-check-circle text-primary me-2"></i> Project Managers</li>
              <li className="mb-2"><i className="fas fa-check-circle text-primary me-2"></i> Business Analysts</li>
              <li className="mb-2"><i className="fas fa-check-circle text-primary me-2"></i> Software Developers</li>
            </ul>
            <button className="btn btn-primary mt-3">View Open Positions</button>
          </div>
        </motion.div>
        <motion.div 
          className="col-md-6"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="card border-0 shadow-sm p-4">
            <h4><i className="fas fa-chart-line text-primary me-2"></i> Growth Opportunities</h4>
            <p>Opportunities span implementation consulting, delivery leadership, training, and support services.</p>
            <ul className="list-unstyled mt-3">
              <li className="mb-2"><i className="fas fa-check-circle text-primary me-2"></i> Professional development</li>
              <li className="mb-2"><i className="fas fa-check-circle text-primary me-2"></i> Certification programs</li>
              <li className="mb-2"><i className="fas fa-check-circle text-primary me-2"></i> Mentorship opportunities</li>
              <li className="mb-2"><i className="fas fa-check-circle text-primary me-2"></i> Global project exposure</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </PageSection>
  );
};

// Culture Page
const CulturePage: React.FC = () => {
  return (
    <PageSection title="Our Culture" description="A values-driven culture centered on collaboration, accountability, and continuous learning.">
      <div className="row g-4">
        <motion.div 
          className="col-md-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="card border-0 shadow-sm p-4">
            <h4><i className="fas fa-heart text-primary me-2"></i> Our Values</h4>
            <p>We care about quality delivery, client outcomes, and creating a strong professional environment.</p>
            <ul className="list-unstyled mt-3">
              <li className="mb-2"><i className="fas fa-check-circle text-primary me-2"></i> Integrity & Transparency</li>
              <li className="mb-2"><i className="fas fa-check-circle text-primary me-2"></i> Client-Centric Approach</li>
              <li className="mb-2"><i className="fas fa-check-circle text-primary me-2"></i> Continuous Innovation</li>
              <li className="mb-2"><i className="fas fa-check-circle text-primary me-2"></i> Team Collaboration</li>
            </ul>
          </div>
        </motion.div>
        <motion.div 
          className="col-md-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="card border-0 shadow-sm p-4">
            <h4><i className="fas fa-users text-primary me-2"></i> How We Work</h4>
            <p>Projects are delivered with partnership, clarity, and practical support at every stage.</p>
            <ul className="list-unstyled mt-3">
              <li className="mb-2"><i className="fas fa-check-circle text-primary me-2"></i> Agile Methodology</li>
              <li className="mb-2"><i className="fas fa-check-circle text-primary me-2"></i> Collaborative Approach</li>
              <li className="mb-2"><i className="fas fa-check-circle text-primary me-2"></i> Continuous Feedback</li>
              <li className="mb-2"><i className="fas fa-check-circle text-primary me-2"></i> Work-Life Balance</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </PageSection>
  );
};

// Contact Page
const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <PageSection title="Contact Us" description="Get in touch with our team to discuss your business needs.">
      <div className="row g-4">
        <motion.div className="col-12" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <div className="d-flex flex-wrap gap-2 mb-2">
            <a className="btn btn-cta" href={`mailto:info@mupuma.co.zm?subject=Book%20Consultation`}>Book Consultation</a>
            <a className="btn btn-outline-cta" target="_blank" rel="noreferrer" href={`https://wa.me/260977795334?text=${encodeURIComponent('Hello, I would like to book a consultation.')}`}>WhatsApp</a>
          </div>
        </motion.div>
        <motion.div 
          className="col-lg-6"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {submitted ? (
            <div className="alert alert-success">
              <h5><i className="fas fa-check-circle me-2"></i>Message Sent!</h5>
              <p>Thank you for contacting us. We'll get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm">
              <div className="mb-3">
                <label className="form-label fw-bold">Full Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Email Address</label>
                <input 
                  type="email" 
                  className="form-control" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Subject</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">Message</label>
                <textarea 
                  className="form-control" 
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                ></textarea>
              </div>
              <motion.button 
                type="submit" 
                className="btn btn-primary w-100"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <i className="fas fa-paper-plane me-2"></i>Send Message
              </motion.button>
            </form>
          )}
        </motion.div>
        <motion.div 
          className="col-lg-6"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-white p-4 rounded shadow-sm h-100">
            <h4 className="fw-bold mb-4">Contact Information</h4>
            <div className="d-flex mb-3">
              <div className="icon-box bg-primary bg-opacity-10 text-primary rounded-circle p-3 me-3" style={{ width: '50px', height: '50px' }}>
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div>
                <h6 className="fw-bold mb-1">Address</h6>
                <p className="text-muted">Lusaka, Zambia</p>
              </div>
            </div>
            <div className="d-flex mb-3">
              <div className="icon-box bg-primary bg-opacity-10 text-primary rounded-circle p-3 me-3" style={{ width: '50px', height: '50px' }}>
                <i className="fas fa-phone"></i>
              </div>
              <div>
                <h6 className="fw-bold mb-1">Phone</h6>
                <p className="text-muted">+260 123 456 789</p>
              </div>
            </div>
            <div className="d-flex mb-3">
              <div className="icon-box bg-primary bg-opacity-10 text-primary rounded-circle p-3 me-3" style={{ width: '50px', height: '50px' }}>
                <i className="fas fa-envelope"></i>
              </div>
              <div>
                <h6 className="fw-bold mb-1">Email</h6>
                <p className="text-muted">info@mupuma.com</p>
              </div>
            </div>
            <div className="d-flex">
              <div className="icon-box bg-primary bg-opacity-10 text-primary rounded-circle p-3 me-3" style={{ width: '50px', height: '50px' }}>
                <i className="fas fa-clock"></i>
              </div>
              <div>
                <h6 className="fw-bold mb-1">Working Hours</h6>
                <p className="text-muted">Mon-Fri: 8:00 AM - 5:00 PM</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </PageSection>
  );
};

// ===== 7. MAIN APP COMPONENT =====
const App: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="app-wrapper">
      <Navbar />
      <main className="main-content" style={{ paddingTop: '76px' }}>
        <PageTransition>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/solutions" element={<SolutionsPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/partners" element={<PartnersPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/packages" element={<PackagesPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/culture" element={<CulturePage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </PageTransition>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default App;