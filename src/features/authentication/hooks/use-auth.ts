import { api } from "@/utils/api";
import { useClerk, useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { User } from "../types/user";

export function useAuth() {
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();

  function getUserById() {
    if (!isSignedIn) return;

    const { data } = api.users.byUserId.useQuery();

    return data;
  }

  const userData = getUserById();

  const isEmployer = userData?.role === "employer";
  const isCandidate = userData?.role === "candidate";

  const currentUser = {
    ...userData,
    email: user?.emailAddresses[0].emailAddress,
    avatar: user?.profileImageUrl,
    location: userData?.location.name,
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
