import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(request) {
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  if (!key_id || !key_secret) {
    return NextResponse.json(
      { error: 'Razorpay keys are not configured on the server' },
      { status: 500 }
    );
  }

  const razorpay = new Razorpay({
    key_id: key_id,
    key_secret: key_secret,
  });
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
