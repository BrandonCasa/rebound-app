import { getAuth } from "firebase/auth";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import React, { createContext, useState } from "react";
import { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export const AuthContext = createContext([null, null, null]);
export const AuthProvider = ({ children }) => {
  const [userAuth, userAuthLoading, userAuthError] = useAuthState(getAuth());

  return <AuthContext.Provider value={[userAuth, userAuthLoading, userAuthError]}>{children}</AuthContext.Provider>;
};

export const UserContext = createContext([null, null]);
export const UserProvider = ({ children }) => {
  const [userAuth, userAuthLoading, userAuthError] = useContext(AuthContext);
  const [userDoc, setUserDoc] = useState(undefined);
  const [userDocLoading, setUserDocLoading] = useState(true);

  React.useEffect(() => {
    if (userAuthLoading) {
      setUserDoc(undefined);
      setUserDocLoading(true);
      return;
    }
    if (userAuth?.uid === undefined) {
      setUserDoc(undefined);
      setUserDocLoading(false);
      return;
    }
    setUserDocLoading(true);
    const db = getFirestore();
    const docRef = doc(db, "users", userAuth.uid);
    const unsubscribe = onSnapshot(docRef, (doc) => {
      setUserDoc(doc.data());
      setUserDocLoading(false);
    });
    return unsubscribe;
  }, [userAuth?.uid]);

  return <UserContext.Provider value={[userDoc, userDocLoading]}>{children}</UserContext.Provider>;
};
