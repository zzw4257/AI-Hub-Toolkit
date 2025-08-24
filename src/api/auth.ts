// 客户端API调用
export async function sendOTPRequest(email: string): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch('http://localhost:3001/api/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    })
    
    if (!response.ok) {
      throw new Error('Failed to send OTP')
    }
    
    return await response.json()
  } catch (error) {
    // 临时模拟成功，实际项目中移除
    console.log(`[MOCK] Sending OTP to ${email}`)
    await new Promise(resolve => setTimeout(resolve, 1000))
    return { success: true, message: 'OTP sent successfully' }
  }
}

export async function verifyOTPRequest(email: string, otp: string): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch('http://localhost:3001/api/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp })
    })
    
    if (!response.ok) {
      throw new Error('Failed to verify OTP')
    }
    
    return await response.json()
  } catch (error) {
    // 临时模拟验证 - 接受任何6位数字
    console.log(`[MOCK] Verifying OTP ${otp} for ${email}`)
    await new Promise(resolve => setTimeout(resolve, 500))
    return { success: otp.length === 6, message: otp.length === 6 ? 'OTP verified' : 'Invalid OTP' }
  }
}