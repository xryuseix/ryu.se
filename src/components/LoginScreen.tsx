import { useAuth } from "@/contexts/AuthContext";
import styles from "./LoginScreen.module.css";

export const LoginScreen = () => {
  const { signInWithGoogle } = useAuth();
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ログインしてください</h1>
      <button className={styles.button} onClick={signInWithGoogle}>
        Googleログイン
      </button>
    </div>
  );
};
