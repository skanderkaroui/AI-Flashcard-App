"use client";

import { SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import { SignedIn, SignedOut, useAuth } from "@clerk/nextjs"; // Import Clerk hooks and components
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Hero() {
  const router = useRouter();
  const { isLoaded, userId } = useAuth(); // Clerk auth state

  useEffect(() => {
    if (isLoaded && userId) {
      // If user is logged in, redirect to /Home
      router.push("/Home");
    }
  }, [isLoaded, userId, router]);

  return (
    <section className="bg-secondary py-20">
      <div className="container mx-auto px-6 text-center">
        <div className="flex justify-center items-center mb-4">
          <h1 className="font-bricolage text-4xl font-bold text-foreground mr-2">
            Own the Room with Trivia Flashcards
          </h1>
          <img
            src="/images/grimacing-face.png"
            alt="Grimacing Face"
            className="inline-block h-12"
          />
        </div>

        <p className="text-xl text-muted-foreground mb-8">
          Be the star of the party with flashcards designed to boost your trivia
          skills.
        </p>
        {/* If the user is logged in, the button won't show, and they'll be redirected */}
        <SignedOut>
          <button
            className="bg-primary text-primary-foreground font-bold py-3 px-16 rounded-lg hover:bg-primary/90 transition duration-300"
            onClick={() => router.push("/sign-in")} // Navigate to sign-in if the user is not logged in
          >
            Get Started
          </button>
        </SignedOut>
      </div>
    </section>
  );
}
