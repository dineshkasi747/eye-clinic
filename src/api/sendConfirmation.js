// Resend Email Confirmation
// 1. Go to https://resend.com → create account → get API key
// 2. Add your key to .env as VITE_RESEND_API_KEY
// 3. Verify your sender domain/email in Resend dashboard

const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY;
const FROM_EMAIL = import.meta.env.VITE_FROM_EMAIL;
const WA_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;

export async function sendBookingConfirmation(formData) {
  const { name, email, phone, service, date, message } = formData;

  const emailHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8"/>
      <style>
        *{margin:0;padding:0;box-sizing:border-box;}
        body{font-family:Arial,sans-serif;background:#fdf8f8;color:#1c1b1b;}
        .container{max-width:600px;margin:40px auto;background:#fff;border-radius:24px;overflow:hidden;box-shadow:0 8px 40px rgba(0,0,0,0.08);}
        .header{background:linear-gradient(135deg,#001d35,#004674);padding:48px 40px;text-align:center;}
        .header h1{color:#fff;font-size:28px;font-weight:800;margin-bottom:8px;}
        .header p{color:rgba(255,255,255,0.7);font-size:14px;}
        .eye{font-size:48px;display:block;margin-bottom:20px;}
        .badge{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:100px;padding:6px 14px;margin-bottom:24px;}
        .badge span{color:rgba(255,255,255,0.8);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.2em;}
        .dot{width:8px;height:8px;background:#fe8949;border-radius:50%;display:inline-block;}
        .body{padding:48px 40px;}
        .greeting{font-size:20px;font-weight:700;color:#004674;margin-bottom:16px;}
        .intro{color:#414750;line-height:1.7;margin-bottom:32px;}
        .card{background:#f0edec;border-radius:16px;padding:28px;margin-bottom:32px;}
        .card h3{font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:0.25em;color:#9f4200;margin-bottom:20px;}
        .row{display:flex;gap:12px;margin-bottom:16px;}
        .row:last-child{margin-bottom:0;}
        .lbl{font-size:12px;font-weight:700;color:#717881;text-transform:uppercase;min-width:80px;padding-top:2px;}
        .val{font-size:15px;font-weight:600;color:#1c1b1b;}
        .divider{height:1px;background:#e6e1e1;margin:24px 0;}
        .note{background:#fff3cd;border-left:4px solid #fe8949;border-radius:4px;padding:16px;font-size:14px;line-height:1.6;}
        .strip{background:#fef3ec;border-radius:12px;padding:20px;display:flex;justify-content:space-around;margin-bottom:32px;}
        .si{text-align:center;}
        .si .sl{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;color:#9f4200;margin-bottom:4px;}
        .si .sv{font-size:14px;font-weight:600;}
        .cta{text-align:center;margin-bottom:32px;}
        .btn{display:inline-block;background:#004674;color:#fff;padding:16px 40px;border-radius:100px;font-size:15px;font-weight:700;text-decoration:none;margin-bottom:12px;}
        .sub{color:#717881;font-size:13px;}
        .footer{background:#001d35;padding:28px 40px;text-align:center;}
        .footer p{color:rgba(255,255,255,0.5);font-size:13px;line-height:1.6;}
        .footer a{color:#fe8949;text-decoration:none;}
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <span class="eye">👁️</span>
          <div class="badge"><span class="dot"></span><span>Appointment Requested</span></div>
          <h1>Dr. Rama's Eye Clinic</h1>
          <p>Precision Care for Your Unique Vision</p>
        </div>
        <div class="body">
          <p class="greeting">Hello, ${name}!</p>
          <p class="intro">Thank you for reaching out to <strong>Dr. Rama's Eye Clinic</strong>. We've received your consultation request and our team will contact you shortly to confirm your appointment.</p>
          <div class="card">
            <h3>📋 Your Request Details</h3>
            <div class="row"><span class="lbl">Patient</span><span class="val">${name}</span></div>
            <div class="row"><span class="lbl">Email</span><span class="val">${email}</span></div>
            ${phone ? `<div class="row"><span class="lbl">Phone</span><span class="val">${phone}</span></div>` : ''}
            ${service ? `<div class="row"><span class="lbl">Service</span><span class="val">${service}</span></div>` : ''}
            ${date ? `<div class="row"><span class="lbl">Preferred</span><span class="val">${date}</span></div>` : ''}
            ${message ? `<div class="row"><span class="lbl">Message</span><span class="val">${message}</span></div>` : ''}
          </div>
          <div class="divider"></div>
          <div class="note">ℹ️ <strong>What happens next?</strong> Our team will call or email you within <strong>24 business hours</strong> to confirm your appointment slot.</div>
          <div class="divider"></div>
          <div class="strip">
            <div class="si"><div class="sl">📍 Location</div><div class="sv">Visakhapatnam, AP</div></div>
            <div class="si"><div class="sl">📞 Phone</div><div class="sv">+91 80234 56789</div></div>
            <div class="si"><div class="sl">🕐 Hours</div><div class="sv">Mon–Sat 8AM–6PM</div></div>
          </div>
          <div class="cta">
            <a href="https://wa.me/${WA_NUMBER}" class="btn">💬 WhatsApp Us</a>
            <p class="sub">Fastest response via WhatsApp</p>
          </div>
        </div>
        <div class="footer">
          <p>© 2024 Dr. Rama's Eye Clinic · All rights reserved<br/><a href="#">Privacy Policy</a> · <a href="#">Terms of Service</a></p>
          <p style="margin-top:12px;font-size:11px;">You received this because you submitted a consultation request.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Dr. Rama's Eye Clinic <${FROM_EMAIL}>`,
        to: [email],
        subject: `✅ Appointment Request Received — Dr. Rama's Eye Clinic`,
        html: emailHtml,
        reply_to: FROM_EMAIL,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return { success: false, error: error.message || 'Failed to send email' };
    }

    const data = await response.json();
    return { success: true, id: data.id };

  } catch (err) {
    return { success: false, error: err.message };
  }
}