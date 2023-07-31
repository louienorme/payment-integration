import axios from "axios";


const paymongoSecretKey: string | undefined = process.env.REACT_APP_PAYMONGO_SECRET_KEY;

export const createPaymentIntent = async (body: any) => {
    try {
        const paymentIntent = {
            amount: 10000,
            payment_method_allowed: ['card', 'gcash', 'paymaya'],
            currency: "PHP",
            // customer: {
            //   email: "johndoe@example.com",
            // },
            // paymentMethod: {
            //   type: "credit_card",
            //   cardNumber: "4242424242424242",
            //   expirationMonth: "12",
            //   expirationYear: "2023",
            //   cvv: "123",
            // },
          };

          const options = {
            method: 'POST',
            url: 'https://api.paymongo.com/v1/payment_intents',
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
              authorization: `Basic ${btoa(`${paymongoSecretKey}`)}`
            },
            data: {
              data: {
                attributes: paymentIntent
              }
            }
          };

          const response = await axios.request(options)
          console.log(response)

          return { code: response.status, data: response.data }
    } catch (err) {
        console.error(err)
    }
}

export const createPaymentMethod = async (body: any) => {
  try {
      const { billingInformation, customerDetails, paymentDetails } = body

      const paymentMethod = {
        billing: {
          address: billingInformation.address,
          email: customerDetails.email,
          name: customerDetails.name,
          phone: customerDetails.phone
        },
        type: paymentDetails.type
      }

      const options = {
        method: 'POST',
        url: 'https://api.paymongo.com/v1/payment_methods',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: `Basic ${btoa(`${paymongoSecretKey}`)}`
        },
        data: {
          data: {
            attributes: paymentMethod
          }
        }
      };

      const response = await axios.request(options)
      console.log(response)

      return { code: response.status, data: response.data }
  } catch (err) {
    console.error(err)
  }
}

export const attachPaymentIntent = async (body: any) => {
  try {
    
    const res = await createPaymentIntent(body)
    const respo = await createPaymentMethod(body)

    const attach = {
      // amount: 10000,
      // payment_method_allowed: ['card', 'gcash', 'paymaya'],
      // currency: "PHP",
      payment_method: respo?.data.data.id, 
      client_key: res?.data.data.attributes.client_key,
      return_url: 'https://localhost:3000'

    }

    const options = {
      method: 'POST',
      url: `https://api.paymongo.com/v1/payment_intents/${res?.data.data.id}/attach`,
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: `Basic ${btoa(`${paymongoSecretKey}`)}`
      },
      data: {
        data: {attributes: attach}
      }
    };

      const response = await axios.request(options)
      console.log(response)

      return { code: response.status, data: response.data }
  } catch (err) {
    console.error(err)
  }
}