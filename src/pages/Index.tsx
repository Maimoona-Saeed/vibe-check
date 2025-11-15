import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircleHeart, Users, TrendingUp, Sparkles, CheckCircle2 } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: MessageCircleHeart,
      title: "Human-Centered Feedback",
      description: "Make peer reviews feel like friendly conversations, not formal evaluations"
    },
    {
      icon: Sparkles,
      title: "AI-Enhanced Insights",
      description: "Get tone guidance, smart summaries, and peer suggestions powered by AI"
    },
    {
      icon: Users,
      title: "Flexible Request Types",
      description: "Choose from AI suggestions, general requests, specific peers, or reciprocal nudges"
    },
    {
      icon: TrendingUp,
      title: "Growth Tracking",
      description: "Track progress over quarters with beautiful visualizations and actionable insights"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-accent mb-6">
            <MessageCircleHeart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Vibe Code
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto">
            Your quarterly peer feedback companion for Acme Inc.
          </p>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Transform feedback from awkward to awesome. Give and receive insights that actually help you grow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate("/login")}
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-lg h-14 px-8"
            >
              Get Started
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate("/login")}
              className="text-lg h-14 px-8"
            >
              View Demo
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Problem/Solution Section */}
        <Card className="mb-16 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 border-none">
          <CardHeader>
            <CardTitle className="text-2xl">Why Vibe Code?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                <span className="text-destructive">❌</span> The Problem
              </h3>
              <p className="text-muted-foreground">
                Without a structured tool, peer feedback at Acme Inc. is ad hoc, inconsistent, and untrackable. 
                This leads to lost insights, slowed professional development, and missed opportunities for team alignment.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                <CheckCircle2 className="text-success w-5 h-5" /> The Solution
              </h3>
              <p className="text-muted-foreground">
                Vibe Code makes feedback simple, fast, and non-awkward. With structured formats (SBI), AI tone guidance, 
                anonymity options, and beautiful dashboards, everyone can give and receive meaningful insights quarterly.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Use Cases */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Perfect For</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <Users className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Employees</h3>
                <p className="text-sm text-muted-foreground">
                  Request feedback, track your growth, and see AI-powered summaries
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <TrendingUp className="w-8 h-8 text-secondary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">HR & Leadership</h3>
                <p className="text-sm text-muted-foreground">
                  View team metrics, spot trends, and get AI-driven recommendations
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <MessageCircleHeart className="w-8 h-8 text-accent mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Teams</h3>
                <p className="text-sm text-muted-foreground">
                  Foster culture, improve communication, and boost retention
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <Card className="text-center bg-gradient-to-r from-primary to-accent text-white border-none">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Feedback?</h2>
            <p className="text-white/90 mb-6 text-lg">
              Join Acme Inc. in making peer reviews something people actually look forward to.
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => navigate("/login")}
              className="text-lg h-14 px-8"
            >
              Start Your Journey
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
