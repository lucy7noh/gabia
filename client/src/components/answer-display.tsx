import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Share2, Download, Image as ImageIcon } from "lucide-react";

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
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = 800;
      canvas.height = 600;

      // 배경: 남보라 그라데이션
      const gradient = ctx.createLinearGradient(0, 0, 800, 600);
      gradient.addColorStop(0, "#1a1333"); // 어두운 보라
      gradient.addColorStop(1, "#3b0764"); // 짙은 자주
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 800, 600);

      // 별빛 효과
      for (let i = 0; i < 100; i++) {
        const x = Math.random() * 800;
        const y = Math.random() * 600;
        const radius = Math.random() * 1.5;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random()})`;
        ctx.fill();
      }

      // 제목 텍스트
      ctx.font = 'bold 32px "Crimson Text", serif';
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.shadowColor = "#f3e8ff";
      ctx.shadowBlur = 8;
      ctx.fillText("솜라고동의 답변", 400, 90);
      ctx.shadowBlur = 0; // 그림자 해제

      // 답변 텍스트
      ctx.font = 'italic 24px "Noto Sans KR", sans-serif';
      ctx.fillStyle = "#fef3c7"; // 연한 금색
      ctx.textAlign = "center";
      ctx.shadowColor = "#ffffff";
      ctx.shadowBlur = 10;

      const answerText = `"${answer.answer}"`; // 따옴표 감싸기
      const words = answerText.split(" ");
      let line = "";
      let y = 200;

      words.forEach((word) => {
        const testLine = line + word + " ";
        const metrics = ctx.measureText(testLine);
        if (metrics.width > 550 && line !== "") {
          ctx.fillText(line, 400, y);
          line = word + " ";
          y += 36;
        } else {
          line = testLine;
        }
      });
      ctx.fillText(line, 400, y);

      ctx.shadowBlur = 0; // 그림자 해제

      // 장식 아이콘 (중앙 하단)
      ctx.font = "40px serif";
      ctx.fillText("✨🌙⭐", 400, 480);

      // 하단 서명
      ctx.font = "20px serif";
      ctx.fillStyle = "#c4b5fd"; // 연보라
      ctx.fillText("ⓒ 2025 솜라고동", 400, 540);

      // 저장 처리
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `솜라고동_응답_${new Date().getTime()}.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);

          toast({
            title: "이미지가 저장되었습니다",
            description: "이제 SNS에 공유해보세요 ✨",
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

      // 배경: 노란 단색
      ctx.fillStyle = "#FACC15";
      ctx.fillRect(0, 0, 400, 600);

      // 테두리 설정
      const canvasWidth = 400;
      const canvasHeight = 600;
      const borderWidth = 10; // 외곽 테두리 두께
      const padding = 5; // 안쪽 여백
      const cornerOffset = borderWidth + padding; // 코너 위치 기준

      // 🎴 테두리 그리기
      ctx.fillStyle = "#B91C1C";
      ctx.fillRect(0, 0, canvasWidth, canvasHeight); // 바깥 테두리
      ctx.fillStyle = "#FACC15";
      ctx.fillRect(
        borderWidth,
        borderWidth,
        canvasWidth - 2 * borderWidth,
        canvasHeight - 2 * borderWidth
      );

      // 내부 장식 선
      ctx.strokeStyle = "#B91C1C";
      ctx.lineWidth = 3;
      ctx.strokeRect(
        borderWidth + 4,
        borderWidth + 4,
        canvasWidth - (borderWidth + 4) * 2,
        canvasHeight - (borderWidth + 4) * 2
      );

      // 🧧 코너 문양: 작은 사각형 그리기
      const squareSize = 10;
      const drawCornerSquare = (x: number, y: number) => {
        ctx.fillStyle = "#B91C1C";
        ctx.fillRect(x, y, squareSize, squareSize);
      };

      // 네 모서리에 사각형
      drawCornerSquare(borderWidth, borderWidth); // 좌상단
      drawCornerSquare(canvasWidth - borderWidth - squareSize, borderWidth); // 우상단
      drawCornerSquare(borderWidth, canvasHeight - borderWidth - squareSize); // 좌하단
      drawCornerSquare(
        canvasWidth - borderWidth - squareSize,
        canvasHeight - borderWidth - squareSize
      ); // 우하단

      // 🎴 글씨 스타일
      ctx.fillStyle = "#B91C1C";
      ctx.font = 'bold 36px "궁서", "serif"';
      ctx.textAlign = "center";

      // 도트 캐릭터 로드 후 빨간 도트로 렌더링
      const img = new Image();
      img.src = "/도트_솜.jpg"; // public 폴더 경로 기준

      img.onload = () => {
        // resize 원본 → 32x48
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = 32;
        tempCanvas.height = 48;
        const tempCtx = tempCanvas.getContext("2d");
        if (!tempCtx) return;

        tempCtx.drawImage(img, 0, 0, 32, 48);
        const imgData = tempCtx.getImageData(0, 0, 32, 48).data;

        const pixelSize = 5;
        const offsetX = 120;
        const offsetY = 40;

        for (let y = 0; y < 48; y++) {
          for (let x = 0; x < 32; x++) {
            const index = (y * 32 + x) * 4;
            const r = imgData[index];
            const g = imgData[index + 1];
            const b = imgData[index + 2];
            const a = imgData[index + 3];

            // 흰 배경은 제외
            const isWhite = r > 240 && g > 240 && b > 240;
            if (a > 0 && !isWhite) {
              ctx.fillStyle = "#B91C1C";
              ctx.fillRect(
                offsetX + x * pixelSize,
                offsetY + y * pixelSize,
                pixelSize,
                pixelSize
              );
            }
          }
        }

        // 💬 질문 텍스트
        ctx.font = 'bold 20px "Noto Sans KR", sans-serif';
        ctx.fillStyle = "#B91C1C";
        ctx.textAlign = "center";

        const questionLines = wrapText(ctx, answer.question, 300);
        let y = 300;
        questionLines.forEach((line) => {
          ctx.fillText(line, 200, y);
          y += 28;
        });

        // 📜 답변 텍스트
        ctx.font = '18px "Noto Sans KR", sans-serif';
        const answerLines = wrapText(ctx, answer.answer, 300);
        y += 20;
        answerLines.forEach((line) => {
          ctx.fillText(line, 200, y);
          y += 24;
        });

        // ⛩ 하단 서명
        ctx.font = 'bold 16px "Noto Sans KR", sans-serif';
        ctx.fillStyle = "#991B1B";
        ctx.fillText("ⓒ 럭키솜", 200, 550);

        // 다운로드
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `럭키솜_부적_${new Date().getTime()}.png`;
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
      };
    } catch (error) {
      toast({
        title: "부적 만들기 중 오류가 발생했습니다",
        description: "잠시 후 다시 시도해주세요",
        variant: "destructive",
      });
    }
  };

  // ✅ 텍스트 줄바꿈 유틸 함수
  function wrapText(
    ctx: CanvasRenderingContext2D,
    text: string,
    maxWidth: number
  ): string[] {
    const words = text.split(" ");
    const lines: string[] = [];
    let line = "";

    for (let word of words) {
      const testLine = line + word + " ";
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && line !== "") {
        lines.push(line.trim());
        line = word + " ";
      } else {
        line = testLine;
      }
    }
    lines.push(line.trim());
    return lines;
  }

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
          className="px-6 py-3 rounded-xl text-white font-medium border-none bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 shadow-md"
          variant="default"
        >
          <ImageIcon className="w-4 h-4 mr-2" />
          부적 만들기
        </Button>
      </motion.div>
    </motion.div>
  );
}
