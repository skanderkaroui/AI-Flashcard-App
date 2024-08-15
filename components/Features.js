export default function Features() {
  const features = [
    {
      title: "Smart Learning Algorithm",
      description: "Our AI-powered system adapts to your learning pace.",
    },
    {
      title: "Customizable Decks",
      description: "Create and organize your flashcards effortlessly.",
    },
    {
      title: "Progress Tracking",
      description: "Monitor your improvement with detailed statistics.",
    },
    {
      title: "Cross-Platform Sync",
      description: "Access your cards on any device, anytime.",
    },
  ];

  return (
    <section id="features" className="py-20 bg-muted">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-foreground mb-8">
          Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-card p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-card-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
