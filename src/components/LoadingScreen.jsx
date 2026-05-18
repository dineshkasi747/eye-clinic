import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IMAGES } from '../assets/images';

export default function LoadingScreen({ onDone }) {
  const isFirstVisit = !sessionStorage.getItem('visited');
  const videoRef = useRef(null);
  const [visible, setVisible] = useState(true);

  const dismiss = () => setVisible(false);

  useEffect(() => {
    sessionStorage.setItem('visited', '1');

    if (isFirstVisit) {
      const video = videoRef.current;
      if (video) video.addEventListener('ended', dismiss);
      const timer = setTimeout(dismiss, 7000);
      return () => {
        if (video) video.removeEventListener('ended', dismiss);
        clearTimeout(timer);
      };
    } else {
      const timer = setTimeout(dismiss, 900);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          key="loading"
          className="fixed inset-0 z-[9999] overflow-hidden"
          style={{ background: isFirstVisit ? '#001d35' : '#ffffff' }}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: isFirstVisit ? 0.8 : 0.35, ease: [0.4, 0, 0.2, 1] },
          }}
        >
          {isFirstVisit ? (
            <>
              {/* ── FIRST VISIT: full video ── */}
              <video
                ref={videoRef}
                src="/loading.mp4"
                autoPlay
                muted
                playsInline
                style={{
                  position: 'absolute',
                  top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                  height: '100vh', width: '100vw',
                  objectFit: 'cover',
                }}
              />

              {/* Cinematic overlay */}
              <div className="absolute inset-0" style={{
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.05) 60%, rgba(0,0,0,0.55) 100%)',
                zIndex: 1,
              }} />

              {/* Loading dots */}
              <motion.div
                className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
                style={{ zIndex: 2 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                <div className="flex gap-2">
                  {[0, 1, 2].map((i) => (
                    <motion.div key={i}
                      style={{ width: 8, height: 8, borderRadius: '50%', background: '#fe8949' }}
                      animate={{ scale: [1, 1.6, 1], opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
                    />
                  ))}
                </div>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.4em' }}>
                  Loading
                </p>
              </motion.div>

              {/* Progress bar */}
              <motion.div
                className="absolute bottom-0 left-0 h-1"
                style={{ background: '#fe8949', zIndex: 2 }}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 7, ease: 'linear' }}
              />

              {/* Skip */}
              <motion.button
                className="absolute bottom-6 right-6 flex items-center gap-1.5 transition-colors"
                style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', zIndex: 3, background: 'none', border: 'none', cursor: 'pointer' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                onClick={dismiss}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.9)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
              >
                Skip
                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>arrow_forward</span>
              </motion.button>
            </>
          ) : (
            /* ── RETURN VISIT: white bg + logo + thin orange bar ── */
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6"
              style={{ background: '#ffffff' }}>

              {/* Logo + name */}
              <motion.div
                className="flex flex-col items-center gap-4"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Logo image */}
                <motion.img
                  src={IMAGES.logo}
                  alt="Dr. Rama's Eye Clinic"
                  style={{ height: 72, width: 'auto', objectFit: 'contain' }}
                  animate={{ scale: [0.92, 1.04, 1] }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* Clinic name */}
                <div style={{ textAlign: 'center', lineHeight: 1 }}>
                  <p style={{ color: '#004674', fontSize: 26, fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 4 }}>
                    Dr. Rama's
                  </p>
                  <p style={{ color: '#fe8949', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.28em' }}>
                    Eye Clinic
                  </p>
                </div>

                {/* Tagline */}
                <p style={{ color: '#c1c7d1', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em' }}>
                  Your Vision. Our Priority.
                </p>
              </motion.div>

              {/* Thin animated progress bar */}
              <motion.div
                style={{ width: 140, height: 3, background: '#f0edec', borderRadius: 99, overflow: 'hidden' }}
              >
                <motion.div
                  style={{ height: '100%', background: '#fe8949', borderRadius: 99 }}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.9, ease: 'easeInOut' }}
                />
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}