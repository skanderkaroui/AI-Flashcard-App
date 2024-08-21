import Header from "@/components/Header";
import { SignIn } from "@clerk/nextjs";
import Head from "next/head";
import Button from "react";

export default function SignUpPage() {
  return (
    <div>
      <Head>
        <title>AI FlashCard</title>
        <meta name="description" content="My page description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <Button>
          <SignIn />
        </Button>
      </main>
    </div>
  );
}
