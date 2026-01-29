import { Award, IndianRupee, CheckCircle } from "lucide-react";
import { Scholarship } from "@/data/colleges";
import { Badge } from "@/components/ui/badge";

interface ScholarshipCardProps {
  scholarship: Scholarship;
  isEligible?: boolean;
}

const ScholarshipCard = ({ scholarship, isEligible = false }: ScholarshipCardProps) => {
  const categoryColors = {
    JEE: "bg-accent/10 text-accent border-accent/30",
    EAPCET: "bg-success/10 text-success border-success/30",
    EMCET: "bg-cta/10 text-cta border-cta/30",
    Income: "bg-primary/10 text-primary border-primary/30",
  };

  return (
    <div
      className={`glass-card rounded-xl p-5 animate-fade-in transition-all duration-300 ${
        isEligible ? "ring-2 ring-success ring-offset-2" : ""
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
            <Award className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="font-bold text-foreground">{scholarship.name}</h3>
            <Badge className={`mt-1 ${categoryColors[scholarship.category]}`}>
              {scholarship.category}
            </Badge>
          </div>
        </div>
        {isEligible && (
          <div className="flex items-center gap-1 text-success">
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm font-medium">Eligible</span>
          </div>
        )}
      </div>

      <p className="text-sm text-muted-foreground mb-4">{scholarship.eligibility}</p>

      <div className="flex items-center gap-2 bg-secondary/50 rounded-lg px-4 py-3">
        <IndianRupee className="w-5 h-5 text-accent" />
        <span className="font-semibold text-foreground">{scholarship.amount}</span>
      </div>
    </div>
  );
};

export default ScholarshipCard;
