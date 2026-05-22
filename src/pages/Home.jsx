import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import CountUp from '../components/CountUp';
import { IMAGES } from '../assets/images';

const C = {
  primary:    '#004674',
  orange:     '#fe8949',
  surface:    '#f0edec',
  surfaceLow: '#f6f3f2',
  white:      '#ffffff',
  onSurface:  '#1c1b1b',
  outline:    '#717881',
  outlineVar: '#c1c7d1',
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show:   (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

function Section({ children, className = '', style = {} }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.section ref={ref} initial="hidden" animate={inView ? 'show' : 'hidden'}
      variants={stagger} className={className} style={style}>
      {children}
    </motion.section>
  );
}

function MetricCard({ value, suffix, label, highlight, delay }) {
  return (
    <motion.div variants={fadeUp} custom={delay} className="flex flex-col items-center text-center">
      <span className="text-5xl font-black mb-1" style={{ color: highlight ? C.orange : C.primary }}>
        <CountUp to={value} suffix={suffix} duration={2.2} decimals={value % 1 !== 0 ? 1 : 0} />
      </span>
      <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: C.outline }}>{label}</span>
    </motion.div>
  );
}

/* ── Floating particles in hero background ── */
function HeroParticles() {
  const particles = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 6 + 2,
    duration: Math.random() * 10 + 8,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.12 + 0.04,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div key={p.id}
          className="absolute rounded-full"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, background: C.primary, opacity: p.opacity }}
          animate={{ y: [0, -30, 0], x: [0, 10, 0], opacity: [p.opacity, p.opacity * 2.5, p.opacity] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

/* ── Animated eye icon in hero ── */
function AnimatedEye() {
  return (
    <div className="relative w-12 h-12 flex items-center justify-center">
      <svg viewBox="0 0 48 48" className="w-full h-full">
        {/* Eye outline */}
        <motion.path
          d="M4 24 C10 10, 38 10, 44 24 C38 38, 10 38, 4 24"
          fill="none" stroke={C.primary} strokeWidth="2.5" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.3 }}
        />
        {/* Iris */}
        <motion.circle cx="24" cy="24" r="8" fill="none" stroke={C.primary} strokeWidth="2"
          initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        />
        {/* Pupil */}
        <motion.circle cx="24" cy="24" r="4" fill={C.orange}
          initial={{ scale: 0 }} animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.4, delay: 1.6, type: 'spring' }}
        />
        {/* Shine */}
        <motion.circle cx="27" cy="21" r="1.5" fill="white"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.9, duration: 0.3 }}
        />
      </svg>
      {/* Scan line */}
      <motion.div className="absolute inset-x-0 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${C.orange}, transparent)` }}
        animate={{ top: ['10%', '90%', '10%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
    </div>
  );
}

/* ── Typewriter effect for headline ── */
function TypewriterWord({ word, color, delay = 0 }) {
  return (
    <motion.span style={{ color, display: 'inline-block' }}
      initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}>
      {word}
    </motion.span>
  );
}

/* ── Animated stat pill ── */
function StatPill({ icon, text, delay }) {
  return (
    <motion.div
      className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold"
      style={{ background: 'rgba(0,70,116,0.06)', border: `1px solid rgba(0,70,116,0.12)`, color: C.outline }}
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, type: 'spring', stiffness: 300, damping: 20 }}
      whileHover={{ scale: 1.06, background: 'rgba(0,70,116,0.1)', color: C.primary }}
    >
      <motion.span className="material-symbols-outlined" style={{ fontSize: 15, color: C.primary }}
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: delay + 2 }}>
        {icon}
      </motion.span>
      {text}
    </motion.div>
  );
}

/* ── 3D tilt card for doctor image ── */
function TiltCard({ children }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 20 });
  const springY = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotateY = useTransform(springX, [-0.5, 0.5], ['-8deg', '8deg']);

  const handleMouse = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div ref={ref} onMouseMove={handleMouse} onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}>
      {children}
    </motion.div>
  );
}

