import { useState } from "react";
import { User, MapPin, Award, Bookmark, Edit, Search, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import Logo from "@/components/Logo";
import CollegeCard from "@/components/CollegeCard";
import ScholarshipCard from "@/components/ScholarshipCard";
import { useStudent } from "@/context/StudentContext";
import { colleges, apDistricts, tgDistricts, scholarships } from "@/data/colleges";
import { toast } from "sonner";

const Dashboard = () => {
  const { studentData, updateStudentData, markedColleges, isCollegeMarked } = useStudent();
  const [activeTab, setActiveTab] = useState("profile");
  const [editOpen, setEditOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState<"AP" | "TG" | "all">("all");
  const [selectedDistrict, setSelectedDistrict] = useState("All Districts");
  const [selectedType, setSelectedType] = useState("all");

  const [editForm, setEditForm] = useState({
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

  const handleSaveEdit = () => {
    updateStudentData(editForm);
    setEditOpen(false);
    toast.success("Profile updated!");
  };

  const filteredColleges = colleges.filter((college) => {
    const matchesSearch = college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      college.district.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesState = selectedState === "all" || college.state === selectedState;
    const matchesDistrict = selectedDistrict === "All Districts" || college.district === selectedDistrict;
    const matchesType = selectedType === "all" || college.type === selectedType;
    const matchesStream = !studentData?.stream || college.streams.includes(studentData.stream);
    return matchesSearch && matchesState && matchesDistrict && matchesType && matchesStream;
  });

  const markedCollegesList = colleges.filter((c) => isCollegeMarked(c.id));

  const eligibleScholarships = scholarships.filter((s) => {
    if (s.category === "JEE" && studentData?.jeeRank) {
      const rank = parseInt(studentData.jeeRank);
      return s.maxRank ? rank <= s.maxRank : true;
    }
    if (s.category === "EAPCET" && studentData?.eapcetRank) {
      const rank = parseInt(studentData.eapcetRank);
      return s.maxRank ? rank <= s.maxRank : true;
    }
    if (s.category === "EMCET" && studentData?.emcetRank) {
      const rank = parseInt(studentData.emcetRank);
      return s.maxRank ? rank <= s.maxRank : true;
    }
    if (s.category === "Income" && studentData?.fatherIncome) {
      const income = parseInt(studentData.fatherIncome);
      return s.maxIncome ? income <= s.maxIncome : true;
    }
    return false;
  });

  const districts = selectedState === "AP" ? apDistricts : selectedState === "TG" ? tgDistricts : [];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container flex items-center justify-between h-16 px-4">
          <Logo size="sm" />
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setActiveTab("marked")}
              className="relative"
            >
              <Bookmark className="w-5 h-5" />
              {markedColleges.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-cta text-cta-foreground text-xs rounded-full flex items-center justify-center">
                  {markedColleges.length}
                </span>
              )}
            </Button>
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
              <span className="font-semibold text-accent">
                {studentData?.firstName?.[0]}{studentData?.lastName?.[0]}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-6 px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-flex">
            <TabsTrigger value="profile" className="gap-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="colleges" className="gap-2">
              <MapPin className="w-4 h-4" />
              <span className="hidden sm:inline">Colleges</span>
            </TabsTrigger>
            <TabsTrigger value="scholarships" className="gap-2">
              <Award className="w-4 h-4" />
              <span className="hidden sm:inline">Scholarships</span>
            </TabsTrigger>
            <TabsTrigger value="marked" className="gap-2">
              <Bookmark className="w-4 h-4" />
              <span className="hidden sm:inline">Saved</span>
              {markedColleges.length > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {markedColleges.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="animate-fade-in">
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Your Profile</h2>
                <Dialog open={editOpen} onOpenChange={setEditOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Edit className="w-4 h-4" />
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Edit Profile</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>First Name</Label>
                          <Input
                            value={editForm.firstName}
                            onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Last Name</Label>
                          <Input
                            value={editForm.lastName}
                            onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>10th Marks (%)</Label>
                        <Input
                          type="number"
                          value={editForm.tenthMarks}
                          onChange={(e) => setEditForm({ ...editForm, tenthMarks: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Inter Marks (%)</Label>
                        <Input
                          type="number"
                          value={editForm.interMarks}
                          onChange={(e) => setEditForm({ ...editForm, interMarks: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Stream</Label>
                        <Select
                          value={editForm.stream}
                          onValueChange={(v) => setEditForm({ ...editForm, stream: v as "" | "MPC" | "BiPC" | "MEC" | "HEC" })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="MPC">MPC</SelectItem>
                            <SelectItem value="BiPC">BiPC</SelectItem>
                            <SelectItem value="MEC">MEC</SelectItem>
                            <SelectItem value="HEC">HEC</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>JEE Rank</Label>
                        <Input
                          type="number"
                          value={editForm.jeeRank}
                          onChange={(e) => setEditForm({ ...editForm, jeeRank: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>EAPCET Rank</Label>
                        <Input
                          type="number"
                          value={editForm.eapcetRank}
                          onChange={(e) => setEditForm({ ...editForm, eapcetRank: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>EMCET Rank</Label>
                        <Input
                          type="number"
                          value={editForm.emcetRank}
                          onChange={(e) => setEditForm({ ...editForm, emcetRank: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Father's Income (₹)</Label>
                        <Input
                          type="number"
                          value={editForm.fatherIncome}
                          onChange={(e) => setEditForm({ ...editForm, fatherIncome: e.target.value })}
                        />
                      </div>
                      <Button variant="cta" className="w-full" onClick={handleSaveEdit}>
                        Save Changes
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Full Name</label>
                    <p className="font-semibold text-lg">{studentData?.firstName} {studentData?.lastName}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Email</label>
                    <p className="font-medium">{studentData?.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Phone</label>
                    <p className="font-medium">+91 {studentData?.phone}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-secondary/50 rounded-lg p-4 text-center">
                      <p className="text-2xl font-bold text-accent">{studentData?.tenthMarks || "-"}%</p>
                      <p className="text-sm text-muted-foreground">10th Marks</p>
                    </div>
                    <div className="bg-secondary/50 rounded-lg p-4 text-center">
                      <p className="text-2xl font-bold text-accent">{studentData?.interMarks || "-"}%</p>
                      <p className="text-sm text-muted-foreground">Inter Marks</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Stream</label>
                    <Badge className="ml-2">{studentData?.stream || "Not Set"}</Badge>
                  </div>
                  {(studentData?.jeeRank || studentData?.eapcetRank || studentData?.emcetRank) && (
                    <div className="flex flex-wrap gap-2">
                      {studentData?.jeeRank && <Badge variant="outline">JEE: {studentData.jeeRank}</Badge>}
                      {studentData?.eapcetRank && <Badge variant="outline">EAPCET: {studentData.eapcetRank}</Badge>}
                      {studentData?.emcetRank && <Badge variant="outline">EMCET: {studentData.emcetRank}</Badge>}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Colleges Tab */}
          <TabsContent value="colleges" className="space-y-6 animate-fade-in">
            <div className="glass-card rounded-xl p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search colleges..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={selectedState} onValueChange={(v: "AP" | "TG" | "all") => {
                    setSelectedState(v);
                    setSelectedDistrict("All Districts");
                  }}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="State" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All States</SelectItem>
                      <SelectItem value="AP">Andhra Pradesh</SelectItem>
                      <SelectItem value="TG">Telangana</SelectItem>
                    </SelectContent>
                  </Select>

                  {selectedState !== "all" && (
                    <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                      <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="District" />
                      </SelectTrigger>
                      <SelectContent>
                        {districts.map((d) => (
                          <SelectItem key={d} value={d}>{d}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}

                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Medical">Medical</SelectItem>
                      <SelectItem value="Arts & Science">Arts & Science</SelectItem>
                      <SelectItem value="Management">Management</SelectItem>
                      <SelectItem value="Pharmacy">Pharmacy</SelectItem>
                      <SelectItem value="Law">Law</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{filteredColleges.length}</span> colleges
              </p>
              {studentData?.stream && (
                <Badge variant="secondary" className="gap-1">
                  <Filter className="w-3 h-3" />
                  Filtered for {studentData.stream}
                </Badge>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {filteredColleges.map((college) => (
                <CollegeCard key={college.id} college={college} />
              ))}
            </div>

            {filteredColleges.length === 0 && (
              <div className="text-center py-12">
                <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No colleges found</h3>
                <p className="text-muted-foreground">Try adjusting your filters</p>
              </div>
            )}
          </TabsContent>

          {/* Scholarships Tab */}
          <TabsContent value="scholarships" className="space-y-6 animate-fade-in">
            {eligibleScholarships.length > 0 && (
              <div className="bg-success/10 border border-success/30 rounded-xl p-4 flex items-center gap-3">
                <Award className="w-6 h-6 text-success" />
                <div>
                  <p className="font-semibold text-success">You're eligible for {eligibleScholarships.length} scholarships!</p>
                  <p className="text-sm text-muted-foreground">Based on your profile information</p>
                </div>
              </div>
            )}

            <div>
              <h3 className="text-lg font-semibold mb-4">
                {eligibleScholarships.length > 0 ? "Your Eligible Scholarships" : "Available Scholarships"}
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {(eligibleScholarships.length > 0 ? eligibleScholarships : scholarships).map((scholarship) => (
                  <ScholarshipCard
                    key={scholarship.id}
                    scholarship={scholarship}
                    isEligible={eligibleScholarships.some((s) => s.id === scholarship.id)}
                  />
                ))}
              </div>
            </div>

            {eligibleScholarships.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <p>Complete your profile with entrance exam ranks and income details to see eligible scholarships.</p>
              </div>
            )}
          </TabsContent>

          {/* Marked Colleges Tab */}
          <TabsContent value="marked" className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold">Saved Colleges</h2>
            
            {markedCollegesList.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-4">
                {markedCollegesList.map((college) => (
                  <CollegeCard key={college.id} college={college} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Bookmark className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No saved colleges yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start exploring and save colleges you're interested in
                </p>
                <Button variant="accent" onClick={() => setActiveTab("colleges")}>
                  Explore Colleges
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
