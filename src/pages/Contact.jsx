import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { sendBookingConfirmation } from '../api/sendConfirmation';

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
  { day: 'Friday', time: '8:00 AM – 4:00 PM', active: true },
  { day: 'Saturday', time: '9:00 AM – 1:00 PM', active: true },
  { day: 'Sunday', time: 'Closed', active: false },
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
    name: '',
    email: '',
    phone: '',
    service: 'General Inquiry',
    date: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setStatus('loading');
    const result = await sendBookingConfirmation(form);
    setStatus(result.success ? 'success' : 'error');
  };

  const inputBase =
    'w-full bg-surface-container-low border-b-2 border-outline-variant rounded-t-lg px-4 py-3 text-on-surface text-sm outline-none transition-all duration-200 placeholder:text-outline font-body';

  return (
    <div className="pt-20 bg-background overflow-x-hidden">

      {/* ── Hero ── */}
      <section className="relative py-24 bg-surface-container-low overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-DEFAULT rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-DEFAULT rounded-full blur-[100px]" />
        </div>
        <div className="max-w-clinic mx-auto px-6 md:px-16 relative z-10">
          <SectionReveal className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-black text-primary-DEFAULT mb-4 leading-tight">
              Precision Care for Every Vision.
            </h1>
            <p className="text-on-surface-variant text-lg leading-relaxed">
              Contact Dr. Rama's Eye Clinic. Whether it's a routine check-up or advanced surgery,
              we're here to provide high-definition clarity for your life.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ── Main Grid ── */}
      <section className="py-16 max-w-clinic mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* ── Form ── */}
          <SectionReveal className="lg:col-span-7">
            <div className="bg-white border border-outline-variant p-8 rounded-2xl shadow-sm">
              <h2 className="text-2xl font-black text-primary-DEFAULT mb-1">Send a Message</h2>
              <p className="text-on-surface-variant text-sm mb-8">
                We'll get back to you within 24 business hours.
              </p>

              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center py-12 gap-4"
                >
                  <div className="w-20 h-20 rounded-full bg-primary-DEFAULT/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-5xl text-primary-DEFAULT">check_circle</span>
                  </div>
                  <h3 className="text-xl font-bold text-on-surface">Request Received!</h3>
                  <p className="text-on-surface-variant max-w-sm">
                    A confirmation email has been sent to <strong>{form.email}</strong>. Our team will
                    contact you within 24 hours.
                  </p>
                  <motion.button
                    onClick={() => { setStatus('idle'); setForm({ name: '', email: '', phone: '', service: 'General Inquiry', date: '', message: '' }); }}
                    className="mt-4 bg-primary-DEFAULT text-white px-8 py-3 rounded-full font-bold"
                    whileTap={{ scale: 0.96 }}
                  >
                    Send Another
                  </motion.button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { name: 'name', label: 'Full Name', placeholder: 'Dr. John Doe', type: 'text', required: true },
                      { name: 'email', label: 'Email Address', placeholder: 'john@example.com', type: 'email', required: true },
                      { name: 'phone', label: 'Phone Number', placeholder: '+91 98765 43210', type: 'tel' },
                      { name: 'date', label: 'Preferred Date', placeholder: '', type: 'date' },
                    ].map((f) => (
                      <div key={f.name} className="flex flex-col gap-1.5">
                        <label className={`text-xs font-bold uppercase tracking-wider transition-colors ${focusedField === f.name ? 'text-secondary-DEFAULT' : 'text-primary-DEFAULT'}`}>
                          {f.label}{f.required && <span className="text-error ml-0.5">*</span>}
                        </label>
                        <input
                          type={f.type}
                          name={f.name}
                          value={form[f.name]}
                          onChange={handleChange}
                          onFocus={() => setFocusedField(f.name)}
                          onBlur={() => setFocusedField(null)}
                          placeholder={f.placeholder}
                          required={f.required}
                          className={`${inputBase} ${focusedField === f.name ? 'border-primary-DEFAULT bg-primary-DEFAULT/5' : ''}`}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className={`text-xs font-bold uppercase tracking-wider transition-colors ${focusedField === 'service' ? 'text-secondary-DEFAULT' : 'text-primary-DEFAULT'}`}>
                      Reason for Inquiry
                    </label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('service')}
                      onBlur={() => setFocusedField(null)}
                      className={`${inputBase} appearance-none cursor-pointer ${focusedField === 'service' ? 'border-primary-DEFAULT bg-primary-DEFAULT/5' : ''}`}
                    >
                      {INQUIRY_TYPES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className={`text-xs font-bold uppercase tracking-wider transition-colors ${focusedField === 'message' ? 'text-secondary-DEFAULT' : 'text-primary-DEFAULT'}`}>
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="How can we help you today?"
                      rows={4}
                      className={`${inputBase} resize-none ${focusedField === 'message' ? 'border-primary-DEFAULT bg-primary-DEFAULT/5' : ''}`}
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-error text-sm flex items-center gap-2">
                      <span className="material-symbols-outlined text-base">error</span>
                      Something went wrong. Please try again or call us directly.
                    </p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-primary-DEFAULT text-white font-bold py-4 rounded-xl text-base shadow-md disabled:opacity-60 flex items-center justify-center gap-2"
                    whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {status === 'loading' ? (
                      <>
                        <motion.span
                          className="material-symbols-outlined text-base"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        >
                          progress_activity
                        </motion.span>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <span className="material-symbols-outlined text-base">send</span>
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </SectionReveal>

          {/* ── Info Column ── */}
          <div className="lg:col-span-5 flex flex-col gap-5">

            {/* Clinic info */}
            <SectionReveal delay={0.1}>
              <div className="bg-primary-DEFAULT text-white p-8 rounded-2xl">
                <h3 className="text-xl font-bold mb-6">Clinic Info</h3>
                <div className="space-y-5">
                  {[
                    { icon: 'location_on', text: '123 Visionary Ave, Clinic District\nVisakhapatnam, AP 530001' },
                    { icon: 'phone', text: '+91 (80) 2345 6789' },
                    { icon: 'mail', text: 'hello@drramaseye.com' },
                  ].map(({ icon, text }) => (
                    <div key={icon} className="flex items-start gap-4">
                      <span className="material-symbols-outlined text-secondary-fixed flex-shrink-0 mt-0.5">{icon}</span>
                      <p className="text-white/80 text-sm leading-relaxed whitespace-pre-line">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </SectionReveal>

            {/* Emergency */}
            <SectionReveal delay={0.15}>
              <div className="bg-tertiary-container text-white p-8 rounded-2xl border-l-8 border-tertiary">
                <div className="flex items-center gap-3 mb-3">
                  <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>error</span>
                  <h3 className="text-xl font-bold">Emergency Care</h3>
                </div>
                <p className="text-white/85 text-sm mb-4 leading-relaxed">
                  In case of a severe eye injury or sudden vision loss, please visit our 24/7 urgent care
                  unit or call our emergency line immediately.
                </p>
                <p className="text-2xl font-black text-white">911 or +1 (555) 999-0000</p>
              </div>
            </SectionReveal>

            {/* Office hours */}
            <SectionReveal delay={0.2}>
              <div className="bg-surface-container border border-outline-variant p-8 rounded-2xl">
                <h3 className="text-xl font-bold text-primary-DEFAULT mb-6">Office Hours</h3>
                <ul className="space-y-3">
                  {OFFICE_HOURS.map(({ day, time, active }) => (
                    <li
                      key={day}
                      className={`flex justify-between border-b border-outline-variant/30 pb-3 text-sm ${active ? 'text-on-surface' : 'text-outline'}`}
                    >
                      <span className={active ? 'font-bold' : ''}>{day}</span>
                      <span>{time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </SectionReveal>

            {/* Quick contact */}
            <SectionReveal delay={0.25}>
              <div className="grid grid-cols-2 gap-4">
                <motion.a
                  href="tel:+918023456789"
                  className="bg-surface-container-low border border-outline-variant rounded-2xl p-5 flex flex-col items-center text-center gap-3 hover:border-primary-DEFAULT hover:shadow-md transition-all"
                  whileHover={{ y: -3 }}
                >
                  <span className="material-symbols-outlined text-primary-DEFAULT text-3xl">call</span>
                  <span className="font-bold text-on-surface text-sm">Call Now</span>
                </motion.a>
                <motion.a
                  href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '918023456789'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-surface-container-low border border-outline-variant rounded-2xl p-5 flex flex-col items-center text-center gap-3 hover:border-[#25D366] hover:shadow-md transition-all"
                  whileHover={{ y: -3 }}
                >
                  <div className="w-8 h-8">
                    <svg viewBox="0 0 32 32" fill="#25D366">
                      <path d="M16.004 2.667C8.64 2.667 2.667 8.64 2.667 16c0 2.35.635 4.548 1.74 6.447L2.667 29.333l7.08-1.713A13.267 13.267 0 0016.004 29.333C23.36 29.333 29.333 23.36 29.333 16S23.36 2.667 16.004 2.667zm0 2.4c5.916 0 10.933 5.017 10.933 10.933 0 5.916-5.017 10.933-10.933 10.933a10.9 10.9 0 01-5.577-1.527l-.4-.237-4.197 1.016 1.063-3.963-.26-.41A10.89 10.89 0 015.07 16c0-5.916 5.017-10.933 10.933-10.933zm-3.014 5.6c-.2 0-.52.075-.793.375-.273.3-1.04.997-1.04 2.43 0 1.434 1.065 2.82 1.213 3.015.148.194 2.07 3.25 5.078 4.436 2.507.984 3.016.789 3.559.741.543-.048 1.751-.707 2-.1.394-.249.59-.736.59-1.174v-1.6c0-.2-.13-.43-.394-.556-.264-.126-1.562-.727-1.804-.811-.242-.084-.418-.126-.594.126-.176.252-.682.81-.836.986-.153.175-.307.198-.57.074-.263-.125-1.11-.405-2.116-1.293-.782-.69-1.31-1.545-1.464-1.797-.153-.252-.016-.389.115-.514.118-.113.263-.295.395-.442.13-.147.174-.252.263-.42.087-.168.044-.315-.023-.441-.066-.126-.59-1.433-.813-1.96-.214-.512-.43-.44-.59-.448l-.503-.009z" />
                    </svg>
                  </div>
                  <span className="font-bold text-on-surface text-sm">WhatsApp</span>
                </motion.a>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ── Map ── */}
      <section className="w-full h-[480px] relative overflow-hidden bg-surface-container-high">
        {/* Map image */}
        <div
          className="absolute inset-0 grayscale-[0.4] hover:grayscale-0 transition-all duration-700 bg-cover bg-center"
          style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuALspmfRNKmbavP8HBHdf9ph0B9jfNdqGjRazmziKp15ZcJ7l_w3X0LJBroUMTFYFln29hv-zOSk9n6NnLwdVc8dpVtWppuEPafEpxWvDwzpYV74ZcZXQc5lneL73Nldi9d7WxE6URlpaZZMGzxYzFwIium5wVAx93hJ9w5Wix7t4kwM2m_8ApTFtEbLY2AGsYzQAnsiJ9HcRsTHLIldFzaTuhS8WZhubAxdwnwWSxFL8xIgTeBx3RFZRjgWFVQt-y8G2kMW3e8ceiC')` }}
        />

        {/* Overlay card */}
        <motion.div
          className="absolute top-8 left-8 z-20 bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-outline-variant shadow-xl max-w-sm hidden md:block"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h4 className="font-bold text-primary-DEFAULT text-lg mb-2">Visit Dr. Rama</h4>
          <p className="text-on-surface-variant text-sm mb-4 leading-relaxed">
            Located in the heart of the Medical Plaza. Valet parking is available for all patients.
          </p>
          <motion.a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-secondary-DEFAULT font-bold text-sm hover:underline"
            whileHover={{ x: 3 }}
          >
            Get Directions{' '}
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </motion.a>
        </motion.div>

        {/* Pulsing pin */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="relative">
            <motion.div
              className="w-8 h-8 bg-primary-DEFAULT rounded-full border-4 border-white shadow-xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-0 rounded-full bg-primary-DEFAULT"
              animate={{ scale: [1, 2.5], opacity: [0.4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}