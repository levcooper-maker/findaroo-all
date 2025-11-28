import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Plus, 
  MapPin, 
  DollarSign,
  Clock,
  Users,
  Briefcase
} from "lucide-react";

const jobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    salary: "$120k - $160k",
    applicants: 45,
    status: "active",
    postedDate: "2 days ago",
    source: "LinkedIn"
  },
  {
    id: 2,
    title: "Product Designer",
    department: "Design",
    location: "New York, NY",
    type: "Full-time",
    salary: "$100k - $140k",
    applicants: 32,
    status: "active",
    postedDate: "5 days ago",
    source: "Indeed"
  },
  {
    id: 3,
    title: "Full Stack Engineer",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$130k - $180k",
    applicants: 68,
    status: "active",
    postedDate: "1 week ago",
    source: "AngelList"
  },
  {
    id: 4,
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    salary: "$110k - $150k",
    applicants: 28,
    status: "active",
    postedDate: "3 days ago",
    source: "GitHub Jobs"
  },
  {
    id: 5,
    title: "Marketing Manager",
    department: "Marketing",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$90k - $120k",
    applicants: 19,
    status: "active",
    postedDate: "4 days ago",
    source: "LinkedIn"
  },
  {
    id: 6,
    title: "Backend Developer",
    department: "Engineering",
    location: "Remote",
    type: "Contract",
    salary: "$100k - $140k",
    applicants: 51,
    status: "active",
    postedDate: "6 days ago",
    source: "Indeed"
  }
];

const Jobs = () => {
  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold">Job Listings</h1>
            <p className="mt-2 text-muted-foreground">
              Manage and track all your job postings across platforms
            </p>
          </div>
          <Button className="bg-gradient-primary shadow-lg hover:shadow-xl transition-smooth">
            <Plus className="mr-2 h-4 w-4" />
            Post New Job
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search jobs by title, department, or location..."
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">All Sources</Button>
              <Button variant="outline">Filters</Button>
            </div>
          </div>
        </Card>

        {/* Jobs Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {jobs.map((job) => (
            <Card key={job.id} className="p-6 card-hover">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-start gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary">
                      <Briefcase className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold">{job.title}</h3>
                      <p className="text-sm text-muted-foreground">{job.department}</p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{job.location}</span>
                      <span className="text-border">•</span>
                      <span>{job.type}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <DollarSign className="h-4 w-4" />
                      <span>{job.salary}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Posted {job.postedDate}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 rounded-lg bg-primary/10 px-3 py-1">
                        <Users className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium text-primary">
                          {job.applicants} applicants
                        </span>
                      </div>
                      <Badge variant="outline">{job.source}</Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <Button variant="outline" className="flex-1">
                  View Details
                </Button>
                <Button className="flex-1 bg-gradient-primary">
                  Manage Applicants
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
