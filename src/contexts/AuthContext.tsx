import { ReactNode, createContext, useContext, useCallback } from "react";
import { User, signInGoogleWithPopup, signOut } from "@/lib/firebase";
import { getUser, addUser } from "@/lib/user";
import { useAuthState } from "@/hooks/useAuthState";
import { LoginScreen } from "@/components/LoginScreen";
import { LoadingScreen } from "@/components/LoadingScreen";

type AuthContextValue = {
  user: User | null;
};

export const AuthContext = createContext<AuthContextValue>({ user: null });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, loading] = useAuthState();

  if (loading) return <LoadingScreen />;
  if (!user) return <LoginScreen />;

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const { user } = useContext(AuthContext);
  const signInWithGoogle = useCallback(async () => {
    try {
      const { user } = await signInGoogleWithPopup();
      const { isExist } = await getUser(user.uid);
      if (!isExist) {
        const success = await addUser(user);
        if (!success) throw new Error("Failed to add user");
      }
    } catch (e) {
      console.error(e);
      await signOut();
    }
  }, []);

  return { user, signInWithGoogle, signOut };
};
