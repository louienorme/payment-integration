import {
  Typography,
  MenuItem,
  FormControl,
  Grid,
  Button,
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core';
import { Formik, Form, Field, FieldArray } from 'formik';
import { TextField } from 'formik-material-ui';
import { paymentSchema } from 'schema';
import {
  attachPaymentIntent,
  createCheckoutSession,
  createPaymentIntent,
  createPaymentMethod,
  getPaymentMethod,
} from 'services';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inputBase: {
      marginBottom: '1rem',
    },
    header: {
      padding: '1rem',
    },
    footer: {
      padding: '1rem',
    },
    control: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
  })
);

const PaymentSection = () => {
  const classes = useStyles();

  const methods = ['paymaya', 'card'];

  const banks = ['gcash', 'paymaya', 'bdo', 'chinabank'];

  const currencies = ['PHP'];

  const handleSubmit = async (data: any) => {
    try {
      // console.log(data)
      // const response = await createPaymentIntent(data)
      // const response = await createPaymentMethod(data);
      // const response = await attachPaymentIntent(data);
      // const response = await getPaymentMethod(data);
      const response = await createCheckoutSession(data);

      console.log(response);
      //@ts-ignore
      if (response.code === 200)
        window.open(response?.data.data.attributes.checkout_url, '_blank');
    } catch (err) {
      console.error(err);
    }
  };

  const initialValues = {
    amount: '',
    currency: 'PHP',
    customerDetails: {
      email: '',
      phone: '',
      name: '',
    },
    paymentDetails: {
      type: '',
      bank: '',
      account: '',
    },
    billingInformation: {
      address: {
        city: '',
        country: '',
        houseNumber: '',
        street: '',
        postalCode: '',
        state: '',
      },
    },
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={paymentSchema}
      onSubmit={handleSubmit}
      className={classes.header}
    >
      <Form>
        {/* Payment */}
        <Typography gutterBottom variant='h4'>
          Payment
        </Typography>
        <hr style={{ marginBottom: '1rem' }}></hr>
        <Grid container spacing={2} style={{ padding: '1rem' }}>
          <Grid item xs={12} sm={6} md={6}>
            <Field
              component={TextField}
              variant='outlined'
              fullWidth
              required
              name='amount'
              label='Amount'
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <FormControl className={classes.control}>
              <FieldArray
                name='currency'
                render={() => (
                  <Field
                    component={TextField}
                    variant='outlined'
                    required
                    select
                    autoFocus
                    name='currency'
                    label='Currency'
                    fullWidth
                  >
                    {currencies.map((option, index) => (
                      <MenuItem key={index} value={option}>
                        {`${option}`}
                      </MenuItem>
                    ))}
                  </Field>
                )}
              />
            </FormControl>
          </Grid>
        </Grid>
        {/* Customer Details */}
        <Typography gutterBottom variant='h4'>
          Customer Details
        </Typography>
        <hr style={{ marginBottom: '1rem' }}></hr>
        <Grid container spacing={2} style={{ padding: '1rem' }}>
          <Grid item xs={12} sm={6} md={6}>
            <Field
              component={TextField}
              variant='outlined'
              fullWidth
              required
              name='customerDetails.name'
              label='Name'
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Field
              component={TextField}
              variant='outlined'
              email
              fullWidth
              required
              name='customerDetails.email'
              label='Email'
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Field
              component={TextField}
              variant='outlined'
              fullWidth
              required
              name='customerDetails.phone'
              label='Phone'
            />
          </Grid>
        </Grid>
        {/* Payment Method */}
        <Typography gutterBottom variant='h4'>
          Payment Method
        </Typography>
        <hr style={{ marginBottom: '1rem' }}></hr>
        <Grid container spacing={2} style={{ padding: '1rem' }}>
          <Grid item xs={12} sm={6} md={6}>
            <FormControl className={classes.control}>
              <FieldArray
                name='paymentDetails'
                render={() => (
                  <Field
                    component={TextField}
                    variant='outlined'
                    required
                    select
                    autoFocus
                    name={`paymentDetails.type`}
                    label='Payment Method'
                    fullWidth
                  >
                    {methods.map((option, index) => (
                      <MenuItem key={index} value={option}>
                        {`${option}`}
                      </MenuItem>
                    ))}
                  </Field>
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <FormControl className={classes.control}>
              <FieldArray
                name='paymentDetails'
                render={() => (
                  <Field
                    component={TextField}
                    variant='outlined'
                    required
                    select
                    autoFocus
                    name={`paymentDetails.bank`}
                    label='Bank Name'
                    fullWidth
                  >
                    {banks.map((option, index) => (
                      <MenuItem key={index} value={option}>
                        {`${option}`}
                      </MenuItem>
                    ))}
                  </Field>
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Field
              component={TextField}
              variant='outlined'
              fullWidth
              required
              name='paymentDetails.account'
              label='Account Number'
            />
          </Grid>
        </Grid>
        {/* Billing Information */}
        <Typography gutterBottom variant='h4'>
          Billing Information
        </Typography>
        <hr style={{ marginBottom: '1rem' }}></hr>
        <Grid container spacing={2} style={{ padding: '1rem' }}>
          <Grid item xs={12} sm={6} md={6}>
            <Field
              component={TextField}
              variant='outlined'
              fullWidth
              required
              name='billingInformation.address.houseNumber'
              label='House Number'
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Field
              component={TextField}
              variant='outlined'
              fullWidth
              required
              name='billingInformation.address.street'
              label='Street'
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Field
              component={TextField}
              variant='outlined'
              fullWidth
              required
              name='billingInformation.address.city'
              label='City'
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Field
              component={TextField}
              variant='outlined'
              fullWidth
              required
              name='billingInformation.address.postalCode'
              label='Postal Code'
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Field
              component={TextField}
              variant='outlined'
              fullWidth
              required
              name='billingInformation.address.state'
              label='Region/State'
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Field
              component={TextField}
              variant='outlined'
              fullWidth
              required
              name='billingInformation.address.country'
              label='Country'
            />
          </Grid>
        </Grid>
        <Button
          variant='contained'
          color='primary'
          fullWidth
          size='large'
          type='submit'
        >
          Submit
        </Button>
      </Form>
    </Formik>
  );
};

export default PaymentSection;
