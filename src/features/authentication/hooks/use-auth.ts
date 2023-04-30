import { api } from "@/utils/api";
import { useClerk, useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { User } from "../types/user";

export function useAuth() {
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const { data } = api.users.byUserId.useQuery();

  const isEmployer = data?.role === "employer";
  const isCandidate = data?.role === "candidate";

  const currentUser = {
    ...data,
    email: user?.emailAddresses,
    avatar: user?.profileImageUrl,
    location: data?.location.name,
  } as User;

  function validateIfUserHasFullProfile(user: User) {
    let hasFullProfile = false;
    if (user.phone && user.position && user.description) {
      hasFullProfile = true;
    }

    return hasFullProfile;
  }

  const hasFullProfile = validateIfUserHasFullProfile(currentUser);

  return {
    isSignedIn,
    user: currentUser,
    signOut,
    isCandidate,
    isEmployer,
    hasFullProfile,
  };
}
