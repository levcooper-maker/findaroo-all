import { useState, useEffect } from "react";
import { StatCard } from "@/components/StatCard";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Briefcase, 
  Users, 
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle2,
  Sparkles,
  FileText,
  Loader2
} from "lucide-react";

const getStatusBadge = (status: string) => {
  const variants: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
    interview: { label: "Interview", variant: "default" },
    screening: { label: "Screening", variant: "secondary" },
    review: { label: "Review", variant: "outline" },
    rejected: { label: "Rejected", variant: "destructive" },
    offer: { label: "Offer", variant: "default" }
  };
  
  const config = variants[status] || variants.review;
  return <Badge variant={config.variant}>{config.label}</Badge>;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [stats, setStats] = useState({
    activeJobs: 0,
    totalApplicants: 0,
    interviewsScheduled: 0,
    offersSent: 0
  });
  const [recentApplications, setRecentApplications] = useState<any[]>([]);
  const [upcomingInterviews, setUpcomingInterviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch active jobs count
      const { count: jobsCount } = await supabase
        .from("jobs")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user!.id)
        .eq("status", "active");

      // Fetch all applications for user's jobs
      const { data: jobsData } = await supabase
        .from("jobs")
        .select("id")
        .eq("user_id", user!.id);

      const jobIds = jobsData?.map(j => j.id) || [];

      if (jobIds.length > 0) {
        // Fetch applications
        const { data: applicationsData, count: applicationsCount } = await supabase
          .from("applications")
          .select("*, jobs(title)", { count: "exact" })
          .in("job_id", jobIds)
          .order("created_at", { ascending: false })
          .limit(4);

        // Fetch interviews
        const { data: interviewsData, count: interviewsCount } = await supabase
          .from("interviews")
          .select("*, jobs(title)", { count: "exact" })
          .in("job_id", jobIds)
          .eq("status", "scheduled")
          .gte("interview_date", new Date().toISOString().split("T")[0])
          .order("interview_date", { ascending: true })
          .limit(3);

        // Count offers sent
        const { count: offersCount } = await supabase
          .from("applications")
          .select("*", { count: "exact", head: true })
          .in("job_id", jobIds)
          .eq("status", "offer");

        setStats({
          activeJobs: jobsCount || 0,
          totalApplicants: applicationsCount || 0,
          interviewsScheduled: interviewsCount || 0,
          offersSent: offersCount || 0
        });

        setRecentApplications(applicationsData || []);
        setUpcomingInterviews(interviewsData || []);
      } else {
        setStats({
          activeJobs: 0,
          totalApplicants: 0,
          interviewsScheduled: 0,
          offersSent: 0
        });
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <p className="mt-2 text-muted-foreground">
            Welcome back! Here's what's happening with your hiring pipeline.
          </p>
        </div>

        {/* Stats Grid */}
        {loading ? (
          <Card className="p-12 text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
            <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
          </Card>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Active Jobs"
              value={stats.activeJobs}
              icon={Briefcase}
              trend={{ value: 8, isPositive: true }}
            />
            <StatCard
              title="Total Applicants"
              value={stats.totalApplicants}
              icon={Users}
              trend={{ value: 12, isPositive: true }}
            />
            <StatCard
              title="Interviews Scheduled"
              value={stats.interviewsScheduled}
              icon={Calendar}
              trend={{ value: 5, isPositive: true }}
            />
            <StatCard
              title="Offers Sent"
              value={stats.offersSent}
              icon={TrendingUp}
              trend={{ value: 20, isPositive: true }}
            />
          </div>
        )}

        {/* AI Tools Banner */}
        <Card className="p-6 bg-gradient-primary text-primary-foreground">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-6 w-6" />
                <h2 className="text-2xl font-bold">AI-Powered Tools</h2>
              </div>
              <p className="text-primary-foreground/90">
                Speed up your hiring process with intelligent automation
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="secondary"
                onClick={() => navigate("/ai-job-posting")}
                className="bg-white/20 hover:bg-white/30 text-primary-foreground border-white/20"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Job Posting
              </Button>
              <Button
                variant="secondary"
                onClick={() => navigate("/ai-resume-builder")}
                className="bg-white/20 hover:bg-white/30 text-primary-foreground border-white/20"
              >
                <FileText className="mr-2 h-4 w-4" />
                Build Resume
              </Button>
            </div>
          </div>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Applications */}
          <Card className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Recent Applications</h2>
              <Button variant="outline" size="sm" onClick={() => navigate("/candidates")}>View All</Button>
            </div>
            <div className="space-y-4">
              {recentApplications.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="mx-auto h-8 w-8 mb-2 opacity-50" />
                  <p>No applications yet</p>
                </div>
              ) : (
                recentApplications.map((app) => (
                  <div
                    key={app.id}
                    className="flex items-center gap-4 rounded-lg border border-border p-4 transition-smooth hover:border-primary/50 hover:shadow-md cursor-pointer"
                    onClick={() => navigate("/candidates")}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground">
                      <span className="text-sm font-semibold">{app.full_name.split(" ").map((n: string) => n[0]).join("")}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{app.full_name}</p>
                      <p className="text-sm text-muted-foreground truncate">{app.jobs?.title || "Unknown Position"}</p>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(app.status)}
                      <p className="mt-1 text-xs text-muted-foreground">
                        {new Date(app.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>

          {/* Upcoming Interviews */}
          <Card className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Upcoming Interviews</h2>
              <Button variant="outline" size="sm" onClick={() => navigate("/interviews")}>View All</Button>
            </div>
            <div className="space-y-4">
              {upcomingInterviews.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="mx-auto h-8 w-8 mb-2 opacity-50" />
                  <p>No upcoming interviews</p>
                </div>
              ) : (
                upcomingInterviews.map((interview) => (
                  <div
                    key={interview.id}
                    className="flex items-start gap-4 rounded-lg border border-border p-4 transition-smooth hover:border-accent/50 hover:shadow-md cursor-pointer"
                    onClick={() => navigate("/interviews")}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                      <Calendar className="h-5 w-5 text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{interview.candidate_name}</p>
                      <p className="text-sm text-muted-foreground truncate">{interview.jobs?.title || "Unknown Position"}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">
                          {new Date(interview.interview_date).toLocaleDateString()} at {interview.interview_time}
                        </p>
                        <Badge variant="outline" className="ml-auto text-xs">
                          {interview.interview_type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        {stats.activeJobs === 0 && (
          <Card className="p-6 bg-accent/5 border-accent/20">
            <div className="text-center">
              <Briefcase className="mx-auto h-12 w-12 text-accent mb-4" />
              <h3 className="text-lg font-semibold mb-2">Get Started</h3>
              <p className="text-muted-foreground mb-4">
                Post your first job to start receiving applications
              </p>
              <Button 
                className="bg-gradient-primary"
                onClick={() => navigate("/post-job")}
              >
                <Briefcase className="mr-2 h-4 w-4" />
                Post Your First Job
              </Button>
            </div>
          </Card>
        )}
      </div>
    );
  };
  
  export default Dashboard;
