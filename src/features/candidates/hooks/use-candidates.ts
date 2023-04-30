import { useLocations } from "@/features/locations/hooks/use-locations";
import { addCookie, getCookie } from "@/lib/cookies";
import { create } from "@/lib/store";
import { useEffect } from "react";
import { CandidatesStore } from "../types/candidates-store";

const candidatesStore = create<CandidatesStore>()((set, get) => ({
  candidates: [],
  isWarningFullProfile: true,
  setCandidates: (candidates) => set({ candidates }),
  loadWarningFullProfileStorage: () => {
    const { ["@1indicacao.warning"]: warningCookie } = getCookie(
      undefined,
      "@1indicacao.warning"
    );

    if (warningCookie) {
      set({ isWarningFullProfile: false });
    }
  },
  closeWarningFullProfile: () => {
    addCookie(undefined, "@1indicacao.warning", "false");
    set({ isWarningFullProfile: false });
  },
}));

export function useCandidates() {
  const state = candidatesStore((state) => state);
  const { selectedLocation } = useLocations();

  const filteredCandidates = state.candidates.filter(
    (candidate) => candidate.locationId === selectedLocation?.value
  );

  const candidates = filteredCandidates;

  useEffect(() => {
    state.loadWarningFullProfileStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    ...state,
    isEmpty: candidates.length === 0,
    candidates,
  };
}
