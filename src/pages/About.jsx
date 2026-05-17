import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { IMAGES } from '../assets/images';

const C = {
  primary:    '#004674',
  orange:     '#fe8949',
  red:        '#b4151d',
  navy:       '#001d35',
  surface:    '#f0edec',
  surfaceLow: '#f6f3f2',
  white:      '#ffffff',
  onSurface:  '#1c1b1b',
  outline:    '#717881',
  outlineVar: '#c1c7d1',
};

const CREDENTIALS = [
  { icon: 'verified',          label: 'AIOS Member' },
  { icon: 'account_balance',   label: 'KOS Senior Fellow' },
  { icon: 'health_and_safety', label: 'V-R Specialist' },
  { icon: 'workspace_premium', label: 'ISO Certified' },
  { icon: 'groups',            label: 'IIRSI Executive' },
];

const EXPERTISE = [
  { title: 'Micro-Incision Cataract (MICS)', desc: 'Sub-2mm sutureless procedures with rapid visual recovery.' },
  { title: 'Blade-Free LASIK & SMILE',       desc: 'Advanced refractive solutions tailored for high-performance lifestyles.' },
  { title: 'Precision Glaucoma Therapy',      desc: 'AI-integrated early detection and customized management.' },
];

const TIMELINE = [
  { year: '2008', title: 'The Founding Vision',       desc: 'Dr. Rama establishes the clinic with a mission to merge world-class technology with community-focused care, setting a new standard in the medical district.', accent: C.orange },
  { year: '2015', title: 'The Clinical Benchmark',    desc: 'Achieved the milestone of 10,000+ successful micro-incision surgeries, solidifying her reputation as a master surgeon in vitreo-retinal care.',          accent: C.primary },
  { year: '2019', title: 'Technological Revolution',  desc: 'Inaugurated the first AI-driven diagnostic imaging suite in the region, allowing for predictive analysis of retinal health with unmatched precision.',    accent: C.orange },
  { year: '2023', title: 'National Recognition',      desc: 'Honored with the National Award for Excellence in Community Outreach and Patient Safety, recognizing commitment to inclusive care.',                     accent: C.primary },
];

