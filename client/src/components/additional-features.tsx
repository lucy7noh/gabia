import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Star } from "lucide-react";

export default function AdditionalFeatures() {
  const { toast } = useToast();

  const handleRandomFortune = () => {
    // 창의적인 즉석 운세 생성
    const fortuneTypes = ["오늘", "이번 주", "당신의 마음", "숨겨진 가능성", "다가올 변화"];
    const subjects = ["사랑", "일", "건강", "인간관계", "성장", "행운", "기회", "도전"];
    const predictions = [
      "밝은 에너지가 감싸고 있어요",
      "새로운 전환점이 다가오고 있습니다", 
      "예상치 못한 기쁨이 찾아올 거예요",
      "작은 변화가 큰 행복을 부를 것입니다",
      "직감을 믿고 나아가세요",
      "따뜻한 만남이 기다리고 있어요",
      "창의적인 아이디어가 떠오를 거예요",
      "평온한 시간이 필요한 때입니다",
      "용기를 내면 좋은 결과가 있을 거예요",
      "감사하는 마음이 더 큰 복을 부를 것입니다"
    ];

    const randomType = fortuneTypes[Math.floor(Math.random() * fortuneTypes.length)];
    const randomSubject = subjects[Math.floor(Math.random() * subjects.length)];
    const randomPrediction = predictions[Math.floor(Math.random() * predictions.length)];
    
    const fortune = `${randomType}의 ${randomSubject}에 ${randomPrediction}`;
    
    toast({
      title: "✨ 즉석 운세",
      description: fortune,
    });
  };

  return (
    <motion.div
      className="flex justify-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Random Fortune */}
      <motion.div 
        className="glass-card rounded-2xl p-6 text-center max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      >
        <motion.div 
          className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-mystical-600 to-cosmic-500 flex items-center justify-center"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          <Star className="w-6 h-6 text-white" />
        </motion.div>
        <h4 className="text-xl font-semibold text-white mb-3">즉석 운세</h4>
        <p className="text-mystical-200 mb-4">지금 이 순간의 특별한 메시지</p>
          <Button
            onClick={handleRandomFortune}
            className="
              bg-mystical-purple 
              text-white 
              px-6 
              py-3 
              rounded-full 
              shadow-md 
              hover:bg-mystical-purple 
              hover:shadow-lg 
              transition 
              duration-300 
              border 
              border-white/20" >
              운세 뽑기 버튼
        </Button>
      </motion.div>
    </motion.div>
  );
}
