import axios from "axios";

const paymongoSecretKey = process.env.PAYMONGO_SECRET_KEY;

export const createPayment = async (body: any) => {
    try {
        const paymentIntent = {
            amount: 1000,
            currency: "PHP",
            customer: {
              email: "johndoe@example.com",
            },
            paymentMethod: {
              type: "credit_card",
              cardNumber: "4242424242424242",
              expirationMonth: "12",
              expirationYear: "2023",
              cvv: "123",
            },
          };
        
          const response = await axios.post(
            "https://api.paymongo.com/v1/payment_intents",
            paymentIntent,
            {
              headers: {
                Authorization: `Basic ${paymongoSecretKey}`,
              },
            }
          );

          return { code: response.status, data: response.data }
    } catch (err) {
        console.error(err)
    }
}