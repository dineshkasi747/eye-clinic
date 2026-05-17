import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { sendBookingConfirmation } from '../api/sendConfirmation';

const C = {
  primary:       '#004674',
  primaryLight:  '#005e9a',
  orange:        '#fe8949',
  red:           '#b4151d',
  surface:       '#f0edec',
  surfaceLow:    '#f6f3f2',
  white:         '#ffffff',
  onSurface:     '#1c1b1b',
  outline:       '#717881',
  outlineVar:    '#c1c7d1',
  error:         '#ba1a1a',
};

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
  const [status, setStatus]         = useState('idle');
  const [focusedField, setFocused]  = useState(null);

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
    fontSize: 11,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    color: focusedField === field ? C.orange : C.primary,
    marginBottom: 6,
    display: 'block',
  });

  return (
    <div style={{ paddingTop: 80, background: '#fdf8f8', overflowX: 'hidden' }}>

      {/* ── Hero ── */}
      <section style={{ position: 'relative', padding: '96px 0', background: C.surfaceLow, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          <div style={{ position: 'absolute', top: 0, right: 0, width: 384, height: 384, background: C.primary, borderRadius: '50%', filter: 'blur(120px)', opacity: 0.08 }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: 256, height: 256, background: C.orange, borderRadius: '50%', filter: 'blur(100px)', opacity: 0.08 }} />
        </div>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 64px', position: 'relative', zIndex: 1 }}>
          <SectionReveal>
            <h1 style={{ fontSize: 48, fontWeight: 900, color: C.primary, marginBottom: 16, lineHeight: 1.1 }}>
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
      <section style={{ padding: '64px 0', maxWidth: 1280, margin: '0 auto', padding: '64px 64px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 32 }} className="lg:grid-cols-contact">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32, alignItems: 'start' }}>

            {/* ── Form ── */}
            <SectionReveal>
              <div style={{ background: C.white, border: `1px solid ${C.outlineVar}`, padding: 32, borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <h2 style={{ fontSize: 24, fontWeight: 900, color: C.primary, marginBottom: 4 }}>Send a Message</h2>
                <p style={{ color: C.outline, fontSize: 14, marginBottom: 32 }}>We'll get back to you within 24 business hours.</p>

                {status === 'success' ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '48px 0', gap: 16 }}>
                    <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(0,70,116,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 48, color: C.primary }}>check_circle</span>
                    </div>
                    <h3 style={{ fontSize: 20, fontWeight: 700, color: C.onSurface }}>Request Received!</h3>
                    <p style={{ color: C.outline, maxWidth: 320 }}>
                      A confirmation email has been sent to <strong>{form.email}</strong>. Our team will contact you within 24 hours.
                    </p>
                    <motion.button
                      onClick={() => { setStatus('idle'); setForm({ name: '', email: '', phone: '', service: 'General Inquiry', date: '', message: '' }); }}
                      style={{ marginTop: 16, background: C.primary, color: C.white, padding: '12px 32px', borderRadius: 999, fontWeight: 700, border: 'none', cursor: 'pointer' }}
                      whileTap={{ scale: 0.96 }}>
                      Send Another
                    </motion.button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                      {[
                        { name: 'name',  label: 'Full Name',       placeholder: 'Dr. John Doe',       type: 'text',  required: true },
                        { name: 'email', label: 'Email Address',    placeholder: 'john@example.com',   type: 'email', required: true },
                        { name: 'phone', label: 'Phone Number',     placeholder: '+91 98765 43210',    type: 'tel' },
                        { name: 'date',  label: 'Preferred Date',   placeholder: '',                   type: 'date' },
                      ].map((f) => (
                        <div key={f.name} style={{ display: 'flex', flexDirection: 'column' }}>
                          <label style={labelStyle(f.name)}>
                            {f.label}{f.required && <span style={{ color: C.error }}>*</span>}
                          </label>
                          <input
                            type={f.type} name={f.name} value={form[f.name]}
                            onChange={handleChange}
                            onFocus={() => setFocused(f.name)}
                            onBlur={() => setFocused(null)}
                            placeholder={f.placeholder}
                            required={f.required}
                            style={inputStyle(f.name)}
                          />
                        </div>
                      ))}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <label style={labelStyle('service')}>Reason for Inquiry</label>
                      <select name="service" value={form.service} onChange={handleChange}
                        onFocus={() => setFocused('service')} onBlur={() => setFocused(null)}
                        style={{ ...inputStyle('service'), cursor: 'pointer' }}>
                        {INQUIRY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
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
                      <p style={{ color: C.error, fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 16 }}>error</span>
                        Something went wrong. Please try again or call us directly.
                      </p>
                    )}

                    <motion.button type="submit" disabled={status === 'loading'}
                      style={{
                        width: '100%', background: C.primary, color: C.white, fontWeight: 700,
                        padding: '16px 0', borderRadius: 12, fontSize: 16, border: 'none',
                        cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                        opacity: status === 'loading' ? 0.6 : 1,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                        boxShadow: '0 4px 20px rgba(0,70,116,0.3)',
                      }}
                      whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
                      whileTap={{ scale: 0.98 }}>
                      {status === 'loading' ? (
                        <>
                          <motion.span className="material-symbols-outlined" style={{ fontSize: 16 }}
                            animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                            progress_activity
                          </motion.span>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>send</span>
                        </>
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
                <div style={{ background: C.primary, color: C.white, padding: 32, borderRadius: 16 }}>
                  <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24, color: C.white }}>Clinic Info</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {[
                      { icon: 'location_on', text: '123 Visionary Ave, Clinic District\nVisakhapatnam, AP 530001' },
                      { icon: 'phone',       text: '+91 (80) 2345 6789' },
                      { icon: 'mail',        text: 'hello@drramaseye.com' },
                    ].map(({ icon, text }) => (
                      <div key={icon} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                        <span className="material-symbols-outlined" style={{ color: C.orange, flexShrink: 0, marginTop: 2 }}>{icon}</span>
                        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 14, lineHeight: 1.6, whiteSpace: 'pre-line' }}>{text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </SectionReveal>

              {/* Emergency */}
              <SectionReveal delay={0.15}>
                <div style={{ background: C.red, color: C.white, padding: 32, borderRadius: 16, borderLeft: `8px solid #7a000a` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <span className="material-symbols-outlined" style={{ color: C.white, fontVariationSettings: "'FILL' 1" }}>error</span>
                    <h3 style={{ fontSize: 20, fontWeight: 700, color: C.white }}>Emergency Care</h3>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 14, marginBottom: 16, lineHeight: 1.6 }}>
                    In case of a severe eye injury or sudden vision loss, please visit our 24/7 urgent care
                    unit or call our emergency line immediately.
                  </p>
                  <p style={{ fontSize: 22, fontWeight: 900, color: C.white }}>911 or +1 (555) 999-0000</p>
                </div>
              </SectionReveal>

              {/* Office Hours */}
              <SectionReveal delay={0.2}>
                <div style={{ background: C.white, border: `1px solid ${C.outlineVar}`, padding: 32, borderRadius: 16 }}>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: C.primary, marginBottom: 24 }}>Office Hours</h3>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                    {OFFICE_HOURS.map(({ day, time, active }) => (
                      <li key={day} style={{
                        display: 'flex', justifyContent: 'space-between',
                        borderBottom: `1px solid ${C.outlineVar}`,
                        padding: '12px 0', fontSize: 14,
                        color: active ? C.onSurface : C.outline,
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
                    style={{
                      background: C.surfaceLow, border: `1px solid ${C.outlineVar}`,
                      borderRadius: 16, padding: 20, display: 'flex', flexDirection: 'column',
                      alignItems: 'center', textAlign: 'center', gap: 12, textDecoration: 'none',
                      transition: 'all 0.2s',
                    }}
                    whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0,70,116,0.12)', borderColor: C.primary }}>
                    <span className="material-symbols-outlined" style={{ color: C.primary, fontSize: 32 }}>call</span>
                    <span style={{ fontWeight: 700, color: C.onSurface, fontSize: 14 }}>Call Now</span>
                  </motion.a>
                  <motion.a
                    href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '918023456789'}`}
                    target="_blank" rel="noopener noreferrer"
                    style={{
                      background: C.surfaceLow, border: `1px solid ${C.outlineVar}`,
                      borderRadius: 16, padding: 20, display: 'flex', flexDirection: 'column',
                      alignItems: 'center', textAlign: 'center', gap: 12, textDecoration: 'none',
                      transition: 'all 0.2s',
                    }}
                    whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(37,211,102,0.15)', borderColor: '#25D366' }}>
                    <div style={{ width: 32, height: 32 }}>
                      <svg viewBox="0 0 32 32" fill="#25D366" width="32" height="32">
                        <path d="M16.004 2.667C8.64 2.667 2.667 8.64 2.667 16c0 2.35.635 4.548 1.74 6.447L2.667 29.333l7.08-1.713A13.267 13.267 0 0016.004 29.333C23.36 29.333 29.333 23.36 29.333 16S23.36 2.667 16.004 2.667zm0 2.4c5.916 0 10.933 5.017 10.933 10.933 0 5.916-5.017 10.933-10.933 10.933a10.9 10.9 0 01-5.577-1.527l-.4-.237-4.197 1.016 1.063-3.963-.26-.41A10.89 10.89 0 015.07 16c0-5.916 5.017-10.933 10.933-10.933zm-3.014 5.6c-.2 0-.52.075-.793.375-.273.3-1.04.997-1.04 2.43 0 1.434 1.065 2.82 1.213 3.015.148.194 2.07 3.25 5.078 4.436 2.507.984 3.016.789 3.559.741.543-.048 1.751-.707 2-.1.394-.249.59-.736.59-1.174v-1.6c0-.2-.13-.43-.394-.556-.264-.126-1.562-.727-1.804-.811-.242-.084-.418-.126-.594.126-.176.252-.682.81-.836.986-.153.175-.307.198-.57.074-.263-.125-1.11-.405-2.116-1.293-.782-.69-1.31-1.545-1.464-1.797-.153-.252-.016-.389.115-.514.118-.113.263-.295.395-.442.13-.147.174-.252.263-.42.087-.168.044-.315-.023-.441-.066-.126-.59-1.433-.813-1.96-.214-.512-.43-.44-.59-.448l-.503-.009z" />
                      </svg>
                    </div>
                    <span style={{ fontWeight: 700, color: C.onSurface, fontSize: 14 }}>WhatsApp</span>
                  </motion.a>
                </div>
              </SectionReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Map ── */}
      <section style={{ width: '100%', height: 480, position: 'relative', overflow: 'hidden', background: C.surface }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuALspmfRNKmbavP8HBHdf9ph0B9jfNdqGjRazmziKp15ZcJ7l_w3X0LJBroUMTFYFln29hv-zOSk9n6NnLwdVc8dpVtWppuEPafEpxWvDwzpYV74ZcZXQc5lneL73Nldi9d7WxE6URlpaZZMGzxYzFwIium5wVAx93hJ9w5Wix7t4kwM2m_8ApTFtEbLY2AGsYzQAnsiJ9HcRsTHLIldFzaTuhS8WZhubAxdwnwWSxFL8xIgTeBx3RFZRjgWFVQt-y8G2kMW3e8ceiC')`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          filter: 'grayscale(0.3)', transition: 'filter 0.7s',
        }} />
        <motion.div
          style={{
            position: 'absolute', top: 32, left: 32, zIndex: 20,
            background: 'rgba(255,255,255,0.93)', backdropFilter: 'blur(12px)',
            padding: 24, borderRadius: 16, border: `1px solid ${C.outlineVar}`,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)', maxWidth: 320,
          }}
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}>
          <h4 style={{ fontWeight: 700, color: C.primary, fontSize: 18, marginBottom: 8 }}>Visit Dr. Rama</h4>
          <p style={{ color: C.outline, fontSize: 14, marginBottom: 16, lineHeight: 1.6 }}>
            Located in the heart of the Medical Plaza. Valet parking is available for all patients.
          </p>
          <motion.a href="https://maps.google.com" target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: 8, color: C.orange, fontWeight: 700, fontSize: 14, textDecoration: 'none' }}
            whileHover={{ x: 3 }}>
            Get Directions <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
          </motion.a>
        </motion.div>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 10 }}>
          <div style={{ position: 'relative' }}>
            <motion.div style={{ width: 32, height: 32, background: C.primary, borderRadius: '50%', border: '4px solid white', boxShadow: '0 4px 16px rgba(0,70,116,0.4)' }}
              animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} />
            <motion.div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: C.primary }}
              animate={{ scale: [1, 2.5], opacity: [0.4, 0] }} transition={{ duration: 2, repeat: Infinity }} />
          </div>
        </div>
      </section>
    </div>
  );
}