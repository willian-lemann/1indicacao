import { api } from "@/utils/api";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export function useAuth() {
  const { isSignedIn, user } = useUser();
  const { data } = api.users.byUserId.useQuery({ id: String(user?.id) });

  return {
    isSignedIn,
    user: data,
  };
}
