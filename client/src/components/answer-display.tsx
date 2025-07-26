import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Share2, Download, Image } from "lucide-react";

interface Answer {
  id: string;
  question: string;
  answer: string;
  createdAt: string;
}

interface AnswerDisplayProps {
  answer: Answer;
}

export default function AnswerDisplay({ answer }: AnswerDisplayProps) {
  const { toast } = useToast();

  // 갤러리에 이미지로 저장하기
  const handleSaveAsImage = async () => {
    try {
      // Canvas를 사용하여 이미지 생성
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = 800;
      canvas.height = 600;

      // 배경 그라데이션 생성
      const gradient = ctx.createLinearGradient(0, 0, 800, 600);
      gradient.addColorStop(0, "#6B46C1");
      gradient.addColorStop(0.5, "#8B5CF6");
      gradient.addColorStop(1, "#A855F7");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 800, 600);

      // 제목 텍스트
      ctx.fillStyle = "#FFFFFF";
      ctx.font = 'bold 36px "Noto Sans KR", sans-serif';
      ctx.textAlign = "center";
      ctx.fillText("솜라고동의 답변", 400, 120);

      // 답변 텍스트
      ctx.font = '28px "Noto Sans KR", sans-serif';
      ctx.fillStyle = "#F3E8FF";

      // 텍스트 줄바꿈 처리
      const words = answer.answer.split(" ");
      let line = "";
      let y = 200;

      words.forEach((word) => {
        const testLine = line + word + " ";
        const metrics = ctx.measureText(testLine);

        if (metrics.width > 600 && line !== "") {
          ctx.fillText(line, 400, y);
          line = word + " ";
          y += 40;
        } else {
          line = testLine;
        }
      });
      ctx.fillText(line, 400, y);

      // 하단 텍스트
      ctx.font = '20px "Noto Sans KR", sans-serif';
      ctx.fillStyle = "#DDD6FE";
      ctx.fillText("- 2025 솜라고동 -", 400, 520);

      // 이미지를 Blob으로 변환하여 다운로드
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `솜라고동_답변_${new Date().getTime()}.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);

          toast({
            title: "이미지가 저장되었습니다",
            description: "갤러리에서 확인하실 수 있습니다",
          });
        }
      }, "image/png");
    } catch (error) {
      toast({
        title: "이미지 저장 중 오류가 발생했습니다",
        description: "잠시 후 다시 시도해주세요",
        variant: "destructive",
      });
    }
  };

  const handleShareAnswer = async () => {
    const shareText = `"${answer.answer}"\n\n- 솜라고동에서 ⭐`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "솜라고동의 답변",
          text: shareText,
          url: window.location.href,
        });
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          fallbackShare(shareText);
        }
      }
    } else {
      fallbackShare(shareText);
    }
  };

  const fallbackShare = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast({
          title: "답변이 복사되었습니다",
          description: "SNS에 붙여넣기하여 공유하세요",
        });
      })
      .catch(() => {
        toast({
          title: "공유 기능을 사용할 수 없습니다",
          description: "브라우저에서 지원하지 않는 기능입니다",
          variant: "destructive",
        });
      });
  };

  // 부적 이미지 만들기
  const handleCreateTalisman = async () => {
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = 400;
      canvas.height = 600;

      // 부적 배경 (노란색)
      ctx.fillStyle = "#FCD34D";
      ctx.fillRect(0, 0, 400, 600);

      // 테두리
      ctx.strokeStyle = "#DC2626";
      ctx.lineWidth = 8;
      ctx.strokeRect(20, 20, 360, 560);

      // 상단 장식
      ctx.fillStyle = "#DC2626";
      ctx.font = 'bold 24px "Noto Sans KR", sans-serif';
      ctx.textAlign = "center";
      ctx.fillText("행운", 200, 80);

      // 네잎클로버 간단한 그림 (텍스트로 대체)
      ctx.font = "60px serif";
      ctx.fillText("🍀", 200, 180);

      // 답변 텍스트
      ctx.font = '20px "Noto Sans KR", sans-serif';
      ctx.fillStyle = "#DC2626";

      // 텍스트 줄바꿈 처리
      const words = answer.answer.split(" ");
      let line = "";
      let y = 280;

      words.forEach((word) => {
        const testLine = line + word + " ";
        const metrics = ctx.measureText(testLine);

        if (metrics.width > 300 && line !== "") {
          ctx.fillText(line, 200, y);
          line = word + " ";
          y += 30;
        } else {
          line = testLine;
        }
      });
      ctx.fillText(line, 200, y);

      // 하단 텍스트
      ctx.font = 'bold 20px "Noto Sans KR", sans-serif';
      ctx.fillText("상승", 200, 540);

      // 부적 이미지 다운로드
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `솜라고동_부적_${new Date().getTime()}.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);

          toast({
            title: "부적이 만들어졌습니다",
            description: "갤러리에서 확인하세요 ✨",
          });
        }
      }, "image/png");
    } catch (error) {
      toast({
        title: "부적 만들기 중 오류가 발생했습니다",
        description: "잠시 후 다시 시도해주세요",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      className="glass-card rounded-3xl p-8 text-center"
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <motion.div
        className="mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
      >
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-ethereal-400 to-ethereal-500 flex items-center justify-center">
          <motion.span
            className="text-2xl"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            ✨
          </motion.span>
        </div>
        <h3
          className="text-2xl font-semibold text-white mb-2"
          style={{ fontFamily: "'Crimson Text', serif" }}
        >
          솜라고동의 답변
        </h3>
      </motion.div>

      <motion.p
        className="text-xl md:text-2xl text-mystical-100 leading-relaxed mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        "{answer.answer}"
      </motion.p>

      <motion.div
        className="flex flex-col sm:flex-row gap-4 justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        <Button
          onClick={handleSaveAsImage}
          className="mystical-button px-6 py-3 rounded-xl text-white font-medium border-none"
          variant="default"
        >
          <Download className="w-4 h-4 mr-2" />
          이미지로 저장
        </Button>

        <Button
          onClick={handleShareAnswer}
          className="mystical-button px-6 py-3 rounded-xl text-white font-medium border-none"
          variant="default"
        >
          <Share2 className="w-4 h-4 mr-2" />
          SNS 공유하기
        </Button>

        <Button
          onClick={handleCreateTalisman}
          className="mystical-button px-6 py-3 rounded-xl text-white font-medium border-none"
          variant="default"
        >
          <Image className="w-4 h-4 mr-2" />
          부적 만들기
        </Button>
      </motion.div>
    </motion.div>
  );
}
