import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { IMAGES } from '../assets/images';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Reviews', to: '/reviews' },
  { label: 'Contact', to: '/contact' },
];

const letterVariants = {
  rest: {
    y: 0, rotateX: 0, rotateZ: 0, color: 'inherit',
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
  hover: (i) => ({
    y: [0, -6, 2, 0],
    rotateX: [0, -40, 20, 0],
    rotateZ: [0, -8, 4, 0],
    color: '#fe8949',
    transition: { duration: 0.55, delay: i * 0.055, ease: [0.22, 1, 0.36, 1] },
  }),
};

function BouncyLabel({ text, isActive }) {
  return (
    <span className="inline-flex" style={{ perspective: '400px' }}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={letterVariants}
          className="inline-block"
          style={{ color: isActive ? '#fe8949' : '#4d4543' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: scrolled ? '0 1px 24px rgba(0,0,0,0.07)' : 'none',
        borderBottom: '1px solid ' + (scrolled ? 'rgba(193,199,209,0.35)' : 'transparent'),
      }}
    >
      <nav className="max-w-clinic mx-auto px-6 md:px-16 h-20 flex items-center justify-between">

        {/* ── Logo + Clinic Name ── */}
        <Link to="/" className="flex items-center gap-4 flex-shrink-0">
          <motion.img
            src={IMAGES.logo}
            alt="Dr. Rama's Eye Clinic logo"
            className="w-auto object-contain flex-shrink-0"
            style={{ height: 52 }}          /* ← bigger logo */
            whileHover={{ scale: 1.06, rotate: -2 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          />
          <div className="leading-tight">
            <p
              className="font-black leading-none"
              style={{ color: '#004674', fontSize: 22 }}   /* ← bigger text */
            >
              Dr. Rama's
            </p>
            <p
              className="font-black uppercase leading-none mt-1"
              style={{ color: '#fe8949', letterSpacing: '0.22em', fontSize: 11 }}
            >
              Eye Clinic
            </p>
          </div>
        </Link>

        {/* ── Desktop links ── */}
        <div className="hidden md:flex items-center gap-0.5">
          {NAV_LINKS.map(({ label, to }) => {
            const isActive = pathname === to;
            return (
              <Link key={to} to={to}>
                <motion.div
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                  className="px-4 py-2 cursor-pointer select-none font-semibold"
                  style={{ fontSize: 14 }}
                >
                  <BouncyLabel text={label} isActive={isActive} />
                </motion.div>
              </Link>
            );
          })}
        </div>

        {/* ── Book Appointment CTA ── */}
        <div className="hidden md:block">
          <Link to="/contact">
            <motion.button
              className="font-bold text-sm text-white rounded-full px-6 py-3"
              style={{
                background: '#004674',
                boxShadow: '0 4px 16px rgba(0,70,116,0.28)',
              }}
              whileHover={{ scale: 1.05, boxShadow: '0 6px 24px rgba(0,70,116,0.42)' }}
              whileTap={{ scale: 0.97 }}
            >
              Book Appointment
            </motion.button>
          </Link>
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined" style={{ color: '#1c1b1b' }}>
            {menuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </nav>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden"
            style={{ background: '#fff', borderTop: '1px solid rgba(193,199,209,0.3)' }}
          >
            <div className="px-6 py-4 space-y-1">
              {NAV_LINKS.map(({ label, to }) => {
                const isActive = pathname === to;
                return (
                  <Link
                    key={to}
                    to={to}
                    className="block px-4 py-3 rounded-xl font-semibold"
                    style={{ color: isActive ? '#fe8949' : '#4d4543', fontSize: 15 }}
                  >
                    {label}
                  </Link>
                );
              })}
              <div className="pt-2">
                <Link to="/contact">
                  <button
                    className="w-full py-3 rounded-full font-bold text-white"
                    style={{ background: '#004674', fontSize: 15 }}
                  >
                    Book Appointment
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}