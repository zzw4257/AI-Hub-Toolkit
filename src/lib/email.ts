import nodemailer from 'nodemailer'

interface OTPEmailData {
  email: string
  otp: string
  name?: string
}

// 生成6位随机OTP
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// QQ邮箱配置
const transporter = nodemailer.createTransporter({
  host: 'smtp.qq.com',
  port: 587,
  secure: false,
  auth: {
    user: import.meta.env.VITE_EMAIL_USER,
    pass: import.meta.env.VITE_EMAIL_PASS
  }
})

// 真实邮件发送
export async function sendOTPEmail({ email, otp, name }: OTPEmailData): Promise<boolean> {
  try {
    await transporter.sendMail({
      from: `"Z-AIHub" <${import.meta.env.VITE_EMAIL_USER}>`,
      to: email,
      subject: 'Z-AIHub 登录验证码',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7c3aed;">欢迎使用 Z-AIHub!</h2>
          <p>您好 ${name || ''},</p>
          <p>您的登录验证码是：</p>
          <div style="background: #f3f4f6; padding: 20px; text-align: center; margin: 20px 0;">
            <span style="font-size: 32px; font-weight: bold; color: #7c3aed; letter-spacing: 5px;">${otp}</span>
          </div>
          <p>验证码有效期为10分钟，请及时使用。</p>
          <p>如果这不是您的操作，请忽略此邮件。</p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 12px;">此邮件由 Z-AIHub 系统自动发送，请勿回复。</p>
        </div>
      `
    })
    
    console.log(`OTP ${otp} sent to ${email}`)
    return true
  } catch (error) {
    console.error('Failed to send OTP email:', error)
    return false
  }
}

// 验证OTP（实际项目中应该存储在数据库中）
const otpStore = new Map<string, { otp: string, expires: number }>()

export function storeOTP(email: string, otp: string): void {
  const expires = Date.now() + 10 * 60 * 1000 // 10分钟过期
  otpStore.set(email, { otp, expires })
}

export function verifyOTP(email: string, inputOTP: string): boolean {
  const stored = otpStore.get(email)
  if (!stored) return false
  
  if (Date.now() > stored.expires) {
    otpStore.delete(email)
    return false
  }
  
  if (stored.otp === inputOTP) {
    otpStore.delete(email)
    return true
  }
  
  return false
}