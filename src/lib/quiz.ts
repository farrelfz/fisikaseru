export const calculateScore = (correctCount: number, totalQuestions: number): number => {
  if (totalQuestions === 0) return 0;
  return Math.round((correctCount / totalQuestions) * 100);
};
