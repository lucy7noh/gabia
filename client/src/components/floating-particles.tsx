import { motion } from "framer-motion";

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  animationDelay: Math.random() * 8,
  duration: 8 + Math.random() * 4,
  size: 2 + Math.random() * 4,
}));

export default function FloatingParticles() {
  return (
    <div className="floating-particles">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.left}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.animationDelay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
