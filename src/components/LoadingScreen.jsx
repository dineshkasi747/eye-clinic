import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MAX_DURATION = 6000;

export default function LoadingScreen({ onDone }) {
  const videoRef = useRef(null);
  const [visible, setVisible] = useState(true);

  const dismiss = () => setVisible(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.addEventListener('ended', dismiss);
    const timer = setTimeout(dismiss, MAX_DURATION);
    return () => {
      video.removeEventListener('ended', dismiss);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          key="loading"
          className="fixed inset-0 z-[9999] overflow-hidden"
          style={{ background: '#000' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } }}
        >
          {/* Video — scaled to 100% height so portrait video fills screen top to bottom */}
          <video
            ref={videoRef}
            src="/loading.mp4"
            autoPlay
            muted
            playsInline
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              height: '100vh',
              width: '100vw',
              objectFit: 'cover',
            }}
          />

          {/* Cinematic dark overlay — makes it feel like a loading screen not a plain video */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0.6) 100%)',
              zIndex: 1,
            }}
          />

          {/* Loading indicator — bottom center */}
          <motion.div
            className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
            style={{ zIndex: 2 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {/* Animated dots */}
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full"
                  style={{ background: '#fe8949' }}
                  animate={{ scale: [1, 1.6, 1], opacity: [0.4, 1, 0.4] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>
            <p
              className="text-xs font-black uppercase tracking-[0.4em]"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            >
              Loading
            </p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-1"
            style={{ background: '#fe8949', zIndex: 2 }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: MAX_DURATION / 1000, ease: 'linear' }}
          />

          {/* Skip */}
          <motion.button
            className="absolute bottom-6 right-6 text-white/40 hover:text-white text-xs font-black uppercase tracking-widest flex items-center gap-1.5 transition-colors"
            style={{ zIndex: 3 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            onClick={dismiss}
          >
            Skip
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}