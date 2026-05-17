import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
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

function StarRow({ count = 5 }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.span key={i} className="material-symbols-outlined"
          style={{ fontVariationSettings: "'FILL' 1", fontSize: 20, color: C.orange }}
          initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }} transition={{ delay: i * 0.07, type: 'spring', stiffness: 300 }}>
          star
        </motion.span>
      ))}
    </div>
  );
}

const SMALL_REVIEWS = [
  { initials: 'RM', name: 'Robert Miller',  avatarBg: '#dbeafe', text: 'Dealing with cataracts was scary, but the team here made me feel so comfortable. Dr. Rama explained everything so clearly.' },
  { initials: 'EK', name: 'Elena Kasich',   avatarBg: '#ffedd5', text: 'As a professional photographer, my eyes are my life. Dr. Rama is the only surgeon I trusted with my procedure. Flawless results.' },
  { initials: 'DW', name: 'David Wu',       avatarBg: '#fee2e2', text: 'The post-op care is what really sets them apart. I felt supported through every single step of my recovery process.' },
];

const VIDEO_CARDS = [
  { img: IMAGES.videoThumb1, title: 'Recovering My Passion',  sub: 'Mark, Pilot' },
  { img: IMAGES.videoThumb2, title: 'Freedom from Glasses',   sub: 'Jessica, Student' },
  { img: IMAGES.videoThumb3, title: 'Advanced Diabetic Care', sub: 'Thomas, Retiree' },
];

