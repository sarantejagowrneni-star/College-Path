import { MapPin, Phone, Globe, Star, Bookmark, BookmarkCheck } from "lucide-react";
import { College } from "@/data/colleges";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useStudent } from "@/context/StudentContext";

interface CollegeCardProps {
  college: College;
}

const CollegeCard = ({ college }: CollegeCardProps) => {
  const { isCollegeMarked, toggleMarkedCollege } = useStudent();
  const isMarked = isCollegeMarked(college.id);

  return (
    <div className="glass-card rounded-xl p-5 animate-fade-in hover:shadow-xl transition-all duration-300 group">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-bold text-lg text-foreground group-hover:text-accent transition-colors">
            {college.name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="secondary" className="text-xs">
              {college.type}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {college.state === "AP" ? "Andhra Pradesh" : "Telangana"}
            </Badge>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => toggleMarkedCollege(college.id)}
          className={`transition-all ${isMarked ? "text-cta" : "text-muted-foreground hover:text-cta"}`}
        >
          {isMarked ? <BookmarkCheck className="w-5 h-5 fill-current" /> : <Bookmark className="w-5 h-5" />}
        </Button>
      </div>

      <div className="space-y-2 text-sm text-muted-foreground">
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{college.address}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 shrink-0" />
          <span>{college.contact}</span>
        </div>
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 shrink-0" />
          <a
            href={college.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline truncate"
          >
            {college.website.replace("https://", "").replace("www.", "")}
          </a>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-cta fill-cta" />
          <span className="font-semibold">{college.rating}</span>
          <span className="text-muted-foreground text-xs">/5</span>
        </div>
        <div className="flex gap-1">
          {college.streams.slice(0, 3).map((stream) => (
            <Badge key={stream} variant="outline" className="text-xs">
              {stream}
            </Badge>
          ))}
        </div>
      </div>

      {(college.minPercentage || college.acceptsJEE || college.acceptsEAPCET || college.acceptsEMCET) && (
        <div className="mt-3 flex flex-wrap gap-1">
          {college.minPercentage && (
            <span className="text-xs bg-secondary px-2 py-1 rounded-md">
              Min {college.minPercentage}%
            </span>
          )}
          {college.acceptsJEE && (
            <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-md">JEE</span>
          )}
          {college.acceptsEAPCET && (
            <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-md">EAPCET</span>
          )}
          {college.acceptsEMCET && (
            <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-md">EMCET</span>
          )}
        </div>
      )}
    </div>
  );
};

export default CollegeCard;
