import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface MysticalOrbProps {
  isAnimating: boolean;
  onAnimationEnd: () => void;
}

export default function MysticalOrb({ isAnimating, onAnimationEnd }: MysticalOrbProps) {
  const [animationStep, setAnimationStep] = useState<'idle' | 'shake' | 'glow' | 'smoke' | 'explosion'>('idle');

  useEffect(() => {
    if (!isAnimating) {
      setAnimationStep('idle');
      return;
    }

    // Animation sequence
    const sequence = async () => {
      // Step 1: Shake
      setAnimationStep('shake');
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Step 2: Glow
      setAnimationStep('glow');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Step 3: Smoke
      setAnimationStep('smoke');
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Step 4: Explosion
      setAnimationStep('explosion');
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // End animation
      setAnimationStep('idle');
      onAnimationEnd();
    };

    sequence();
  }, [isAnimating, onAnimationEnd]);

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Multiple Enhanced Smoke Effects */}
      <AnimatePresence>
        {animationStep === 'smoke' && (
          <>
            {/* Primary Purple Smoke */}
            <motion.div
              className="absolute w-96 h-96 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(139, 92, 246, 0.2) 40%, transparent 70%)',
              }}
              initial={{ opacity: 0, scale: 0.3, y: 0 }}
              animate={{ 
                opacity: [0, 0.8, 0.6, 0], 
                scale: [0.3, 1.2, 1.8, 2.5], 
                y: [0, -20, -40, -80] 
              }}
              exit={{ opacity: 0, scale: 3, y: -120 }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
            
            {/* Secondary Wispy Smoke */}
            <motion.div
              className="absolute w-80 h-80 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, rgba(168, 85, 247, 0.1) 50%, transparent 80%)',
              }}
              initial={{ opacity: 0, scale: 0.5, y: 0, rotate: 0 }}
              animate={{ 
                opacity: [0, 0.6, 0.4, 0], 
                scale: [0.5, 1.0, 1.5, 2.0], 
                y: [0, -15, -30, -60],
                rotate: [0, 180, 360] 
              }}
              exit={{ opacity: 0, scale: 2.5, y: -100 }}
              transition={{ duration: 2.2, ease: "easeOut", delay: 0.2 }}
            />

            {/* Sparkling Particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full pointer-events-none"
                style={{
                  background: `radial-gradient(circle, rgba(245, 158, 11, 0.8) 0%, transparent 100%)`,
                  left: `${45 + Math.cos(i * 45 * Math.PI / 180) * 30}%`,
                  top: `${45 + Math.sin(i * 45 * Math.PI / 180) * 30}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 0], 
                  scale: [0, 1, 0.5],
                  y: [0, -50 - Math.random() * 50],
                  x: [(Math.random() - 0.5) * 40]
                }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 1.5 + Math.random() * 0.5, 
                  ease: "easeOut", 
                  delay: Math.random() * 0.8 
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Explosion Effect */}
      <AnimatePresence>
        {animationStep === 'explosion' && (
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(245, 158, 11, 0.9) 0%, rgba(139, 92, 246, 0.7) 20%, rgba(168, 85, 247, 0.4) 50%, transparent 80%)',
            }}
            initial={{ scale: 0, opacity: 1, rotate: 0 }}
            animate={{ 
              scale: [0, 1.2, 2.0], 
              opacity: [1, 0.9, 0],
              rotate: [0, 180]
            }}
            exit={{ scale: 3, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      {/* Main Crystal Ball */}
      <motion.div
        className="mystical-orb relative z-10 hover:scale-105 transition-transform duration-300"
        animate={{
          x: animationStep === 'shake' ? [-15, 15, -10, 10, -5, 5, 0] : 0,
          y: animationStep === 'idle' ? [0, -25, 0] : 0,
          scale: animationStep === 'glow' ? [1, 1.05, 1] : 1,
        }}
        transition={{
          x: { duration: 0.6, ease: "easeInOut" },
          y: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 2, repeat: animationStep === 'glow' ? Infinity : 0, ease: "easeInOut" },
        }}
      >
        {/* Inner Cosmic Effect */}
        <div className="absolute inset-4 rounded-full animate-cosmic-swirl opacity-80" 
             style={{
               background: `
                 radial-gradient(circle at 30% 40%, rgba(255, 255, 255, 0.6) 0%, transparent 8%),
                 radial-gradient(circle at 70% 20%, rgba(147, 51, 234, 0.7) 0%, transparent 12%),
                 radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.5) 0%, transparent 15%),
                 radial-gradient(circle at 80% 70%, rgba(245, 158, 11, 0.4) 0%, transparent 8%),
                 radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.3) 0%, transparent 20%)
               `
             }}
        />
      </motion.div>

      {/* Crystal Ball Base */}
      <motion.div 
        className="mystical-orb-base z-0"
        animate={{
          y: animationStep === 'idle' ? [0, -15, 0] : 0,
        }}
        transition={{
          y: { duration: 8, repeat: Infinity, ease: "easeInOut" },
        }}
      />
    </div>
  );
}
