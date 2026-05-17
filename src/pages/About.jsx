import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { IMAGES } from '../assets/images';

const CREDENTIALS = [
  { icon: 'verified', label: 'AIOS Member' },
  { icon: 'account_balance', label: 'KOS Senior Fellow' },
  { icon: 'health_and_safety', label: 'V-R Specialist' },
  { icon: 'workspace_premium', label: 'ISO Certified' },
  { icon: 'groups', label: 'IIRSI Executive' },
];

const EXPERTISE = [
  {
    title: 'Micro-Incision Cataract (MICS)',
    desc: 'Sub-2mm sutureless procedures with rapid visual recovery.',
  },
  {
    title: 'Blade-Free LASIK & SMILE',
    desc: 'Advanced refractive solutions tailored for high-performance lifestyles.',
  },
  {
    title: 'Precision Glaucoma Therapy',
    desc: 'AI-integrated early detection and customized management.',
  },
];

const TIMELINE = [
  {
    year: '2008',
    title: 'The Founding Vision',
    desc: 'Dr. Rama establishes the clinic with a mission to merge world-class technology with community-focused care, setting a new standard in the medical district.',
    color: 'secondary-container',
  },
  {
    year: '2015',
    title: 'The Clinical Benchmark',
    desc: 'Achieved the milestone of 10,000+ successful micro-incision surgeries, solidifying her reputation as a master surgeon in vitreo-retinal care.',
    color: 'primary-DEFAULT',
  },
  {
    year: '2019',
    title: 'Technological Revolution',
    desc: 'Inaugurated the first AI-driven diagnostic imaging suite in the region, allowing for predictive analysis of retinal health with unmatched precision.',
    color: 'secondary-container',
  },
  {
    year: '2023',
    title: 'National Recognition',
    desc: 'Honored with the National Award for Excellence in Community Outreach and Patient Safety, recognizing commitment to inclusive care.',
    color: 'primary-DEFAULT',
  },
];

function SectionReveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <div className="pt-20 bg-background overflow-x-hidden">

      {/* ── Hero ── */}
      <section className="relative py-24 px-6 md:px-16 bg-surface-container-low overflow-hidden">
        {/* blurred orbs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-secondary-container/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary-DEFAULT/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-clinic mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          {/* Text */}
          <SectionReveal className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white border border-outline-variant shadow-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-secondary-DEFAULT animate-pulse" />
              <span className="text-on-surface-variant text-xs font-bold uppercase tracking-[0.2em]">
                Leadership &amp; Expertise
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-on-surface leading-tight mb-6">
              Dr. Rama Krishnan:{' '}
              <span
                className="block"
                style={{
                  background: 'linear-gradient(135deg, #9f4200, #b4151d)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                The Visionary Behind the Care.
              </span>
            </h1>

            <p className="text-on-surface-variant text-lg leading-relaxed mb-8 max-w-xl">
              Leading the clinic with a philosophy where precision meets compassion, Dr. Rama is
              dedicated to restoring quality of life through high-definition eye care solutions.
            </p>

            <div className="relative pl-8 border-l-4 border-secondary-DEFAULT italic text-xl text-on-surface-variant bg-surface/60 py-4 pr-4 rounded-r-xl mb-10">
              "True clinical excellence is found where advanced technology meets deep human compassion."
            </div>

            <div className="flex flex-wrap gap-4">
              <motion.button
                className="bg-primary-DEFAULT text-white px-10 py-4 rounded-full font-bold shadow-lg text-base"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                Consult with Dr. Rama
              </motion.button>
              <motion.button
                className="flex items-center gap-2 text-primary-DEFAULT font-bold py-4 px-6 rounded-full hover:bg-primary-DEFAULT/5 transition-all text-base"
                whileHover={{ x: 4 }}
              >
                Explore Methodology{' '}
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </motion.button>
            </div>
          </SectionReveal>

          {/* Image */}
          <SectionReveal delay={0.15} className="relative order-1 lg:order-2 group">
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl border-[10px] border-white ring-1 ring-outline-variant/10 relative z-10">
              <img
                src={IMAGES.drRamaProfile}
                alt="Dr. Rama Krishnan"
                className="w-full h-full object-cover grayscale-[0.15] group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
            {/* Stats card */}
            <motion.div
              className="absolute -bottom-8 -right-4 bg-white rounded-3xl p-8 shadow-2xl border border-outline-variant/10 text-center z-20 hidden md:block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
            >
              <p className="text-4xl font-black text-primary-DEFAULT">10k+</p>
              <p className="text-xs font-bold text-on-surface-variant uppercase tracking-[0.2em] mt-1">
                Eyes Transformed
              </p>
            </motion.div>
          </SectionReveal>
        </div>
      </section>

      {/* ── Narrative + Expertise ── */}
      <section className="py-24 px-6 md:px-16 bg-white">
        <div className="max-w-clinic mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left: Bio */}
          <SectionReveal className="lg:col-span-7">
            <h2 className="text-3xl font-black text-primary-DEFAULT mb-2">The Pursuit of Perfection</h2>
            <p className="text-secondary-DEFAULT font-bold uppercase tracking-widest text-xs mb-8">
              MBBS, MS, Fellowship in Vitreo-Retinal Surgery
            </p>
            <div className="space-y-6 text-on-surface-variant text-lg leading-relaxed">
              <p>
                With over{' '}
                <span className="text-on-surface font-semibold">15 years</span> of dedicated
                experience in advanced ophthalmology,{' '}
                <span className="text-on-surface font-semibold">Dr. Rama Krishnan</span> has become a
                beacon of hope for thousands. Her journey began at the prestigious National Institute
                of Ophthalmology, followed by intensive training in complex vitreo-retinal surgeries.
              </p>
              <p>
                Dr. Rama's approach combines surgical precision with a warm, patient-first philosophy.
                She believes that every patient deserves high-definition clarity and personalized care
                that respects their unique lifestyle and needs.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-8 mt-8 border-t border-outline-variant/30">
              {[
                { value: '15+', label: 'Years of Expertise', color: 'text-primary-DEFAULT' },
                { value: '10k+', label: 'Eyes Transformed', color: 'text-secondary-DEFAULT' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className={`text-5xl font-black mb-1 ${stat.color}`}>{stat.value}</div>
                  <div className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </SectionReveal>

          {/* Right: Expertise sticky card */}
          <SectionReveal delay={0.1} className="lg:col-span-5">
            <div className="bg-surface-container-low rounded-3xl p-10 border border-outline-variant/40 shadow-sm sticky top-28">
              <h3 className="text-xl font-bold text-on-surface mb-8 flex items-center gap-3">
                <span className="material-symbols-outlined text-secondary-DEFAULT text-3xl">star_half</span>
                Expertise Highlights
              </h3>
              <ul className="space-y-4">
                {EXPERTISE.map((item) => (
                  <motion.li
                    key={item.title}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-white hover:shadow-md transition-all group cursor-default"
                    whileHover={{ x: 4 }}
                  >
                    <span className="material-symbols-outlined text-primary-DEFAULT mt-1 group-hover:scale-110 transition-transform">
                      check_circle
                    </span>
                    <div>
                      <h4 className="font-bold text-on-surface text-sm">{item.title}</h4>
                      <p className="text-on-surface-variant text-sm mt-0.5">{item.desc}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── Signature Services ── */}
      <section className="py-24 px-6 md:px-16 text-white overflow-hidden" style={{ background: '#001d35' }}>
        <div className="max-w-clinic mx-auto">
          <SectionReveal>
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="max-w-2xl">
                <span className="text-secondary-fixed text-xs font-bold uppercase tracking-[0.2em] mb-4 block">
                  Signature Services
                </span>
                <h2 className="text-4xl md:text-5xl font-black leading-tight">
                  Advanced Solutions for{' '}
                  <span className="text-primary-fixed">Exceptional Clarity.</span>
                </h2>
              </div>
              <p className="text-lg opacity-60 border-l border-white/20 pl-6 max-w-sm">
                Specializing in procedures that redefine what's possible in modern eye care.
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                img: IMAGES.micsStandard,
                title: 'The MICS Standard',
                desc: 'Our Micro-Incision Cataract Surgery represents the pinnacle of patient safety and visual outcome, utilizing Dr. Rama\'s proprietary refined techniques.',
                link: 'Learn about MICS',
              },
              {
                img: IMAGES.hdVision,
                title: 'Elite Refractive Suite',
                desc: 'Combining Contoura Vision and SMILE technology to deliver results that often exceed 20/20 vision standards.',
                link: 'Explore LASIK Suite',
              },
            ].map((card, i) => (
              <SectionReveal key={card.title} delay={i * 0.1}>
                <div className="relative rounded-3xl overflow-hidden group h-[420px] cursor-pointer">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001d35] via-[#001d35]/20 to-transparent p-10 flex flex-col justify-end">
                    <h3 className="text-2xl font-bold mb-3">{card.title}</h3>
                    <p className="text-white/75 text-base mb-6 max-w-md">{card.desc}</p>
                    <motion.a
                      href="#"
                      className="inline-flex items-center gap-3 text-secondary-fixed font-bold"
                      whileHover={{ x: 6 }}
                    >
                      {card.link}{' '}
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </motion.a>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Credentials ── */}
      <section className="py-16 px-6 md:px-16 bg-surface-container-low border-y border-outline-variant/30">
        <div className="max-w-clinic mx-auto">
          <SectionReveal>
            <h3 className="text-center font-bold text-on-surface-variant text-xs uppercase tracking-[0.2em] mb-12">
              Elite Credentials &amp; Global Memberships
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {CREDENTIALS.map((cred, i) => (
                <motion.div
                  key={cred.label}
                  className="bg-white rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-sm border border-outline-variant/20 hover:border-secondary-DEFAULT hover:shadow-md transition-all cursor-default"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.5 }}
                  whileHover={{ y: -4 }}
                >
                  <span className="material-symbols-outlined text-4xl text-primary-DEFAULT mb-3">
                    {cred.icon}
                  </span>
                  <span className="font-bold text-on-surface text-sm">{cred.label}</span>
                </motion.div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── Values Grid ── */}
      <section className="py-24 px-6 md:px-16 bg-white">
        <div className="max-w-clinic mx-auto">
          <SectionReveal className="text-center mb-16">
            <span className="text-secondary-DEFAULT font-bold uppercase tracking-[0.2em] text-xs mb-4 block">
              The Foundation
            </span>
            <h2 className="text-3xl font-black text-on-surface">Values &amp; Philosophy</h2>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Large blue card */}
            <SectionReveal className="md:col-span-8">
              <div className="bg-primary-DEFAULT text-white rounded-[2.5rem] p-12 flex flex-col justify-end relative overflow-hidden group shadow-2xl h-full min-h-[280px]">
                <div className="absolute top-8 right-8 opacity-5 scale-150 group-hover:scale-125 transition-transform duration-[2s]">
                  <span className="material-symbols-outlined" style={{ fontSize: 220 }}>biotech</span>
                </div>
                <div className="relative z-10">
                  <span className="material-symbols-outlined text-5xl mb-4 block">precision_manufacturing</span>
                  <h3 className="text-2xl font-bold mb-4">Precision Technology</h3>
                  <p className="text-white/80 text-base leading-relaxed max-w-xl">
                    We utilize the latest AI-driven diagnostic tools and HD imaging to provide a level of
                    accuracy that ensures every surgical outcome is optimized for your specific optical profile.
                  </p>
                </div>
              </div>
            </SectionReveal>

            {/* Secondary orange */}
            <SectionReveal delay={0.1} className="md:col-span-4">
              <div
                className="rounded-[2.5rem] p-10 flex flex-col justify-between shadow-xl h-full min-h-[280px]"
                style={{ background: '#fe8949', color: '#6a2a00' }}
              >
                <span className="material-symbols-outlined text-5xl">volunteer_activism</span>
                <div>
                  <h3 className="text-xl font-bold mb-2">Human Warmth</h3>
                  <p className="text-sm leading-relaxed opacity-90">
                    Empathy is as important as expertise. We care for the person behind the eyes.
                  </p>
                </div>
              </div>
            </SectionReveal>

            {/* Tertiary red */}
            <SectionReveal delay={0.15} className="md:col-span-4">
              <div
                className="rounded-[2.5rem] p-10 flex flex-col justify-between shadow-xl h-full min-h-[240px]"
                style={{ background: '#b4151d', color: '#fff' }}
              >
                <span className="material-symbols-outlined text-5xl">psychology</span>
                <div>
                  <h3 className="text-xl font-bold mb-2">Clinical Ethics</h3>
                  <p className="text-sm leading-relaxed opacity-90">
                    A rigid commitment to transparency and the highest medical ethics.
                  </p>
                </div>
              </div>
            </SectionReveal>

            {/* Lifelong partnership */}
            <SectionReveal delay={0.2} className="md:col-span-8">
              <div className="bg-surface-container rounded-[2.5rem] p-10 border border-outline-variant/30 flex flex-col md:flex-row items-center gap-10 group h-full min-h-[240px]">
                <motion.div
                  className="w-24 h-24 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-lg border-2 border-secondary-DEFAULT/20"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 1.5 }}
                >
                  <span className="material-symbols-outlined text-5xl text-secondary-DEFAULT">visibility</span>
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-on-surface mb-2">Lifelong Vision Partnership</h3>
                  <p className="text-on-surface-variant text-base leading-relaxed">
                    Our journey with you doesn't end with a prescription. We provide continuous support
                    and monitoring to ensure your vision remains crystal clear for a lifetime.
                  </p>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-24 px-6 md:px-16 bg-surface-container-low">
        <div className="max-w-clinic mx-auto">
          <SectionReveal>
            <h2 className="text-3xl font-black text-center text-on-surface mb-24">A Legacy of Excellence</h2>
          </SectionReveal>

          <div className="relative max-w-3xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-outline-variant/40 hidden md:block" />

            <div className="space-y-20">
              {TIMELINE.map((item, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <SectionReveal key={item.year} delay={i * 0.1}>
                    <div className={`flex flex-col md:flex-row items-center gap-10 ${isLeft ? '' : 'md:flex-row-reverse'}`}>
                      {/* Card */}
                      <div className="flex-1">
                        <motion.div
                          className="bg-white p-8 rounded-2xl shadow-sm border border-outline-variant/20 hover:shadow-xl transition-all duration-500"
                          whileHover={{ y: -4 }}
                        >
                          <h4 className="text-4xl font-black text-primary-DEFAULT mb-3">{item.year}</h4>
                          <h5 className="font-bold text-on-surface mb-2">{item.title}</h5>
                          <p className="text-on-surface-variant text-sm leading-relaxed">{item.desc}</p>
                        </motion.div>
                      </div>

                      {/* Dot */}
                      <motion.div
                        className="w-12 h-12 bg-white rounded-full border-4 border-secondary-container shadow-lg z-10 flex-shrink-0 flex items-center justify-center"
                        whileHover={{ scale: 1.2 }}
                      >
                        <div className="w-3 h-3 bg-secondary-container rounded-full" />
                      </motion.div>

                      {/* Spacer */}
                      <div className="flex-1 hidden md:block" />
                    </div>
                  </SectionReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 md:px-16">
        <SectionReveal>
          <div className="max-w-clinic mx-auto bg-primary-DEFAULT text-white rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <div className="absolute top-0 right-0 w-80 h-80 bg-white rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px]" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary-container rounded-full translate-y-1/2 -translate-x-1/2 blur-[100px]" />
            </div>
            <div className="relative z-10">
              <h2 className="text-4xl font-black mb-6">Begin Your Journey to Clarity</h2>
              <p className="text-lg opacity-90 mb-10 max-w-xl mx-auto leading-relaxed">
                Experience the expertise of Dr. Rama and her world-class team. Your vision deserves
                nothing less than the best.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <motion.button
                  className="bg-secondary-container text-on-secondary-container px-10 py-4 rounded-full font-bold text-base shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                >
                  Book Your Consultation
                </motion.button>
                <motion.button
                  className="bg-white/10 backdrop-blur-md border border-white/20 px-10 py-4 rounded-full font-bold text-base flex items-center gap-2 justify-center hover:bg-white/20 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <span className="material-symbols-outlined">call</span> Call Our Clinic
                </motion.button>
              </div>
            </div>
          </div>
        </SectionReveal>
      </section>
    </div>
  );
}