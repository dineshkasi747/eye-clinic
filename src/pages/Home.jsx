import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import CountUp from '../components/CountUp';
import { IMAGES } from '../assets/images';

/* ─────────────── Brand tokens ─────────────── */
const C = {
  primary:    '#004674',
  orange:     '#fe8949',
  surface:    '#f0edec',
  surfaceLow: '#f6f3f2',
  white:      '#ffffff',
  onSurface:  '#1c1b1b',
  outline:    '#717881',
  outlineVar: '#c1c7d1',
  error:      '#ba1a1a',
};

/* ─────────────── Framer variants ─────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show:   (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

/* ─────────────── Section with scroll reveal ─────────────── */
function Section({ children, className = '', style = {} }) {
  const ref   = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.section ref={ref} initial="hidden" animate={inView ? 'show' : 'hidden'}
      variants={stagger} className={className} style={style}>
      {children}
    </motion.section>
  );
}

/* ─────────────── Metric card ─────────────── */
function MetricCard({ value, suffix, label, highlight, delay }) {
  return (
    <motion.div variants={fadeUp} custom={delay} className="flex flex-col items-center text-center">
      <span className="text-5xl font-black mb-1"
        style={{ color: highlight ? C.orange : C.primary }}>
        <CountUp to={value} suffix={suffix} duration={2.2}
          decimals={value % 1 !== 0 ? 1 : 0} />
      </span>
      <span className="text-[11px] font-bold uppercase tracking-[0.25em]"
        style={{ color: C.outline }}>
        {label}
      </span>
    </motion.div>
  );
}

