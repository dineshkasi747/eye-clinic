import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { IMAGES } from '../assets/images';

function SectionReveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const SERVICES_BENTO = [
  {
    id: 'exams',
    title: 'Comprehensive Eye Exams',
    category: 'Diagnostics',
    icon: 'clinical_notes',
    iconColor: 'text-primary-DEFAULT bg-primary-DEFAULT/10',
    desc: 'More than just a prescription check. Our deep-dive diagnostics evaluate your overall ocular health, screening for glaucoma, macular degeneration, and diabetic retinopathy using HD imaging technology.',
    bullets: ['Digital Retinal Mapping', 'Intraocular Pressure Testing'],
    img: IMAGES.eyeExamDetail,
    span: 'md:col-span-8',
    layout: 'row',
  },
  {
    id: 'pediatric',
    title: 'Pediatric Care',
    category: 'Family Care',
    icon: 'child_care',
    iconColor: 'text-tertiary bg-tertiary/10',
    desc: 'Specialized vision services tailored for infants, children, and teens. We focus on early detection of developmental vision issues in a friendly environment.',
    img: IMAGES.pediatricDetail,
    span: 'md:col-span-4',
    layout: 'col',
  },
  {
    id: 'lasik',
    title: 'LASIK Surgery',
    category: 'Surgical Care',
    icon: 'flare',
    iconColor: 'text-secondary-DEFAULT bg-secondary-DEFAULT/10',
    desc: 'Experience life without boundaries. Our bladeless LASIK procedures offer rapid recovery and surgical precision for long-term vision correction.',
    span: 'md:col-span-4',
    layout: 'col-cta',
  },
  {
    id: 'contact',
    title: 'Contact Lens Fitting',
    category: 'Specialty',
    icon: 'eye_tracking',
    iconColor: 'text-primary-DEFAULT bg-primary-DEFAULT/10',
    desc: 'From daily disposables to specialized scleral lenses for keratoconus, we provide custom fittings to ensure maximum comfort and optimal visual acuity.',
    img: IMAGES.contactLens,
    span: 'md:col-span-8',
    layout: 'row-reverse',
    extra: [
      { label: 'Standard', sub: 'Toric, Multifocal' },
      { label: 'Specialty', sub: 'Scleral, Ortho-K' },
    ],
  },
  {
    id: 'disease',
    title: 'Disease Management',
    category: 'Specialized',
    icon: 'biotech',
    iconColor: 'text-primary-DEFAULT bg-primary-DEFAULT/10',
    desc: 'Expert clinical protocols for Glaucoma and Cataracts. AI-integrated early detection and long-term customized management plans.',
    img: IMAGES.diseaseMgmt,
    span: 'md:col-span-6',
    layout: 'col',
  },
  {
    id: 'cataract',
    title: 'Cataract Surgery',
    category: 'Surgical Care',
    icon: 'visibility',
    iconColor: 'text-secondary-DEFAULT bg-secondary-DEFAULT/10',
    desc: 'Micro-incision cataract surgery with rapid recovery. Ultra-precise blade-free procedures with premium intraocular lens options for every lifestyle.',
    span: 'md:col-span-6',
    layout: 'col',
  },
];

