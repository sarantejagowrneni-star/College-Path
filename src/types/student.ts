export interface StudentData {
  // Registration
  email: string;
  phone: string;
  
  // Stage 1 - Personal Details
  firstName: string;
  lastName: string;
  tenthMarks: string;
  
  // Stage 2 - Inter Details
  interMarks: string;
  stream: "MPC" | "BiPC" | "MEC" | "HEC" | "";
  
  // Stage 3 - Optional Scholarship Info
  jeeRank?: string;
  eapcetRank?: string;
  emcetRank?: string;
  fatherIncome?: string;
}

export interface MarkedCollege {
  id: string;
  markedAt: Date;
}
