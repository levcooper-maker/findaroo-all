import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Sparkles, Copy, Download } from "lucide-react";

const ResumeBuilder = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    targetRole: "",
    experience: "",
    education: "",
    skills: "",
    achievements: "",
  });
  const [generatedResume, setGeneratedResume] = useState("");

  const handleGenerate = async () => {
    if (!formData.fullName || !formData.email || !formData.targetRole || !formData.experience) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-resume", {
        body: formData,
      });

      if (error) throw error;

      if (data.error) {
        throw new Error(data.error);
      }

      setGeneratedResume(data.resume);
      toast({
        title: "Resume Generated!",
        description: "Your professional resume is ready",
      });
    } catch (error) {
      console.error("Error generating resume:", error);
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
    navigator.clipboard.writeText(generatedResume);
    toast({
      title: "Copied!",
      description: "Resume copied to clipboard",
    });
  };

  const downloadAsText = () => {
    const element = document.createElement("a");
    const file = new Blob([generatedResume], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${formData.fullName.replace(/\s+/g, "_")}_Resume.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div>
        <h1 className="text-4xl font-bold">AI Resume Builder</h1>
        <p className="mt-2 text-muted-foreground">
          Create ATS-optimized, professional resumes tailored to your target role
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input Form */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                placeholder="e.g., John Doe"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
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

            <div className="space-y-2">
              <Label htmlFor="targetRole">Target Role/Position *</Label>
              <Input
                id="targetRole"
                placeholder="e.g., Senior Software Engineer"
                value={formData.targetRole}
                onChange={(e) => setFormData({ ...formData, targetRole: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Work Experience *</Label>
              <Textarea
                id="experience"
                placeholder="List your work experience with company names, roles, dates, and key achievements..."
                rows={5}
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="education">Education</Label>
              <Textarea
                id="education"
                placeholder="Your degrees, certifications, and educational background..."
                rows={3}
                value={formData.education}
                onChange={(e) => setFormData({ ...formData, education: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">Skills</Label>
              <Textarea
                id="skills"
                placeholder="List your technical and soft skills..."
                rows={3}
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="achievements">Key Achievements</Label>
              <Textarea
                id="achievements"
                placeholder="Notable accomplishments, awards, or projects..."
                rows={3}
                value={formData.achievements}
                onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
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
                  Generate Resume
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Output */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Generated Resume</h3>
              {generatedResume && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={downloadAsText}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            {loading ? (
              <div className="flex h-96 items-center justify-center">
                <div className="text-center">
                  <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
                  <p className="mt-4 text-sm text-muted-foreground">
                    AI is building your professional resume...
                  </p>
                </div>
              </div>
            ) : generatedResume ? (
              <div className="prose prose-sm max-w-none rounded-lg border border-border bg-muted/30 p-4">
                <div className="whitespace-pre-wrap text-sm font-mono">{generatedResume}</div>
              </div>
            ) : (
              <div className="flex h-96 items-center justify-center text-center text-muted-foreground">
                <div>
                  <Sparkles className="mx-auto h-12 w-12 opacity-50" />
                  <p className="mt-4">Fill in your information and click generate to build your resume</p>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ResumeBuilder;
