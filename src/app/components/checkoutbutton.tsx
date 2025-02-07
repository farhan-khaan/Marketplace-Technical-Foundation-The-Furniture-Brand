// "use client";
// import { useState } from "react";
// import { loadStripe } from "@stripe/stripe-js";


// const stripePromise = loadStripe(process.env.STRIPE_SECRET_KEY as string);

// export default function CheckoutButton({ Product }: { Product: any[] }) {
//   const [loading, setLoading] = useState(false);

//   const handleCheckout = async () => {
//     setLoading(true);
//     const response = await fetch("/api/checkout", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ Product }),
//     });
//     console.log(Product)

//     const sessionId  = await response.json();
//     window.location.href = sessionId.url
//     // console.log(window)
//     //console.log(sessionId)

//     const stripe = await stripePromise;
    
//     if (stripe) {
//     stripe.redirectToCheckout({ sessionId });
//     }
    
//     setLoading(false);
//   };

  
//   return (
//     <button 
//       onClick={handleCheckout} 
//       disabled={loading} 
//       className="px-6 py-2 bg-blue-600 text-white rounded-lg"
//     >
//       {loading ? "Processing..." : "Checkout"}
//     </button>
//   );
// }
"use client";

import { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);
export default function PreviewPage() {
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you are ready.');
    }
  }, []);

  return (
    <form action="/api/checkout" method="POST">
      <section>
        <button type="submit" role="link">
          Checkout
        </button>
      </section>
      <style jsx>
        {`
          section {
            background: #ffffff;
            display: flex;
            flex-direction: column;
            width: 400px;
            height: 112px;
            border-radius: 6px;
            justify-content: space-between;
          }
          button {
            height: 36px;
            background: #556cd6;
            border-radius: 4px;
            color: white;
            border: 0;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
          }
          button:hover {
            opacity: 0.8;
          }
        `}
      </style>
    </form>
  );
}