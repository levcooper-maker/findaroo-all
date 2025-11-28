import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Briefcase, Users, Sparkles, TrendingUp, Shield, Zap } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
              <Briefcase className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">HireHub</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link to="/auth">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/auth">
              <Button>Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
            Where Top Talent Meets
            <br />
            <span className="text-primary">Outstanding Opportunities</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            The intelligent hiring platform that connects ambitious professionals
            with forward-thinking companies. Powered by AI, built for results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" className="w-full sm:w-auto">
                <Users className="mr-2 h-5 w-5" />
                I'm Looking for Jobs
              </Button>
            </Link>
            <Link to="/auth">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                <Briefcase className="mr-2 h-5 w-5" />
                I'm Hiring Talent
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you're seeking your next career move or building your dream team,
            we've got you covered.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-card p-8 rounded-lg border border-border shadow-md">
            <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
              <Sparkles className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-3">AI-Powered Matching</h3>
            <p className="text-muted-foreground">
              Our intelligent algorithms match candidates with roles that align
              perfectly with their skills and career goals.
            </p>
          </div>

          <div className="bg-card p-8 rounded-lg border border-border shadow-md">
            <div className="h-12 w-12 rounded-lg bg-gradient-accent flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-accent-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Instant Job Postings</h3>
            <p className="text-muted-foreground">
              Generate compelling job descriptions in seconds with our AI job posting
              tool. Attract the right candidates faster.
            </p>
          </div>

          <div className="bg-card p-8 rounded-lg border border-border shadow-md">
            <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Smart Analytics</h3>
            <p className="text-muted-foreground">
              Track your applications, analyze hiring trends, and make data-driven
              decisions with comprehensive dashboards.
            </p>
          </div>

          <div className="bg-card p-8 rounded-lg border border-border shadow-md">
            <div className="h-12 w-12 rounded-lg bg-gradient-accent flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-accent-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Resume Builder</h3>
            <p className="text-muted-foreground">
              Create professional, ATS-friendly resumes that stand out. Our AI helps
              you highlight your best achievements.
            </p>
          </div>

          <div className="bg-card p-8 rounded-lg border border-border shadow-md">
            <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Secure & Private</h3>
            <p className="text-muted-foreground">
              Your data is encrypted and protected. Control who sees your profile and
              maintain your privacy throughout the process.
            </p>
          </div>

          <div className="bg-card p-8 rounded-lg border border-border shadow-md">
            <div className="h-12 w-12 rounded-lg bg-gradient-accent flex items-center justify-center mb-4">
              <Briefcase className="h-6 w-6 text-accent-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Interview Management</h3>
            <p className="text-muted-foreground">
              Schedule, track, and manage interviews seamlessly. Never miss an
              opportunity or double-book a candidate.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto bg-gradient-primary rounded-2xl p-12 text-center text-primary-foreground shadow-xl">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Transform Your Hiring?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of professionals and companies already using HireHub
          </p>
          <Link to="/auth">
            <Button size="lg" variant="secondary" className="shadow-lg">
              Start Free Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 backdrop-blur-sm py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-primary">
                <Briefcase className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">HireHub</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 HireHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;