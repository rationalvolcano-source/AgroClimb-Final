import { useUser } from "@clerk/clerk-react";

export function useAuth() {
  const { user, isLoaded } = useUser();

  return {
    user: user ? {
      id: user.id,
      email: user.primaryEmailAddress?.emailAddress || null,
      firstName: user.firstName,
      lastName: user.lastName,
      profileImageUrl: user.imageUrl,
    } : null,
    isLoading: !isLoaded,
    isAuthenticated: !!user,
  };
}
