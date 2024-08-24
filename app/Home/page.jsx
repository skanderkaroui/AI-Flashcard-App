"use client";

import { UserButton, useUser } from "@clerk/nextjs"; // Import Clerk-related modules
import { auth } from "@/firebase"; // Import Firebase auth
import { signInWithCustomToken } from "firebase/auth"; // Import Firebase auth
import { db } from "@/firebase";
import { getDoc, doc, collection, addDoc } from "firebase/firestore";
import { useAuth } from "@clerk/nextjs";

export default function Home() {
  //   const { isSignedIn, user } = useUser();
  const { getToken, userId } = useAuth();

  const handleSubmit = async () => {
    const token = await getToken({ template: "integration_firebase" });

    const userCredentials = await signInWithCustomToken(auth, token || "");
    // The userCredentials.user object can call the methods of
    // the Firebase platform as an authenticated user.
    console.log("User:", userCredentials.user);
  };

  return (
    <div className="flex justify-between ">
      <UserButton />
      <button onClick={handleSubmit}>Sign In with Firebase</button>
    </div>
  );
}
