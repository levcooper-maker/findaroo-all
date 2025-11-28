import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IndustryTabs } from "@/components/IndustryTabs";
import { JobCard, Job } from "@/components/JobCard";
import { 
  Search, 
  Plus,
  SlidersHorizontal,
  TrendingUp,
  Shield,
  Zap
} from "lucide-react";

const allJobs: Job[] = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    department: "Engineering",
    industry: "technology",
    location: "Remote",
    type: "Full-time",
    salary: "$120k - $160k",
    applicants: 45,
    status: "active",
    postedDate: "2 days ago",
    source: "LinkedIn",
    isVerified: true,
    qualityScore: 9,
    duplicateCount: 1,
    responseRate: 85
  },
  {
    id: 2,
    title: "Product Designer",
    department: "Design",
    industry: "design",
    location: "New York, NY",
    type: "Full-time",
    salary: "$100k - $140k",
    applicants: 32,
    status: "active",
    postedDate: "5 days ago",
    source: "Indeed",
    isVerified: true,
    qualityScore: 8,
    duplicateCount: 2,
    responseRate: 72
  },
  {
    id: 3,
    title: "Full Stack Engineer",
    department: "Engineering",
    industry: "technology",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$130k - $180k",
    applicants: 68,
    status: "active",
    postedDate: "1 week ago",
    source: "AngelList",
    isVerified: true,
    qualityScore: 9,
    duplicateCount: 3,
    responseRate: 78
  },
  {
    id: 4,
    title: "DevOps Engineer",
    department: "Engineering",
    industry: "technology",
    location: "Remote",
    type: "Full-time",
    salary: "$110k - $150k",
    applicants: 28,
    status: "active",
    postedDate: "3 days ago",
    source: "GitHub Jobs",
    isVerified: true,
    qualityScore: 8,
    duplicateCount: 1,
    responseRate: 82
  },
  {
    id: 5,
    title: "Marketing Manager",
    department: "Marketing",
    industry: "marketing",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$90k - $120k",
    applicants: 19,
    status: "active",
    postedDate: "4 days ago",
    source: "LinkedIn",
    isVerified: true,
    qualityScore: 7,
    duplicateCount: 2,
    responseRate: 65
  },
  {
    id: 6,
    title: "Backend Developer",
    department: "Engineering",
    industry: "technology",
    location: "Remote",
    type: "Contract",
    salary: "$100k - $140k",
    applicants: 51,
    status: "active",
    postedDate: "6 days ago",
    source: "Indeed",
    isVerified: false,
    qualityScore: 6,
    duplicateCount: 4,
    responseRate: 45
  },
  {
    id: 7,
    title: "UX Researcher",
    department: "Design",
    industry: "design",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$95k - $130k",
    applicants: 24,
    status: "active",
    postedDate: "2 days ago",
    source: "LinkedIn",
    isVerified: true,
    qualityScore: 8,
    duplicateCount: 1,
    responseRate: 80
  },
  {
    id: 8,
    title: "Registered Nurse",
    department: "Healthcare",
    industry: "healthcare",
    location: "Boston, MA",
    type: "Full-time",
    salary: "$70k - $95k",
    applicants: 37,
    status: "active",
    postedDate: "1 day ago",
    source: "Indeed",
    isVerified: true,
    qualityScore: 9,
    duplicateCount: 1,
    responseRate: 90
  },
  {
    id: 9,
    title: "High School Math Teacher",
    department: "Education",
    industry: "education",
    location: "Chicago, IL",
    type: "Full-time",
    salary: "$55k - $75k",
    applicants: 15,
    status: "active",
    postedDate: "3 days ago",
    source: "LinkedIn",
    isVerified: true,
    qualityScore: 8,
    duplicateCount: 1,
    responseRate: 75
  },
  {
    id: 10,
    title: "Store Manager",
    department: "Retail",
    industry: "retail",
    location: "Miami, FL",
    type: "Full-time",
    salary: "$50k - $70k",
    applicants: 42,
    status: "active",
    postedDate: "5 days ago",
    source: "Indeed",
    isVerified: true,
    qualityScore: 7,
    duplicateCount: 2,
    responseRate: 68
  },
  {
    id: 11,
    title: "Mechanical Engineer",
    department: "Engineering",
    industry: "engineering",
    location: "Detroit, MI",
    type: "Full-time",
    salary: "$80k - $110k",
    applicants: 29,
    status: "active",
    postedDate: "4 days ago",
    source: "LinkedIn",
    isVerified: true,
    qualityScore: 8,
    duplicateCount: 1,
    responseRate: 73
  },
  {
    id: 12,
    title: "Content Marketing Specialist",
    department: "Marketing",
    industry: "marketing",
    location: "Remote",
    type: "Full-time",
    salary: "$65k - $85k",
    applicants: 56,
    status: "active",
    postedDate: "1 week ago",
    source: "AngelList",
    isVerified: false,
    qualityScore: 6,
    duplicateCount: 3,
    responseRate: 52
  }
];

const Jobs = () => {
  const navigate = useNavigate();
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredJobs = allJobs.filter((job) => {
    const matchesIndustry = selectedIndustry === "all" || job.industry === selectedIndustry;
    const matchesSearch = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesIndustry && matchesSearch;
  });

  const stats = {
    total: filteredJobs.length,
    verified: filteredJobs.filter(j => j.isVerified).length,
    avgQuality: (filteredJobs.reduce((acc, j) => acc + (j.qualityScore || 0), 0) / filteredJobs.length).toFixed(1)
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-4xl font-bold">Job Listings</h1>
          <p className="mt-2 text-muted-foreground">
            Intelligent job aggregation with duplicate detection and quality scoring
          </p>
        </div>
        <Button 
          className="bg-gradient-primary shadow-lg hover:shadow-xl transition-smooth"
          onClick={() => navigate("/post-job")}
        >
          <Plus className="mr-2 h-4 w-4" />
          Post New Job
        </Button>
      </div>

      {/* Platform Advantages */}
      <Card className="p-6 bg-gradient-subtle border-primary/20">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
              <Shield className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="font-semibold">No Ghost Jobs</p>
              <p className="text-sm text-muted-foreground">Only verified, active positions</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold">Smart Deduplication</p>
              <p className="text-sm text-muted-foreground">Find unique jobs across platforms</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
              <TrendingUp className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="font-semibold">Quality Scores</p>
              <p className="text-sm text-muted-foreground">Employer response rates & ratings</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Industry Filter Tabs */}
      <IndustryTabs 
        selectedIndustry={selectedIndustry} 
        onIndustryChange={setSelectedIndustry} 
      />

      {/* Stats Bar */}
      <div className="flex flex-wrap items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="font-semibold">{stats.total}</span>
          <span className="text-muted-foreground">jobs found</span>
        </div>
        <span className="text-muted-foreground">•</span>
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-success" />
          <span className="font-semibold">{stats.verified}</span>
          <span className="text-muted-foreground">verified</span>
        </div>
        <span className="text-muted-foreground">•</span>
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          <span className="text-muted-foreground">Avg quality:</span>
          <span className="font-semibold">{stats.avgQuality}/10</span>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="p-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search jobs by title, department, or location..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Advanced Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Jobs Grid */}
      {filteredJobs.length > 0 ? (
        <div className="grid gap-6 lg:grid-cols-2">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">No jobs found</h3>
          <p className="mt-2 text-muted-foreground">
            Try adjusting your filters or search terms
          </p>
        </Card>
      )}
    </div>
  );
};

export default Jobs;
