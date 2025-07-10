import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

let otpStore = {};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { email } = req.body;
  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  otpStore[email] = otp;

  const msg = {
    to: email,
    from: 'abaqkingdom@gmail.com',
    subject: 'رمز التحقق الخاص بك',
    text: `رمز التحقق هو: ${otp}`,
    html: `<p>رمز التحقق هو: <strong>${otp}</strong></p>`,
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false });
  }
}

export { otpStore };