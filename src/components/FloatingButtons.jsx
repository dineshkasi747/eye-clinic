import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WA_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '918023456789';
const PHONE = import.meta.env.VITE_CLINIC_PHONE || '+918023456789';

export default function FloatingButtons() {
  const [tooltip, setTooltip] = useState(null); // 'phone' | 'whatsapp' | null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

      {/* ── Phone Button ── */}
      <div className="relative flex items-center gap-3">
        <AnimatePresence>
          {tooltip === 'phone' && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.9 }}
              transition={{ duration: 0.18 }}
              className="text-white text-xs font-bold px-4 py-2 rounded-full whitespace-nowrap"
              style={{ background: '#004674', boxShadow: '0 4px 16px rgba(0,70,116,0.35)' }}
            >
              Call Us Now
            </motion.div>
          )}
        </AnimatePresence>

        <motion.a
          href={`tel:${PHONE}`}
          aria-label="Call Dr. Rama's Eye Clinic"
          onMouseEnter={() => setTooltip('phone')}
          onMouseLeave={() => setTooltip(null)}
          onTouchStart={() => setTooltip('phone')}
          className="relative flex items-center justify-center rounded-full text-white"
          style={{
            width: 52,
            height: 52,
            background: '#004674',
            boxShadow: '0 4px 20px rgba(0,70,116,0.4)',
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.8 }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.92 }}
        >
          {/* Pulse ring */}
          <motion.span
            className="absolute inset-0 rounded-full"
            style={{ background: '#004674' }}
            animate={{ scale: [1, 1.8], opacity: [0.45, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.3 }}
          />
          <span
            className="material-symbols-outlined relative z-10"
            style={{ fontSize: 22, fontVariationSettings: "'FILL' 1" }}
          >
            call
          </span>
        </motion.a>
      </div>

      {/* ── WhatsApp Button ── */}
      <div className="relative flex items-center gap-3">
        <AnimatePresence>
          {tooltip === 'whatsapp' && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.9 }}
              transition={{ duration: 0.18 }}
              className="text-white text-xs font-bold px-4 py-2 rounded-full whitespace-nowrap"
              style={{ background: '#075e54', boxShadow: '0 4px 16px rgba(7,94,84,0.35)' }}
            >
              Chat on WhatsApp
            </motion.div>
          )}
        </AnimatePresence>

        <motion.a
          href={`https://wa.me/${WA_NUMBER}?text=Hello%2C%20I%20would%20like%20to%20book%20an%20appointment%20at%20Dr.%20Rama%27s%20Eye%20Clinic.`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp Dr. Rama's Eye Clinic"
          onMouseEnter={() => setTooltip('whatsapp')}
          onMouseLeave={() => setTooltip(null)}
          onTouchStart={() => setTooltip('whatsapp')}
          className="relative flex items-center justify-center rounded-full"
          style={{
            width: 60,
            height: 60,
            background: '#25D366',
            boxShadow: '0 4px 20px rgba(37,211,102,0.45)',
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 1 }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.92 }}
        >
          {/* Outer pulse */}
          <motion.span
            className="absolute inset-0 rounded-full"
            style={{ background: '#25D366' }}
            animate={{ scale: [1, 1.8], opacity: [0.45, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
          />
          {/* Inner pulse */}
          <motion.span
            className="absolute inset-0 rounded-full"
            style={{ background: '#25D366' }}
            animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
          />

          {/* WhatsApp SVG icon */}
          <svg
            viewBox="0 0 32 32"
            fill="white"
            className="relative z-10"
            style={{ width: 30, height: 30 }}
          >
            <path d="M16.004 2.667C8.64 2.667 2.667 8.64 2.667 16c0 2.35.635 4.548 1.74 6.447L2.667 29.333l7.08-1.713A13.267 13.267 0 0016.004 29.333C23.36 29.333 29.333 23.36 29.333 16S23.36 2.667 16.004 2.667zm0 2.4c5.916 0 10.933 5.017 10.933 10.933 0 5.916-5.017 10.933-10.933 10.933a10.9 10.9 0 01-5.577-1.527l-.4-.237-4.197 1.016 1.063-3.963-.26-.41A10.89 10.89 0 015.07 16c0-5.916 5.017-10.933 10.933-10.933zm-3.014 5.6c-.2 0-.52.075-.793.375-.273.3-1.04.997-1.04 2.43 0 1.434 1.065 2.82 1.213 3.015.148.194 2.07 3.25 5.078 4.436 2.507.984 3.016.789 3.559.741.543-.048 1.751-.707 2-.1.394-.249.59-.736.59-1.174v-1.6c0-.2-.13-.43-.394-.556-.264-.126-1.562-.727-1.804-.811-.242-.084-.418-.126-.594.126-.176.252-.682.81-.836.986-.153.175-.307.198-.57.074-.263-.125-1.11-.405-2.116-1.293-.782-.69-1.31-1.545-1.464-1.797-.153-.252-.016-.389.115-.514.118-.113.263-.295.395-.442.13-.147.174-.252.263-.42.087-.168.044-.315-.023-.441-.066-.126-.59-1.433-.813-1.96-.214-.512-.43-.44-.59-.448l-.503-.009z" />
          </svg>
        </motion.a>
      </div>
    </div>
  );
}