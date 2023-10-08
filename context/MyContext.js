import { createContext, useEffect, useState } from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "@/firebaseConfig";

const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [user, setUser] = useState(() => auth.currentUser);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
  };

  const signout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <MyContext.Provider value={{ user, signout, signInWithGoogle }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyProvider };
