import { Layout } from "@/components/Layout";
import { StatCard } from "@/components/StatCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, 
  Users, 
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle
} from "lucide-react";

const recentApplications = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "Senior Frontend Developer",
    status: "interview",
    appliedDate: "2 hours ago",
    avatar: "SJ"
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "Product Designer",
    status: "screening",
    appliedDate: "5 hours ago",
    avatar: "MC"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    position: "Full Stack Engineer",
    status: "review",
    appliedDate: "1 day ago",
    avatar: "ER"
  },
  {
    id: 4,
    name: "David Kim",
    position: "DevOps Engineer",
    status: "interview",
    appliedDate: "2 days ago",
    avatar: "DK"
  }
];

const upcomingInterviews = [
  {
    id: 1,
    candidate: "Sarah Johnson",
    position: "Senior Frontend Developer",
    time: "Today, 2:00 PM",
    type: "Zoom"
  },
  {
    id: 2,
    candidate: "David Kim",
    position: "DevOps Engineer",
    time: "Tomorrow, 10:00 AM",
    type: "In-person"
  },
  {
    id: 3,
    candidate: "Alex Turner",
    position: "Backend Developer",
    time: "Tomorrow, 3:30 PM",
    type: "Zoom"
  }
];

const getStatusBadge = (status: string) => {
  const variants: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
    interview: { label: "Interview", variant: "default" },
    screening: { label: "Screening", variant: "secondary" },
    review: { label: "Review", variant: "outline" },
    rejected: { label: "Rejected", variant: "destructive" }
  };
  
  const config = variants[status] || variants.review;
  return <Badge variant={config.variant}>{config.label}</Badge>;
};

const Dashboard = () => {
  return (
    <Layout>
      <div className="space-y-8 animate-in fade-in-50 duration-500">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <p className="mt-2 text-muted-foreground">
            Welcome back! Here's what's happening with your hiring pipeline.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Active Jobs"
            value={12}
            icon={Briefcase}
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Total Applicants"
            value={248}
            icon={Users}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Interviews Scheduled"
            value={18}
            icon={Calendar}
            trend={{ value: 5, isPositive: true }}
          />
          <StatCard
            title="Offers Sent"
            value={6}
            icon={TrendingUp}
            trend={{ value: 20, isPositive: true }}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Applications */}
          <Card className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Recent Applications</h2>
              <Button variant="outline" size="sm">View All</Button>
            </div>
            <div className="space-y-4">
              {recentApplications.map((app) => (
                <div
                  key={app.id}
                  className="flex items-center gap-4 rounded-lg border border-border p-4 transition-smooth hover:border-primary/50 hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground">
                    <span className="text-sm font-semibold">{app.avatar}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{app.name}</p>
                    <p className="text-sm text-muted-foreground truncate">{app.position}</p>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(app.status)}
                    <p className="mt-1 text-xs text-muted-foreground">{app.appliedDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Upcoming Interviews */}
          <Card className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Upcoming Interviews</h2>
              <Button variant="outline" size="sm">Schedule New</Button>
            </div>
            <div className="space-y-4">
              {upcomingInterviews.map((interview) => (
                <div
                  key={interview.id}
                  className="flex items-start gap-4 rounded-lg border border-border p-4 transition-smooth hover:border-accent/50 hover:shadow-md"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                    <Calendar className="h-5 w-5 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{interview.candidate}</p>
                    <p className="text-sm text-muted-foreground truncate">{interview.position}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">{interview.time}</p>
                      <Badge variant="outline" className="ml-auto text-xs">
                        {interview.type}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Pipeline Overview */}
        <Card className="p-6">
          <h2 className="mb-6 text-xl font-semibold">Hiring Pipeline</h2>
          <div className="grid gap-4 sm:grid-cols-4">
            <div className="rounded-lg border border-border p-4 text-center">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                <Users className="h-5 w-5 text-foreground" />
              </div>
              <p className="text-2xl font-bold">248</p>
              <p className="text-sm text-muted-foreground">Applied</p>
            </div>
            <div className="rounded-lg border border-border p-4 text-center">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <p className="text-2xl font-bold">84</p>
              <p className="text-sm text-muted-foreground">Screening</p>
            </div>
            <div className="rounded-lg border border-border p-4 text-center">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                <Calendar className="h-5 w-5 text-accent" />
              </div>
              <p className="text-2xl font-bold">42</p>
              <p className="text-sm text-muted-foreground">Interview</p>
            </div>
            <div className="rounded-lg border border-border p-4 text-center">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-success/10">
                <CheckCircle2 className="h-5 w-5 text-success" />
              </div>
              <p className="text-2xl font-bold">6</p>
              <p className="text-sm text-muted-foreground">Offer</p>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
