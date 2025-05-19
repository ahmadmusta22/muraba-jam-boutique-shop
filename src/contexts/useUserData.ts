import { useState, useEffect } from "react";
import { auth, db } from "../lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { User } from "firebase/auth";

// Define user data type
interface UserData {
  uid: string;
  email: string;
  phone: string;
  createdAt: string;
}

const useUserData = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user: User | null) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserData(userSnap.data() as UserData);
        } else {
          const newUserData: UserData = {
            uid: user.uid,
            email: user.email || "",
            phone: user.phoneNumber || "",
            createdAt: new Date().toISOString(),
          };
          await setDoc(userRef, newUserData);
          setUserData(newUserData);
        }
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const updateUserData = async (data: Partial<UserData>) => {
    if (auth.currentUser) {
      const userRef = doc(db, "users", auth.currentUser.uid);
      await setDoc(userRef, data, { merge: true });
      setUserData((prev) => (prev ? { ...prev, ...data } : prev));
    }
  };

  return { userData, updateUserData };
};

export default useUserData;