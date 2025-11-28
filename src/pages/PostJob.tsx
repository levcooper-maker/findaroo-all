import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, Briefcase } from "lucide-react";
import { z } from "zod";

const jobSchema = z.object({
  title: z.string().min(1, "Job title is required").max(200),
  company: z.string().min(1, "Company name is required").max(200),
  department: z.string().max(200).optional(),
  location: z.string().max(200).optional(),
  workArrangement: z.string().max(50),
  jobType: z.string().max(100),
  experienceLevel: z.string().max(50),
  salary: z.string().max(200).optional(),
  description: z.string().min(10, "Description is required").max(10000),
  requirements: z.string().min(10, "Requirements are required").max(5000),
  responsibilities: z.string().min(10, "Responsibilities are required").max(5000),
  benefits: z.string().max(3000).optional(),
});

const PostJob = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    department: "",
    location: "",
    workArrangement: "Remote",
    jobType: "Full-time",
    experienceLevel: "Mid-level",
    salary: "",
    description: "",
    requirements: "",
    responsibilities: "",
    benefits: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to post a job",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const validated = jobSchema.parse(formData);
      
      const { error } = await supabase.from("jobs").insert({
        user_id: user.id,
        title: validated.title,
        company: validated.company,
        department: validated.department || null,
        location: validated.location || null,
        work_arrangement: validated.workArrangement,
        job_type: validated.jobType,
        experience_level: validated.experienceLevel,
        salary: validated.salary || null,
        description: validated.description,
        requirements: validated.requirements,
        responsibilities: validated.responsibilities,
        benefits: validated.benefits || null,
        status: "active",
      });

      if (error) throw error;

      toast({
        title: "Job Posted!",
        description: "Your job listing is now live",
      });
      navigate("/jobs");
    } catch (error: any) {
      console.error("Error posting job:", error);
      toast({
        title: "Failed to post job",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div>
        <h1 className="text-4xl font-bold">Post a New Job</h1>
        <p className="mt-2 text-muted-foreground">
          Create a job listing to attract top talent
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="p-6">
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Job Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Senior Frontend Developer"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company Name *</Label>
                <Input
                  id="company"
                  placeholder="e.g., Acme Inc"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  placeholder="e.g., Engineering"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="e.g., San Francisco, CA"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="workArrangement">Work Arrangement *</Label>
                <Select 
                  value={formData.workArrangement} 
                  onValueChange={(value) => setFormData({ ...formData, workArrangement: value })}
                >
                  <SelectTrigger id="workArrangement">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Remote">Remote</SelectItem>
                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                    <SelectItem value="On-site">On-site</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobType">Job Type *</Label>
                <Select 
                  value={formData.jobType} 
                  onValueChange={(value) => setFormData({ ...formData, jobType: value })}
                >
                  <SelectTrigger id="jobType">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experienceLevel">Experience Level *</Label>
                <Select 
                  value={formData.experienceLevel} 
                  onValueChange={(value) => setFormData({ ...formData, experienceLevel: value })}
                >
                  <SelectTrigger id="experienceLevel">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Entry-level">Entry-level</SelectItem>
                    <SelectItem value="Mid-level">Mid-level</SelectItem>
                    <SelectItem value="Senior">Senior</SelectItem>
                    <SelectItem value="Lead">Lead</SelectItem>
                    <SelectItem value="Executive">Executive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="salary">Salary Range</Label>
              <Input
                id="salary"
                placeholder="e.g., $120k - $160k"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Job Description *</Label>
              <Textarea
                id="description"
                placeholder="Provide a comprehensive overview of the role..."
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="requirements">Requirements *</Label>
              <Textarea
                id="requirements"
                placeholder="List the essential qualifications and skills..."
                rows={4}
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="responsibilities">Responsibilities *</Label>
              <Textarea
                id="responsibilities"
                placeholder="Describe the day-to-day duties and expectations..."
                rows={4}
                value={formData.responsibilities}
                onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="benefits">Benefits & Perks</Label>
              <Textarea
                id="benefits"
                placeholder="List benefits like health insurance, 401k, remote work, PTO..."
                rows={3}
                value={formData.benefits}
                onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
              />
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={loading}
                className="bg-gradient-primary"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Posting Job...
                  </>
                ) : (
                  <>
                    <Briefcase className="mr-2 h-4 w-4" />
                    Post Job
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/jobs")}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default PostJob;
