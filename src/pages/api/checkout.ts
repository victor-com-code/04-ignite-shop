import { stripe } from '@/src/lib/stripe'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { productsInfo } = req.body

  if (req.method !== 'POST') {
    return res.status(400).json({ error: 'Method not allowed.' })
  }

  if (!productsInfo) {
    return res.status(400).json({ error: 'Price not found.' })
  }

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${process.env.NEXT_URL}/`

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: productsInfo.map((item) => {
      return {
        price: item.defaultPriceId,
        quantity: item.quantity,
      }
    }),
  })

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  })
}
