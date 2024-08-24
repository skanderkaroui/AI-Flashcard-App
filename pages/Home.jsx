import { UserButton } from "@clerk/nextjs";
import { ClerkProvider } from "@clerk/nextjs"; // Import ClerkProvider
import { auth } from "@/firebase"; // Import Firebase auth

export default function Home() {
  return (
    <ClerkProvider>
      <div>
        <UserButton />
      </div>
    </ClerkProvider>
  );
}
