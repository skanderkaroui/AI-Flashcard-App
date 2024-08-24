import Link from "next/link";
import { ModeToggle } from "@/components/ModeToggle";
import { SignInButton, SignOutButton, SignedIn, SignedOut } from "@clerk/nextjs";

export default function Header() {
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
                <SignOutButton mode="modal">Logout</SignOutButton>
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
