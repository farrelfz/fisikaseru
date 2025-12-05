import { useQuizStore, quizInitialState } from "@/store/useQuizStore";
import { useSimStore, simInitialState } from "@/store/useSimStore";
import { useUserStore, userInitialState } from "@/store/useUserStore";

let hydrated = false;

export const hydrateStores = (): void => {
  if (hydrated) return;
  useQuizStore.setState({ ...quizInitialState });
  useSimStore.setState({ ...simInitialState, parameters: { ...simInitialState.parameters } });
  useUserStore.setState({ ...userInitialState, summary: { ...userInitialState.summary } });
  hydrated = true;
};
