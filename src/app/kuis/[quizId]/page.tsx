import { notFound } from "next/navigation";
import type { QuizQuestion } from "@/types/quiz";
import { QuizRunner } from "@/components/Quiz/QuizRunner";

const quizBanks: Record<string, { title: string; questions: QuizQuestion[] }> = {
  "hukum-newton": {
    title: "Bank Soal Newton",
    questions: [
      {
        id: "newton-1",
        prompt: "Sebuah benda dikatakan setimbang apabila...",
        concept: "Equilibrium",
        difficulty: "explorer",
        choices: [
          { label: "Diam saja", value: "A" },
          { label: "Percepatan konstan", value: "B" },
          { label: "Resultan gaya nol", value: "C" },
          { label: "Kecepatan berubah", value: "D" }
        ],
        answer: "C",
        reference: "Bank Soal Newton #1"
      },
      {
        id: "newton-2",
        prompt: "Balok 4 kg didorong gaya 20 N di lantai licin. Berapa percepatan balok?",
        concept: "Hukum II Newton",
        difficulty: "engineer",
        choices: [
          { label: "2 m/s²", value: "A" },
          { label: "5 m/s²", value: "B" },
          { label: "10 m/s²", value: "C" },
          { label: "80 m/s²", value: "D" }
        ],
        answer: "B",
        reference: "Bank Soal Newton #2"
      },
      {
        id: "newton-3",
        prompt: "Pasangan gaya aksi-reaksi tidak saling meniadakan karena...",
        concept: "Hukum III Newton",
        difficulty: "explorer",
        choices: [
          { label: "Arahnya sama", value: "A" },
          { label: "Besarnya berbeda", value: "B" },
          { label: "Bekerja pada benda yang sama", value: "C" },
          { label: "Bekerja pada dua benda berbeda", value: "D" }
        ],
        answer: "D",
        reference: "Bank Soal Newton #3"
      }
    ]
  },
  milikan: {
    title: "Eksperimen Tetes Minyak",
    questions: [
      {
        id: "milikan-1",
        prompt: "Jika tetes minyak terlihat naik tanpa medan listrik, arah gerak sesungguhnya...",
        concept: "Optik Mikroskop",
        difficulty: "engineer",
        choices: [
          { label: "Ke atas", value: "A" },
          { label: "Ke bawah", value: "B" },
          { label: "Ke kanan", value: "C" },
          { label: "Diam", value: "D" }
        ],
        answer: "B",
        reference: "Modul UNJ Hal 3"
      },
      {
        id: "milikan-2",
        prompt: "Empat gaya utama pada tetes minyak di chamber adalah...",
        concept: "Gaya Fluida",
        difficulty: "engineer",
        choices: [
          { label: "Berat, Normal, Gesek, Listrik", value: "A" },
          { label: "Berat, Apung, Hambat Stokes, Coulomb", value: "B" },
          { label: "Berat, Tegangan Permukaan, Gesek, Magnet", value: "C" },
          { label: "Berat, Sentripetal, Archimedes, Listrik", value: "D" }
        ],
        answer: "B",
        reference: "Modul UNJ Hal 3"
      }
    ]
  }
};

interface QuizDetailPageProps {
  params: {
    quizId: string;
  };
}

export default function QuizDetailPage({ params }: QuizDetailPageProps) {
  const quiz = quizBanks[params.quizId];
  if (!quiz) {
    return notFound();
  }

  return (
    <div className="container py-12">
      <QuizRunner quizId={params.quizId} title={quiz.title} initialQuestions={quiz.questions} />
    </div>
  );
}
