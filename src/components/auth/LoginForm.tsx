import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { useAuthStore } from '@/store/auth'
import { useToast } from '@/hooks/use-toast'
import { sendOTPRequest, verifyOTPRequest } from '@/api/auth'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState<'email' | 'otp'>('email')
  const [loading, setLoading] = useState(false)
  const { login } = useAuthStore()
  const { toast } = useToast()

  const handleSendOTP = async () => {
    if (!email) return
    setLoading(true)
    
    try {
      const result = await sendOTPRequest(email)
      
      if (result.success) {
        setStep('otp')
        toast({ title: 'OTP sent to your email' })
      } else {
        toast({ title: result.message, variant: 'destructive' })
      }
    } catch (error) {
      toast({ title: 'Error sending OTP', variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) return
    setLoading(true)
    
    try {
      const result = await verifyOTPRequest(email, otp)
      
      if (result.success) {
        login({
          id: Date.now().toString(),
          email,
          name: email.split('@')[0],
        })
        toast({ title: 'Login successful!' })
      } else {
        toast({ title: result.message, variant: 'destructive' })
        setOtp('')
      }
    } catch (error) {
      toast({ title: 'Error verifying OTP', variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Login to Z-AIHub</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {step === 'email' ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            <Button 
              onClick={handleSendOTP} 
              disabled={!email || loading}
              className="w-full"
            >
              {loading ? 'Sending...' : 'Send OTP'}
            </Button>
          </>
        ) : (
          <>
            <div className="space-y-2">
              <Label>Enter OTP sent to {email}</Label>
              <InputOTP value={otp} onChange={setOtp} maxLength={6}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <Button 
              onClick={handleVerifyOTP} 
              disabled={otp.length !== 6 || loading}
              className="w-full"
            >
              {loading ? 'Verifying...' : 'Verify & Login'}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setStep('email')}
              className="w-full"
            >
              Back
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}