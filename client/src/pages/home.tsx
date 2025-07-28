import { useRef, useState } from "react";
import { motion } from "framer-motion";
import MysticalOrb from "../components/mystical-orb";
import QuestionForm from "../components/question-form";
import AnswerDisplay from "../components/answer-display";
import FloatingParticles from "../components/floating-particles";
import AdditionalFeatures from "../components/additional-features";

interface Answer {
  id: string;
  question: string;
  answer: string;
  createdAt: string;
}

export default function Home() {
  const [currentAnswer, setCurrentAnswer] = useState<Answer | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const answerRef = useRef<HTMLDivElement | null>(null); // ✅ ref 추가

  const handleAnswerReceived = (answer: Answer) => {
    setCurrentAnswer(answer);

    // ✅ 답변이 도착한 후 스크롤 이동
    setTimeout(() => {
      answerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 400); // animation 종료 시점 고려
  };

  const handleAnimationStart = () => {
    setIsAnimating(true);
    setCurrentAnswer(null);
  };

  const handleAnimationEnd = () => {
    setIsAnimating(false);
  };

  return (
    <div className="mystical-bg relative overflow-hidden min-h-screen">
      {/* 별 반짝이 배경 */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-accent rounded-full animate-sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <FloatingParticles />

      <div className="container mx-auto px-5 py-20 min-h-screen flex flex-col items-center justify-center relative z-10">
        {/* Header */}
        <motion.header
          className="text-center mb-20"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold text-white tracking-wide drop-shadow-glow font-cinzel mb-6"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <span className="text-purple-300">솜</span>라고동
          </motion.h1>

          <motion.p
            className="text-sm text-white md:text-2xl text-mystical-200 font-light tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            마법의 솜라고동이 당신의 질문에 답해드립니다!
          </motion.p>
        </motion.header>

        {/* Mystical Orb */}
        <motion.div
          className="mb-5"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
        >
          <MysticalOrb
            isAnimating={isAnimating}
            onAnimationEnd={handleAnimationEnd}
          />
        </motion.div>

        {/* Question Form */}
        <motion.div
          className="w-full max-w-2xl mb-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <QuestionForm
            onAnswerReceived={handleAnswerReceived}
            onAnimationStart={handleAnimationStart}
            onAnimationEnd={handleAnimationEnd}
            disabled={isAnimating}
          />
        </motion.div>

        {/* Answer Display */}
        {currentAnswer && (
          <motion.div
            ref={answerRef} // ✅ ref 연결
            className="w-full max-w-2xl mb-16 text-white"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <AnswerDisplay answer={currentAnswer} />
          </motion.div>
        )}

        {/* Additional Features */}
        <motion.div
          className="w-full max-w-4xl mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <AdditionalFeatures />
        </motion.div>

        {/* Footer */}
        <motion.footer
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <p className="text-mystical-300 text-sm">
            © 2025 솜라고동, 김가은 노윤선 제작 ☆
          </p>
        </motion.footer>
      </div>
    </div>
  );
}