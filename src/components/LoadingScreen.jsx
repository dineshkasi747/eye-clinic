import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IMAGES } from '../assets/images';

export default function LoadingScreen({ onDone }) {
  const isFirstVisit = !sessionStorage.getItem('visited');
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    sessionStorage.setItem('visited', '1');
    // First visit → slightly longer so it feels intentional
    // Return visit → snappy 800ms
    const duration = isFirstVisit ? 2200 : 800;
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          key="loading"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: '#ffffff' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } }}
        >
          {/* Logo */}
          <motion.div
            className="flex flex-col items-center gap-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.img
              src={IMAGES.logo}
              alt="Dr. Rama's Eye Clinic"
              style={{ height: 80, width: 'auto', objectFit: 'contain' }}
              animate={{ scale: [0.9, 1.05, 1] }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            />

            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#004674', fontSize: 28, fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 6 }}>
                Dr. Rama's
              </p>
              <p style={{ color: '#fe8949', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.3em' }}>
                Eye Clinic
              </p>
            </div>

            <p style={{ color: '#c1c7d1', fontSize: 12, fontWeight: 600, letterSpacing: '0.06em' }}>
              Your Vision. Our Priority.
            </p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            style={{
              position: 'absolute', bottom: 0, left: 0,
              height: 3, background: '#f0edec',
              width: '100%',
            }}
          >
            <motion.div
              style={{ height: '100%', background: '#fe8949', borderRadius: 99 }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{
                duration: isFirstVisit ? 2.2 : 0.8,
                ease: 'easeInOut',
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}