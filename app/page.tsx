import Head from "next/head";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Pricing from "../components/Pricing";

export default function Home() {
  return (
    <div>
      <Head>
        <title>TriviaCards - Your Ultimate Flashcard App</title>
        <meta
          name="description"
          content="Master any subject with TriviaCards, the smart flashcard app that revolutionizes your learning experience."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main>
        <Hero />
        <Features />
        <Pricing />
      </main>
    </div>
  );
}
