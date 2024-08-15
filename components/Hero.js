export default function Hero() {
  return (
    <section className="bg-secondary py-20">
      <div className="container mx-auto px-6 text-center">
        <div className="flex justify-center items-center mb-4">
          <h1 className="text-4xl font-bold text-foreground mr-2">
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
        <button className="bg-primary text-primary-foreground font-bold py-3 px-16 rounded-lg hover:bg-primary/90 transition duration-300">
          Get Started
        </button>
      </div>
    </section>
  );
}
