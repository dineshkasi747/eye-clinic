import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import CountUp from '../components/CountUp';
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

function StarRow({ count = 5, size = 'text-xl', color = 'text-secondary-container' }) {
  return (
    <div className={`flex gap-0.5 ${color}`}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.span
          key={i}
          className="material-symbols-outlined"
          style={{ fontVariationSettings: "'FILL' 1", fontSize: size === 'text-xl' ? 22 : 18 }}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.07, type: 'spring', stiffness: 300 }}
        >
          star
        </motion.span>
      ))}
    </div>
  );
}

const SMALL_REVIEWS = [
  {
    initials: 'RM',
    name: 'Robert Miller',
    bg: 'bg-primary-fixed',
    text: 'Dealing with cataracts was scary, but the team here made me feel so comfortable. Dr. Rama explained everything so clearly.',
    bg2: 'bg-blue-100',
  },
  {
    initials: 'EK',
    name: 'Elena Kasich',
    bg: 'bg-secondary-fixed',
    text: 'As a professional photographer, my eyes are my life. Dr. Rama is the only surgeon I trusted with my procedure. Flawless results.',
    bg2: 'bg-orange-100',
  },
  {
    initials: 'DW',
    name: 'David Wu',
    bg: 'bg-tertiary-fixed',
    text: 'The post-op care is what really sets them apart. I felt supported through every single step of my recovery process.',
    bg2: 'bg-red-100',
  },
];

const VIDEO_CARDS = [
  { img: IMAGES.videoThumb1, title: 'Recovering My Passion', sub: 'Mark, Pilot' },
  { img: IMAGES.videoThumb2, title: 'Freedom from Glasses', sub: 'Jessica, Student' },
  { img: IMAGES.videoThumb3, title: 'Advanced Diabetic Care', sub: 'Thomas, Retiree' },
];