function SectionReveal({ children, delay = 0, className = '', style = {} }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className} style={style}>
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <div style={{ paddingTop: 80, background: '#fdf8f8', overflowX: 'hidden' }}>

      {/* ── Hero ── */}
      <section style={{ position: 'relative', padding: '96px 64px', background: C.surfaceLow, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -96, right: -96, width: 384, height: 384, background: `${C.orange}22`, borderRadius: '50%', filter: 'blur(120px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -96, left: -96, width: 256, height: 256, background: `${C.primary}18`, borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center', position: 'relative', zIndex: 1 }}>
          {/* Text */}
          <SectionReveal>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '8px 16px', borderRadius: 999, background: C.white, border: `1px solid ${C.outlineVar}`, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: 32 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: C.orange, animation: 'pulse 2s infinite' }} />
              <span style={{ color: C.outline, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em' }}>Leadership &amp; Expertise</span>
            </div>
            <h1 style={{ fontSize: 48, fontWeight: 900, color: C.onSurface, lineHeight: 1.1, marginBottom: 24 }}>
              Dr. Rama Krishnan:{' '}
              <span style={{ display: 'block', background: `linear-gradient(135deg, ${C.orange}, ${C.red})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                The Visionary Behind the Care.
              </span>
            </h1>
            <p style={{ color: C.outline, fontSize: 18, lineHeight: 1.7, marginBottom: 32, maxWidth: 540 }}>
              Leading the clinic with a philosophy where precision meets compassion, Dr. Rama is
              dedicated to restoring quality of life through high-definition eye care solutions.
            </p>
            <div style={{ position: 'relative', paddingLeft: 24, borderLeft: `4px solid ${C.orange}`, fontStyle: 'italic', fontSize: 20, color: C.outline, background: 'rgba(255,255,255,0.6)', padding: '16px 16px 16px 24px', borderRadius: '0 12px 12px 0', marginBottom: 40 }}>
              "True clinical excellence is found where advanced technology meets deep human compassion."
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
              <motion.button style={{ background: C.primary, color: C.white, padding: '16px 40px', borderRadius: 999, fontWeight: 700, fontSize: 16, border: 'none', cursor: 'pointer', boxShadow: '0 8px 28px rgba(0,70,116,0.28)' }}
                whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}>
                Consult with Dr. Rama
              </motion.button>
              <motion.button style={{ display: 'flex', alignItems: 'center', gap: 8, color: C.primary, fontWeight: 700, padding: '16px 24px', borderRadius: 999, background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 16 }}
                whileHover={{ x: 4 }}>
                Explore Methodology <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
              </motion.button>
            </div>
          </SectionReveal>

          {/* Image */}
          <SectionReveal delay={0.15} style={{ position: 'relative' }}>
            <div style={{ aspectRatio: '4/5', borderRadius: 32, overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.18)', border: '10px solid white', position: 'relative', zIndex: 1 }}>
              <img src={IMAGES.drRamaProfile} alt="Dr. Rama Krishnan" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <motion.div style={{ position: 'absolute', bottom: -32, right: -16, background: C.white, borderRadius: 24, padding: 32, boxShadow: '0 16px 48px rgba(0,0,0,0.14)', textAlign: 'center', zIndex: 2 }}
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}>
              <p style={{ fontSize: 40, fontWeight: 900, color: C.primary }}>10k+</p>
              <p style={{ fontSize: 11, fontWeight: 700, color: C.outline, textTransform: 'uppercase', letterSpacing: '0.2em', marginTop: 4 }}>Eyes Transformed</p>
            </motion.div>
          </SectionReveal>
        </div>
      </section>

      {/* ── Narrative + Expertise ── */}
      <section style={{ padding: '96px 64px', background: C.white }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '7fr 5fr', gap: 64 }}>
          <SectionReveal>
            <h2 style={{ fontSize: 32, fontWeight: 900, color: C.primary, marginBottom: 8 }}>The Pursuit of Perfection</h2>
            <p style={{ color: C.orange, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: 11, marginBottom: 32 }}>MBBS, MS, Fellowship in Vitreo-Retinal Surgery</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, color: C.outline, fontSize: 18, lineHeight: 1.7 }}>
              <p>With over <span style={{ color: C.onSurface, fontWeight: 600 }}>15 years</span> of dedicated experience in advanced ophthalmology, <span style={{ color: C.onSurface, fontWeight: 600 }}>Dr. Rama Krishnan</span> has become a beacon of hope for thousands. Her journey began at the prestigious National Institute of Ophthalmology, followed by intensive training in complex vitreo-retinal surgeries.</p>
              <p>Dr. Rama's approach combines surgical precision with a warm, patient-first philosophy. She believes that every patient deserves high-definition clarity and personalized care that respects their unique lifestyle and needs.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, paddingTop: 32, marginTop: 32, borderTop: `1px solid ${C.outlineVar}` }}>
              {[
                { value: '15+', label: 'Years of Expertise', color: C.primary },
                { value: '10k+', label: 'Eyes Transformed',   color: C.orange },
              ].map((s) => (
                <div key={s.label}>
                  <div style={{ fontSize: 48, fontWeight: 900, color: s.color, marginBottom: 4 }}>{s.value}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: C.outline }}>{s.label}</div>
                </div>
              ))}
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <div style={{ background: C.surfaceLow, borderRadius: 24, padding: 40, border: `1px solid ${C.outlineVar}`, position: 'sticky', top: 112 }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: C.onSurface, marginBottom: 32, display: 'flex', alignItems: 'center', gap: 12 }}>
                <span className="material-symbols-outlined" style={{ color: C.orange, fontSize: 28 }}>star_half</span>
                Expertise Highlights
              </h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {EXPERTISE.map((item) => (
                  <motion.li key={item.title} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, padding: 16, borderRadius: 12, listStyle: 'none', cursor: 'default', transition: 'all 0.2s' }}
                    whileHover={{ x: 4, background: C.white, boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
                    <span className="material-symbols-outlined" style={{ color: C.primary, marginTop: 2, fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    <div>
                      <h4 style={{ fontWeight: 700, color: C.onSurface, fontSize: 14 }}>{item.title}</h4>
                      <p style={{ color: C.outline, fontSize: 14, marginTop: 2 }}>{item.desc}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── Signature Services ── */}
      <section style={{ padding: '96px 64px', background: C.navy, color: C.white, overflow: 'hidden' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <SectionReveal>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 64, gap: 24 }}>
              <div style={{ maxWidth: 640 }}>
                <span style={{ color: C.orange, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', display: 'block', marginBottom: 16 }}>Signature Services</span>
                <h2 style={{ fontSize: 48, fontWeight: 900, lineHeight: 1.1 }}>
                  Advanced Solutions for{' '}
                  <span style={{ color: C.orange }}>Exceptional Clarity.</span>
                </h2>
              </div>
              <p style={{ fontSize: 18, opacity: 0.6, borderLeft: '1px solid rgba(255,255,255,0.2)', paddingLeft: 24, maxWidth: 320 }}>
                Specializing in procedures that redefine what's possible in modern eye care.
              </p>
            </div>
          </SectionReveal>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            {[
              { img: IMAGES.micsStandard, title: 'The MICS Standard',     desc: "Our Micro-Incision Cataract Surgery represents the pinnacle of patient safety and visual outcome, utilizing Dr. Rama's proprietary refined techniques.", link: 'Learn about MICS' },
              { img: IMAGES.hdVision,    title: 'Elite Refractive Suite', desc: 'Combining Contoura Vision and SMILE technology to deliver results that often exceed 20/20 vision standards.',                                            link: 'Explore LASIK Suite' },
            ].map((card, i) => (
              <SectionReveal key={card.title} delay={i * 0.1}>
                <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', height: 420, cursor: 'pointer' }}
                  onMouseEnter={e => e.currentTarget.querySelector('img').style.transform = 'scale(1.05)'}
                  onMouseLeave={e => e.currentTarget.querySelector('img').style.transform = 'scale(1)'}>
                  <img src={card.img} alt={card.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6, transition: 'transform 1s' }} />
                  <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${C.navy}, ${C.navy}30, transparent)`, padding: 40, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                    <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>{card.title}</h3>
                    <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 16, marginBottom: 24, maxWidth: 420 }}>{card.desc}</p>
                    <motion.a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, color: C.orange, fontWeight: 700, textDecoration: 'none' }} whileHover={{ x: 6 }}>
                      {card.link} <span className="material-symbols-outlined" style={{ fontSize: 14 }}>arrow_forward</span>
                    </motion.a>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Credentials ── */}
      <section style={{ padding: '64px 64px', background: C.surfaceLow, borderTop: `1px solid ${C.outlineVar}`, borderBottom: `1px solid ${C.outlineVar}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <SectionReveal>
            <h3 style={{ textAlign: 'center', fontWeight: 700, color: C.outline, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 48 }}>
              Elite Credentials &amp; Global Memberships
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16 }}>
              {CREDENTIALS.map((cred, i) => (
                <motion.div key={cred.label}
                  style={{ background: C.white, borderRadius: 16, padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: `1px solid ${C.outlineVar}`, cursor: 'default' }}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.5 }}
                  whileHover={{ y: -4, borderColor: C.orange, boxShadow: '0 8px 24px rgba(0,70,116,0.1)' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 40, color: C.primary, marginBottom: 12 }}>{cred.icon}</span>
                  <span style={{ fontWeight: 700, color: C.onSurface, fontSize: 14 }}>{cred.label}</span>
                </motion.div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── Values Grid ── */}
      <section style={{ padding: '96px 64px', background: C.white }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <SectionReveal>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <span style={{ color: C.orange, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: 11, display: 'block', marginBottom: 16 }}>The Foundation</span>
              <h2 style={{ fontSize: 32, fontWeight: 900, color: C.onSurface }}>Values &amp; Philosophy</h2>
            </div>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <SectionReveal className="md:col-span-8">
              <div style={{ background: C.primary, color: C.white, borderRadius: 40, padding: 48, position: 'relative', overflow: 'hidden', boxShadow: '0 24px 64px rgba(0,70,116,0.25)', minHeight: 280, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                <div style={{ position: 'absolute', top: 32, right: 32, opacity: 0.05 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 220 }}>biotech</span>
                </div>
                <span className="material-symbols-outlined" style={{ fontSize: 48, marginBottom: 16, color: C.orange }}>precision_manufacturing</span>
                <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16, color: C.white }}>Precision Technology</h3>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16, lineHeight: 1.7, maxWidth: 560 }}>We utilize the latest AI-driven diagnostic tools and HD imaging to provide a level of accuracy that ensures every surgical outcome is optimized for your specific optical profile.</p>
              </div>
            </SectionReveal>
            <SectionReveal delay={0.1} className="md:col-span-4">
              <div style={{ background: C.orange, borderRadius: 40, padding: 40, boxShadow: '0 16px 48px rgba(254,137,73,0.3)', minHeight: 280, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 48, color: '#6a2a00' }}>volunteer_activism</span>
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, color: '#6a2a00' }}>Human Warmth</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(106,42,0,0.85)' }}>Empathy is as important as expertise. We care for the person behind the eyes.</p>
                </div>
              </div>
            </SectionReveal>
            <SectionReveal delay={0.15} className="md:col-span-4">
              <div style={{ background: C.red, borderRadius: 40, padding: 40, boxShadow: '0 16px 48px rgba(180,21,29,0.3)', minHeight: 240, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 48, color: C.white }}>psychology</span>
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, color: C.white }}>Clinical Ethics</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(255,255,255,0.85)' }}>A rigid commitment to transparency and the highest medical ethics.</p>
                </div>
              </div>
            </SectionReveal>
            <SectionReveal delay={0.2} className="md:col-span-8">
              <div style={{ background: C.surfaceLow, borderRadius: 40, padding: 40, border: `1px solid ${C.outlineVar}`, display: 'flex', alignItems: 'center', gap: 40, minHeight: 240 }}>
                <motion.div style={{ width: 96, height: 96, borderRadius: '50%', background: C.white, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: `2px solid ${C.outlineVar}` }}
                  whileHover={{ rotate: 360 }} transition={{ duration: 1.5 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 48, color: C.orange }}>visibility</span>
                </motion.div>
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: C.onSurface, marginBottom: 8 }}>Lifelong Vision Partnership</h3>
                  <p style={{ color: C.outline, fontSize: 16, lineHeight: 1.7 }}>Our journey with you doesn't end with a prescription. We provide continuous support and monitoring to ensure your vision remains crystal clear for a lifetime.</p>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section style={{ padding: '96px 64px', background: C.surfaceLow }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <SectionReveal>
            <h2 style={{ fontSize: 32, fontWeight: 900, textAlign: 'center', color: C.onSurface, marginBottom: 96 }}>A Legacy of Excellence</h2>
          </SectionReveal>
          <div style={{ position: 'relative', maxWidth: 768, margin: '0 auto' }}>
            <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 0, bottom: 0, width: 1, background: C.outlineVar }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 80 }}>
              {TIMELINE.map((item, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <SectionReveal key={item.year} delay={i * 0.1}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 40, flexDirection: isLeft ? 'row' : 'row-reverse' }}>
                      <div style={{ flex: 1 }}>
                        <motion.div style={{ background: C.white, padding: 32, borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: `1px solid ${C.outlineVar}` }}
                          whileHover={{ y: -4, boxShadow: '0 16px 48px rgba(0,0,0,0.1)' }}>
                          <h4 style={{ fontSize: 40, fontWeight: 900, color: item.accent, marginBottom: 12 }}>{item.year}</h4>
                          <h5 style={{ fontWeight: 700, color: C.onSurface, marginBottom: 8 }}>{item.title}</h5>
                          <p style={{ color: C.outline, fontSize: 14, lineHeight: 1.7 }}>{item.desc}</p>
                        </motion.div>
                      </div>
                      <motion.div style={{ width: 48, height: 48, background: C.white, borderRadius: '50%', border: `4px solid ${item.accent}`, boxShadow: '0 4px 16px rgba(0,0,0,0.1)', zIndex: 1, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        whileHover={{ scale: 1.2 }}>
                        <div style={{ width: 12, height: 12, borderRadius: '50%', background: item.accent }} />
                      </motion.div>
                      <div style={{ flex: 1 }} />
                    </div>
                  </SectionReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '96px 64px' }}>
        <SectionReveal>
          <div style={{ maxWidth: 1280, margin: '0 auto', background: C.primary, color: C.white, borderRadius: 48, padding: '80px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,70,116,0.25)' }}>
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.15 }}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: 320, height: 320, background: C.white, borderRadius: '50%', transform: 'translate(50%,-50%)', filter: 'blur(80px)' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, width: 320, height: 320, background: C.orange, borderRadius: '50%', transform: 'translate(-50%,50%)', filter: 'blur(80px)' }} />
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{ fontSize: 40, fontWeight: 900, marginBottom: 24, color: C.white }}>Begin Your Journey to Clarity</h2>
              <p style={{ fontSize: 18, opacity: 0.9, marginBottom: 40, maxWidth: 480, margin: '0 auto 40px', lineHeight: 1.7 }}>
                Experience the expertise of Dr. Rama and her world-class team. Your vision deserves nothing less than the best.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16 }}>
                <motion.button style={{ background: C.orange, color: C.white, padding: '16px 40px', borderRadius: 999, fontWeight: 700, fontSize: 16, border: 'none', cursor: 'pointer', boxShadow: '0 8px 28px rgba(254,137,73,0.45)' }}
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
                  Book Your Consultation
                </motion.button>
                <motion.button style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.25)', padding: '16px 40px', borderRadius: 999, fontWeight: 700, fontSize: 16, color: C.white, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
                  whileHover={{ scale: 1.02, background: 'rgba(255,255,255,0.2)' }} whileTap={{ scale: 0.96 }}>
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