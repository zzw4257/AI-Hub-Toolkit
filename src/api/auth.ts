// 客户端API调用
export async function sendOTPRequest(email: string): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch('http://localhost:3001/api/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    })
    
    const result = await response.json()
    if (!response.ok) {
      throw new Error(result.message || 'Failed to send OTP')
    }
    
    return result
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred'
    return { success: false, message }
  }
}

export async function verifyOTPRequest(email: string, otp: string): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch('http://localhost:3001/api/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp })
    })
    
    const result = await response.json()
    if (!response.ok) {
      throw new Error(result.message || 'Failed to verify OTP')
    }
    
    return result
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred'
    return { success: false, message }
  }
}