export default function Reviews() {
  return (
    <div className="pt-20 bg-background overflow-x-hidden">

      {/* ── Hero ── */}
      <section
        className="py-20 px-6 md:px-16 border-b border-outline-variant/20"
        style={{
          backgroundColor: '#fcf9f8',
          backgroundImage: 'radial-gradient(#005e9a10 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      >
        <div className="max-w-clinic mx-auto text-center">
          <SectionReveal>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-DEFAULT/10 text-primary-DEFAULT font-bold text-xs uppercase tracking-wider mb-6">
              Patient Testimonials
            </span>
            <h1 className="text-4xl md:text-5xl font-black mb-6 text-on-background">
              Your Vision is Our{' '}
              <span className="text-primary-DEFAULT">Masterpiece</span>
            </h1>
            <p className="text-on-surface-variant text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              With over 15,000 successful procedures, Dr. Rama and the Lumina team are dedicated to
              providing life-changing clarity to every patient.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <div className="flex flex-wrap justify-center gap-8 items-center">
              <div className="flex items-center gap-3">
                <StarRow count={5} color="text-secondary-container" />
                <span className="text-2xl font-black text-on-background">
                  <CountUp to={4.9} decimals={1} />
                  /5
                </span>
                <span className="text-outline text-sm">Google Rating</span>
              </div>
              <div className="h-8 w-px bg-outline-variant hidden md:block" />
              <div className="text-on-background text-center">
                <span className="text-2xl font-black block">
                  <CountUp to={2500} suffix="+" />
                </span>
                <span className="text-outline text-sm">Verified Reviews</span>
              </div>
              <div className="h-8 w-px bg-outline-variant hidden md:block" />
              <div className="text-on-background text-center">
                <span className="text-2xl font-black block">
                  <CountUp to={99.8} decimals={1} suffix="%" />
                </span>
                <span className="text-outline text-sm">Success Rate</span>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── Bento Reviews ── */}
      <section className="py-24 px-6 md:px-16">
        <div className="max-w-clinic mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

            {/* Featured large review */}
            <SectionReveal className="md:col-span-8">
              <div className="bg-white p-10 rounded-2xl border border-outline-variant/30 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300 h-full">
                <div>
                  <StarRow count={5} color="text-secondary-container" />
                  <motion.h3
                    className="text-xl font-bold text-on-background mt-6 mb-4 italic leading-relaxed"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    "The precision and care I received at Lumina Vision were beyond anything I expected.
                    After years of struggling with my eyesight, Dr. Rama restored my vision to 20/20.
                    It's like seeing the world in high-definition for the first time."
                  </motion.h3>
                </div>
                <div className="flex items-center gap-4 mt-8 pt-8 border-t border-outline-variant/20">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-surface-container-low flex-shrink-0">
                    <img src={IMAGES.reviewPatient1} alt="Sarah Jenkins" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-bold text-on-background text-lg">Sarah Jenkins</p>
                    <p className="text-outline text-sm">LASIK Patient, 2023</p>
                  </div>
                </div>
              </div>
            </SectionReveal>

            {/* Stats column */}
            <SectionReveal delay={0.1} className="md:col-span-4 space-y-4 flex flex-col">
              <div className="bg-primary-DEFAULT p-8 rounded-2xl text-white flex-1">
                <span className="material-symbols-outlined text-4xl mb-4 block" style={{ fontVariationSettings: "'FILL' 1" }}>
                  verified
                </span>
                <h4 className="text-xl font-bold mb-2">Patient Safety</h4>
                <p className="text-white/80 text-sm leading-relaxed">
                  99.8% procedure success rate across all vision correction surgeries performed.
                </p>
              </div>
              <div className="bg-secondary-DEFAULT p-8 rounded-2xl text-white flex-1">
                <span className="material-symbols-outlined text-4xl mb-4 block" style={{ fontVariationSettings: "'FILL' 1" }}>
                  medical_services
                </span>
                <h4 className="text-xl font-bold mb-2">Modern Tech</h4>
                <p className="text-white/80 text-sm leading-relaxed">
                  Utilizing the latest Zeiss visumax 800 for precision SMILE pro surgeries.
                </p>
              </div>
            </SectionReveal>

            {/* Small review cards */}
            {SMALL_REVIEWS.map((r, i) => (
              <SectionReveal key={r.name} delay={i * 0.08} className="md:col-span-4">
                <motion.div
                  className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/20 hover:border-primary-DEFAULT/30 transition-all h-full"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <StarRow count={5} size="text-sm" color="text-secondary-container" />
                  <p className="text-on-surface-variant mt-4 mb-6 text-sm leading-relaxed">"{r.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${r.bg2} flex items-center justify-center text-primary-DEFAULT font-bold text-sm`}>
                      {r.initials}
                    </div>
                    <span className="font-bold text-on-background text-sm">{r.name}</span>
                  </div>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Video Stories ── */}
      <section className="bg-surface py-24 px-6 md:px-16">
        <div className="max-w-clinic mx-auto">
          <SectionReveal>
            <div className="flex justify-between items-end mb-12 gap-6">
              <div className="max-w-xl">
                <h2 className="text-3xl font-black text-on-background mb-3">Real Stories, Real Life</h2>
                <p className="text-on-surface-variant text-lg">
                  Watch our patients share their journeys from blurry vision to crystal-clear clarity.
                </p>
              </div>
              <motion.button
                className="hidden md:flex items-center gap-2 text-primary-DEFAULT font-bold hover:underline"
                whileHover={{ x: 3 }}
              >
                View All Stories{' '}
                <span className="material-symbols-outlined">arrow_forward</span>
              </motion.button>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VIDEO_CARDS.map((v, i) => (
              <SectionReveal key={v.title} delay={i * 0.1}>
                <div className="group relative aspect-video rounded-2xl overflow-hidden cursor-pointer">
                  <img
                    src={v.img}
                    alt={v.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/20 transition-all">
                    <motion.div
                      className="w-16 h-16 rounded-full bg-primary-DEFAULT/90 text-white flex items-center justify-center shadow-lg"
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <span
                        className="material-symbols-outlined text-4xl"
                        style={{ fontVariationSettings: "'FILL' 1", fontSize: 36 }}
                      >
                        play_arrow
                      </span>
                    </motion.div>
                  </div>
                  <div className="absolute bottom-0 w-full p-5 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-white font-bold text-lg">{v.title}</p>
                    <p className="text-white/70 text-sm">{v.sub}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust Badges ── */}
      <section className="py-16 px-6 md:px-16 bg-surface-container-low border-t border-outline-variant/20">
        <div className="max-w-clinic mx-auto">
          <SectionReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { value: 15000, suffix: '+', label: 'Procedures', color: 'text-primary-DEFAULT' },
                { value: 4.9, decimals: 1, suffix: '/5', label: 'Google Rating', color: 'text-secondary-container' },
                { value: 2500, suffix: '+', label: 'Verified Reviews', color: 'text-primary-DEFAULT' },
                { value: 99.8, decimals: 1, suffix: '%', label: 'Success Rate', color: 'text-secondary-DEFAULT' },
              ].map((stat) => (
                <div key={stat.label} className="bg-white rounded-2xl p-8 shadow-sm border border-outline-variant/20">
                  <div className={`text-4xl font-black mb-2 ${stat.color}`}>
                    <CountUp to={stat.value} decimals={stat.decimals || 0} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 md:px-16 text-center">
        <SectionReveal>
          <div className="max-w-3xl mx-auto bg-surface-container-low rounded-3xl p-12 border border-outline-variant/30">
            <h2 className="text-3xl font-black text-on-background mb-4">Ready for your own success story?</h2>
            <p className="text-on-surface-variant text-lg mb-10 leading-relaxed">
              Join thousands of patients who have trusted their vision to Dr. Rama's Eye Clinic.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <motion.button
                  className="bg-primary-DEFAULT text-white px-10 py-4 rounded-2xl font-bold shadow-md text-base"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  Book Your Free Consultation
                </motion.button>
              </Link>
              <Link to="/services">
                <motion.button
                  className="border-2 border-primary-DEFAULT text-primary-DEFAULT px-10 py-4 rounded-2xl font-bold text-base hover:bg-primary-DEFAULT/5 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                >
                  Compare Procedures
                </motion.button>
              </Link>
            </div>
          </div>
        </SectionReveal>
      </section>
    </div>
  );
}