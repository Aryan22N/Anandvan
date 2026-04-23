import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

// ── Supabase Initialization ──────────────────────────────────────────────────
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// ── Email Transporter ────────────────────────────────────────────────────────
function createTransporter() {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    throw new Error('EMAIL_USER or EMAIL_PASS missing in environment variables.');
  }

  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user, pass },
    connectionTimeout: 5000, // 5 seconds
    greetingTimeout: 5000,
    socketTimeout: 5000,
  });
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

function shortId(uuid) {
  return 'AV-' + uuid.replace(/-/g, '').slice(0, 6).toUpperCase();
}

// ── Email HTML builder ────────────────────────────────────────────────────────
function buildReceiptHtml({ name, amount, date, transactionId, supportEmail, websiteUrl }) {
  const formattedAmount = Number(amount).toLocaleString('en-IN');
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Donation Confirmation – Anandvan</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
    *{box-sizing:border-box;margin:0;padding:0}
    body{background:#f4f6f9;font-family:'Inter',Arial,sans-serif;color:#333}
    .wrap{max-width:600px;margin:40px auto;background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 8px 40px rgba(0,0,0,0.09)}
    .header{background:linear-gradient(135deg,#1a472a 0%,#2d6a4f 100%);padding:44px 40px 36px;text-align:center}
    .header h1{color:#fff;font-size:26px;font-weight:800;margin-bottom:6px}
    .header p{color:rgba(255,255,255,0.65);font-size:14px}
    .body{padding:40px}
    .amount-card{background:linear-gradient(135deg,#1a472a,#2d6a4f);border-radius:16px;padding:28px;text-align:center;margin-bottom:30px}
    .amount-value{font-size:46px;font-weight:900;color:#ffc84f}
    .footer{background:#f8fafc;padding:28px 40px;text-align:center;font-size:12px;color:#a0aec0}
  </style>
</head>
<body>
<div class="wrap">
  <div class="header"><h1>Donation Confirmed!</h1><p>Thank you for supporting Anandvan</p></div>
  <div class="body">
    <p>Dear <strong>${name}</strong>,</p>
    <p>Thank you for your generous contribution of <strong>₹${formattedAmount}</strong>.</p>
    <div class="amount-card"><div class="amount-value">₹${formattedAmount}</div></div>
    <p><strong>Transaction ID:</strong> ${transactionId}<br/><strong>Date:</strong> ${date}</p>
    <p>If you have any questions, reach out to <a href="mailto:${supportEmail}">${supportEmail}</a>.</p>
  </div>
  <div class="footer"><p>Anandvan Foundation, Warora – 442914, Maharashtra, India</p></div>
</div>
</body>
</html>`;
}

// ── POST handler ──────────────────────────────────────────────────────────────
export async function POST(request) {
  console.log('POST /api/send-receipt: Started');
  try {
    const body = await request.json();
    const { name, email, phone, amount, category, hindi, message } = body;

    console.log(`Donation from: ${name} (${email}), Amount: ${amount}`);

    if (!name || !email || !amount || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    let donationDate = new Date().toLocaleDateString('en-IN', {
      day: 'numeric', month: 'long', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
    let transactionId = 'AV-' + Date.now().toString(36).toUpperCase();

    // Fetch details from Supabase
    try {
      console.log('Fetching donation from Supabase...');
      let query = supabase.from('donations').select('id, amount, created_at, paid_at');
      if (body.donationId) {
        query = query.eq('id', body.donationId);
      } else {
        query = query.eq('email', email).order('created_at', { ascending: false }).limit(1);
      }
      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        donationDate = formatDate(data[0].paid_at || data[0].created_at);
        transactionId = shortId(data[0].id);
        console.log(`Found donation: ${transactionId}`);
      }
    } catch (e) { console.warn('Supabase error:', e); }

    const supportEmail = process.env.SUPPORT_EMAIL || process.env.EMAIL_USER;
    const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL || 'https://anandvan.org';
    const fromName = process.env.EMAIL_FROM_NAME || 'Anandvan Foundation';

    const html = buildReceiptHtml({ name, amount, date: donationDate, transactionId, supportEmail, websiteUrl });
    
    console.log('Initializing transporter...');
    const transporter = createTransporter();

    // Send to Donor
    console.log('Sending email to donor...');
    await transporter.sendMail({
      from: `"${fromName}" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `🙏 Thank you for your donation to Anandvan – ₹${Number(amount).toLocaleString('en-IN')}`,
      html,
    });
    console.log('Donor email sent.');

    // Send to Org
    console.log('Sending email to org...');
    await transporter.sendMail({
      from: `"Anandvan Notifications" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `💰 New Donation: ₹${Number(amount).toLocaleString('en-IN')} from ${name}`,
      text: `New donation received from ${name} (${email}). Amount: ₹${amount}. Category: ${category}.`,
    });
    console.log('Org email sent.');

    return NextResponse.json({ success: true, transactionId, date: donationDate });

  } catch (err) {
    console.error('CRITICAL: Email send failed:', err);
    return NextResponse.json(
      { 
        error: 'Failed to send email', 
        details: err.message,
        code: err.code,
        command: err.command
      },
      { status: 500 }
    );
  }
}
