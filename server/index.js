// Node.js 后端邮件服务 (需要单独运行)
const nodemailer = require('nodemailer');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/avatars', express.static(path.join(__dirname, 'public/avatars')));


const otpStore = new Map();

// --- Multer Setup for Avatar Uploads ---
const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'server/public/avatars';
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    // Note: In a real app, you'd associate this with the user ID
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: avatarStorage });

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

app.post('/api/user/profile', upload.single('avatar'), (req, res) => {
  const { name } = req.body;
  // In a real app, you would get the user from a session or token
  const email = 'dummy-user@example.com';

  const updatedUser = {
    // This would come from your database/session
    id: '1',
    email,
    name,
  };

  if (req.file) {
    // Construct the URL for the avatar
    const avatarUrl = `${req.protocol}://${req.get('host')}/avatars/${req.file.filename}`;
    updatedUser.avatar = avatarUrl;
  }

  console.log('User profile updated:', updatedUser);

  // Here you would save the updatedUser to your database

  res.json({
    success: true,
    message: 'Profile updated successfully',
    user: updatedUser
  });
});

app.listen(3001, () => {
  console.log('Email server running on port 3001');
});