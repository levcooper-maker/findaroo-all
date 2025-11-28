import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Sparkles, Copy, Download, Send } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const JobPostingGenerator = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    jobTitle: "",
    company: "",
    location: "",
    jobType: "Full-time",
    department: "",
    salary: "",
    requirements: "",
    responsibilities: "",
    benefits: "",
    workArrangement: "Remote",
    companyDescription: "",
    experienceLevel: "Mid-level",
  });
  const [generatedPosting, setGeneratedPosting] = useState("");

  const handleGenerate = async () => {
    if (!formData.jobTitle || !formData.company || !formData.requirements || !formData.responsibilities) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-job-posting", {
        body: formData,
      });

      if (error) throw error;

      if (data.error) {
        throw new Error(data.error);
      }

      setGeneratedPosting(data.posting);
      toast({
        title: "Job Posting Generated!",
        description: "Your AI-powered job posting is ready",
      });
    } catch (error) {
      console.error("Error generating job posting:", error);
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPosting);
    toast({
      title: "Copied!",
      description: "Job posting copied to clipboard",
    });
  };

  const downloadAsText = () => {
    const element = document.createElement("a");
    const file = new Blob([generatedPosting], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${formData.jobTitle.replace(/\s+/g, "_")}_JobPosting.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handlePostJob = () => {
    toast({
      title: "Posting Job",
      description: "Redirecting to post your job...",
    });
    navigate("/jobs");
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div>
        <h1 className="text-4xl font-bold">AI Job Posting Generator</h1>
        <p className="mt-2 text-muted-foreground">
          Create compelling, ATS-optimized job descriptions in seconds
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input Form */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title *</Label>
              <Input
                id="jobTitle"
                placeholder="e.g., Senior Frontend Developer"
                value={formData.jobTitle}
                onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company Name *</Label>
              <Input
                id="company"
                placeholder="e.g., Acme Inc"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="e.g., San Francisco, CA"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="workArrangement">Work Arrangement</Label>
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
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="jobType">Job Type</Label>
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
                <Label htmlFor="experienceLevel">Experience Level</Label>
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

            <div className="grid gap-4 sm:grid-cols-2">
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
                <Label htmlFor="salary">Salary Range</Label>
                <Input
                  id="salary"
                  placeholder="e.g., $120k - $160k"
                  value={formData.salary}
                  onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="requirements">Key Requirements *</Label>
              <Textarea
                id="requirements"
                placeholder="List the essential qualifications, skills, and experience..."
                rows={4}
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="responsibilities">Main Responsibilities *</Label>
              <Textarea
                id="responsibilities"
                placeholder="Describe what the person will be doing day-to-day..."
                rows={4}
                value={formData.responsibilities}
                onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyDescription">Company Description</Label>
              <Textarea
                id="companyDescription"
                placeholder="Tell candidates about your company culture, mission, and values..."
                rows={3}
                value={formData.companyDescription}
                onChange={(e) => setFormData({ ...formData, companyDescription: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="benefits">Benefits & Perks</Label>
              <Textarea
                id="benefits"
                placeholder="List benefits like health insurance, 401k, remote work, PTO, etc..."
                rows={3}
                value={formData.benefits}
                onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
              />
            </div>

            <Button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full bg-gradient-primary"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Job Posting
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Output */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Generated Posting</h3>
              {generatedPosting && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={downloadAsText}>
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button size="sm" onClick={handlePostJob} className="bg-gradient-primary">
                    <Send className="mr-2 h-4 w-4" />
                    Post Job
                  </Button>
                </div>
              )}
            </div>

            {loading ? (
              <div className="flex h-96 items-center justify-center">
                <div className="text-center">
                  <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
                  <p className="mt-4 text-sm text-muted-foreground">
                    AI is crafting your job posting...
                  </p>
                </div>
              </div>
            ) : generatedPosting ? (
              <div className="prose prose-sm max-w-none rounded-lg border border-border bg-muted/30 p-4">
                <div className="whitespace-pre-wrap text-sm">{generatedPosting}</div>
              </div>
            ) : (
              <div className="flex h-96 items-center justify-center text-center text-muted-foreground">
                <div>
                  <Sparkles className="mx-auto h-12 w-12 opacity-50" />
                  <p className="mt-4">Fill in the form and click generate to create your job posting</p>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default JobPostingGenerator;
