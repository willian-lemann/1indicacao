import { api } from "@/utils/api";
import { useClerk, useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export function useAuth() {
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const { data } = api.users.byUserId.useQuery();

  const isEmployer = data?.role === "employer";
  const isCandidate = data?.role === "candidate";

  const currentUser = {
    ...data,
    avatar: user?.profileImageUrl,
  };

  return {
    isSignedIn,
    user: currentUser,
    signOut,
    isCandidate,
    isEmployer,
  };
}
