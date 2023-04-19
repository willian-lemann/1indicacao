import { api } from "@/utils/api";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export function useAuth() {
  const { isSignedIn } = useUser();
  const { data } = api.users.byUserId.useQuery();

  return {
    isSignedIn,
    user: data,
  };
}
