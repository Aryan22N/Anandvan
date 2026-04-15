import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { supabase } from '@/lib/supabaseClient';

export async function POST(request) {
  try {
    const { orderId, paymentId, signature, name, phoneNumber, amount, category, message } = await request.json();

    const text = orderId + "|" + paymentId;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(text)
      .digest('hex');

    if (expectedSignature !== signature) {
      return NextResponse.json(
        { success: false, message: 'Invalid payment signature' },
        { status: 400 }
      );
    }

    // Save to Supabase
    // Note: 'amount' should be in rupees for the database if following previous pattern
    const { error } = await supabase
      .from('donations')
      .insert([
        {
          name,
          phone: phoneNumber,
          amount: amount / 100, // Convert paise back to rupees
          category: category || 'General',
          message: message || '',
          order_id: orderId,
          payment_id: paymentId,
        }
      ]);

    if (error) {
      console.error('Supabase error recording donation:', error);
      // We still return success: true because the payment was actually successful at Razorpay
      return NextResponse.json({ 
        success: true, 
        message: 'Payment verified but database record failed',
        db_error: error.message 
      });
    }

    return NextResponse.json({ success: true, message: 'Payment verified and recorded' });
  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json(
      { success: false, message: 'Verification failed', error: error.message },
      { status: 500 }
    );
  }
}
