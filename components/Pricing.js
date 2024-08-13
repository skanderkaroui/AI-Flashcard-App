export default function Pricing() {
  const plans = [
    {
      name: "Basic",
      price: "$4.99",
      features: ["Up to 1000 cards", "Basic analytics", "Web access"],
    },
    {
      name: "Pro",
      price: "$9.99",
      features: [
        "Unlimited cards",
        "Advanced analytics",
        "Web & mobile access",
        "Priority support",
      ],
    },
    {
      name: "Team",
      price: "$19.99",
      features: [
        "Everything in Pro",
        "Collaboration features",
        "Team analytics",
        "Admin controls",
      ],
    },
  ];

  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Choose Your Plan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white p-8 rounded-lg shadow-md ${
                index === 1 ? "border-2 border-blue-500" : ""
              }`}
            >
              <h3 className="text-2xl font-bold text-center mb-4">
                {plan.name}
              </h3>
              <p className="text-4xl font-bold text-center text-blue-600 mb-6">
                {plan.price}
                <span className="text-sm text-gray-600">/month</span>
              </p>
              <ul className="mb-6">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="mb-2 flex items-center">
                    <svg
                      className="w-4 h-4 mr-2 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
                Select Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
