import { otpStore } from './send-otp';

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { email, otp } = req.body;
  if (otpStore[email] === otp) {
    delete otpStore[email];
    return res.status(200).json({ success: true });
  } else {
    return res.status(400).json({ success: false });
  }
}