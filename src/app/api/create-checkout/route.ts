import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'dummy_key_for_build', {
});

export async function POST(req: Request) {
  try {
    const { locale = 'en' } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: locale === 'es' ? '5 Tiradas Místicas' : '5 Mystic Readings',
              description: locale === 'es'
                ? 'Desbloquea 5 lecturas de tarot con IA'
                : 'Unlock 5 AI-powered tarot readings',
              images: [],
            },
            unit_amount: 99, // €0.99
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/?payment_success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/`,
    });

    return Response.json({ url: session.url });
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
