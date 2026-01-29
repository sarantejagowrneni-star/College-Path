import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, User, GraduationCap, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Logo from "@/components/Logo";
import StepIndicator from "@/components/StepIndicator";
import { useStudent } from "@/context/StudentContext";
import { toast } from "sonner";

const Onboarding = () => {
  const navigate = useNavigate();
  const { studentData, updateStudentData, currentStep, setCurrentStep, setIsOnboarded } = useStudent();

  const [formData, setFormData] = useState({
    firstName: studentData?.firstName || "",
    lastName: studentData?.lastName || "",
    tenthMarks: studentData?.tenthMarks || "",
    interMarks: studentData?.interMarks || "",
    stream: (studentData?.stream || "") as "" | "MPC" | "BiPC" | "MEC" | "HEC",
    jeeRank: studentData?.jeeRank || "",
    eapcetRank: studentData?.eapcetRank || "",
    emcetRank: studentData?.emcetRank || "",
    fatherIncome: studentData?.fatherIncome || "",
  });

  const handleChange = (field: string, value: string) => {
    if (field === "stream") {
      setFormData((prev) => ({ ...prev, [field]: value as "" | "MPC" | "BiPC" | "MEC" | "HEC" }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const validateStep = () => {
    if (currentStep === 1) {
      if (!formData.firstName || !formData.lastName) {
        toast.error("Please enter your first and last name");
        return false;
      }
      if (!formData.tenthMarks || parseFloat(formData.tenthMarks) < 0 || parseFloat(formData.tenthMarks) > 100) {
        toast.error("Please enter valid 10th marks (0-100)");
        return false;
      }
    }
    if (currentStep === 2) {
      if (!formData.interMarks || parseFloat(formData.interMarks) < 0 || parseFloat(formData.interMarks) > 100) {
        toast.error("Please enter valid Inter marks (0-100)");
        return false;
      }
      if (!formData.stream) {
        toast.error("Please select your stream");
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    updateStudentData(formData);
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsOnboarded(true);
      toast.success("Profile completed!");
      navigate("/dashboard");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    updateStudentData(formData);
    setIsOnboarded(true);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-2xl py-8 px-4">
        <div className="flex justify-center mb-8">
          <Logo size="md" />
        </div>

        <div className="mb-8">
          <StepIndicator currentStep={currentStep} totalSteps={3} />
        </div>

        <div className="glass-card rounded-2xl p-8 animate-slide-up">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <User className="w-7 h-7 text-accent" />
                </div>
                <h2 className="text-2xl font-bold">Personal Details</h2>
                <p className="text-muted-foreground mt-1">Tell us about yourself</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    className="h-12"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tenthMarks">10th Marks (%)</Label>
                <Input
                  id="tenthMarks"
                  type="number"
                  placeholder="e.g., 85.5"
                  value={formData.tenthMarks}
                  onChange={(e) => handleChange("tenthMarks", e.target.value)}
                  className="h-12"
                  min="0"
                  max="100"
                  step="0.1"
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-7 h-7 text-accent" />
                </div>
                <h2 className="text-2xl font-bold">Intermediate Details</h2>
                <p className="text-muted-foreground mt-1">Your 12th class information</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="interMarks">Intermediate Marks (%)</Label>
                <Input
                  id="interMarks"
                  type="number"
                  placeholder="e.g., 90.5"
                  value={formData.interMarks}
                  onChange={(e) => handleChange("interMarks", e.target.value)}
                  className="h-12"
                  min="0"
                  max="100"
                  step="0.1"
                />
              </div>

              <div className="space-y-2">
                <Label>Stream / Group</Label>
                <Select value={formData.stream} onValueChange={(v) => handleChange("stream", v)}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select your stream" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MPC">MPC (Maths, Physics, Chemistry)</SelectItem>
                    <SelectItem value="BiPC">BiPC (Biology, Physics, Chemistry)</SelectItem>
                    <SelectItem value="MEC">MEC (Maths, Economics, Commerce)</SelectItem>
                    <SelectItem value="HEC">HEC (History, Economics, Civics)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-full bg-cta/10 flex items-center justify-center mx-auto mb-4">
                  <Award className="w-7 h-7 text-cta" />
                </div>
                <h2 className="text-2xl font-bold">Scholarship Info</h2>
                <p className="text-muted-foreground mt-1">Optional - for scholarship matching</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="jeeRank">JEE Mains Rank (if applicable)</Label>
                  <Input
                    id="jeeRank"
                    type="number"
                    placeholder="e.g., 5000"
                    value={formData.jeeRank}
                    onChange={(e) => handleChange("jeeRank", e.target.value)}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="eapcetRank">EAPCET Rank - Andhra Pradesh (if applicable)</Label>
                  <Input
                    id="eapcetRank"
                    type="number"
                    placeholder="e.g., 1000"
                    value={formData.eapcetRank}
                    onChange={(e) => handleChange("eapcetRank", e.target.value)}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emcetRank">EMCET Rank - Telangana (if applicable)</Label>
                  <Input
                    id="emcetRank"
                    type="number"
                    placeholder="e.g., 1000"
                    value={formData.emcetRank}
                    onChange={(e) => handleChange("emcetRank", e.target.value)}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fatherIncome">Father's Annual Income (₹)</Label>
                  <Input
                    id="fatherIncome"
                    type="number"
                    placeholder="e.g., 300000"
                    value={formData.fatherIncome}
                    onChange={(e) => handleChange("fatherIncome", e.target.value)}
                    className="h-12"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8 pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>

            <div className="flex gap-3">
              {currentStep === 3 && (
                <Button variant="ghost" onClick={handleSkip}>
                  Skip
                </Button>
              )}
              <Button variant="cta" onClick={handleNext} className="gap-2">
                {currentStep === 3 ? "Complete" : "Next"}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