/* ─────────────── Service card (image overlay) ─────────────── */
function ServiceCard({ img, category, title, desc, delay }) {
  return (
    <motion.div variants={fadeUp} custom={delay}
      className="relative group h-[460px] overflow-hidden rounded-3xl cursor-pointer img-zoom-wrap"
      style={{ boxShadow: '0 4px 32px rgba(0,0,0,0.1)' }}
      whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
      <img src={img} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-8">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-2"
          style={{ color: 'rgba(255,255,255,0.6)' }}>{category}</p>
        <h3 className="text-white font-bold text-2xl mb-2">{title}</h3>
        <p className="text-sm leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.7)' }}>{desc}</p>
        <div className="mt-4 flex items-center gap-2 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ color: C.orange }}>
          Learn more
          <span className="material-symbols-outlined text-base">arrow_forward</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────── "Why Choose Us" card ─────────────── */
function WhyCard({ icon, title, desc, featured, delay }) {
  return (
    <motion.div variants={fadeUp} custom={delay}
      className="p-10 rounded-[2rem] flex flex-col items-center text-center"
      style={{
        background:  featured ? C.primary : C.white,
        border:      featured ? 'none' : `1px solid ${C.outlineVar}`,
        boxShadow:   featured ? `0 24px 64px rgba(0,70,116,0.28)` : '0 2px 12px rgba(0,0,0,0.06)',
      }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}>

      <div className="w-20 h-20 rounded-full flex items-center justify-center mb-8"
        style={{ background: featured ? 'rgba(255,255,255,0.15)' : 'rgba(0,70,116,0.06)' }}>
        <span className="material-symbols-outlined"
          style={{ fontSize: 38, color: featured ? C.white : C.primary }}>
          {icon}
        </span>
      </div>

      <h3 className="font-bold text-xl mb-3"
        style={{ color: featured ? C.white : C.onSurface }}>
        {title}
      </h3>
      <p className="text-sm leading-relaxed"
        style={{ color: featured ? 'rgba(255,255,255,0.75)' : C.outline }}>
        {desc}
      </p>

      {featured && (
        <div className="mt-6 flex items-center gap-2 text-sm font-bold cursor-pointer"
          style={{ color: 'rgba(255,255,255,0.8)' }}>
          Our Technology
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </div>
      )}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   HOME PAGE
═══════════════════════════════════════════ */
export default function Home() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden min-h-[92vh] flex items-center px-6 md:px-16 py-20"
        style={{ background: C.white }}>

        {/* BG blobs */}
        <div className="absolute top-20 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'rgba(0,70,116,0.05)' }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-2xl pointer-events-none"
          style={{ background: 'rgba(254,137,73,0.08)' }} />

        <div className="max-w-clinic mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center">

          {/* Left copy */}
          <motion.div className="md:col-span-6 space-y-8" initial="hidden" animate="show" variants={stagger}>

            {/* Badge */}
            <motion.div variants={fadeUp}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full"
              style={{ background: 'rgba(0,70,116,0.07)', border: '1px solid rgba(0,70,116,0.14)' }}>
              <span className="material-symbols-outlined"
                style={{ fontSize: 18, color: C.primary }}>verified_user</span>
              <span className="text-[10px] font-black uppercase tracking-widest"
                style={{ color: C.primary }}>Leading Vision Specialist</span>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={fadeUp}
              className="text-[3.2rem] leading-[1.08] font-black tracking-tight"
              style={{ color: C.onSurface }}>
              Precision Care for <br />
              <span style={{ color: C.primary }}>Your Unique</span>{' '}
              <span style={{
                background: `linear-gradient(135deg, ${C.primary}, ${C.orange})`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>Vision</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg leading-relaxed max-w-xl"
              style={{ color: C.outline }}>
              Combining decades of clinical excellence with world-class technology to provide
              comprehensive eye care for your entire family.
            </motion.p>

            {/* CTA buttons */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-2">
              <Link to="/contact">
                <motion.button
                  className="relative overflow-hidden flex items-center gap-3 font-bold text-base text-white rounded-full px-9 py-4"
                  style={{ background: C.orange, boxShadow: `0 8px 28px rgba(254,137,73,0.4)` }}
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  Book a Consultation
                  <span className="material-symbols-outlined text-base"
                    style={{ fontVariationSettings: "'FILL' 0" }}>calendar_today</span>
                </motion.button>
              </Link>
              <Link to="/services">
                <motion.button
                  className="font-bold text-base rounded-full px-9 py-4 transition-colors"
                  style={{
                    border: `2px solid ${C.outlineVar}`, color: C.onSurface, background: 'transparent',
                  }}
                  whileHover={{ scale: 1.04, borderColor: C.primary, color: C.primary }}
                  whileTap={{ scale: 0.97 }}>
                  Our Services
                </motion.button>
              </Link>
            </motion.div>

            {/* Trust strip */}
            <motion.div variants={fadeUp} className="flex items-center gap-6 pt-2 flex-wrap">
              {[
                { icon: 'verified',   text: 'ISO 9001:2015' },
                { icon: 'star',       text: '4.7★ JustDial' },
                { icon: 'emergency',  text: '24/7 Emergency' },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 text-xs font-semibold"
                  style={{ color: C.outline }}>
                  <span className="material-symbols-outlined"
                    style={{ fontSize: 16, color: C.primary }}>
                    {icon}
                  </span>
                  {text}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right image */}
          <motion.div className="md:col-span-6 relative flex justify-center md:justify-end"
            initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}>

            <motion.div
              className="relative w-full max-w-md aspect-[4/5] rounded-[3.5rem] overflow-hidden img-zoom-wrap"
              style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.18)', border: '4px solid rgba(255,255,255,0.6)' }}
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
              <img src={IMAGES.heroDoctor} alt="Expert Ophthalmologist"
                className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex flex-col justify-end p-10"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.45), transparent)' }}>
                <p className="font-black uppercase mb-2"
                  style={{ fontSize: 9, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.3em' }}>
                  Clinical Excellence
                </p>
                <p className="font-bold text-xl text-white">"Your Vision. Our Priority."</p>
              </div>
            </motion.div>

            {/* ISO badge */}
            <motion.div
              className="absolute -bottom-6 -left-6 hidden lg:flex items-center gap-3 px-6 py-4 rounded-3xl z-10"
              style={{ background: C.white, boxShadow: '0 8px 32px rgba(0,0,0,0.12)', border: `1px solid ${C.outlineVar}` }}
              initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.8, type: 'spring', stiffness: 200, damping: 20 }}
              whileHover={{ y: -4 }}>
              <div className="w-11 h-11 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(0,70,116,0.07)' }}>
                <span className="material-symbols-outlined"
                  style={{ fontSize: 22, color: C.primary }}>verified</span>
              </div>
              <div>
                <p className="font-black uppercase"
                  style={{ fontSize: 9, color: C.outline, letterSpacing: '0.2em' }}>
                  Certified Expert
                </p>
                <p className="font-black text-sm" style={{ color: C.onSurface }}>ISO 9001:2015</p>
              </div>
            </motion.div>

            {/* Rating badge */}
            <motion.div
              className="absolute -top-4 -right-4 hidden lg:block px-5 py-3 rounded-2xl z-10"
              style={{ background: C.primary, boxShadow: '0 8px 24px rgba(0,70,116,0.35)' }}
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, type: 'spring', stiffness: 200, damping: 20 }}
              whileHover={{ scale: 1.05 }}>
              <p className="text-2xl font-black text-white">
                4.7<span style={{ color: C.orange }}>★</span>
              </p>
              <p className="font-bold uppercase" style={{ fontSize: 9, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.3em' }}>
                Patient Rating
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── TRUST METRICS ── */}
      <Section className="py-16 px-6 md:px-16"
        style={{ background: C.white, borderTop: `1px solid ${C.outlineVar}`, borderBottom: `1px solid ${C.outlineVar}` }}>
        <div className="max-w-clinic mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
          <MetricCard value={4.7}  suffix="★" label="JustDial Rating"  highlight delay={0} />
          <MetricCard value={24}   suffix="+" label="Patient Reviews"            delay={1} />
          <MetricCard value={15}   suffix="+" label="Years Experience"           delay={2} />
          <MetricCard value={24}   suffix="/7" label="Emergency Care"  highlight delay={3} />
        </div>
      </Section>

      {/* ── SPECIALIZED SERVICES ── */}
      <Section className="py-28 px-6 md:px-16" style={{ background: C.surface }}>
        <div className="max-w-clinic mx-auto">
          <motion.div variants={fadeUp} className="text-center mb-20 space-y-4">
            <h2 className="text-4xl font-black tracking-tight" style={{ color: C.onSurface }}>
              Specialized Eye Care
            </h2>
            <div className="mx-auto rounded-full"
              style={{ width: 64, height: 4, background: C.orange, marginTop: 16 }} />
            <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: C.outline }}>
              Delivering accurate results and compassionate clinical care through advanced diagnostic
              technologies.
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
            <Link to="/services"
              className="inline-flex items-center gap-2 font-bold text-base hover:gap-4 transition-all duration-300"
              style={{ color: C.primary }}>
              View All Medical Services
              <span className="material-symbols-outlined">chevron_right</span>
            </Link>
          </motion.div>
        </div>
      </Section>

      {/* ── ABOUT DR. RAMA ── */}
      <Section className="py-28 px-6 md:px-16 overflow-hidden" style={{ background: C.white }}>
        <div className="max-w-clinic mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Image */}
          <motion.div variants={fadeUp} className="relative">
            <motion.div
              className="aspect-[4/5] rounded-[3.5rem] overflow-hidden img-zoom-wrap"
              style={{ border: `1px solid ${C.outlineVar}`, boxShadow: '0 24px 64px rgba(0,0,0,0.12)' }}
              whileHover={{ scale: 1.01 }}>
              <img src={IMAGES.drRama} alt="Dr. Rama consultation"
                className="w-full h-full object-cover" />
            </motion.div>

            {/* Years badge */}
            <motion.div
              className="absolute -bottom-8 -right-8 p-8 rounded-[2rem] text-center hidden lg:block"
              style={{ background: C.white, boxShadow: '0 16px 48px rgba(0,0,0,0.14)', border: `1px solid ${C.outlineVar}` }}
              initial={{ opacity: 0, scale: 0.7, rotate: -6 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 200, damping: 18 }}
              whileHover={{ rotate: 3, scale: 1.05 }}>
              <p className="text-5xl font-black mb-1" style={{ color: C.orange }}>
                <CountUp to={15} suffix="+" duration={2} />
              </p>
              <p className="font-black uppercase" style={{ fontSize: 10, color: C.outline, letterSpacing: '0.25em' }}>
                Years Expertise
              </p>
            </motion.div>
          </motion.div>

          {/* Text */}
          <div className="space-y-8">
            <motion.div variants={fadeUp}>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-black uppercase mb-6"
                style={{
                  background: 'rgba(254,137,73,0.1)', color: '#9f4200',
                  border: '1px solid rgba(254,137,73,0.25)', letterSpacing: '0.2em',
                }}>
                Meet Your Doctor
              </span>
              <h2 className="text-4xl font-black leading-tight tracking-tight" style={{ color: C.onSurface }}>
                Expertise Driven by <br />
                <span style={{ color: C.orange }}>Compassion</span>
              </h2>
            </motion.div>

            <motion.p variants={fadeUp} custom={1} className="text-lg leading-relaxed"
              style={{ color: C.outline }}>
              Dr. Rama is a globally recognized ophthalmologist with over 15 years of experience in
              restorative eye surgery. Specializing in high-definition vision correction, she believes
              every patient deserves personalized, attentive care.
            </motion.p>

            <motion.div variants={fadeUp} custom={2} className="grid grid-cols-2 gap-6">
              {[
                'Personalized Care', 'HD Vision Correction',
                'Pediatric Expertise', 'Micro-Invasive Surgery',
              ].map((text) => (
                <motion.div key={text} className="flex items-center gap-3"
                  whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 400 }}>
                  <span className="material-symbols-outlined text-xl"
                    style={{ color: C.primary, fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                  <span className="font-semibold text-sm" style={{ color: C.onSurface }}>{text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats row */}
            <motion.div variants={fadeUp} custom={3}
              className="grid grid-cols-3 gap-6 py-6"
              style={{ borderTop: `1px solid ${C.outlineVar}` }}>
              {[
                { n: 15,   s: '+',  label: 'Yrs Experience' },
                { n: 10000,s: '+',  label: 'Eyes Treated' },
                { n: 99.8, s: '%',  label: 'Success Rate', dec: 1 },
              ].map(({ n, s, label, dec }) => (
                <div key={label} className="text-center">
                  <p className="text-2xl font-black" style={{ color: C.primary }}>
                    <CountUp to={n} suffix={s} duration={2.2} decimals={dec || 0} />
                  </p>
                  <p className="font-bold uppercase mt-1" style={{ fontSize: 10, color: C.outline, letterSpacing: '0.2em' }}>
                    {label}
                  </p>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} custom={4}>
              <Link to="/about">
                <motion.button
                  className="font-bold text-white rounded-full px-9 py-4"
                  style={{ background: C.primary, boxShadow: `0 8px 28px rgba(0,70,116,0.28)` }}
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
            <h2 className="text-4xl font-black tracking-tight" style={{ color: C.onSurface }}>
              Redefining Eye Care Standards
            </h2>
            <div className="mx-auto rounded-full"
              style={{ width: 64, height: 4, background: C.orange, marginTop: 16 }} />
            <p className="text-lg max-w-2xl mx-auto" style={{ color: C.outline }}>
              Combining decades of experience with the most advanced diagnostic and surgical tools.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <WhyCard icon="biotech"           title="Advanced Diagnostics"    delay={0}
              desc="Utilizing AI-driven screening and high-resolution retinal imaging for accurate early detection." />
            <WhyCard icon="medical_mask"      title="Micro-Invasive Surgery"  delay={1} featured
              desc="Specialists in blade-free LASIK and ultra-precise cataract procedures with rapid recovery times." />
            <WhyCard icon="volunteer_activism" title="Personalized Therapy"   delay={2}
              desc="Every patient receives a custom vision recovery plan from pediatric to geriatric care." />
          </div>
        </div>
      </Section>

      {/* ── GALLERY ── */}
      <Section className="py-28 px-6 md:px-16" style={{ background: C.white }}>
        <div className="max-w-clinic mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-8">
            <motion.div variants={fadeUp} className="max-w-xl">
              <h2 className="text-4xl font-black tracking-tight" style={{ color: C.onSurface }}>
                Inside Our Center of Excellence
              </h2>
              <p className="text-lg mt-4 leading-relaxed" style={{ color: C.outline }}>
                A sanctuary of health designed for patient comfort and surgical precision.
              </p>
            </motion.div>
            <motion.button variants={fadeUp}
              className="flex items-center gap-3 font-bold py-3 px-6 rounded-full text-sm transition-all"
              style={{ color: C.primary, border: `1px solid ${C.outlineVar}` }}
              whileHover={{ scale: 1.04, borderColor: C.primary }}>
              Virtual Experience
              <span className="material-symbols-outlined text-base"
                style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-5 h-auto md:h-[600px]">
            <motion.div variants={fadeUp}
              className="md:col-span-2 md:row-span-2 rounded-3xl overflow-hidden img-zoom-wrap"
              style={{ boxShadow: '0 4px 32px rgba(0,0,0,0.08)' }} whileHover={{ scale: 1.01 }}>
              <img src={IMAGES.gallery1} alt="Clinic interior" className="w-full h-full object-cover" />
            </motion.div>
            {[IMAGES.gallery2, IMAGES.gallery3, IMAGES.gallery4].map((src, i) => (
              <motion.div key={i} variants={fadeUp} custom={i + 1}
                className="rounded-3xl overflow-hidden img-zoom-wrap"
                style={{ boxShadow: '0 4px 32px rgba(0,0,0,0.08)' }} whileHover={{ scale: 1.02 }}>
                <img src={src} alt={`Gallery ${i + 2}`} className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── CTA BANNER ── */}
      <Section className="py-20 px-6 md:px-16" style={{ background: C.surface }}>
        <motion.div variants={fadeUp}
          className="max-w-clinic mx-auto rounded-[2.5rem] p-12 lg:p-20 text-center relative overflow-hidden"
          style={{ background: C.primary, boxShadow: '0 32px 80px rgba(0,70,116,0.25)' }}>

          <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none"
            style={{ background: 'rgba(255,255,255,0.08)', transform: 'translate(40%,-40%)' }} />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl pointer-events-none"
            style={{ background: 'rgba(254,137,73,0.15)', transform: 'translate(-40%,40%)' }} />

          <div className="relative z-10 space-y-6">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Ready for Clearer Vision?
            </h2>
            <p className="text-lg max-w-xl mx-auto leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.75)' }}>
              Join thousands of patients who've trusted their sight to Dr. Rama.
              Book your free consultation today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Link to="/contact">
                <motion.button
                  className="font-bold text-base text-white rounded-full px-10 py-4"
                  style={{ background: C.orange, boxShadow: `0 8px 28px rgba(254,137,73,0.45)` }}
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  Book Free Consultation
                </motion.button>
              </Link>
              <Link to="/services">
                <motion.button
                  className="font-bold text-base text-white rounded-full px-10 py-4 transition-colors"
                  style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.25)' }}
                  whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.2)' }}
                  whileTap={{ scale: 0.97 }}>
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