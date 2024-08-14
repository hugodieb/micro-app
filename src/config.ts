export const config = {
  stripe: {
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    secretKey: process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY,
    proPriceId: '',
    webhookSecret: '',
    plans: {
      free: {
        priceId: 'price_1Pnla6KBe0QrdiQIZ3UOKqJn',
        quota: {
          TASKS: 5,
        }
      },
      pro: {
        priceId: 'price_1PnlalKBe0QrdiQIDwvchvXr',
        quota: {
          TASKS: 100,
        }
      }
    }
  }
}