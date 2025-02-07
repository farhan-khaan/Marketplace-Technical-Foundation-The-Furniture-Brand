//  import { NextResponse } from "next/server";
//  import Stripe from "stripe";

// // // const stripe = new Stripe('sk_test_51QoqMZEruUvka5V90Nb08ZeqZNdYjHNWdZQPZpmMaBaRXQdnsW5i9PjfHdNQT2qDWCsXPtSWvrIqOlrTsaRHZ0NR009BEBbiH7', {
// // // apiVersion: '2025-01-27.acacia'
// // //   });
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// //POST handler
// export async function POST(req: Request) {
//     try {
//         const body = await req.json(); // Parse JSON body
//         const { Product } = body; //1st
//         //console.log(product)
//         // -
//         // 
//         // add the object name here

//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ["card"],
//             line_items: [
//                 {
//                     price_data: {
//                         currency: "usd",
//                         product_data: {
//                             name: Product.name,//2nd add product name here
//                         },
//                         unit_amount: Product.price * 100, // 3rd add product Price in cents
//                     },
//                     quantity: 1, //4th add quantity here
//                 },
//             ],
//             mode: "payment",
//             success_url: `${req.headers.get("origin")}/success`,
//             cancel_url: `${req.headers.get("origin")}/cancel`,
//         });

//         return NextResponse.json({ url: session.url });
//     } catch (error: any) {
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }
// }

// export async function GET() {
//     return NextResponse.json(
//         { error: "Method Not Allowed" },
//         { status: 405 }
//     );
// }
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req: { method: string; headers: { origin: any; }; }, res: { redirect: (arg0: number, arg1: any) => void; status: (arg0: number) => { (): any; new(): any; json: { (arg0: any): void; new(): any; }; end: { (arg0: string): void; new(): any; }; }; setHeader: (arg0: string, arg1: string) => void; }) {
  if (req.method === 'POST') {
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: '{{item._id}}',
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      });
      res.redirect(303, session.url);
    } catch (error:any) {
      res.status(error.statusCode || 500).json(error.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}