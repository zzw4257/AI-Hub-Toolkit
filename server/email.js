// Node.js 后端邮件服务 (需要单独运行)
const nodemailer = require('nodemailer');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const otpStore = new Map();

const transporter = nodemailer.createTransport({
  host: 'smtp.qq.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER || '<email>',
    pass: process.env.EMAIL_PASS || '<credential>'
  }
});

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

app.post('/api/send-otp', async (req, res) => {
  const { email } = req.body;
  const otp = generateOTP();
  
  try {
    await transporter.sendMail({
      from: `"Z-AIHub" <${process.env.EMAIL_USER || '<email>'}>`,
      to: email,
      subject: 'Z-AIHub 登录验证码',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7c3aed;">欢迎使用 Z-AIHub!</h2>
          <p>您好,</p>
          <p>您的登录验证码是：</p>
          <div style="background: #f3f4f6; padding: 20px; text-align: center; margin: 20px 0;">
            <span style="font-size: 32px; font-weight: bold; color: #7c3aed; letter-spacing: 5px;">${otp}</span>
          </div>
          <p>验证码有效期为10分钟，请及时使用。</p>
        </div>
      `
    });
    
    otpStore.set(email, { otp, expires: Date.now() + 10 * 60 * 1000 });
    res.json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
});

app.post('/api/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  const stored = otpStore.get(email);
  
  if (!stored || Date.now() > stored.expires || stored.otp !== otp) {
    return res.json({ success: false, message: 'Invalid or expired OTP' });
  }
  
  otpStore.delete(email);
  res.json({ success: true, message: 'OTP verified' });
});

app.listen(3001, () => {
  console.log('Email server running on port 3001');
});