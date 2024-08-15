export default function Hero() {
  return (
    <section className="bg-secondary py-20">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Master Any Subject with TriviaCards
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          The smart flashcard app that revolutionizes your learning experience.
        </p>
        <button className="bg-primary text-primary-foreground font-bold py-2 px-4 rounded hover:bg-primary/90 transition duration-300">
          Get Started
        </button>
      </div>
    </section>
  );
}
