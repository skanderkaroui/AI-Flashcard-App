import Stripe from "stripe";
import { LoadStripe } from "@stripe/stripe-js";

let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = LoadStripe(process.env.STRIPE_PUBLIC_KEY);
  }
  return stripePromise;
};

export default getStripe;
