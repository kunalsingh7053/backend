const productModel = require('../models/product.model');
const Razorpay = require('razorpay');
const paymentModel = require('../models/payment.model');
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

async function createOrder(req, res) { 
  try {
     
       const { cart } = req.body;

    const options = {
      amount: cart.price.amount * 100,   // rupees → paise
      currency: cart.price.currency
    };

    const order = await razorpay.orders.create(options);

    await paymentModel.create({
      orderId: order.id,
      amount: order.amount,      // keep same, no multiply
      currency: order.currency,
      status: 'PENDING',
    });

    res.status(201).json({
      id: order.id,
      amount: order.amount / 100,   // paise → rupees for frontend
      currency: order.currency
    });

  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating order");
  }
} 

async function verifyPayment(req, res) {
  const { razorpayOrderId, razorpayPaymentId, signature } = req.body;
  const secret = process.env.RAZORPAY_KEY_SECRET

  try {
    const { validatePaymentVerification } = require('../../node_modules/razorpay/dist/utils/razorpay-utils.js')

    const result = validatePaymentVerification({ "order_id": razorpayOrderId, "payment_id": razorpayPaymentId }, signature, secret);
    if (result) {
      const payment = await paymentModel.findOne({ orderId: razorpayOrderId });
      payment.paymentId = razorpayPaymentId;
      payment.signature = signature;
      payment.status = 'COMPLETED';
      await payment.save();
      res.json({ status: 'success' });
    } else {
      res.status(400).send('Invalid signature');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Error verifying payment');
  }
 
}
module.exports = {
  createOrder,
  verifyPayment
};