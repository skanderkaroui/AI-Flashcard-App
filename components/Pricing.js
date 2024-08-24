"use client";

import { useState } from 'react';
import getStripe from '../utils/get-stripe';

export default function Pricing() {
  const [isLoading, setIsLoading] = useState(false);

  const plans = [
    {
      name: "Basic",
      price: "Free",
      priceId: "prod_QiorrLLE19a7Py", // Replace with your actual Stripe Price ID
      features: ["Up to 1000 cards", "Basic analytics", "Web access"],
    },
    {
      name: "Pro",
      price: "$9.99",
      priceId: "prod_QiosTnEJnkdHpt", // Replace with your actual Stripe Price ID
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
      priceId: "price_1122334455", // Replace with your actual Stripe Price ID
      features: [
        "Everything in Pro",
        "Collaboration features",
        "Team analytics",
        "Admin controls",
      ],
    },
  ];

  const handleSubscription = async (priceId) => {
    setIsLoading(true);
    try {
      const response = await fetch('/checkout_sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const { sessionId } = await response.json();
      const stripe = await getStripe();
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) throw error;
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="pricing" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-foreground mb-8">
          Choose Your Plan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-card p-8 rounded-lg shadow-md ${
                index === 1 ? "border-2 border-primary" : ""
              }`}
            >
              <h3 className="text-2xl font-bold text-center mb-4 text-card-foreground">
                {plan.name}
              </h3>
              <p className="text-4xl font-bold text-center text-primary mb-6">
                {plan.price}
                <span className="text-sm text-muted-foreground">/month</span>
              </p>
              <ul className="mb-6">
                {plan.features.map((feature, fIndex) => (
                  <li
                    key={fIndex}
                    className="mb-2 flex items-center text-card-foreground"
                  >
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
              <button
                className="w-full bg-primary text-primary-foreground font-bold py-2 px-4 rounded hover:bg-primary/90 transition duration-300"
                onClick={() => handleSubscription(plan.priceId)}
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Select Plan'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}