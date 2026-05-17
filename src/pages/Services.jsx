import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { IMAGES } from '../assets/images';

const C = {
  primary:    '#004674',
  orange:     '#fe8949',
  red:        '#b4151d',
  surface:    '#f0edec',
  surfaceLow: '#f6f3f2',
  white:      '#ffffff',
  onSurface:  '#1c1b1b',
  outline:    '#717881',
  outlineVar: '#c1c7d1',
};

function SectionReveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}>
      {children}
    </motion.div>
  );
}

const SERVICES_BENTO = [
  {
    id: 'exams', title: 'Comprehensive Eye Exams', category: 'Diagnostics', icon: 'clinical_notes',
    iconBg: 'rgba(0,70,116,0.08)', iconColor: C.primary,
    desc: 'More than just a prescription check. Our deep-dive diagnostics evaluate your overall ocular health, screening for glaucoma, macular degeneration, and diabetic retinopathy using HD imaging technology.',
    bullets: ['Digital Retinal Mapping', 'Intraocular Pressure Testing'],
    img: IMAGES.eyeExamDetail, span: 'md:col-span-8', layout: 'row',
  },
  {
    id: 'pediatric', title: 'Pediatric Care', category: 'Family Care', icon: 'child_care',
    iconBg: 'rgba(254,137,73,0.12)', iconColor: C.orange,
    desc: 'Specialized vision services tailored for infants, children, and teens. We focus on early detection of developmental vision issues in a friendly environment.',
    img: IMAGES.pediatricDetail, span: 'md:col-span-4', layout: 'col',
  },
  {
    id: 'lasik', title: 'LASIK Surgery', category: 'Surgical Care', icon: 'flare',
    iconBg: 'rgba(180,21,29,0.08)', iconColor: C.red,
    desc: 'Experience life without boundaries. Our bladeless LASIK procedures offer rapid recovery and surgical precision for long-term vision correction.',
    span: 'md:col-span-4', layout: 'col-cta',
  },
  {
    id: 'contact', title: 'Contact Lens Fitting', category: 'Specialty', icon: 'eye_tracking',
    iconBg: 'rgba(0,70,116,0.08)', iconColor: C.primary,
    desc: 'From daily disposables to specialized scleral lenses for keratoconus, we provide custom fittings to ensure maximum comfort and optimal visual acuity.',
    img: IMAGES.contactLens, span: 'md:col-span-8', layout: 'row-reverse',
    extra: [
      { label: 'Standard', sub: 'Toric, Multifocal' },
      { label: 'Specialty', sub: 'Scleral, Ortho-K' },
    ],
  },
  {
    id: 'disease', title: 'Disease Management', category: 'Specialized', icon: 'biotech',
    iconBg: 'rgba(0,70,116,0.08)', iconColor: C.primary,
    desc: 'Expert clinical protocols for Glaucoma and Cataracts. AI-integrated early detection and long-term customized management plans.',
    img: IMAGES.diseaseMgmt, span: 'md:col-span-6', layout: 'col',
  },
  {
    id: 'cataract', title: 'Cataract Surgery', category: 'Surgical Care', icon: 'visibility',
    iconBg: 'rgba(180,21,29,0.08)', iconColor: C.red,
    desc: 'Micro-incision cataract surgery with rapid recovery. Ultra-precise blade-free procedures with premium intraocular lens options for every lifestyle.',
    span: 'md:col-span-6', layout: 'col',
  },
];

