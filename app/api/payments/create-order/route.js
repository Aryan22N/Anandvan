import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(request) {
  try {
    const { amount, currency, name, phoneNumber } = await request.json();

    const options = {
      amount: amount, // Amount in paise
      currency: currency || 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: {
        donor_name: name,
        phone_number: phoneNumber,
      },
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      orderId: order.id,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json(
      { error: 'Failed to create order', message: error.message },
      { status: 500 }
    );
  }
}