function ServiceCard({ svc, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`${svc.span} group relative overflow-hidden rounded-2xl border border-outline-variant bg-white hover:shadow-xl transition-all duration-500`}
    >
      {svc.layout === 'row' && (
        <div className="flex flex-col md:flex-row gap-0">
          <div className="flex-1 p-8">
            <div className={`w-12 h-12 rounded-xl ${svc.iconColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <span className="material-symbols-outlined text-3xl">{svc.icon}</span>
            </div>
            <h3 className="text-xl font-bold text-on-surface mb-3">{svc.title}</h3>
            <p className="text-on-surface-variant text-sm mb-5 leading-relaxed">{svc.desc}</p>
            {svc.bullets && (
              <ul className="space-y-2 mb-6">
                {svc.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-on-surface text-sm">
                    <span className="material-symbols-outlined text-primary-DEFAULT text-lg">check_circle</span>
                    {b}
                  </li>
                ))}
              </ul>
            )}
            <motion.a href="#" className="text-primary-DEFAULT font-bold text-sm flex items-center gap-1 hover:underline" whileHover={{ x: 3 }}>
              Learn about our process <span className="material-symbols-outlined text-base">arrow_forward</span>
            </motion.a>
          </div>
          <div className="flex-1 h-64 md:h-auto overflow-hidden">
            <img src={svc.img} alt={svc.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          </div>
        </div>
      )}

      {svc.layout === 'row-reverse' && (
        <div className="flex flex-col md:flex-row-reverse gap-0">
          <div className="flex-1 p-8">
            <div className={`w-12 h-12 rounded-xl ${svc.iconColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <span className="material-symbols-outlined text-3xl">{svc.icon}</span>
            </div>
            <h3 className="text-xl font-bold text-on-surface mb-3">{svc.title}</h3>
            <p className="text-on-surface-variant text-sm mb-5 leading-relaxed">{svc.desc}</p>
            {svc.extra && (
              <div className="grid grid-cols-2 gap-3 mb-4">
                {svc.extra.map((e) => (
                  <div key={e.label} className="p-3 rounded-lg bg-surface-container">
                    <span className="font-bold text-primary-DEFAULT text-xs block mb-1">{e.label}</span>
                    <span className="text-on-surface-variant text-xs">{e.sub}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex-1 h-64 md:h-auto overflow-hidden">
            <img src={svc.img} alt={svc.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          </div>
        </div>
      )}

      {svc.layout === 'col' && (
        <div className="flex flex-col h-full">
          <div className="p-8 flex-1">
            <div className={`w-12 h-12 rounded-xl ${svc.iconColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <span className="material-symbols-outlined text-3xl">{svc.icon}</span>
            </div>
            <h3 className="text-xl font-bold text-on-surface mb-3">{svc.title}</h3>
            <p className="text-on-surface-variant text-sm mb-4 leading-relaxed">{svc.desc}</p>
          </div>
          {svc.img && (
            <div className="h-48 overflow-hidden">
              <img src={svc.img} alt={svc.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
          )}
        </div>
      )}

      {svc.layout === 'col-cta' && (
        <div className="p-8 h-full flex flex-col justify-between">
          <div>
            <div className={`w-12 h-12 rounded-xl ${svc.iconColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <span className="material-symbols-outlined text-3xl">{svc.icon}</span>
            </div>
            <h3 className="text-xl font-bold text-on-surface mb-3">{svc.title}</h3>
            <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">{svc.desc}</p>
          </div>
          <motion.button
            className="w-full py-3 rounded-xl border-2 border-secondary-DEFAULT text-secondary-DEFAULT font-bold hover:bg-secondary-DEFAULT hover:text-white transition-all text-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            Free Consultation
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}

export default function Services() {
  return (
    <div className="pt-20 bg-background overflow-x-hidden">

      {/* ── Hero ── */}
      <section className="py-20 px-6 md:px-16 text-center">
        <SectionReveal>
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-DEFAULT/10 text-primary-DEFAULT font-bold text-xs uppercase tracking-widest mb-6">
            <span className="material-symbols-outlined text-base mr-2">visibility</span>
            Precision Vision Care
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-on-surface mb-6 max-w-3xl mx-auto">
            Our Specialized{' '}
            <span style={{ background: 'linear-gradient(135deg, #005e9a, #0077c2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Ophthalmology
            </span>{' '}
            Services
          </h1>
          <p className="text-on-surface-variant text-lg max-w-2xl mx-auto leading-relaxed">
            At Dr. Rama's Eye Clinic, we merge cutting-edge diagnostic technology with a compassionate
            touch to ensure your vision remains crystal clear at every stage of life.
          </p>
        </SectionReveal>
      </section>

      {/* ── Bento Grid ── */}
      <section className="max-w-clinic mx-auto px-6 md:px-16 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {SERVICES_BENTO.map((svc, i) => (
            <ServiceCard key={svc.id} svc={svc} delay={i * 0.07} />
          ))}
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="py-20 px-6 md:px-16 bg-surface-container-low border-t border-outline-variant/20">
        <div className="max-w-clinic mx-auto">
          <SectionReveal className="text-center mb-16">
            <h2 className="text-3xl font-black text-on-surface mb-4">Why Choose Dr. Rama's?</h2>
            <p className="text-on-surface-variant max-w-xl mx-auto">
              Every service is backed by decades of experience and the most advanced diagnostic tools available.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: 'biotech', title: 'Advanced Diagnostics', desc: 'AI-driven screening and high-resolution retinal imaging for accurate detection.' },
              { icon: 'medical_mask', title: 'Micro-Invasive Surgery', desc: 'Specialists in blade-free LASIK and ultra-precise cataract procedures with rapid recovery.', highlight: true },
              { icon: 'volunteer_activism', title: 'Personalized Therapy', desc: 'Every patient receives a custom vision recovery plan from pediatric to geriatric care.' },
            ].map((card) => (
              <motion.div
                key={card.title}
                className={`p-10 rounded-3xl flex flex-col items-center text-center ${
                  card.highlight
                    ? 'bg-primary-DEFAULT text-white shadow-2xl'
                    : 'bg-white border border-outline-variant/20 shadow-sm'
                }`}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-8 ${card.highlight ? 'bg-white/10 text-white' : 'bg-primary-DEFAULT/5 text-primary-DEFAULT'}`}>
                  <span className="material-symbols-outlined text-4xl">{card.icon}</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                <p className={`text-sm leading-relaxed ${card.highlight ? 'text-white/80' : 'text-on-surface-variant'}`}>{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-6 md:px-16">
        <div className="max-w-clinic mx-auto">
          <SectionReveal>
            <div className="bg-primary-DEFAULT text-white rounded-2xl p-12 text-center relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <span className="material-symbols-outlined" style={{ fontSize: 160 }}>visibility</span>
              </div>
              <div className="relative z-10">
                <h2 className="text-3xl font-black mb-4">Ready for a Clearer Tomorrow?</h2>
                <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                  Schedule your comprehensive examination with Dr. Rama today and join thousands of satisfied patients.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link to="/contact">
                    <motion.button
                      className="bg-secondary-container text-on-secondary-container px-8 py-4 rounded-xl font-bold shadow-lg text-base"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                    >
                      Book Your Appointment
                    </motion.button>
                  </Link>
                  <motion.button
                    className="bg-white/10 backdrop-blur-sm border border-white/20 px-8 py-4 rounded-xl font-bold text-base hover:bg-white/20 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                  >
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