import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { IMAGES } from '../assets/images';

const QUICK_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Reviews', to: '/reviews' },
  { label: 'Contact', to: '/contact' },
];

const SERVICES = [
  'LASIK Surgery',
  'Cataract Surgery',
  'Pediatric Eye Care',
  'Glaucoma Management',
  'Retinal Diagnostics',
];

const STAGGER = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const ITEM = {
  hidden: { y: 24, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

// Biometric Eye SVG with scanner line and mouse-tracking pupil
function BiometricEye() {
  const containerRef = useRef(null);
  const pupilRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      if (!containerRef.current || !pupilRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const angle = Math.atan2(e.clientY - cy, e.clientX - cx);
      const dist = Math.min(6, Math.hypot(e.clientX - cx, e.clientY - cy) / 10);
      pupilRef.current.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px)`;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-20 h-20 rounded-full flex items-center justify-center bg-white/5 border border-white/10 overflow-hidden"
    >
      <svg viewBox="0 0 100 100" className="w-14 h-14">
        {/* Outer iris ring */}
        <path
          d="M10 50 C20 20, 80 20, 90 50 C80 80, 20 80, 10 50"
          fill="none"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="2"
        />
        {/* Iris circle */}
        <circle cx="50" cy="50" r="18" fill="none" stroke="#0c629e" strokeWidth="2" />
        {/* Inner ring */}
        <circle cx="50" cy="50" r="11" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        {/* Pupil */}
        <circle
          ref={pupilRef}
          cx="50"
          cy="50"
          r="8"
          fill="#fe8949"
          style={{ transition: 'transform 0.1s linear' }}
        />
        {/* Highlight */}
        <circle cx="54" cy="46" r="2.5" fill="rgba(255,255,255,0.6)" />
      </svg>

      {/* Scanner line */}
      <motion.div
        className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-secondary-container/60 to-transparent"
        animate={{ top: ['-5%', '110%'] }}
        transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop' }}
      />
    </div>
  );
}

// Floating particle dots in footer background
function Particles() {
  const dots = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 4,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((d) => (
        <motion.div
          key={d.id}
          className="absolute rounded-full bg-white/5"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.size,
            height: d.size,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.05, 0.25, 0.05],
          }}
          transition={{
            duration: d.duration,
            delay: d.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <footer
      ref={ref}
      className="relative text-white overflow-hidden pt-24 pb-12"
      style={{
        background: 'linear-gradient(-45deg, #001d35, #002d50, #001d35, #0c629e)',
        backgroundSize: '400% 400%',
        animation: 'visionWave 15s ease infinite',
      }}
    >
      {/* Pulsing orb */}
      <motion.div
        className="footer-orb"
        animate={{ scale: [0.95, 1.12, 0.95], opacity: [0.08, 0.18, 0.08] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating particles */}
      <Particles />

      {/* Wave top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="relative z-10 max-w-clinic mx-auto px-6 md:px-16">
        <motion.div
          variants={STAGGER}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-20"
        >
          {/* Brand Column */}
          <motion.div variants={ITEM} className="space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div
                className="p-2 bg-white rounded-xl"
                whileHover={{ rotate: [0, -8, 8, 0] }}
                transition={{ duration: 0.5 }}
              >
                <img src={IMAGES.logo} alt="Logo" className="h-8 w-auto" />
              </motion.div>
              <div className="flex flex-col leading-none">
                <span className="font-black text-xl text-white">Dr. Rama's</span>
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/50">
                  Eye Clinic
                </span>
              </div>
            </Link>

            <p className="text-white/45 text-sm leading-relaxed">
              Providing ethical, advanced, and patient-centric vision care. Your vision is our expertise.
            </p>

            {/* Biometric Eye */}
            <BiometricEye />

            {/* Social icons */}
            <div className="flex gap-3 pt-2">
              {['public', 'mail', 'share'].map((icon) => (
                <motion.a
                  key={icon}
                  href="#"
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-secondary-container hover:border-secondary-container transition-colors"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="material-symbols-outlined text-base">{icon}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={ITEM}>
            <h4 className="text-xs font-black uppercase tracking-[0.25em] text-white mb-8">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group flex items-center gap-2 text-sm text-white/45 hover:text-secondary-container transition-all duration-300"
                  >
                    <motion.span
                      className="w-0 h-px bg-secondary-container rounded group-hover:w-4 transition-all duration-300"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={ITEM}>
            <h4 className="text-xs font-black uppercase tracking-[0.25em] text-white mb-8">
              Specialized Services
            </h4>
            <ul className="space-y-3">
              {SERVICES.map((s) => (
                <li key={s}>
                  <a
                    href="#"
                    className="group flex items-center gap-2 text-sm text-white/45 hover:text-secondary-container transition-all duration-300"
                  >
                    <motion.span className="w-0 h-px bg-secondary-container rounded group-hover:w-4 transition-all duration-300" />
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={ITEM}>
            <h4 className="text-xs font-black uppercase tracking-[0.25em] text-white mb-8">
              Contact Info
            </h4>
            <ul className="space-y-5">
              {[
                {
                  icon: 'location_on',
                  text: '123 Visionary Ave, Clinic District\nVisakhapatnam, AP 530001',
                },
                { icon: 'call', text: '+91 (80) 2345 6789' },
                { icon: 'mail', text: 'hello@drramaseye.com' },
                { icon: 'schedule', text: 'Mon–Sat: 8:00 AM – 6:00 PM' },
              ].map(({ icon, text }) => (
                <li key={icon} className="flex gap-3 group">
                  <span className="material-symbols-outlined text-secondary-container text-lg flex-shrink-0 mt-0.5">
                    {icon}
                  </span>
                  <span className="text-white/45 text-sm leading-relaxed group-hover:text-white/70 transition-colors whitespace-pre-line">
                    {text}
                  </span>
                </li>
              ))}
            </ul>

            {/* Emergency badge */}
            <motion.div
              className="mt-6 flex items-center gap-2 px-4 py-2.5 rounded-full bg-tertiary-container/30 border border-tertiary-container/40"
              animate={{ boxShadow: ['0 0 0 0 rgba(180,21,29,0)', '0 0 0 6px rgba(180,21,29,0)'] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
              <span className="text-xs font-bold text-red-300">24/7 Emergency: 911</span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent mb-8"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.4 }}
        />

        {/* Bottom row */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-white/25 text-xs">
            © 2024 Dr. Rama's Eye Clinic. All rights reserved. ISO 9001:2015 Certified.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Accessibility'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-white/25 hover:text-white/70 text-xs transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}