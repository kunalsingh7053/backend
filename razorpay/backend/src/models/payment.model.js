const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  paymentId: String,
  signature: String,
  amount: { type: Number, required: true },     // in paise
  currency: { type: String, required: true },
  status: {
    type: String,
    default: "PENDING",
    enum: ["PENDING", "COMPLETED", "FAILED"]
  },
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;