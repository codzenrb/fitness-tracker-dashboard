import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Glassmorphism } from "@/components/ui/glassmorphism";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface OTPVerificationProps {
  mobileNumber: string;
  onVerificationSuccess: () => void;
  onResendOTP: () => Promise<void>;
}

export default function OTPVerification({ 
  mobileNumber, 
  onVerificationSuccess,
  onResendOTP 
}: OTPVerificationProps) {
  const [otp, setOtp] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(60);
  const [canResend, setCanResend] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0 && !canResend) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [countdown, canResend]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVerify = async () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP code",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await apiRequest<{ success: boolean; message?: string }>('/api/verify-otp', {
        method: 'POST',
        body: {
          mobileNumber,
          otp
        },
      });

      if (response.success) {
        toast({
          title: "Verification Successful",
          description: "Your mobile number has been verified",
        });
        onVerificationSuccess();
      } else {
        toast({
          title: "Verification Failed",
          description: response.message || "Invalid OTP. Please try again",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Verification Error",
        description: "Could not verify OTP. Please try again",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOTP = async () => {
    if (!canResend) return;
    
    setIsSubmitting(true);
    try {
      await onResendOTP();
      setCountdown(60);
      setCanResend(false);
      toast({
        title: "OTP Sent",
        description: `A new OTP has been sent to your mobile number`,
      });
    } catch (error) {
      toast({
        title: "Failed to resend OTP",
        description: "Could not send a new OTP. Please try again",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <Glassmorphism className="backdrop-blur-lg bg-white/50">
        <Card className="border-none bg-transparent shadow-none">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-purple-700">
              Verify Your Number
            </CardTitle>
            <p className="text-gray-700 mt-1">
              We've sent a 6-digit OTP to <br />
              <span className="font-medium">{mobileNumber}</span>
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => setOtp(value)}
                className="gap-2"
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} className="h-12 w-12 bg-white/70 border-indigo-200" />
                  <InputOTPSlot index={1} className="h-12 w-12 bg-white/70 border-indigo-200" />
                  <InputOTPSlot index={2} className="h-12 w-12 bg-white/70 border-indigo-200" />
                </InputOTPGroup>
                <InputOTPGroup>
                  <InputOTPSlot index={3} className="h-12 w-12 bg-white/70 border-indigo-200" />
                  <InputOTPSlot index={4} className="h-12 w-12 bg-white/70 border-indigo-200" />
                  <InputOTPSlot index={5} className="h-12 w-12 bg-white/70 border-indigo-200" />
                </InputOTPGroup>
              </InputOTP>
            </div>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                onClick={handleVerify} 
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                disabled={isSubmitting || otp.length !== 6}
              >
                {isSubmitting ? "Verifying..." : "Verify OTP"}
              </Button>
            </motion.div>
          </CardContent>
          
          <CardFooter className="flex flex-col gap-2 pb-4 pt-0">
            <div className="text-sm text-center text-gray-600">
              {canResend ? (
                <Button 
                  variant="link" 
                  className="p-0 text-indigo-600 hover:text-indigo-800"
                  onClick={handleResendOTP}
                  disabled={isSubmitting}
                >
                  Resend OTP
                </Button>
              ) : (
                <div>
                  Resend OTP in <span className="font-medium">{formatTime(countdown)}</span>
                </div>
              )}
            </div>
          </CardFooter>
        </Card>
      </Glassmorphism>
    </motion.div>
  );
}