import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

// ── Supabase (server-side, uses same keys as client) ─────────────────────────
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// ── Mailer ────────────────────────────────────────────────────────────────────
function createTransporter() {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error('Email credentials are missing in environment variables.');
  }

  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false
    }
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
  // e.g.  AV-3F2A1B  (6 upper-hex chars from the UUID)
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
    body{background:#f4f6f9;font-family:'Inter',Arial,sans-serif;color:#333;-webkit-font-smoothing:antialiased}
    .wrap{max-width:600px;margin:40px auto;background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 8px 40px rgba(0,0,0,0.09)}
    /* Header */
    .header{background:linear-gradient(135deg,#1a472a 0%,#2d6a4f 100%);padding:44px 40px 36px;text-align:center}
    .logo-badge{display:inline-flex;align-items:center;gap:10px;background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.2);border-radius:50px;padding:8px 20px;margin-bottom:24px}
    .logo-badge span{font-size:13px;font-weight:700;color:rgba(255,255,255,0.9);letter-spacing:1px;text-transform:uppercase}
    .check-wrap{width:72px;height:72px;background:rgba(255,200,79,0.15);border:2px solid rgba(255,200,79,0.45);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;font-size:32px}
    .header h1{color:#fff;font-size:26px;font-weight:800;letter-spacing:-0.3px;margin-bottom:6px}
    .header p{color:rgba(255,255,255,0.65);font-size:14px;line-height:1.6}
    /* Body */
    .body{padding:40px}
    .greeting{font-size:16px;color:#1a202c;font-weight:600;margin-bottom:10px}
    .intro{font-size:14px;color:#4a5568;line-height:1.75;margin-bottom:30px}
    /* Amount card */
    .amount-card{background:linear-gradient(135deg,#1a472a,#2d6a4f);border-radius:16px;padding:28px;text-align:center;margin-bottom:30px}
    .amount-label{font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:rgba(255,255,255,0.5);margin-bottom:8px}
    .amount-value{font-size:46px;font-weight:900;color:#ffc84f;letter-spacing:-1.5px;line-height:1}
    .amount-sub{font-size:12px;color:rgba(255,255,255,0.45);margin-top:10px}
    /* Details table */
    .section-title{font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#a0aec0;margin-bottom:14px}
    .details-box{background:#f8fafc;border:1px solid #e8edf2;border-radius:14px;overflow:hidden;margin-bottom:28px}
    .detail-row{display:flex;justify-content:space-between;align-items:center;padding:14px 20px;border-bottom:1px solid #edf2f7}
    .detail-row:last-child{border-bottom:none}
    .detail-label{font-size:13px;color:#718096;font-weight:500}
    .detail-value{font-size:13px;color:#1a202c;font-weight:700;text-align:right;max-width:60%}
    .txn-id{font-family:monospace;font-size:12px;background:#e2e8f0;padding:3px 8px;border-radius:6px;color:#2d3748}
    /* Impact message */
    .impact{background:#f0fff4;border:1px solid #c6f6d5;border-radius:14px;padding:22px 24px;margin-bottom:28px}
    .impact p{font-size:14px;color:#276749;line-height:1.75}
    /* Note */
    .note{background:#fffbeb;border:1px solid #fde68a;border-radius:12px;padding:16px 20px;margin-bottom:28px;font-size:13px;color:#92400e;line-height:1.65}
    .note strong{color:#78350f}
    /* Footer */
    .footer{background:#f8fafc;border-top:1px solid #e8edf2;padding:28px 40px;text-align:center}
    .footer p{font-size:12px;color:#a0aec0;line-height:1.9}
    .footer a{color:#2d6a4f;text-decoration:none;font-weight:600}
    .footer a:hover{text-decoration:underline}
    .badge-row{display:flex;justify-content:center;gap:10px;margin-bottom:16px;flex-wrap:wrap}
    .badge{background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:5px 14px;font-size:11px;font-weight:600;color:#4a5568}
  </style>
</head>
<body>
<div class="wrap">

  <!-- Header -->
  <div class="header">
    <div class="logo-badge">
      <span>🌳 Anandvan Foundation</span>
    </div>
    <h1>Donation Confirmed!</h1>
    <p>Your contribution has been received. Thank you for making a difference.</p>
  </div>

  <!-- Body -->
  <div class="body">
    <p class="greeting">Dear ${name},</p>
    <p class="intro">
      Thank you for your generous contribution to Anandvan 🙏<br/><br/>
      We have successfully received your donation of <strong>₹${formattedAmount}</strong> on <strong>${date}</strong>.<br/><br/>
      Your support helps us continue our mission of empowering and supporting individuals in need.
      Every contribution, big or small, creates a meaningful impact in improving lives.
    </p>

    <!-- Amount card -->
    <div class="amount-card">
      <div class="amount-label">Amount Donated</div>
      <div class="amount-value">₹${formattedAmount}</div>
      <div class="amount-sub">Received on ${date}</div>
    </div>

    <!-- Donation details -->
    <p class="section-title">🧾 Donation Details</p>
    <div class="details-box">
      <div class="detail-row">
        <span class="detail-label">Amount</span>
        <span class="detail-value">₹${formattedAmount}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Transaction ID</span>
        <span class="detail-value"><span class="txn-id">${transactionId}</span></span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Date</span>
        <span class="detail-value">${date}</span>
      </div>
    </div>

    <!-- Impact note -->
    <div class="impact">
      <p>
        Because of your kindness, we are able to provide care, shelter, and opportunities
        to those who need it most. ❤️
      </p>
    </div>

    <p style="font-size:14px;color:#4a5568;line-height:1.75">
      If you have any questions, feel free to reach out to us at
      <a href="mailto:${supportEmail}" style="color:#2d6a4f;font-weight:600">${supportEmail}</a>.<br/><br/>
      Once again, thank you for being a part of this journey ❤️<br/><br/>
      <strong>Warm regards,</strong><br/>
      Team Anandvan<br/>
      <a href="${websiteUrl}" style="color:#2d6a4f;font-weight:600">${websiteUrl}</a>
    </p>
  </div>

  <!-- Footer -->
  <div class="footer">
    <div class="badge-row">
      <div class="badge">🌳 Anandvan</div>
      <div class="badge">❤️ Since 1951</div>
      <div class="badge">🇮🇳 Warora, Maharashtra</div>
    </div>
    <p>
      Anandvan Foundation, Warora – 442914, Chandrapur, Maharashtra, India<br/>
      <a href="${websiteUrl}">${websiteUrl}</a>
    </p>
    <p style="margin-top:10px;font-size:11px;color:#cbd5e0">
      You received this email because a donation was made using this email address.<br/>
      Transaction reference: ${transactionId}
    </p>
  </div>

</div>
</body>
</html>`;
}

// ── POST handler ──────────────────────────────────────────────────────────────
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, amount, category, hindi, message } = body;

    if (!name || !email || !amount || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // ── Check email config ──
    if (!process.env.EMAIL_USER || process.env.EMAIL_USER === 'your_gmail@gmail.com') {
      console.warn('Email not configured — skipping send');
      return NextResponse.json({ success: true, skipped: true, reason: 'Email not configured' });
    }

    // ── Fetch the exact donation record from Supabase ──
    // Prefer donationId (passed from client) for precision, fall back to email lookup
    let donationDate = new Date().toLocaleDateString('en-IN', {
      day: 'numeric', month: 'long', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
    let transactionId = 'AV-' + Date.now().toString(36).toUpperCase();

    try {
      let query = supabase.from('donations').select('id, amount, created_at, paid_at');

      if (body.donationId) {
        query = query.eq('id', body.donationId);
      } else {
        query = query.eq('email', email).order('created_at', { ascending: false }).limit(1);
      }

      const { data: donations, error: dbError } = await query;

      if (!dbError && donations && donations.length > 0) {
        const record = donations[0];
        // Use paid_at if available, otherwise created_at
        donationDate = formatDate(record.paid_at || record.created_at);
        transactionId = shortId(record.id);
      } else if (dbError) {
        console.warn('Supabase fetch error (non-blocking):', dbError.message);
      }
    } catch (err) {
      console.warn('Supabase fetch failed (non-blocking):', err.message);
    }

    const supportEmail = process.env.SUPPORT_EMAIL || process.env.EMAIL_USER;
    const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL || 'https://anandvan.org';
    const fromName = process.env.EMAIL_FROM_NAME || 'Anandvan Foundation';

    const html = buildReceiptHtml({
      name,
      amount,
      date: donationDate,
      transactionId,
      supportEmail,
      websiteUrl,
    });

    const transporter = createTransporter();

    // Send receipt to donor
    await transporter.sendMail({
      from: `"${fromName}" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `🙏 Thank you for your donation to Anandvan – ₹${Number(amount).toLocaleString('en-IN')}`,
      html,
    });

    // Notify org (internal copy)
    await transporter.sendMail({
      from: `"${fromName}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `💰 New Donation: ₹${Number(amount).toLocaleString('en-IN')} from ${name} [${transactionId}]`,
      html: `
        <p><strong>Donor:</strong> ${name} (${email}, ${phone || 'N/A'})</p>
        <p><strong>Amount:</strong> ₹${Number(amount).toLocaleString('en-IN')}</p>
        <p><strong>Category:</strong> ${category} (${hindi || ''})</p>
        <p><strong>Transaction ID:</strong> ${transactionId}</p>
        <p><strong>Date:</strong> ${donationDate}</p>
        ${message ? `<p><strong>Message:</strong> "${message}"</p>` : ''}
      `,
    });

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

