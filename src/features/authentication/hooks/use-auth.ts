import { api } from "@/utils/api";
import { useClerk, useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export function useAuth() {
  const { isSignedIn } = useUser();
  const { signOut } = useClerk();
  const { data } = api.users.byUserId.useQuery();

  const isEmployer = data?.role === "employer";
  const isCandidate = data?.role === "candidate";

  return {
    isSignedIn,
    user: data,
    signOut,
    isCandidate,
    isEmployer,
  };
}
