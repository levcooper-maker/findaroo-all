import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Settings as SettingsIcon,
  Bell,
  Mail,
  Calendar,
  Zap,
  Sparkles,
  Copy,
  Check,
  ExternalLink
} from "lucide-react";

const Settings = () => {
  const { toast } = useToast();
  const [copiedFeedUrl, setCopiedFeedUrl] = useState(false);

  const indeedFeedUrl = `https://etrgckxcxpwkjbnxmvmf.supabase.co/functions/v1/indeed-job-feed`;

  const copyFeedUrl = async () => {
    await navigator.clipboard.writeText(indeedFeedUrl);
    setCopiedFeedUrl(true);
    toast({
      title: "Copied!",
      description: "Indeed feed URL copied to clipboard",
    });
    setTimeout(() => setCopiedFeedUrl(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold">Settings</h1>
          <p className="mt-2 text-muted-foreground">
            Manage your account and integrations
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Integrations */}
          <Card className="p-6 lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Integrations</h2>
                <p className="text-sm text-muted-foreground">Connect your hiring platforms</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Indeed Integration - Active */}
              <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2557A7]">
                      <span className="text-sm font-bold text-white">in</span>
                    </div>
                    <div>
                      <p className="font-medium">Indeed</p>
                      <p className="text-sm text-muted-foreground">XML job feed for Indeed</p>
                    </div>
                  </div>
                  <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Active</Badge>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Feed URL (submit to Indeed Employer Center)</Label>
                  <div className="flex gap-2">
                    <Input 
                      value={indeedFeedUrl} 
                      readOnly 
                      className="font-mono text-xs bg-muted/50"
                    />
                    <Button variant="outline" size="icon" onClick={copyFeedUrl}>
                      {copiedFeedUrl ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                    <Button variant="outline" size="icon" asChild>
                      <a href={indeedFeedUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Submit this URL to Indeed's Employer Center to automatically sync your job postings.
                  </p>
                </div>
              </div>

              {/* LinkedIn - Planned */}
              <div className="flex items-center justify-between rounded-lg border border-border p-4 opacity-50">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0077B5]">
                    <span className="text-sm font-bold text-white">in</span>
                  </div>
                  <div>
                    <p className="font-medium">LinkedIn</p>
                    <p className="text-sm text-muted-foreground">Import jobs and candidates</p>
                  </div>
                </div>
                <Badge variant="secondary">Planned</Badge>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#006BFF]">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Calendly</p>
                    <p className="text-sm text-muted-foreground">Schedule interviews automatically</p>
                  </div>
                </div>
                <Badge variant="secondary">Planned</Badge>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#4285F4]">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Google Workspace</p>
                    <p className="text-sm text-muted-foreground">Calendar and email integration</p>
                  </div>
                </div>
                <Badge variant="secondary">Planned</Badge>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0078D4]">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Microsoft Outlook</p>
                    <p className="text-sm text-muted-foreground">Calendar integration</p>
                  </div>
                </div>
                <Badge variant="secondary">Planned</Badge>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#000000]">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Apple Calendar</p>
                    <p className="text-sm text-muted-foreground">iCloud calendar integration</p>
                  </div>
                </div>
                <Badge variant="secondary">Planned</Badge>
              </div>
            </div>
          </Card>

          {/* Notifications */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <Bell className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Notifications</h2>
                <p className="text-sm text-muted-foreground">Manage alerts</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">New Applications</p>
                  <p className="text-sm text-muted-foreground">Get notified</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Interview Reminders</p>
                  <p className="text-sm text-muted-foreground">1 hour before</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Status Updates</p>
                  <p className="text-sm text-muted-foreground">Candidate progress</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Digest</p>
                  <p className="text-sm text-muted-foreground">Daily summary</p>
                </div>
                <Switch />
              </div>
            </div>
          </Card>
        </div>

        {/* Account Settings */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <SettingsIcon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Account Settings</h2>
              <p className="text-sm text-muted-foreground">Update your profile information</p>
            </div>
          </div>

          <div className="space-y-4 max-w-2xl">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john.doe@company.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company Name</Label>
              <Input id="company" placeholder="Acme Inc." />
            </div>
            <Button className="bg-gradient-primary">Save Changes</Button>
          </div>
        </Card>
      </div>
    );
  };
  
  export default Settings;
