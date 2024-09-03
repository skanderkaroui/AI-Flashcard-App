'use client'
import Link from "next/link";
import { ModeToggle } from "@/components/ModeToggle";
import { useEffect } from "react";
import { SignInButton, SignOutButton, SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { db } from "@/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default function Header() {
  const { user } = useUser();
  useEffect(() => {
    if (user) {
      localStorage.setItem("userID", user.id);
      createOrUpdateUserDocument(user.id);
    }
  }, [user]);

  const createOrUpdateUserDocument = async (userId) => {
    try {
      const userDocRef = doc(db, "flashcard", userId);
      const docSnap = await getDoc(userDocRef);

      if (!docSnap.exists()) {
        // Document does not exist, so create it
        // await setDoc(userDocRef, {
        //   exampleField: {
        //     name: "Haider",
        //     score: 0,
        //     attempts: 0,
        //     flashcards: [],
        //     subCollections: [],
        //     progress: {},
        //   },
        // });
        console.log("Document created successfully!");
      } else {
        console.log("Document already exists!");
      }
    } catch (error) {
      console.error("Error creating or updating document: ", error);
    }
  };

  useEffect(() => {
    if (!user) {
      localStorage.removeItem("userID");
    }
  }, [user]);

  return (
    <header className="bg-background shadow-md">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold text-primary">
          TriviaCards
          <img
            src="/images/grimacing-face.png"
            alt="Grimacing Face"
            className="inline-block h-7 mx-1"
          />
        </div>
        <div className="flex items-center space-x-4">
          <ul className="flex space-x-4">
            <li>
              <Link
                href="#features"
                className="text-foreground hover:text-primary"
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                href="#pricing"
                className="text-foreground hover:text-primary"
              >
                Pricing
              </Link>
            </li>
            <li>
              <SignedIn>
                <SignOutButton mode="modal">
                  Logout</SignOutButton>
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">Login</SignInButton>
              </SignedOut>
            </li>
          </ul>
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}