/* ── Morphing blob ── */
function MorphBlob({ color, style: s }) {
  return (
    <motion.div className="absolute rounded-full pointer-events-none" style={{ background: color, filter: 'blur(80px)', ...s }}
      animate={{ scale: [1, 1.2, 0.95, 1.15, 1], borderRadius: ['60% 40% 30% 70%/60% 30% 70% 40%', '30% 60% 70% 40%/50% 60% 30% 60%', '60% 40% 30% 70%/60% 30% 70% 40%'] }}
      transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

/* ── Animated word reveal for headline ── */
function AnimatedHeadline() {
  const words = [
    { text: 'Precision ', color: C.onSurface },
    { text: 'Care ', color: C.onSurface },
    { text: 'for\n', color: C.onSurface },
    { text: 'Your ', color: C.primary },
    { text: 'Unique ', color: C.primary },
    { text: 'Vision', gradient: true },
  ];
  return (
    <h1 className="text-[3.2rem] leading-[1.12] font-black tracking-tight" style={{ color: C.onSurface }}>
      {words.map((w, i) => (
        w.text === '\n' ? <br key="br" /> :
        <TypewriterWord
          key={i}
          word={w.text}
          color={w.gradient ? 'transparent' : w.color}
          delay={0.4 + i * 0.12}
        />
      ))}
      {/* "Vision" with gradient needs special treatment */}
    </h1>
  );
}

/* ── Service card with glass overlay ── */
function ServiceCard({ img, category, title, desc, delay }) {
  return (
    <motion.div variants={fadeUp} custom={delay}
      className="relative group h-[460px] overflow-hidden rounded-3xl cursor-pointer"
      style={{ boxShadow: '0 4px 32px rgba(0,0,0,0.1)' }}
      whileHover={{ y: -8, boxShadow: '0 24px 56px rgba(0,0,0,0.18)' }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}>
      <img src={img} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-7 group-hover:translate-y-full transition-transform duration-500 ease-in-out">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-1.5" style={{ color: 'rgba(255,255,255,0.55)' }}>{category}</p>
        <h3 className="text-white font-bold text-2xl">{title}</h3>
      </div>
      <motion.div className="absolute inset-0 flex flex-col justify-end"
        initial={{ opacity: 0, y: 40 }} whileHover={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
        <div className="m-4 rounded-2xl p-6"
          style={{ background: 'rgba(255,255,255,0.14)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.25)', boxShadow: '0 8px 32px rgba(0,0,0,0.25)' }}>
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-3"
            style={{ background: C.orange, color: C.white }}>{category}</span>
          <h3 className="text-white font-black text-xl mb-2">{title}</h3>
          <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.8)' }}>{desc}</p>
          <Link to="/services">
            <motion.div className="inline-flex items-center gap-2 font-bold text-sm rounded-full px-5 py-2.5"
              style={{ background: C.white, color: C.primary }} whileHover={{ scale: 1.04 }}>
              Learn More <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </motion.div>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

function GalleryCard({ src, title, subtitle, className = '', delay = 0 }) {
  return (
    <motion.div variants={fadeUp} custom={delay}
      className={`relative group overflow-hidden rounded-3xl ${className}`}
      style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}
      whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 280, damping: 22 }}>
      <img src={src} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <motion.div className="absolute inset-0 flex items-end" initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        <div className="absolute inset-0" style={{ background: 'rgba(0,29,53,0.45)' }} />
        <div className="relative w-full m-4 p-5 rounded-2xl"
          style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)', border: '1px solid rgba(255,255,255,0.22)' }}>
          <p className="text-white font-bold text-base">{title}</p>
          {subtitle && <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.65)' }}>{subtitle}</p>}
          <div className="flex items-center gap-1.5 mt-3">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: C.orange }} />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: C.orange }}>View Gallery</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function WhyCard({ icon, title, desc, featured, delay }) {
  return (
    <motion.div variants={fadeUp} custom={delay}
      className="p-10 rounded-[2rem] flex flex-col items-center text-center"
      style={{ background: featured ? C.primary : C.white, border: featured ? 'none' : `1px solid ${C.outlineVar}`, boxShadow: featured ? '0 24px 64px rgba(0,70,116,0.28)' : '0 2px 12px rgba(0,0,0,0.06)' }}
      whileHover={{ y: -8 }} transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}>
      <div className="w-20 h-20 rounded-full flex items-center justify-center mb-8"
        style={{ background: featured ? 'rgba(255,255,255,0.15)' : 'rgba(0,70,116,0.06)' }}>
        <span className="material-symbols-outlined" style={{ fontSize: 38, color: featured ? C.white : C.primary }}>{icon}</span>
      </div>
      <h3 className="font-bold text-xl mb-3" style={{ color: featured ? C.white : C.onSurface }}>{title}</h3>
      <p className="text-sm leading-relaxed" style={{ color: featured ? 'rgba(255,255,255,0.75)' : C.outline }}>{desc}</p>
      {featured && (
        <div className="mt-6 flex items-center gap-2 text-sm font-bold cursor-pointer" style={{ color: 'rgba(255,255,255,0.8)' }}>
          Our Technology <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </div>
      )}
    </motion.div>
  );
}

export default function Home() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>

      {/* ══════════════════════════════════
          ANIMATED HERO SECTION
      ══════════════════════════════════ */}
      <section className="relative overflow-hidden min-h-[100vh] flex items-center px-6 md:px-16 py-20"
        style={{ background: '#fafcff' }}>

        {/* ── Morphing blobs ── */}
        <MorphBlob color="rgba(0,70,116,0.07)"  style={{ width: 600, height: 600, top: '-20%', right: '-10%' }} />
        <MorphBlob color="rgba(254,137,73,0.08)" style={{ width: 400, height: 400, bottom: '-10%', left: '-5%' }} />
        <MorphBlob color="rgba(0,70,116,0.04)"  style={{ width: 300, height: 300, top: '40%', left: '30%' }} />

        {/* ── Floating particles ── */}
        <HeroParticles />

        {/* ── Animated grid lines ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.025]"
          style={{ backgroundImage: `linear-gradient(${C.primary} 1px, transparent 1px), linear-gradient(90deg, ${C.primary} 1px, transparent 1px)`, backgroundSize: '80px 80px' }} />

        <div className="max-w-clinic mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">

          {/* ── LEFT: Animated copy ── */}
          <div className="md:col-span-6 space-y-8">

            {/* Badge with eye icon */}
            <motion.div
              className="inline-flex items-center gap-3 px-4 py-2.5 rounded-full"
              style={{ background: 'rgba(0,70,116,0.07)', border: '1px solid rgba(0,70,116,0.15)' }}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <AnimatedEye />
              <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: C.primary }}>
                Leading Vision Specialist
              </span>
              {/* Pulsing dot */}
              <motion.span className="w-2 h-2 rounded-full" style={{ background: C.orange }}
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }} />
            </motion.div>

            {/* Animated headline */}
            <div className="text-[clamp(2.2rem,4vw,3.4rem)] leading-[1.1] font-black tracking-tight space-y-1">
              <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}>
                <span style={{ color: C.onSurface }}>Precision Care for</span>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap gap-x-3 items-baseline">
                <span style={{ color: C.primary }}>Your Unique</span>
                {/* "Vision" with shimmer gradient */}
                <motion.span
                  style={{
                    background: `linear-gradient(135deg, ${C.primary} 0%, ${C.orange} 50%, ${C.primary} 100%)`,
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                  animate={{ backgroundPosition: ['0% center', '200% center', '0% center'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}>
                  Vision
                </motion.span>
              </motion.div>
            </div>

            {/* Subtext with line reveal */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}>
              <motion.p className="text-lg leading-relaxed max-w-xl" style={{ color: C.outline }}>
                Combining decades of clinical excellence with world-class technology to provide
                comprehensive eye care for your entire family.
              </motion.p>
              {/* Animated underline */}
              <motion.div className="h-0.5 rounded-full mt-4"
                style={{ background: `linear-gradient(90deg, ${C.orange}, transparent)` }}
                initial={{ width: 0 }} animate={{ width: '60%' }}
                transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }} />
            </motion.div>

            {/* CTA buttons with stagger */}
            <motion.div className="flex flex-wrap gap-4 pt-2"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}>
              <Link to="/contact">
                <motion.button
                  className="relative overflow-hidden flex items-center gap-3 font-bold text-base text-white rounded-full px-9 py-4"
                  style={{ background: C.orange, boxShadow: '0 8px 28px rgba(254,137,73,0.4)' }}
                  whileHover={{ scale: 1.06, boxShadow: '0 12px 36px rgba(254,137,73,0.55)' }}
                  whileTap={{ scale: 0.97 }}>
                  {/* Shimmer sweep */}
                  <motion.span className="absolute inset-0 -skew-x-12"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)' }}
                    initial={{ x: '-150%' }} whileHover={{ x: '150%' }}
                    transition={{ duration: 0.5 }} />
                  <span className="relative z-10">Book a Consultation</span>
                  <motion.span className="material-symbols-outlined text-base relative z-10"
                    animate={{ x: [0, 3, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    calendar_today
                  </motion.span>
                </motion.button>
              </Link>
              <Link to="/services">
                <motion.button className="font-bold text-base rounded-full px-9 py-4"
                  style={{ border: `2px solid ${C.outlineVar}`, color: C.onSurface, background: 'transparent' }}
                  whileHover={{ scale: 1.04, borderColor: C.primary, color: C.primary, background: 'rgba(0,70,116,0.04)' }}
                  whileTap={{ scale: 0.97 }}>
                  Our Services
                </motion.button>
              </Link>
            </motion.div>

            {/* Animated trust pills */}
            <div className="flex flex-wrap gap-3 pt-1">
              <StatPill icon="verified"  text="ISO 9001:2015"   delay={1.1} />
              <StatPill icon="star"      text="4.7★ JustDial"   delay={1.25} />
              <StatPill icon="emergency" text="24/7 Emergency"  delay={1.4} />
            </div>
          </div>

          {/* ── RIGHT: 3D tilt doctor image ── */}
          <motion.div className="md:col-span-6 relative flex justify-center md:justify-end"
            initial={{ opacity: 0, x: 80 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}>

            <TiltCard>
              {/* Glow ring behind image */}
              <motion.div className="absolute inset-0 rounded-[3.5rem] pointer-events-none"
                style={{ background: `radial-gradient(circle at 50% 50%, rgba(254,137,73,0.18), transparent 70%)`, zIndex: 0 }}
                animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />

              <motion.div className="relative w-full max-w-md aspect-[4/5] rounded-[3.5rem] overflow-hidden"
                style={{ boxShadow: '0 40px 100px rgba(0,70,116,0.2)', border: '4px solid rgba(255,255,255,0.7)', zIndex: 1 }}>
                <img src={IMAGES.heroDoctor} alt="Expert Ophthalmologist" className="w-full h-full object-cover" />

                {/* Gradient overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-10"
                  style={{ background: 'linear-gradient(to top, rgba(0,29,53,0.6), transparent 60%)' }}>
                  <motion.p className="font-black uppercase mb-2"
                    style={{ fontSize: 9, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.3em' }}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
                    Clinical Excellence
                  </motion.p>
                  <motion.p className="font-bold text-xl text-white"
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.7, duration: 0.6 }}>
                    "Your Vision. Our Priority."
                  </motion.p>
                </div>

                {/* Animated scan line on image */}
                <motion.div className="absolute inset-x-0 h-px pointer-events-none"
                  style={{ background: `linear-gradient(to right, transparent, rgba(254,137,73,0.6), transparent)`, zIndex: 2 }}
                  animate={{ top: ['5%', '95%', '5%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                />
              </motion.div>
            </TiltCard>

            {/* ISO badge — floats in */}
            <motion.div className="absolute -bottom-6 -left-6 hidden lg:flex items-center gap-3 px-6 py-4 rounded-3xl z-10"
              style={{ background: C.white, boxShadow: '0 8px 32px rgba(0,0,0,0.12)', border: `1px solid ${C.outlineVar}` }}
              initial={{ opacity: 0, scale: 0.5, rotate: -12, y: 30 }}
              animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
              transition={{ delay: 1.2, type: 'spring', stiffness: 200, damping: 18 }}
              whileHover={{ y: -4, boxShadow: '0 16px 48px rgba(0,0,0,0.18)' }}>
              <motion.div className="w-11 h-11 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(0,70,116,0.07)' }}
                animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 22, color: C.primary }}>verified</span>
              </motion.div>
              <div>
                <p className="font-black uppercase" style={{ fontSize: 9, color: C.outline, letterSpacing: '0.2em' }}>Certified Expert</p>
                <p className="font-black text-sm" style={{ color: C.onSurface }}>ISO 9001:2015</p>
              </div>
            </motion.div>

            {/* Rating badge — bounces in */}
            <motion.div className="absolute -top-4 -right-4 hidden lg:block px-5 py-3 rounded-2xl z-10"
              style={{ background: C.primary, boxShadow: '0 8px 24px rgba(0,70,116,0.4)' }}
              initial={{ opacity: 0, scale: 0.3, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1.4, type: 'spring', stiffness: 300, damping: 15 }}
              whileHover={{ scale: 1.1, rotate: [0, -3, 3, 0] }}>
              <p className="text-2xl font-black text-white">
                4.7<motion.span style={{ color: C.orange }}
                  animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }}>★</motion.span>
              </p>
              <p className="font-bold uppercase" style={{ fontSize: 9, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.3em' }}>Patient Rating</p>
            </motion.div>

            {/* New: floating "10k+ patients" badge */}
            <motion.div
              className="absolute top-1/2 -left-8 hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-2xl z-10"
              style={{ background: C.orange, boxShadow: '0 8px 24px rgba(254,137,73,0.45)' }}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.6, type: 'spring', stiffness: 200, damping: 18 }}
              whileHover={{ scale: 1.08 }}>
              <span className="material-symbols-outlined text-white" style={{ fontSize: 18 }}>people</span>
              <div>
                <p className="text-white font-black text-sm leading-none">10,000+</p>
                <p className="text-white/70 font-bold uppercase" style={{ fontSize: 8, letterSpacing: '0.15em' }}>Eyes Treated</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden" style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: '100%', height: 60 }}>
            <motion.path
              d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z"
              fill={C.surface}
              initial={{ d: 'M0,60 C360,60 1080,60 1440,60 L1440,60 L0,60 Z' }}
              animate={{ d: 'M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z' }}
              transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </svg>
        </div>
      </section>

      {/* ── TRUST METRICS ── */}
      <Section className="py-16 px-6 md:px-16"
        style={{ background: C.white, borderTop: `1px solid ${C.outlineVar}`, borderBottom: `1px solid ${C.outlineVar}` }}>
        <div className="max-w-clinic mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
          <MetricCard value={4.7} suffix="★" label="JustDial Rating" highlight delay={0} />
          <MetricCard value={24}  suffix="+" label="Patient Reviews"          delay={1} />
          <MetricCard value={15}  suffix="+" label="Years Experience"         delay={2} />
          <MetricCard value={24}  suffix="/7" label="Emergency Care" highlight delay={3} />
        </div>
      </Section>

      {/* ── SPECIALIZED SERVICES ── */}
      <Section className="py-28 px-6 md:px-16" style={{ background: C.surface }}>
        <div className="max-w-clinic mx-auto">
          <motion.div variants={fadeUp} className="text-center mb-20 space-y-4">
            <h2 className="text-4xl font-black tracking-tight" style={{ color: C.onSurface }}>Specialized Eye Care</h2>
            <div className="mx-auto rounded-full" style={{ width: 64, height: 4, background: C.orange, marginTop: 16 }} />
            <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: C.outline }}>
              Delivering accurate results and compassionate clinical care through advanced diagnostic technologies.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { img: IMAGES.eyeExams,     category: 'Diagnostics',   title: 'Eye Exams',     desc: 'Comprehensive digital diagnostics for precise prescriptions and early disease detection.', delay: 0 },
              { img: IMAGES.lasikSurgery, category: 'Surgical Care', title: 'LASIK Surgery', desc: 'Safe, blade-free laser correction for absolute visual freedom.', delay: 1 },
              { img: IMAGES.pediatricCare,category: 'Family Care',   title: 'Pediatric Care',desc: 'Gentle care for developing eyes in a warm, friendly environment.', delay: 2 },
              { img: IMAGES.diseaseMgmt,  category: 'Specialized',   title: 'Disease Mgmt', desc: 'Expert clinical protocols for Glaucoma, Cataracts & Retinal conditions.', delay: 3 },
            ].map((card) => <ServiceCard key={card.title} {...card} />)}
          </div>
          <motion.div variants={fadeUp} custom={4} className="mt-14 text-center">
            <Link to="/services" className="inline-flex items-center gap-2 font-bold text-base hover:gap-4 transition-all duration-300" style={{ color: C.primary }}>
              View All Medical Services <span className="material-symbols-outlined">chevron_right</span>
            </Link>
          </motion.div>
        </div>
      </Section>

      {/* ── ABOUT DR. RAMA ── */}
      <Section className="py-28 px-6 md:px-16 overflow-hidden" style={{ background: C.white }}>
        <div className="max-w-clinic mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div variants={fadeUp} className="relative">
            <motion.div className="aspect-[4/5] rounded-[3.5rem] overflow-hidden img-zoom-wrap"
              style={{ border: `1px solid ${C.outlineVar}`, boxShadow: '0 24px 64px rgba(0,0,0,0.12)' }} whileHover={{ scale: 1.01 }}>
              <img src={IMAGES.drRama} alt="Dr. Rama consultation" className="w-full h-full object-cover" />
            </motion.div>
            <motion.div className="absolute -bottom-8 -right-8 p-8 rounded-[2rem] text-center hidden lg:block"
              style={{ background: C.white, boxShadow: '0 16px 48px rgba(0,0,0,0.14)', border: `1px solid ${C.outlineVar}` }}
              initial={{ opacity: 0, scale: 0.7, rotate: -6 }} whileInView={{ opacity: 1, scale: 1, rotate: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 200, damping: 18 }} whileHover={{ rotate: 3, scale: 1.05 }}>
              <p className="text-5xl font-black mb-1" style={{ color: C.orange }}>
                <CountUp to={15} suffix="+" duration={2} />
              </p>
              <p className="font-black uppercase" style={{ fontSize: 10, color: C.outline, letterSpacing: '0.25em' }}>Years Expertise</p>
            </motion.div>
          </motion.div>
          <div className="space-y-8">
            <motion.div variants={fadeUp}>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-black uppercase mb-6"
                style={{ background: 'rgba(254,137,73,0.1)', color: '#9f4200', border: '1px solid rgba(254,137,73,0.25)', letterSpacing: '0.2em' }}>
                Meet Your Doctor
              </span>
              <h2 className="text-4xl font-black leading-tight tracking-tight" style={{ color: C.onSurface }}>
                Expertise Driven by <br /><span style={{ color: C.orange }}>Compassion</span>
              </h2>
            </motion.div>
            <motion.p variants={fadeUp} custom={1} className="text-lg leading-relaxed" style={{ color: C.outline }}>
              Dr. Rama is a globally recognized ophthalmologist with over 15 years of experience in restorative eye surgery. Specializing in high-definition vision correction, she believes every patient deserves personalized, attentive care.
            </motion.p>
            <motion.div variants={fadeUp} custom={2} className="grid grid-cols-2 gap-6">
              {['Personalized Care', 'HD Vision Correction', 'Pediatric Expertise', 'Micro-Invasive Surgery'].map((text) => (
                <motion.div key={text} className="flex items-center gap-3" whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 400 }}>
                  <span className="material-symbols-outlined text-xl" style={{ color: C.primary, fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  <span className="font-semibold text-sm" style={{ color: C.onSurface }}>{text}</span>
                </motion.div>
              ))}
            </motion.div>
            <motion.div variants={fadeUp} custom={3} className="grid grid-cols-3 gap-6 py-6" style={{ borderTop: `1px solid ${C.outlineVar}` }}>
              {[{ n: 15, s: '+', label: 'Yrs Experience' }, { n: 10000, s: '+', label: 'Eyes Treated' }, { n: 99.8, s: '%', label: 'Success Rate', dec: 1 }].map(({ n, s, label, dec }) => (
                <div key={label} className="text-center">
                  <p className="text-2xl font-black" style={{ color: C.primary }}>
                    <CountUp to={n} suffix={s} duration={2.2} decimals={dec || 0} />
                  </p>
                  <p className="font-bold uppercase mt-1" style={{ fontSize: 10, color: C.outline, letterSpacing: '0.2em' }}>{label}</p>
                </div>
              ))}
            </motion.div>
            <motion.div variants={fadeUp} custom={4}>
              <Link to="/about">
                <motion.button className="font-bold text-white rounded-full px-9 py-4"
                  style={{ background: C.primary, boxShadow: '0 8px 28px rgba(0,70,116,0.28)' }}
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  Learn More About Dr. Rama
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ── WHY CHOOSE US ── */}
      <Section className="py-28 px-6 md:px-16" style={{ background: C.surface }}>
        <div className="max-w-clinic mx-auto">
          <motion.div variants={fadeUp} className="text-center mb-20 space-y-4">
            <h2 className="text-4xl font-black tracking-tight" style={{ color: C.onSurface }}>Redefining Eye Care Standards</h2>
            <div className="mx-auto rounded-full" style={{ width: 64, height: 4, background: C.orange, marginTop: 16 }} />
            <p className="text-lg max-w-2xl mx-auto" style={{ color: C.outline }}>Combining decades of experience with the most advanced diagnostic and surgical tools.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <WhyCard icon="biotech"            title="Advanced Diagnostics"   delay={0} desc="Utilizing AI-driven screening and high-resolution retinal imaging for accurate early detection." />
            <WhyCard icon="medical_mask"       title="Micro-Invasive Surgery" delay={1} featured desc="Specialists in blade-free LASIK and ultra-precise cataract procedures with rapid recovery times." />
            <WhyCard icon="volunteer_activism" title="Personalized Therapy"   delay={2} desc="Every patient receives a custom vision recovery plan from pediatric to geriatric care." />
          </div>
        </div>
      </Section>

      {/* ── GALLERY ── */}
      <Section className="py-28 px-6 md:px-16" style={{ background: C.white }}>
        <div className="max-w-clinic mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-8">
            <motion.div variants={fadeUp} className="max-w-xl">
              <h2 className="text-4xl font-black tracking-tight" style={{ color: C.onSurface }}>Inside Our Center of Excellence</h2>
              <p className="text-lg mt-4 leading-relaxed" style={{ color: C.outline }}>Hover any image to explore our state-of-the-art facilities.</p>
            </motion.div>
            <motion.button variants={fadeUp} className="flex items-center gap-3 font-bold py-3 px-6 rounded-full text-sm"
              style={{ color: C.primary, border: `1px solid ${C.outlineVar}` }}
              whileHover={{ scale: 1.04, borderColor: C.primary }}>
              Virtual Experience <span className="material-symbols-outlined text-base">play_arrow</span>
            </motion.button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-5 h-auto md:h-[600px]">
            <GalleryCard src={IMAGES.gallery1} title="Reception & Waiting Area" subtitle="Modern, comfortable patient experience" className="md:col-span-2 md:row-span-2" delay={0} />
            <GalleryCard src={IMAGES.gallery2} title="Surgical Suite" subtitle="Advanced sterile environment" delay={1} />
            <GalleryCard src={IMAGES.gallery3} title="Our Expert Team" subtitle="Experienced & compassionate staff" delay={2} />
            <GalleryCard src={IMAGES.gallery4} title="Our Facility" subtitle="Gajuwaka, Visakhapatnam" delay={3} />
          </div>
        </div>
      </Section>

      {/* ── CTA BANNER ── */}
      <Section className="py-20 px-6 md:px-16" style={{ background: C.surface }}>
        <motion.div variants={fadeUp} className="max-w-clinic mx-auto rounded-[2.5rem] p-12 lg:p-20 text-center relative overflow-hidden"
          style={{ background: C.primary, boxShadow: '0 32px 80px rgba(0,70,116,0.25)' }}>
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none"
            style={{ background: 'rgba(255,255,255,0.08)', transform: 'translate(40%,-40%)' }} />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl pointer-events-none"
            style={{ background: 'rgba(254,137,73,0.15)', transform: 'translate(-40%,40%)' }} />
          <div className="relative z-10 space-y-6">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Ready for Clearer Vision?</h2>
            <p className="text-lg max-w-xl mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
              Join thousands of patients who've trusted their sight to Dr. Rama. Book your free consultation today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Link to="/contact">
                <motion.button className="font-bold text-base text-white rounded-full px-10 py-4"
                  style={{ background: C.orange, boxShadow: '0 8px 28px rgba(254,137,73,0.45)' }}
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>Book Free Consultation</motion.button>
              </Link>
              <Link to="/services">
                <motion.button className="font-bold text-base text-white rounded-full px-10 py-4"
                  style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.25)' }}
                  whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.2)' }} whileTap={{ scale: 0.97 }}>
                  Explore Services
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </Section>
    </motion.div>
  );
}