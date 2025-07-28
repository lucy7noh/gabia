import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface Answer {
  id: string;
  question: string;
  answer: string;
  createdAt: string;
}

interface QuestionFormProps {
  onAnswerReceived: (answer: Answer) => void;
  onAnimationStart: () => void;
  onAnimationEnd: () => void;
  disabled: boolean;
}

export default function QuestionForm({ 
  onAnswerReceived, 
  onAnimationStart, 
  onAnimationEnd,
  disabled 
}: QuestionFormProps) {
  const [question, setQuestion] = useState("");
  const { toast } = useToast();

  const askMutation = useMutation({
    mutationFn: async (question: string) => {
      const response = await apiRequest("POST", "/api/ask", { question });
      return response.json();
    },
    onSuccess: async (data: Answer) => {
      // Start animation sequence
      onAnimationStart();
      
      // Wait for animation to complete before showing answer
      setTimeout(() => {
        onAnswerReceived(data);
        onAnimationEnd();
      }, 3800); // Total animation duration
      
      // Clear input
      setQuestion("");
    },
    onError: (error) => {
      toast({
        title: "오류가 발생했습니다",
        description: error instanceof Error ? error.message : "질문 처리 중 문제가 발생했습니다",
        variant: "destructive",
      });
      onAnimationEnd();
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question.trim()) {
      toast({
        title: "질문을 입력해주세요",
        description: "마음속 깊은 질문을 들려주세요",
        variant: "destructive",
      });
      return;
    }

    if (question.length > 500) {
      toast({
        title: "질문이 너무 깁니다",
        description: "500자 이내로 입력해주세요",
        variant: "destructive",
      });
      return;
    }

    askMutation.mutate(question);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="마음속 깊은 질문을 입력해주세요..."
        className="question-input w-full h-32 px-6 py-4 rounded-2xl text-white placeholder-mystical-300 resize-none text-lg focus:outline-none transition-all duration-300 border-none"
        disabled={disabled || askMutation.isPending}
        maxLength={500}
      />
      
      <div className="flex justify-between items-center mt-2 mb-6">
        <span className="text-mystical-300 text-sm">
          {question.length}/500
        </span>
        {question.trim() && (
          <motion.span
            className="text-mystical-200 text-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            Enter로 질문하기 (Shift+Enter로 줄바꿈)
          </motion.span>
        )}
      </div>

<Button
  type="submit"
  disabled={disabled || askMutation.isPending || !question.trim()}
  className="
    w-full 
    py-4 
    px-8 
    rounded-full 
    font-semibold 
    text-lg 
    text-white 
    bg-gradient-to-r 
    from-mystical-purple 
    via-pink-400 
    to-mystical-blue 
    shadow-[0_0_20px_rgba(192,132,252,0.5)] 
    hover:brightness-110 
    hover:scale-105 
    transition-all 
    duration-300 
    focus:outline-none 
    focus:ring-4 
    focus:ring-mystical-purple/50
  "
>
  {askMutation.isPending ? (
    <motion.span
      animate={{ opacity: [1, 0.5, 1] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      🔮 마법을 부리는 중...
    </motion.span>
  ) : (
    "🔮 질문하기"
  )}
</Button>

    </motion.form>
  );
}