import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { 
  Calendar,
  Clock,
  Video,
  MapPin,
  Plus,
  ExternalLink,
  Loader2
} from "lucide-react";

const Interviews = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [interviews, setInterviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchInterviews();
    }
  }, [user]);

  const fetchInterviews = async () => {
    try {
      setLoading(true);

      // Get user's jobs first
      const { data: jobsData } = await supabase
        .from("jobs")
        .select("id")
        .eq("user_id", user!.id);

      const jobIds = jobsData?.map(j => j.id) || [];

      if (jobIds.length > 0) {
        // Fetch interviews for these jobs
        const { data, error } = await supabase
          .from("interviews")
          .select("*, jobs(title, company)")
          .in("job_id", jobIds)
          .order("interview_date", { ascending: true });

        if (error) throw error;
        setInterviews(data || []);
      }
    } catch (error: any) {
      toast({
        title: "Error loading interviews",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];
  const upcomingInterviews = interviews.filter(i => 
    i.status === "scheduled" && i.interview_date >= today
  );
  const completedInterviews = interviews.filter(i => 
    i.status === "completed" || i.interview_date < today
  );

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold">Interviews</h1>
            <p className="mt-2 text-muted-foreground">
              Manage and schedule interviews with candidates
            </p>
          </div>
          <Button className="bg-gradient-primary shadow-lg hover:shadow-xl transition-smooth">
            <Plus className="mr-2 h-4 w-4" />
            Schedule Interview
          </Button>
        </div>

        {/* Calendar Integration Card */}
        <Card className="p-6 bg-gradient-subtle border-accent/20">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
              <Calendar className="h-6 w-6 text-accent" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Connect Your Calendar</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Sync with Calendly, Google Calendar, or Outlook to automatically schedule interviews and avoid conflicts.
              </p>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm">
                  Connect Calendly
                </Button>
                <Button variant="outline" size="sm">
                  Connect Google Calendar
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Upcoming Interviews */}
        <div>
          <h2 className="mb-4 text-2xl font-semibold">Upcoming Interviews</h2>
          {loading ? (
            <Card className="p-12 text-center">
              <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
              <p className="mt-4 text-muted-foreground">Loading interviews...</p>
            </Card>
          ) : upcomingInterviews.length === 0 ? (
            <Card className="p-12 text-center">
              <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold">No upcoming interviews</h3>
              <p className="mt-2 text-muted-foreground">
                Schedule interviews with your candidates
              </p>
            </Card>
          ) : (
            <div className="grid gap-4 lg:grid-cols-2">
              {upcomingInterviews.map((interview) => (
                <Card key={interview.id} className="p-6 card-hover">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-start gap-3">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${
                          interview.interview_type === "zoom" ? "bg-primary/10" : "bg-accent/10"
                        }`}>
                          {interview.interview_type === "zoom" ? (
                            <Video className="h-6 w-6 text-primary" />
                          ) : (
                            <MapPin className="h-6 w-6 text-accent" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{interview.candidate_name}</h3>
                          <p className="text-sm text-muted-foreground">{interview.jobs?.title || "Unknown Position"}</p>
                          <Badge variant="outline" className="mt-2">
                            {interview.interview_type === "zoom" ? "Zoom" : interview.interview_type === "in-person" ? "In-person" : interview.interview_type}
                          </Badge>
                        </div>
                      </div>

                      <div className="mt-4 space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(interview.interview_date).toLocaleDateString("en-US", { 
                            weekday: "short", 
                            month: "short", 
                            day: "numeric" 
                          })}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{interview.interview_time} • {interview.duration_minutes} min</span>
                        </div>
                        {interview.location && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>{interview.location}</span>
                          </div>
                        )}
                        <p className="text-muted-foreground">
                          Interviewer: <span className="font-medium text-foreground">{interview.interviewer_name}</span>
                        </p>
                      </div>

                      <div className="mt-4 flex gap-2">
                        {interview.meeting_link && (
                          <Button variant="outline" size="sm" className="flex-1" asChild>
                            <a href={interview.meeting_link} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Join Meeting
                            </a>
                          </Button>
                        )}
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => window.location.href = `mailto:${interview.candidate_email}?subject=Interview for ${interview.jobs?.title}`}
                        >
                          Contact
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Completed Interviews */}
        {completedInterviews.length > 0 && (
          <div>
            <h2 className="mb-4 text-2xl font-semibold">Completed Interviews</h2>
            <div className="grid gap-4">
              {completedInterviews.map((interview) => (
                <Card key={interview.id} className="p-4 opacity-75">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                        {interview.interview_type === "zoom" ? (
                          <Video className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <MapPin className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{interview.candidate_name}</p>
                        <p className="text-sm text-muted-foreground">{interview.jobs?.title || "Unknown Position"}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        {new Date(interview.interview_date).toLocaleDateString("en-US", { 
                          month: "short", 
                          day: "numeric" 
                        })} at {interview.interview_time}
                      </p>
                      {interview.notes && (
                        <p className="text-xs text-muted-foreground mt-1">Has notes</p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default Interviews;
