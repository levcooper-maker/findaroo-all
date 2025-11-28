import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  DollarSign,
  Clock,
  Users,
  Briefcase,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Copy
} from "lucide-react";

export interface Job {
  id: number;
  title: string;
  department: string;
  industry: string;
  location: string;
  type: string;
  salary: string;
  applicants: number;
  status: string;
  postedDate: string;
  source: string;
  isVerified?: boolean;
  qualityScore?: number;
  duplicateCount?: number;
  responseRate?: number;
}

interface JobCardProps {
  job: Job;
}

export const JobCard = ({ job }: JobCardProps) => {
  const getQualityColor = (score: number) => {
    if (score >= 8) return "text-success";
    if (score >= 6) return "text-warning";
    return "text-muted-foreground";
  };

  const getDaysAgo = (dateStr: string) => {
    const days = parseInt(dateStr);
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    return dateStr;
  };

  return (
    <Card className="p-6 card-hover">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary">
              <Briefcase className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-2">
                <h3 className="text-lg font-semibold flex-1">{job.title}</h3>
                {job.isVerified && (
                  <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0" />
                )}
              </div>
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
              <span>Posted {getDaysAgo(job.postedDate)}</span>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 rounded-lg bg-primary/10 px-3 py-1">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                {job.applicants} applicants
              </span>
            </div>
            
            <Badge variant="outline">{job.source}</Badge>

            {job.qualityScore && (
              <div className="flex items-center gap-1 text-xs">
                <TrendingUp className={`h-3.5 w-3.5 ${getQualityColor(job.qualityScore)}`} />
                <span className={getQualityColor(job.qualityScore)}>
                  Quality: {job.qualityScore}/10
                </span>
              </div>
            )}

            {job.duplicateCount && job.duplicateCount > 1 && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Copy className="h-3.5 w-3.5" />
                <span>Found on {job.duplicateCount} platforms</span>
              </div>
            )}

            {job.responseRate && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <AlertCircle className="h-3.5 w-3.5" />
                <span>{job.responseRate}% response rate</span>
              </div>
            )}
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
  );
};