function ServiceCard({ svc, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={svc.span}
      style={{ background: C.white, border: `1px solid ${C.outlineVar}`, borderRadius: 16, overflow: 'hidden', transition: 'box-shadow 0.3s' }}
      whileHover={{ boxShadow: '0 16px 48px rgba(0,0,0,0.1)' }}>

      {(svc.layout === 'row' || svc.layout === 'row-reverse') && (
        <div style={{ display: 'flex', flexDirection: svc.layout === 'row-reverse' ? 'row-reverse' : 'row' }}>
          <div style={{ flex: 1, padding: 32 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: svc.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 28, color: svc.iconColor }}>{svc.icon}</span>
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: C.onSurface, marginBottom: 12 }}>{svc.title}</h3>
            <p style={{ color: C.outline, fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>{svc.desc}</p>
            {svc.bullets && (
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
                {svc.bullets.map((b) => (
                  <li key={b} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: C.onSurface }}>
                    <span className="material-symbols-outlined" style={{ color: C.primary, fontSize: 18, fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    {b}
                  </li>
                ))}
              </ul>
            )}
            {svc.extra && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                {svc.extra.map((e) => (
                  <div key={e.label} style={{ padding: 12, borderRadius: 8, background: C.surfaceLow }}>
                    <span style={{ fontWeight: 700, color: C.primary, fontSize: 11, display: 'block', marginBottom: 4 }}>{e.label}</span>
                    <span style={{ color: C.outline, fontSize: 11 }}>{e.sub}</span>
                  </div>
                ))}
              </div>
            )}
            <motion.a href="#" style={{ color: C.primary, fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', gap: 4, textDecoration: 'none' }} whileHover={{ x: 3 }}>
              Learn about our process <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
            </motion.a>
          </div>
          <div style={{ flex: 1, minHeight: 260, overflow: 'hidden' }}>
            <img src={svc.img} alt={svc.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s' }}
              onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
          </div>
        </div>
      )}

      {svc.layout === 'col' && (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ padding: 32, flex: 1 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: svc.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 28, color: svc.iconColor }}>{svc.icon}</span>
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: C.onSurface, marginBottom: 12 }}>{svc.title}</h3>
            <p style={{ color: C.outline, fontSize: 14, lineHeight: 1.7 }}>{svc.desc}</p>
          </div>
          {svc.img && (
            <div style={{ height: 192, overflow: 'hidden' }}>
              <img src={svc.img} alt={svc.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s' }}
                onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
            </div>
          )}
        </div>
      )}

      {svc.layout === 'col-cta' && (
        <div style={{ padding: 32, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: svc.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 28, color: svc.iconColor }}>{svc.icon}</span>
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: C.onSurface, marginBottom: 12 }}>{svc.title}</h3>
            <p style={{ color: C.outline, fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>{svc.desc}</p>
          </div>
          <motion.button
            style={{ width: '100%', padding: '12px 0', borderRadius: 12, border: `2px solid ${C.red}`, color: C.red, fontWeight: 700, fontSize: 14, background: 'transparent', cursor: 'pointer', transition: 'all 0.2s' }}
            whileHover={{ background: C.red, color: C.white, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}>
            Free Consultation
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}

export default function Services() {
  return (
    <div style={{ paddingTop: 80, background: '#fdf8f8', overflowX: 'hidden' }}>

      {/* ── Hero ── */}
      <section style={{ padding: '80px 64px', textAlign: 'center' }}>
        <SectionReveal>
          <div style={{ display: 'inline-flex', alignItems: 'center', padding: '6px 16px', borderRadius: 999, background: 'rgba(0,70,116,0.08)', color: C.primary, fontWeight: 700, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 24 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16, marginRight: 8 }}>visibility</span>
            Precision Vision Care
          </div>
          <h1 style={{ fontSize: 48, fontWeight: 900, color: C.onSurface, marginBottom: 24, maxWidth: 700, margin: '0 auto 24px' }}>
            Our Specialized{' '}
            <span style={{ background: `linear-gradient(135deg, ${C.primary}, #0077c2)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Ophthalmology
            </span>{' '}
            Services
          </h1>
          <p style={{ color: C.outline, fontSize: 18, maxWidth: 640, margin: '0 auto', lineHeight: 1.7 }}>
            At Dr. Rama's Eye Clinic, we merge cutting-edge diagnostic technology with a compassionate
            touch to ensure your vision remains crystal clear at every stage of life.
          </p>
        </SectionReveal>
      </section>

      {/* ── Bento Grid ── */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 64px 96px' }}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {SERVICES_BENTO.map((svc, i) => (
            <ServiceCard key={svc.id} svc={svc} delay={i * 0.07} />
          ))}
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section style={{ padding: '80px 64px', background: C.surfaceLow, borderTop: `1px solid ${C.outlineVar}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <SectionReveal>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <h2 style={{ fontSize: 32, fontWeight: 900, color: C.onSurface, marginBottom: 16 }}>Why Choose Dr. Rama's?</h2>
              <p style={{ color: C.outline, maxWidth: 480, margin: '0 auto' }}>
                Every service is backed by decades of experience and the most advanced diagnostic tools available.
              </p>
            </div>
          </SectionReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {[
              { icon: 'biotech',            title: 'Advanced Diagnostics',  desc: 'AI-driven screening and high-resolution retinal imaging for accurate detection.',                                    highlight: false },
              { icon: 'medical_mask',       title: 'Micro-Invasive Surgery', desc: 'Specialists in blade-free LASIK and ultra-precise cataract procedures with rapid recovery.', highlight: true },
              { icon: 'volunteer_activism', title: 'Personalized Therapy',  desc: 'Every patient receives a custom vision recovery plan from pediatric to geriatric care.',                            highlight: false },
            ].map((card) => (
              <motion.div key={card.title}
                style={{
                  padding: 40, borderRadius: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
                  background: card.highlight ? C.primary : C.white,
                  border: card.highlight ? 'none' : `1px solid ${C.outlineVar}`,
                  boxShadow: card.highlight ? '0 24px 64px rgba(0,70,116,0.28)' : '0 2px 12px rgba(0,0,0,0.06)',
                }}
                whileHover={{ y: -6 }} transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 32, background: card.highlight ? 'rgba(255,255,255,0.15)' : 'rgba(0,70,116,0.06)' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 36, color: card.highlight ? C.white : C.primary }}>{card.icon}</span>
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, color: card.highlight ? C.white : C.onSurface }}>{card.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: card.highlight ? 'rgba(255,255,255,0.8)' : C.outline }}>{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '80px 64px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <SectionReveal>
            <div style={{ background: C.primary, color: C.white, borderRadius: 16, padding: 48, textAlign: 'center', position: 'relative', overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,70,116,0.25)' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, opacity: 0.08, pointerEvents: 'none' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 160 }}>visibility</span>
              </div>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h2 style={{ fontSize: 32, fontWeight: 900, marginBottom: 16, color: C.white }}>Ready for a Clearer Tomorrow?</h2>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 18, marginBottom: 40, maxWidth: 520, margin: '0 auto 40px', lineHeight: 1.7 }}>
                  Schedule your comprehensive examination with Dr. Rama today and join thousands of satisfied patients.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16 }}>
                  <Link to="/contact">
                    <motion.button style={{ background: C.orange, color: C.white, padding: '16px 32px', borderRadius: 12, fontWeight: 700, fontSize: 16, border: 'none', cursor: 'pointer', boxShadow: '0 8px 28px rgba(254,137,73,0.4)' }}
                      whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                      Book Your Appointment
                    </motion.button>
                  </Link>
                  <motion.button style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.25)', padding: '16px 32px', borderRadius: 12, fontWeight: 700, fontSize: 16, color: C.white, cursor: 'pointer' }}
                    whileHover={{ scale: 1.02, background: 'rgba(255,255,255,0.2)' }} whileTap={{ scale: 0.96 }}>
                    View Pricing
                  </motion.button>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}