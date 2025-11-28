import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Briefcase, 
  Check, 
  X, 
  Sparkles, 
  Zap, 
  Shield, 
  TrendingUp,
  Clock,
  DollarSign,
  Users,
  Target,
  Brain,
  ArrowRight
} from "lucide-react";

const WhyUs = () => {
  const competitors = [
    {
      name: "Traditional Platforms",
      features: {
        aiMatching: false,
        instantJobPosting: false,
        resumeBuilder: false,
        smartAnalytics: false,
        interviewManagement: false,
        pricing: "Monthly fees + posting fees",
        responseTime: "2-3 weeks",
        qualityScore: "Manual screening",
      }
    },
    {
      name: "Generic Job Boards",
      features: {
        aiMatching: false,
        instantJobPosting: false,
        resumeBuilder: false,
        smartAnalytics: false,
        interviewManagement: false,
        pricing: "Per job posting",
        responseTime: "1-2 weeks",
        qualityScore: "No quality metrics",
      }
    }
  ];

  const ourFeatures = {
    aiMatching: true,
    instantJobPosting: true,
    resumeBuilder: true,
    smartAnalytics: true,
    interviewManagement: true,
    pricing: "All-inclusive platform",
    responseTime: "Real-time",
    qualityScore: "AI-powered quality scoring",
  };

  const advantages = [
    {
      icon: Brain,
      title: "AI-Powered Intelligence",
      description: "Our proprietary AI algorithms analyze thousands of data points to match candidates with roles they'll excel in, not just qualify for.",
      stat: "94% match accuracy"
    },
    {
      icon: Zap,
      title: "Lightning-Fast Hiring",
      description: "From job posting to first interview in hours, not weeks. Our automation handles the heavy lifting while you focus on the best candidates.",
      stat: "10x faster than traditional platforms"
    },
    {
      icon: Target,
      title: "Quality Over Quantity",
      description: "Every candidate is scored for quality, skills match, and cultural fit. No more sifting through hundreds of unqualified applications.",
      stat: "85% interview-to-hire rate"
    },
    {
      icon: DollarSign,
      title: "Transparent, Fair Pricing",
      description: "One platform, one price. No hidden fees, no per-posting charges, no surprise costs. Everything you need included.",
      stat: "Save 60% vs competitors"
    },
    {
      icon: Shield,
      title: "Enterprise-Grade Security",
      description: "Bank-level encryption, GDPR compliant, and complete data privacy. Your information and your candidates' data are always protected.",
      stat: "SOC 2 Type II certified"
    },
    {
      icon: Users,
      title: "Dual-Sided Excellence",
      description: "Built for both employers and job seekers. Our platform creates win-win scenarios by optimizing the experience for both sides of the market.",
      stat: "4.9/5 satisfaction from both sides"
    }
  ];

  const comparisonFeatures = [
    { name: "AI-Powered Matching", hirehub: true, others: false },
    { name: "Instant Job Posting Generator", hirehub: true, others: false },
    { name: "Professional Resume Builder", hirehub: true, others: false },
    { name: "Interview Scheduling & Management", hirehub: true, others: false },
    { name: "Real-Time Analytics Dashboard", hirehub: true, others: false },
    { name: "Quality Scoring System", hirehub: true, others: false },
    { name: "Candidate Pipeline Management", hirehub: true, others: false },
    { name: "Automated Status Updates", hirehub: true, others: false },
    { name: "Multi-Industry Support", hirehub: true, others: false },
    { name: "Mobile-Optimized Experience", hirehub: true, others: false },
    { name: "24/7 Platform Access", hirehub: true, others: false },
    { name: "Secure Data Encryption", hirehub: true, others: false },
  ];

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
            <Link to="/">
              <Button variant="ghost">Back to Home</Button>
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
            Not Just Better.
            <br />
            <span className="text-primary">Fundamentally Different.</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            While others offer job boards, we've built an intelligent hiring ecosystem 
            that transforms how companies and talent connect.
          </p>
        </div>
      </section>

      {/* Key Advantages Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Six Reasons We're Leading the Future
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            These aren't just features—they're fundamental advantages that change the game.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {advantages.map((advantage, index) => (
            <Card key={index} className="p-8 card-hover">
              <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
                <advantage.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{advantage.title}</h3>
              <p className="text-muted-foreground mb-4">{advantage.description}</p>
              <div className="inline-block px-3 py-1 rounded-full bg-success/10 text-success text-sm font-medium">
                {advantage.stat}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Feature-by-Feature Comparison
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See exactly what sets us apart from traditional hiring platforms.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden">
            <div className="grid grid-cols-3 gap-4 p-6 bg-muted/50 border-b border-border">
              <div className="font-semibold text-lg">Feature</div>
              <div className="font-semibold text-lg text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-primary text-primary-foreground">
                  <Sparkles className="h-4 w-4" />
                  HireHub
                </div>
              </div>
              <div className="font-semibold text-lg text-center text-muted-foreground">
                Others
              </div>
            </div>
            {comparisonFeatures.map((feature, index) => (
              <div 
                key={index} 
                className="grid grid-cols-3 gap-4 p-6 border-b border-border last:border-0 hover:bg-muted/20 transition-smooth"
              >
                <div className="flex items-center text-foreground">
                  {feature.name}
                </div>
                <div className="flex items-center justify-center">
                  {feature.hirehub ? (
                    <div className="h-8 w-8 rounded-full bg-success/10 flex items-center justify-center">
                      <Check className="h-5 w-5 text-success" />
                    </div>
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-destructive/10 flex items-center justify-center">
                      <X className="h-5 w-5 text-destructive" />
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-center">
                  {feature.others ? (
                    <div className="h-8 w-8 rounded-full bg-success/10 flex items-center justify-center">
                      <Check className="h-5 w-5 text-success" />
                    </div>
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-destructive/10 flex items-center justify-center">
                      <X className="h-5 w-5 text-destructive" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <Card className="p-8 text-center card-hover">
              <div className="text-4xl font-bold text-primary mb-2">10x</div>
              <div className="text-muted-foreground">Faster Hiring Process</div>
            </Card>
            <Card className="p-8 text-center card-hover">
              <div className="text-4xl font-bold text-primary mb-2">94%</div>
              <div className="text-muted-foreground">Match Accuracy Rate</div>
            </Card>
            <Card className="p-8 text-center card-hover">
              <div className="text-4xl font-bold text-primary mb-2">60%</div>
              <div className="text-muted-foreground">Cost Savings vs Others</div>
            </Card>
            <Card className="p-8 text-center card-hover">
              <div className="text-4xl font-bold text-primary mb-2">4.9/5</div>
              <div className="text-muted-foreground">User Satisfaction Score</div>
            </Card>
          </div>
        </div>
      </section>

      {/* Technology Edge Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Built on Next-Generation Technology
            </h2>
            <p className="text-lg text-muted-foreground">
              While competitors use outdated systems, we've built from the ground up with cutting-edge tech.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-gradient-accent flex items-center justify-center flex-shrink-0">
                  <Brain className="h-5 w-5 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Machine Learning Core</h3>
                  <p className="text-muted-foreground text-sm">
                    Our AI learns from every interaction, continuously improving match quality 
                    and prediction accuracy.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-gradient-accent flex items-center justify-center flex-shrink-0">
                  <Clock className="h-5 w-5 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Real-Time Processing</h3>
                  <p className="text-muted-foreground text-sm">
                    Instant updates, live notifications, and immediate matching—no waiting, 
                    no delays, no batch processing.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-gradient-accent flex items-center justify-center flex-shrink-0">
                  <Shield className="h-5 w-5 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Enterprise Security</h3>
                  <p className="text-muted-foreground text-sm">
                    Military-grade encryption, compliance certifications, and privacy-first 
                    architecture protect your data.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-gradient-accent flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-5 w-5 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Predictive Analytics</h3>
                  <p className="text-muted-foreground text-sm">
                    Advanced data science forecasts hiring trends, candidate availability, 
                    and market dynamics.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto bg-gradient-primary rounded-2xl p-12 text-center text-primary-foreground shadow-xl">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Experience the Difference?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join the platform that's redefining hiring. Start free, upgrade when you need to.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" variant="secondary" className="shadow-lg group">
                Start Free Today
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-smooth" />
              </Button>
            </Link>
          </div>
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

export default WhyUs;