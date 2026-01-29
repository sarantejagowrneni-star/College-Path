import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { StudentData, MarkedCollege } from "@/types/student";

interface StudentContextType {
  studentData: StudentData | null;
  setStudentData: (data: StudentData) => void;
  updateStudentData: (data: Partial<StudentData>) => void;
  markedColleges: MarkedCollege[];
  toggleMarkedCollege: (collegeId: string) => void;
  isCollegeMarked: (collegeId: string) => boolean;
  isRegistered: boolean;
  setIsRegistered: (value: boolean) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  isOnboarded: boolean;
  setIsOnboarded: (value: boolean) => void;
  logout: () => void;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const StudentProvider = ({ children }: { children: ReactNode }) => {
  const [studentData, setStudentDataState] = useState<StudentData | null>(() => {
    const saved = localStorage.getItem("studentData");
    return saved ? JSON.parse(saved) : null;
  });

  const [markedColleges, setMarkedColleges] = useState<MarkedCollege[]>(() => {
    const saved = localStorage.getItem("markedColleges");
    return saved ? JSON.parse(saved) : [];
  });

  const [isRegistered, setIsRegistered] = useState(() => {
    return localStorage.getItem("isRegistered") === "true";
  });

  const [currentStep, setCurrentStep] = useState(() => {
    const saved = localStorage.getItem("currentStep");
    return saved ? parseInt(saved) : 1;
  });

  const [isOnboarded, setIsOnboarded] = useState(() => {
    return localStorage.getItem("isOnboarded") === "true";
  });

  useEffect(() => {
    if (studentData) {
      localStorage.setItem("studentData", JSON.stringify(studentData));
    }
  }, [studentData]);

  useEffect(() => {
    localStorage.setItem("markedColleges", JSON.stringify(markedColleges));
  }, [markedColleges]);

  useEffect(() => {
    localStorage.setItem("isRegistered", String(isRegistered));
  }, [isRegistered]);

  useEffect(() => {
    localStorage.setItem("currentStep", String(currentStep));
  }, [currentStep]);

  useEffect(() => {
    localStorage.setItem("isOnboarded", String(isOnboarded));
  }, [isOnboarded]);

  const setStudentData = (data: StudentData) => {
    setStudentDataState(data);
  };

  const updateStudentData = (data: Partial<StudentData>) => {
    setStudentDataState((prev) => (prev ? { ...prev, ...data } : null));
  };

  const logout = () => {
    setStudentDataState(null);
    setMarkedColleges([]);
    setIsRegistered(false);
    setIsOnboarded(false);
    setCurrentStep(1);

    localStorage.removeItem("studentData");
    localStorage.removeItem("markedColleges");
    localStorage.removeItem("isRegistered");
    localStorage.removeItem("isOnboarded");
    localStorage.removeItem("currentStep");

    // Optional: Redirect to home is usually handled by the component calling logout or protected routes
    window.location.href = "/";
  };

  const toggleMarkedCollege = (collegeId: string) => {
    setMarkedColleges((prev) => {
      const exists = prev.find((m) => m.id === collegeId);
      if (exists) {
        return prev.filter((m) => m.id !== collegeId);
      }
      return [...prev, { id: collegeId, markedAt: new Date() }];
    });
  };

  const isCollegeMarked = (collegeId: string) => {
    return markedColleges.some((m) => m.id === collegeId);
  };

  return (
    <StudentContext.Provider
      value={{
        studentData,
        setStudentData,
        updateStudentData,
        markedColleges,
        toggleMarkedCollege,
        isCollegeMarked,
        isRegistered,
        setIsRegistered,
        currentStep,
        setCurrentStep,
        isOnboarded,
        setIsOnboarded,
        logout,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error("useStudent must be used within StudentProvider");
  }
  return context;
};
