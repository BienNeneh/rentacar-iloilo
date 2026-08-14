import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (currentUser) => {
        try {
          setUser(currentUser);

          if (currentUser) {
            const docRef = doc(
              db,
              "users",
              currentUser.uid
            );

            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
              setUserProfile(docSnap.data());
            } else {
              setUserProfile(null);
            }
          } else {
            setUserProfile(null);
          }
        } catch (error) {
          console.error(
            "Auth Context Error:",
            error
          );

          setUserProfile(null);
        } finally {
          setLoading(false);
        }
      }
    );

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,

        // Easy way to check verification anywhere
        isEmailVerified:
          user?.emailVerified === true,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}