import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { 
  Search, 
  Filter,
  Mail,
  Phone,
  MapPin,
  Star,
  ExternalLink,
  Loader2
} from "lucide-react";

const getStageBadge = (stage: string) => {
  const variants: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
    interview: "default",
    screening: "secondary",
    review: "outline",
    offer: "default",
    rejected: "destructive"
  };
  
  const displayNames: Record<string, string> = {
    interview: "Interview",
    screening: "Screening",
    review: "Review",
    offer: "Offer",
    rejected: "Rejected"
  };
  
  return <Badge variant={variants[stage] || "outline"}>{displayNames[stage] || stage}</Badge>;
};

const Candidates = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [candidates, setCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (user) {
      fetchCandidates();
    }
  }, [user]);

  const fetchCandidates = async () => {
    try {
      setLoading(true);

      // Get user's jobs first
      const { data: jobsData } = await supabase
        .from("jobs")
        .select("id")
        .eq("user_id", user!.id);

      const jobIds = jobsData?.map(j => j.id) || [];

      if (jobIds.length > 0) {
        // Fetch applications for these jobs
        const { data, error } = await supabase
          .from("applications")
          .select("*, jobs(title, company)")
          .in("job_id", jobIds)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setCandidates(data || []);
      }
    } catch (error: any) {
      toast({
        title: "Error loading candidates",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredCandidates = candidates.filter(candidate =>
    candidate.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    candidate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    candidate.jobs?.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </Card>

        {/* Candidates List */}
        {loading ? (
          <Card className="p-12 text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
            <p className="mt-4 text-muted-foreground">Loading candidates...</p>
          </Card>
        ) : filteredCandidates.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">No candidates found</h3>
            <p className="mt-2 text-muted-foreground">
              {candidates.length === 0 
                ? "No applications received yet"
                : "Try adjusting your search"}
            </p>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredCandidates.map((candidate) => (
              <Card key={candidate.id} className="p-6 card-hover">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                  {/* Candidate Info */}
                  <div className="flex flex-1 items-start gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground">
                      <span className="text-lg font-semibold">
                        {candidate.full_name.split(" ").map((n: string) => n[0]).join("")}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">{candidate.full_name}</h3>
                          <p className="text-sm text-muted-foreground">{candidate.jobs?.title || "Unknown Position"}</p>
                        </div>
                        {candidate.rating && (
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
                        )}
                      </div>

                      <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          <span>{candidate.email}</span>
                        </div>
                        {candidate.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            <span>{candidate.phone}</span>
                          </div>
                        )}
                        {candidate.cover_letter && (
                          <p className="mt-2 text-sm line-clamp-2">{candidate.cover_letter}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-3 lg:w-48">
                    {getStageBadge(candidate.status)}
                    <p className="text-xs text-muted-foreground">
                      Applied: {new Date(candidate.created_at).toLocaleDateString()}
                    </p>
                    <div className="flex gap-2">
                      {candidate.resume_url && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          asChild
                        >
                          <a href={candidate.resume_url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      <Button 
                        size="sm" 
                        className="flex-1 bg-gradient-primary"
                        onClick={() => window.location.href = `mailto:${candidate.email}`}
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
    );
  };
  
  export default Candidates;