export default function Reviews() {
  return (
    <div style={{ paddingTop: 80, background: '#fdf8f8', overflowX: 'hidden' }}>

      {/* ── Hero ── */}
      <section style={{
        padding: '80px 64px',
        borderBottom: `1px solid ${C.outlineVar}`,
        backgroundColor: '#fcf9f8',
        backgroundImage: `radial-gradient(${C.primary}18 1px, transparent 1px)`,
        backgroundSize: '32px 32px',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', textAlign: 'center' }}>
          <SectionReveal>
            <span style={{ display: 'inline-block', padding: '6px 16px', borderRadius: 999, background: 'rgba(0,70,116,0.08)', color: C.primary, fontWeight: 700, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 24 }}>
              Patient Testimonials
            </span>
            <h1 style={{ fontSize: 48, fontWeight: 900, marginBottom: 24, color: C.onSurface }}>
              Your Vision is Our{' '}
              <span style={{ color: C.primary }}>Masterpiece</span>
            </h1>
            <p style={{ color: C.outline, fontSize: 18, maxWidth: 640, margin: '0 auto 40px', lineHeight: 1.7 }}>
              With over 15,000 successful procedures, Dr. Rama and the team are dedicated to
              providing life-changing clarity to every patient.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 32, alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <StarRow count={5} />
                <span style={{ fontSize: 24, fontWeight: 900, color: C.onSurface }}>
                  <CountUp to={4.9} decimals={1} />/5
                </span>
                <span style={{ color: C.outline, fontSize: 14 }}>Google Rating</span>
              </div>
              <div style={{ width: 1, height: 32, background: C.outlineVar }} />
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: 24, fontWeight: 900, display: 'block', color: C.onSurface }}>
                  <CountUp to={2500} suffix="+" />
                </span>
                <span style={{ color: C.outline, fontSize: 14 }}>Verified Reviews</span>
              </div>
              <div style={{ width: 1, height: 32, background: C.outlineVar }} />
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: 24, fontWeight: 900, display: 'block', color: C.onSurface }}>
                  <CountUp to={99.8} decimals={1} suffix="%" />
                </span>
                <span style={{ color: C.outline, fontSize: 14 }}>Success Rate</span>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── Bento Reviews ── */}
      <section style={{ padding: '96px 64px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

            {/* Featured review */}
            <SectionReveal className="md:col-span-8">
              <div style={{ background: C.white, padding: 40, borderRadius: 16, border: `1px solid ${C.outlineVar}`, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <div>
                  <StarRow count={5} />
                  <motion.h3 style={{ fontSize: 20, fontWeight: 700, color: C.onSurface, marginTop: 24, marginBottom: 16, fontStyle: 'italic', lineHeight: 1.6 }}
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
                    "The precision and care I received at Dr. Rama's were beyond anything I expected.
                    After years of struggling with my eyesight, Dr. Rama restored my vision to 20/20.
                    It's like seeing the world in high-definition for the first time."
                  </motion.h3>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 32, paddingTop: 32, borderTop: `1px solid ${C.outlineVar}` }}>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', overflow: 'hidden', background: C.surfaceLow, flexShrink: 0 }}>
                    <img src={IMAGES.reviewPatient1} alt="Sarah Jenkins" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, color: C.onSurface, fontSize: 18 }}>Sarah Jenkins</p>
                    <p style={{ color: C.outline, fontSize: 14 }}>LASIK Patient, 2023</p>
                  </div>
                </div>
              </div>
            </SectionReveal>

            {/* Stats column */}
            <SectionReveal delay={0.1} className="md:col-span-4" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ background: C.primary, padding: 32, borderRadius: 16, color: C.white, flex: 1 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 40, marginBottom: 16, display: 'block', fontVariationSettings: "'FILL' 1", color: C.orange }}>verified</span>
                <h4 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, color: C.white }}>Patient Safety</h4>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, lineHeight: 1.6 }}>
                  99.8% procedure success rate across all vision correction surgeries performed.
                </p>
              </div>
              <div style={{ background: C.orange, padding: 32, borderRadius: 16, color: C.white, flex: 1 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 40, marginBottom: 16, display: 'block', fontVariationSettings: "'FILL' 1" }}>medical_services</span>
                <h4 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Modern Tech</h4>
                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 14, lineHeight: 1.6 }}>
                  Utilizing the latest Zeiss visumax 800 for precision SMILE pro surgeries.
                </p>
              </div>
            </SectionReveal>

            {/* Small review cards */}
            {SMALL_REVIEWS.map((r, i) => (
              <SectionReveal key={r.name} delay={i * 0.08} className="md:col-span-4">
                <motion.div style={{ background: C.surfaceLow, padding: 32, borderRadius: 16, border: `1px solid ${C.outlineVar}`, height: '100%', transition: 'all 0.3s' }}
                  whileHover={{ y: -4, borderColor: C.primary, boxShadow: '0 8px 24px rgba(0,70,116,0.1)' }}>
                  <StarRow count={5} />
                  <p style={{ color: C.outline, marginTop: 16, marginBottom: 24, fontSize: 14, lineHeight: 1.7 }}>"{r.text}"</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: r.avatarBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, color: C.primary }}>
                      {r.initials}
                    </div>
                    <span style={{ fontWeight: 700, color: C.onSurface, fontSize: 14 }}>{r.name}</span>
                  </div>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Video Stories ── */}
      <section style={{ background: C.surfaceLow, padding: '96px 64px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <SectionReveal>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, gap: 24 }}>
              <div style={{ maxWidth: 480 }}>
                <h2 style={{ fontSize: 32, fontWeight: 900, color: C.onSurface, marginBottom: 12 }}>Real Stories, Real Life</h2>
                <p style={{ color: C.outline, fontSize: 18 }}>Watch our patients share their journeys from blurry vision to crystal-clear clarity.</p>
              </div>
              <motion.button style={{ display: 'flex', alignItems: 'center', gap: 8, color: C.primary, fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', fontSize: 15 }} whileHover={{ x: 3 }}>
                View All Stories <span className="material-symbols-outlined">arrow_forward</span>
              </motion.button>
            </div>
          </SectionReveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {VIDEO_CARDS.map((v, i) => (
              <SectionReveal key={v.title} delay={i * 0.1}>
                <div className="group" style={{ position: 'relative', aspectRatio: '16/9', borderRadius: 16, overflow: 'hidden', cursor: 'pointer' }}>
                  <img src={v.img} alt={v.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s' }}
                    onMouseEnter={e => e.target.style.transform = 'scale(1.1)'}
                    onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <motion.div style={{ width: 64, height: 64, borderRadius: '50%', background: `${C.primary}e6`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
                      whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 36, color: C.white, fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                    </motion.div>
                  </div>
                  <div style={{ position: 'absolute', bottom: 0, width: '100%', padding: 20, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
                    <p style={{ color: C.white, fontWeight: 700, fontSize: 18 }}>{v.title}</p>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>{v.sub}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust Badges ── */}
      <section style={{ padding: '64px 64px', background: C.surfaceLow, borderTop: `1px solid ${C.outlineVar}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <SectionReveal>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24, textAlign: 'center' }}>
              {[
                { value: 15000, suffix: '+',  label: 'Procedures',       color: C.primary },
                { value: 4.9,   dec: 1, suffix: '/5', label: 'Google Rating',    color: C.orange },
                { value: 2500,  suffix: '+',  label: 'Verified Reviews', color: C.primary },
                { value: 99.8,  dec: 1, suffix: '%',  label: 'Success Rate',     color: C.orange },
              ].map((stat) => (
                <div key={stat.label} style={{ background: C.white, borderRadius: 16, padding: 32, boxShadow: '0 2px 12px rgba(0,0,0,0.05)', border: `1px solid ${C.outlineVar}` }}>
                  <div style={{ fontSize: 40, fontWeight: 900, marginBottom: 8, color: stat.color }}>
                    <CountUp to={stat.value} decimals={stat.dec || 0} suffix={stat.suffix} />
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: C.outline, textTransform: 'uppercase', letterSpacing: '0.15em' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '96px 64px', textAlign: 'center' }}>
        <SectionReveal>
          <div style={{ maxWidth: 800, margin: '0 auto', background: C.surfaceLow, borderRadius: 24, padding: 48, border: `1px solid ${C.outlineVar}` }}>
            <h2 style={{ fontSize: 32, fontWeight: 900, color: C.onSurface, marginBottom: 16 }}>Ready for your own success story?</h2>
            <p style={{ color: C.outline, fontSize: 18, marginBottom: 40, lineHeight: 1.7 }}>
              Join thousands of patients who have trusted their vision to Dr. Rama's Eye Clinic.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
              <Link to="/contact">
                <motion.button style={{ background: C.primary, color: C.white, padding: '16px 40px', borderRadius: 16, fontWeight: 700, fontSize: 16, border: 'none', cursor: 'pointer', boxShadow: '0 8px 28px rgba(0,70,116,0.25)' }}
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                  Book Your Free Consultation
                </motion.button>
              </Link>
              <Link to="/services">
                <motion.button style={{ border: `2px solid ${C.primary}`, color: C.primary, padding: '16px 40px', borderRadius: 16, fontWeight: 700, fontSize: 16, background: 'transparent', cursor: 'pointer' }}
                  whileHover={{ scale: 1.02, background: 'rgba(0,70,116,0.05)' }} whileTap={{ scale: 0.96 }}>
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