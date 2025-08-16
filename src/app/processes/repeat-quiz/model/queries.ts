
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { repeatQuizService } from "../api/repeat-quiz.service";
import { IVocabularyItem } from "@/src/app/entities/vocabularly/model/types";
import { vocabularyService } from "@/src/app/entities/vocabularly/api/vocabulary.service";

export function useRepeatingQuiz(count = 5) {
  return useQuery({
    queryKey: ["repeat-quiz", count],
    queryFn: () => repeatQuizService.getVocabularyRepeatingQuiz(count),
    staleTime: 1000 * 60,
  });
}
export function useSubmitRepeatingAnswer(count = 5) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (item: IVocabularyItem) =>
      vocabularyService.updateVocabularyRepeating([item]),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["repeat-quiz", count] });
    },
  });
}