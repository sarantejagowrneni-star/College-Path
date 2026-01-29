import { GraduationCap } from "lucide-react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

const Logo = ({ size = "md", showText = true }: LogoProps) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-14 h-14",
  };

  const textClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-3xl",
  };

  return (
    <div className="flex items-center gap-3">
      <div className={`${sizeClasses[size]} rounded-xl bg-accent flex items-center justify-center shadow-md`}>
        <GraduationCap className="w-2/3 h-2/3 text-accent-foreground" />
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={`${textClasses[size]} font-bold text-foreground leading-tight`}>
            College Path
          </span>
          {size === "lg" && (
            <span className="text-sm text-muted-foreground">Find Your Future</span>
          )}
        </div>
      )}
    </div>
  );
};

export default Logo;
