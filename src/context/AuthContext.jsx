import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { auth, db } from "../firebase/firebase";

import { onAuthStateChanged } from "firebase/auth";

import {
  doc,
  getDoc,
} from "firebase/firestore";

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
          setLoading(true);
          setUser(currentUser);

          // =========================
          // USER LOGGED OUT
          // =========================

          if (!currentUser) {
            setUserProfile(null);
            return;
          }

          // =========================
          // FIREBASE AUTH USER
          // =========================

          const userRef = doc(
            db,
            "users",
            currentUser.uid
          );

          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const profileData = userSnap.data();

            setUserProfile(profileData);

            console.log(
              "User profile loaded:",
              profileData
            );
          } else {
            // =========================
            // FIRESTORE PROFILE MISSING
            // =========================

            console.warn(
              "No Firestore profile found for:",
              currentUser.uid
            );

            setUserProfile({
              fullName:
                currentUser.displayName || "",
              email:
                currentUser.email || "",
            });
          }

        } catch (error) {
          console.error(
            "Auth Context Error:",
            error
          );

          // =========================
          // FALLBACK
          // =========================

          if (currentUser) {
            setUserProfile({
              fullName:
                currentUser.displayName || "",
              email:
                currentUser.email || "",
            });
          } else {
            setUserProfile(null);
          }

        } finally {
          setLoading(false);
        }
      }
    );

    return unsubscribe;
  }, []);

  // =========================
  // DISPLAY NAME
  // =========================

  const displayName =
    userProfile?.fullName ||
    user?.displayName ||
    "User";

  // =========================
  // CONTEXT
  // =========================

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,

        displayName,

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