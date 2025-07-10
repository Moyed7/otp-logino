import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState('');

  const handleSendOtp = async () => {
    const res = await fetch('/api/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    if (data.success) {
      setStep(2);
    } else {
      setMessage('حدث خطأ أثناء إرسال الرمز');
    }
  };

  const handleVerifyOtp = async () => {
    const res = await fetch('/api/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp })
    });
    const data = await res.json();
    if (data.success) {
      setMessage('تم التحقق بنجاح ✅');
    } else {
      setMessage('رمز خاطئ ❌');
    }
  };

  return (
    <div style={{ fontFamily: 'Arial', padding: 30 }}>
      <h1>تسجيل الدخول باستخدام OTP</h1>
      {step === 1 && (
        <div>
          <input type="email" placeholder="أدخل بريدك" value={email} onChange={e => setEmail(e.target.value)} />
          <button onClick={handleSendOtp}>إرسال الرمز</button>
        </div>
      )}
      {step === 2 && (
        <div>
          <input type="text" placeholder="أدخل الرمز" value={otp} onChange={e => setOtp(e.target.value)} />
          <button onClick={handleVerifyOtp}>تحقق</button>
        </div>
      )}
      <p>{message}</p>
    </div>
  );
}