import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter,
  Mail,
  Phone,
  MapPin,
  Star,
  ExternalLink
} from "lucide-react";

const candidates = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "+1 (555) 123-4567",
    position: "Senior Frontend Developer",
    stage: "Interview",
    rating: 5,
    location: "San Francisco, CA",
    appliedDate: "2024-01-15",
    avatar: "SJ",
    skills: ["React", "TypeScript", "Node.js"]
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "m.chen@email.com",
    phone: "+1 (555) 234-5678",
    position: "Product Designer",
    stage: "Screening",
    rating: 4,
    location: "New York, NY",
    appliedDate: "2024-01-14",
    avatar: "MC",
    skills: ["Figma", "UI/UX", "Prototyping"]
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.r@email.com",
    phone: "+1 (555) 345-6789",
    position: "Full Stack Engineer",
    stage: "Review",
    rating: 5,
    location: "Remote",
    appliedDate: "2024-01-13",
    avatar: "ER",
    skills: ["Python", "Django", "React"]
  },
  {
    id: 4,
    name: "David Kim",
    email: "david.kim@email.com",
    phone: "+1 (555) 456-7890",
    position: "DevOps Engineer",
    stage: "Interview",
    rating: 4,
    location: "Austin, TX",
    appliedDate: "2024-01-12",
    avatar: "DK",
    skills: ["AWS", "Docker", "Kubernetes"]
  },
  {
    id: 5,
    name: "Alex Turner",
    email: "alex.t@email.com",
    phone: "+1 (555) 567-8901",
    position: "Backend Developer",
    stage: "Offer",
    rating: 5,
    location: "Seattle, WA",
    appliedDate: "2024-01-10",
    avatar: "AT",
    skills: ["Java", "Spring", "PostgreSQL"]
  },
  {
    id: 6,
    name: "Jessica Martinez",
    email: "j.martinez@email.com",
    phone: "+1 (555) 678-9012",
    position: "Marketing Manager",
    stage: "Screening",
    rating: 3,
    location: "Miami, FL",
    appliedDate: "2024-01-11",
    avatar: "JM",
    skills: ["SEO", "Content", "Analytics"]
  }
];

const getStageBadge = (stage: string) => {
  const variants: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
    Interview: "default",
    Screening: "secondary",
    Review: "outline",
    Offer: "default",
    Rejected: "destructive"
  };
  
  return <Badge variant={variants[stage] || "outline"}>{stage}</Badge>;
};

const Candidates = () => {
  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold">Candidates</h1>
          <p className="mt-2 text-muted-foreground">
            Track and manage all candidates in your hiring pipeline
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or position..."
                className="pl-9"
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </Card>

        {/* Candidates List */}
        <div className="grid gap-4">
          {candidates.map((candidate) => (
            <Card key={candidate.id} className="p-6 card-hover">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                {/* Candidate Info */}
                <div className="flex flex-1 items-start gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground">
                    <span className="text-lg font-semibold">{candidate.avatar}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{candidate.name}</h3>
                        <p className="text-sm text-muted-foreground">{candidate.position}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < candidate.rating
                                ? "fill-accent text-accent"
                                : "text-muted"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-3 flex flex-wrap gap-2">
                      {candidate.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span>{candidate.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span>{candidate.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{candidate.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 lg:w-48">
                  {getStageBadge(candidate.stage)}
                  <p className="text-xs text-muted-foreground">
                    Applied: {new Date(candidate.appliedDate).toLocaleDateString()}
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button size="sm" className="flex-1 bg-gradient-primary">
                      View Profile
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  };
  
  export default Candidates;
