import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { sendBookingConfirmation } from '../api/sendConfirmation';

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
  error:      '#ba1a1a',
};

function SectionReveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}>
      {children}
    </motion.div>
  );
}

const OFFICE_HOURS = [
  { day: 'Mon – Thu', time: '8:00 AM – 6:00 PM', active: true },
  { day: 'Friday',    time: '8:00 AM – 4:00 PM', active: true },
  { day: 'Saturday',  time: '9:00 AM – 1:00 PM', active: true },
  { day: 'Sunday',    time: 'Closed',             active: false },
];

const INQUIRY_TYPES = [
  'General Inquiry',
  'Book Appointment',
  'Laser Surgery Consultation',
  'Cataract Surgery',
  'Pediatric Eye Care',
  'Billing Question',
];

export default function Contact() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', service: 'General Inquiry', date: '', message: '',
  });
  const [status, setStatus]        = useState('idle');
  const [focusedField, setFocused] = useState(null);

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setStatus('loading');
    const result = await sendBookingConfirmation(form);
    setStatus(result.success ? 'success' : 'error');
  };

  const inputStyle = (field) => ({
    width: '100%',
    background: focusedField === field ? 'rgba(0,70,116,0.05)' : C.surfaceLow,
    borderBottom: `2px solid ${focusedField === field ? C.primary : C.outlineVar}`,
    borderTop: 'none', borderLeft: 'none', borderRight: 'none',
    borderRadius: '8px 8px 0 0',
    padding: '12px 16px',
    color: C.onSurface,
    fontSize: 14,
    outline: 'none',
    transition: 'all 0.2s',
    fontFamily: 'Manrope, sans-serif',
  });

  const labelStyle = (field) => ({
    fontSize: 11, fontWeight: 700,
    textTransform: 'uppercase', letterSpacing: '0.12em',
    color: focusedField === field ? C.orange : C.primary,
    marginBottom: 6, display: 'block',
  });

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{ paddingTop: 0, background: '#fdf8f8', overflowX: 'hidden' }}
    >
      {/* ── Hero ── */}
      <section style={{ position: 'relative', padding: '96px 0', background: C.surfaceLow, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          <div style={{ position: 'absolute', top: 0, right: 0, width: 384, height: 384, background: C.primary, borderRadius: '50%', filter: 'blur(120px)', opacity: 0.08 }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: 256, height: 256, background: C.orange, borderRadius: '50%', filter: 'blur(100px)', opacity: 0.08 }} />
        </div>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 64px', position: 'relative', zIndex: 1 }}>
          <SectionReveal>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(0,70,116,0.08)', borderRadius: 999, padding: '6px 16px', marginBottom: 24 }}>
              <span className="material-symbols-outlined" style={{ color: C.primary, fontSize: 16 }}>location_on</span>
              <span style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', color: C.primary }}>Visakhapatnam, AP</span>
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900, color: C.primary, marginBottom: 16, lineHeight: 1.1 }}>
              Precision Care for Every Vision.
            </h1>
            <p style={{ color: C.outline, fontSize: 18, lineHeight: 1.7, maxWidth: 560 }}>
              Contact Dr. Rama's Eye Clinic. Whether it's a routine check-up or advanced surgery,
              we're here to provide high-definition clarity for your life.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ── Main Grid ── */}
      <section style={{ padding: '64px 64px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32, alignItems: 'start' }}>

          {/* ── Contact Form ── */}
          <SectionReveal>
            <div style={{ background: C.white, border: `1px solid ${C.outlineVar}`, padding: 40, borderRadius: 20, boxShadow: '0 2px 24px rgba(0,0,0,0.06)' }}>
              <h2 style={{ fontSize: 26, fontWeight: 900, color: C.primary, marginBottom: 4 }}>Send a Message</h2>
              <p style={{ color: C.outline, fontSize: 14, marginBottom: 32 }}>We'll get back to you within 24 business hours.</p>

              {status === 'success' ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '48px 0', gap: 16 }}>
                  <motion.div
                    style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(0,70,116,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    animate={{ scale: [0.8, 1.1, 1] }} transition={{ duration: 0.5 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 48, color: C.primary }}>check_circle</span>
                  </motion.div>
                  <h3 style={{ fontSize: 22, fontWeight: 800, color: C.onSurface }}>Request Received!</h3>
                  <p style={{ color: C.outline, maxWidth: 300, lineHeight: 1.6 }}>
                    A confirmation email has been sent to <strong style={{ color: C.primary }}>{form.email}</strong>. Our team will contact you within 24 hours.
                  </p>
                  <motion.button
                    onClick={() => { setStatus('idle'); setForm({ name: '', email: '', phone: '', service: 'General Inquiry', date: '', message: '' }); }}
                    style={{ marginTop: 16, background: C.primary, color: C.white, padding: '12px 32px', borderRadius: 999, fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: 14 }}
                    whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                    Send Another
                  </motion.button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                    {[
                      { name: 'name',  label: 'Full Name',     placeholder: 'John Doe',         type: 'text',  required: true },
                      { name: 'email', label: 'Email Address', placeholder: 'john@example.com', type: 'email', required: true },
                      { name: 'phone', label: 'Phone Number',  placeholder: '+91 98765 43210',  type: 'tel' },
                      { name: 'date',  label: 'Preferred Date', placeholder: '',                type: 'date' },
                    ].map((f) => (
                      <div key={f.name} style={{ display: 'flex', flexDirection: 'column' }}>
                        <label style={labelStyle(f.name)}>
                          {f.label}{f.required && <span style={{ color: C.error }}> *</span>}
                        </label>
                        <input type={f.type} name={f.name} value={form[f.name]}
                          onChange={handleChange}
                          onFocus={() => setFocused(f.name)}
                          onBlur={() => setFocused(null)}
                          placeholder={f.placeholder}
                          required={f.required}
                          style={inputStyle(f.name)} />
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={labelStyle('service')}>Reason for Inquiry</label>
                    <select name="service" value={form.service} onChange={handleChange}
                      onFocus={() => setFocused('service')} onBlur={() => setFocused(null)}
                      style={{ ...inputStyle('service'), cursor: 'pointer' }}>
                      {INQUIRY_TYPES.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={labelStyle('message')}>Message</label>
                    <textarea name="message" value={form.message} onChange={handleChange}
                      onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
                      placeholder="How can we help you today?" rows={4}
                      style={{ ...inputStyle('message'), resize: 'none' }} />
                  </div>

                  {status === 'error' && (
                    <p style={{ color: C.error, fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 16 }}>error</span>
                      Something went wrong. Please try again or call us directly.
                    </p>
                  )}

                  <motion.button type="submit" disabled={status === 'loading'}
                    style={{
                      width: '100%', background: C.primary, color: C.white,
                      fontWeight: 700, padding: '16px 0', borderRadius: 12,
                      fontSize: 15, border: 'none',
                      cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                      opacity: status === 'loading' ? 0.7 : 1,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                      boxShadow: '0 4px 20px rgba(0,70,116,0.3)',
                    }}
                    whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
                    whileTap={{ scale: 0.98 }}>
                    {status === 'loading' ? (
                      <>
                        <motion.span className="material-symbols-outlined" style={{ fontSize: 18 }}
                          animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                          progress_activity
                        </motion.span>
                        Sending...
                      </>
                    ) : (
                      <>Send Message <span className="material-symbols-outlined" style={{ fontSize: 18 }}>send</span></>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </SectionReveal>

          {/* ── Info Column ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Clinic Info */}
            <SectionReveal delay={0.1}>
              <div style={{ background: C.primary, color: C.white, padding: 32, borderRadius: 20 }}>
                <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 24 }}>Clinic Info</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {[
                    { icon: 'location_on', text: '1st Floor, above Dr Sandeep Skin Clinic,\nbeside Sri Krishna Orthopedic Hospital,\nGajuwaka, Visakhapatnam, AP 530026' },
                    { icon: 'phone',       text: '063096 28889' },
                    { icon: 'mail',        text: 'hello@drramaseye.com' },
                  ].map(({ icon, text }) => (
                    <div key={icon} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                      <span className="material-symbols-outlined" style={{ color: C.orange, flexShrink: 0, marginTop: 2 }}>{icon}</span>
                      <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 14, lineHeight: 1.7, whiteSpace: 'pre-line' }}>{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>

            {/* Emergency */}
            <SectionReveal delay={0.15}>
              <div style={{ background: C.red, padding: 32, borderRadius: 20, borderLeft: '6px solid #7a000a' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <span className="material-symbols-outlined" style={{ color: '#fff' }}>emergency</span>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>Emergency Care</h3>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 14, marginBottom: 16, lineHeight: 1.6 }}>
                  In case of severe eye injury or sudden vision loss, visit our 24/7 urgent care unit immediately.
                </p>
                <p style={{ fontSize: 22, fontWeight: 900, color: '#fff' }}>063096 28889</p>
              </div>
            </SectionReveal>

            {/* Office Hours */}
            <SectionReveal delay={0.2}>
              <div style={{ background: C.white, border: `1px solid ${C.outlineVar}`, padding: 32, borderRadius: 20 }}>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: C.primary, marginBottom: 20 }}>Office Hours</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {OFFICE_HOURS.map(({ day, time, active }) => (
                    <li key={day} style={{
                      display: 'flex', justifyContent: 'space-between',
                      borderBottom: `1px solid ${C.outlineVar}`, padding: '12px 0',
                      fontSize: 14, color: active ? C.onSurface : C.outline,
                      fontWeight: active ? 700 : 400,
                    }}>
                      <span>{day}</span>
                      <span style={{ color: active ? C.primary : C.outline }}>{time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </SectionReveal>

            {/* Quick Contact */}
            <SectionReveal delay={0.25}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <motion.a href="tel:+918023456789"
                  style={{ background: C.surfaceLow, border: `1px solid ${C.outlineVar}`, borderRadius: 16, padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, textDecoration: 'none' }}
                  whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0,70,116,0.12)', borderColor: C.primary }}>
                  <span className="material-symbols-outlined" style={{ color: C.primary, fontSize: 32 }}>call</span>
                  <span style={{ fontWeight: 700, color: C.onSurface, fontSize: 14 }}>Call Now</span>
                </motion.a>
                <motion.a
                  href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '918023456789'}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{ background: C.surfaceLow, border: `1px solid ${C.outlineVar}`, borderRadius: 16, padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, textDecoration: 'none' }}
                  whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(37,211,102,0.15)', borderColor: '#25D366' }}>
                  <svg viewBox="0 0 32 32" fill="#25D366" width="32" height="32">
                    <path d="M16.004 2.667C8.64 2.667 2.667 8.64 2.667 16c0 2.35.635 4.548 1.74 6.447L2.667 29.333l7.08-1.713A13.267 13.267 0 0016.004 29.333C23.36 29.333 29.333 23.36 29.333 16S23.36 2.667 16.004 2.667zm0 2.4c5.916 0 10.933 5.017 10.933 10.933 0 5.916-5.017 10.933-10.933 10.933a10.9 10.9 0 01-5.577-1.527l-.4-.237-4.197 1.016 1.063-3.963-.26-.41A10.89 10.89 0 015.07 16c0-5.916 5.017-10.933 10.933-10.933zm-3.014 5.6c-.2 0-.52.075-.793.375-.273.3-1.04.997-1.04 2.43 0 1.434 1.065 2.82 1.213 3.015.148.194 2.07 3.25 5.078 4.436 2.507.984 3.016.789 3.559.741.543-.048 1.751-.707 2-.1.394-.249.59-.736.59-1.174v-1.6c0-.2-.13-.43-.394-.556-.264-.126-1.562-.727-1.804-.811-.242-.084-.418-.126-.594.126-.176.252-.682.81-.836.986-.153.175-.307.198-.57.074-.263-.125-1.11-.405-2.116-1.293-.782-.69-1.31-1.545-1.464-1.797-.153-.252-.016-.389.115-.514.118-.113.263-.295.395-.442.13-.147.174-.252.263-.42.087-.168.044-.315-.023-.441-.066-.126-.59-1.433-.813-1.96-.214-.512-.43-.44-.59-.448l-.503-.009z" />
                  </svg>
                  <span style={{ fontWeight: 700, color: C.onSurface, fontSize: 14 }}>WhatsApp</span>
                </motion.a>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Google Maps Embed ── */}
      <SectionReveal delay={0.1}>
        <section style={{ width: '100%', position: 'relative', overflow: 'hidden' }}>
          {/* Real Google Maps iframe embed */}
          <div style={{ position: 'relative', width: '100%', height: 480 }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3800.123456789!2d83.2!3d17.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDQyJzAwLjAiTiA4M8KwMTInMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890&q=Dr+Rama+Eye+Clinic+Visakhapatnam"
              width="100%"
              height="480"
              style={{ border: 0, filter: 'grayscale(0.15)', display: 'block' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Dr. Rama's Eye Clinic Location"
            />

            {/* Info card over map */}
            <motion.div
              style={{
                position: 'absolute', top: 32, left: 32, zIndex: 20,
                background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(16px)',
                padding: '24px 28px', borderRadius: 20,
                border: `1px solid ${C.outlineVar}`,
                boxShadow: '0 8px 40px rgba(0,0,0,0.12)', maxWidth: 300,
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(0,70,116,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="material-symbols-outlined" style={{ color: C.primary, fontSize: 20 }}>location_on</span>
                </div>
                <h4 style={{ fontWeight: 800, color: C.primary, fontSize: 16 }}>Visit Dr. Rama</h4>
              </div>
              <p style={{ color: C.outline, fontSize: 13, marginBottom: 16, lineHeight: 1.6 }}>
                Located in Visakhapatnam, AP. Parking available for all patients.
              </p>
              <motion.a
                href="https://maps.app.goo.gl/fwex5B5jV9rDP8U29"
                target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: 6, color: C.orange, fontWeight: 700, fontSize: 14, textDecoration: 'none' }}
                whileHover={{ x: 4 }}>
                Get Directions
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
              </motion.a>
            </motion.div>
          </div>
        </section>
      </SectionReveal>
    </motion.div>
  );
}