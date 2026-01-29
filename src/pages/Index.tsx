import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStudent } from "@/context/StudentContext";

const Index = () => {
  const navigate = useNavigate();
  const { isRegistered, isOnboarded } = useStudent();

  useEffect(() => {
    if (isOnboarded) {
      navigate("/dashboard");
    } else if (isRegistered) {
      navigate("/onboarding");
    } else {
      navigate("/register");
    }
  }, [isRegistered, isOnboarded, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full" />
    </div>
  );
};

export default Index;
