import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'dummy_key_for_build', {
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return Response.json({ error: 'Missing session_id' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === 'paid') {
      return Response.json({ success: true, credits: 5 });
    } else {
      return Response.json({ success: false }, { status: 402 });
    }
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
