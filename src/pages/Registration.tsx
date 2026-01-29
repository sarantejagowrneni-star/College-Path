import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Phone, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/components/Logo";
import OTPInput from "@/components/OTPInput";
import { useStudent } from "@/context/StudentContext";
import { toast } from "sonner";

const Registration = () => {
  const navigate = useNavigate();
  const { setStudentData, setIsRegistered } = useStudent();
  const [step, setStep] = useState<"form" | "otp">("form");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !phone) {
      toast.error("Please fill in all fields");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(phone)) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }
    setIsLoading(true);
    // Simulate OTP sending
    setTimeout(() => {
      setIsLoading(false);
      setStep("otp");
      toast.success("OTP sent to your phone!");
    }, 1500);
  };

  const handleOTPComplete = (otp: string) => {
    setIsLoading(true);
    // Simulate OTP verification (any 6 digits work)
    setTimeout(() => {
      setIsLoading(false);
      setStudentData({
        email,
        phone,
        firstName: "",
        lastName: "",
        tenthMarks: "",
        interMarks: "",
        stream: "",
      });
      setIsRegistered(true);
      toast.success("Verified successfully!");
      navigate("/onboarding");
    }, 1000);
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cta/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "-3s" }} />
      </div>

      <div className="glass-card rounded-2xl p-8 w-full max-w-md relative z-10 animate-slide-up">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo size="lg" />
          </div>
          <p className="text-muted-foreground">
            {step === "form"
              ? "Start your journey to find the perfect college"
              : "Enter the OTP sent to your phone"}
          </p>
        </div>

        {step === "form" ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">
                Phone Number
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  className="pl-10 h-12"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="cta"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="animate-pulse">Sending OTP...</span>
              ) : (
                <>
                  Continue
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </form>
        ) : (
          <div className="space-y-6">
            <OTPInput onComplete={handleOTPComplete} />
            <p className="text-center text-sm text-muted-foreground">
              Didn't receive the code?{" "}
              <button
                type="button"
                onClick={() => toast.info("OTP resent!")}
                className="text-accent hover:underline font-medium"
              >
                Resend OTP
              </button>
            </p>
            {isLoading && (
              <div className="flex justify-center">
                <div className="animate-spin w-6 h-6 border-2 border-accent border-t-transparent rounded-full" />
              </div>
            )}
          </div>
        )}

        <div className="mt-6 pt-6 border-t border-border/50">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="w-4 h-4 text-accent" />
            <span>Trusted by 50,000+ students</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
