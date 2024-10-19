const fs = require('fs/promises');
const bodyParser = require('body-parser');
const express = require('express');
const Stripe = require('stripe');
const stripe = new Stripe("sk_test_51Q8bGm2MsMA6tFEfqWrnpvjAwoR8mVkNYs6QKXqrXyW57d5mbu1YT21PJfaVxuxbdAcu5g1lcHIyE2di3Qh475xC00wepeGUTK");

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

// CORS configuration
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Get available meals
app.get('/meals', async (req, res) => {
  try {
    const meals = await fs.readFile('./data/available-meals.json', 'utf8');
    res.json(JSON.parse(meals));
  } catch (error) {
    res.status(500).json({ message: 'Error reading meals data.' });
  }
});

app.post('/orders', async (req, res) => {
  const orderData = req.body.order;

  // Validate order data
  if (!orderData || !orderData.items || orderData.items.length === 0) {
    return res.status(400).json({ message: 'Missing data.' });
  }

  const { email, name, street, 'postal-code': postalCode } = orderData.customer;
  if (!email || !email.includes('@') || !name || !name.trim() || !street || !street.trim() || !postalCode || !postalCode.trim()) {
    return res.status(400).json({ message: 'Missing data: Email, name, street, postal code is missing.' });
  }

  // Create a new order
  const newOrder = { ...orderData, id: (Math.random() * 1000).toString() };
  try {
    const orders = await fs.readFile('./data/orders.json', 'utf8');
    const allOrders = JSON.parse(orders);
    allOrders.push(newOrder);
    await fs.writeFile('./data/orders.json', JSON.stringify(allOrders));
    res.status(201).json({ message: 'Order created!' });
  } catch (error) {
    res.status(500).json({ message: 'Error processing the order.' });
  }
});

// Create a checkout session
const YOUR_DOMAIN = 'http://localhost:3000';

app.post('/create-checkout-session', async (req, res) => {
  const { products } = req.body;

  // Validate products data
  if (!products || products.length === 0) {
    return res.status(400).json({ message: 'No products provided' });
  }

  const lineItems = products.map((product) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: product.name,
        images: [product.image], // Use `images` instead of `image`
      },
      unit_amount: product.price * 100, // Amount should be in the smallest currency unit
    },
    quantity: product.quantity,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${YOUR_DOMAIN}/cancel`,
    });
    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ message: 'Something went wrong with Stripe checkout' });
  }
});

// Endpoint to handle successful payments and store them in success.json
// Endpoint to handle successful payments (change to GET)
app.get('/success', async (req, res) => {
  const { session_id } = req.query; // Get session_id from query parameters

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);

    // Check the payment status
    if (session.payment_status === 'paid') {
      const paymentData = {
        id: session.id,
        amount_total: session.amount_total,
        currency: session.currency,
        customer_email: session.customer_email,
        // Add any other data you want to save
      };

      const successOrders = await fs.readFile('./data/success.json', 'utf8');
      const allSuccessOrders = JSON.parse(successOrders);
      allSuccessOrders.push(paymentData);
      await fs.writeFile('./data/success.json', JSON.stringify(allSuccessOrders));
      
      res.status(200).json({ message: 'Payment recorded successfully!' });
    } else {
      res.status(400).json({ message: 'Payment not completed' });
    }
  } catch (error) {
    console.error('Error processing success:', error);
    res.status(500).json({ message: 'Error processing the payment.' });
  }
});

// Serve the success page
app.get('/success', (req, res) => {
  res.sendFile(__dirname + '/src/components/success.jsx'); // Adjust this path
});


// Catch-all route for undefined routes
app.use((req, res) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  res.status(404).json({ message: 'Not found' });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});