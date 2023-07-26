import * as Yup from 'yup'

export const paymentSchema = Yup.object().shape({
    amount: Yup.number().required('This is a required field'),
    currency: Yup.string().required('This is a required field'),
    customerDetails: Yup.object().shape({
        email: Yup.string().email('Email must be valid').required('This is a required field'),
        name: Yup.string().required('This is a required field'),
        phone: Yup.string().required('This is a required field'),
    }),
    paymentDetails: Yup.object().shape({
        type: Yup.string().required('This is a required field'),
        bank: Yup.string().required('This is a required field'),
        account: Yup.number().required('This is a required field'),
    }),
    billingInformation: Yup.object().shape({
        address: Yup.object().shape({
            city: Yup.string().required('This is a required field'),
            country: Yup.string().required('This is a required field'),
            houseNumber: Yup.string().required('This is a required field'),
            street: Yup.string().required('This is a required field'),
            postalCode: Yup.number().required('This is a required field'),
            state: Yup.string().required('This is a required field'),
        })
    })
})