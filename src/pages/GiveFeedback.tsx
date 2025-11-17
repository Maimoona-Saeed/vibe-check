import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Sparkles, Star, Lightbulb, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";

const GiveFeedback = () => {
  const navigate = useNavigate();
  const [vibeRating, setVibeRating] = useState(0);
  const [strengths, setStrengths] = useState("");
  const [growthAreas, setGrowthAreas] = useState("");
  const [additionalFeedback, setAdditionalFeedback] = useState("");
  const [aiToneGuidance, setAiToneGuidance] = useState<string>("");

  const maxChars = 500;
  const peerName = "Sarah Chen";
  const peerRole = "Product Manager";

  const handleToneCheck = async (text: string) => {
    try {
      if (!text.trim()) {
        setAiToneGuidance("");
        return;
      }
      const { data, error } = await supabase.functions.invoke("tonality", {
        body: { text },
      });
      if (error) throw error;
      setAiToneGuidance(data?.analysis || data?.content || "");
    } catch (e) {
      setAiToneGuidance("Couldn't analyze tone right now. Please try again.");
    }
  };

  const handleSubmit = () => {
    if (vibeRating === 0) {
      toast.error("Please rate your overall vibe");
      return;
    }
    if (!strengths.trim() || !growthAreas.trim()) {
      toast.error("Please complete all required fields");
      return;
    }

    toast.success("Feedback submitted successfully! 🎉");
    setTimeout(() => navigate("/dashboard"), 1500);
  };

  const getSuggestion = (type: "strengths" | "growth") => {
    const suggestions = {
      strengths: [
        "In our Q4 launch meeting, Sarah clearly explained complex technical concepts to stakeholders, which helped everyone align on priorities (Situation-Behavior-Impact)",
        "During the sprint planning, Sarah's ability to prioritize features based on user impact was impressive",
      ],
      growth: [
        "Consider scheduling regular check-ins to ensure all team members have updates on project status",
        "In future presentations, adding more data visualizations could help communicate findings more effectively",
      ]
    };
    return suggestions[type][Math.floor(Math.random() * suggestions[type].length)];
  };

  const completionProgress = ((strengths ? 33 : 0) + (growthAreas ? 33 : 0) + (vibeRating > 0 ? 34 : 0));

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/dashboard")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <Card className="shadow-lg mb-6">
          <CardHeader className="border-b">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl mb-2">Give Feedback to {peerName}</CardTitle>
                <CardDescription className="text-base">{peerRole} • Q1 2025 Review</CardDescription>
              </div>
              <Badge variant="outline" className="bg-primary/5">
                Anonymous
              </Badge>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Completion</span>
                <span className="font-semibold">{completionProgress}%</span>
              </div>
              <Progress value={completionProgress} className="h-2" />
            </div>
          </CardHeader>
        </Card>

        {/* AI Tone Guidance Alert */}
        {aiToneGuidance && (
          <Card className="mb-6 bg-accent/10 border-accent">
            <CardContent className="p-4">
              <p className="text-sm">{aiToneGuidance}</p>
            </CardContent>
          </Card>
        )}

        <div className="space-y-6">
          {/* Question 1: Strengths (SBI) */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Star className="w-5 h-5 text-warning" />
                1. Strengths & Positive Impact (SBI Format)
              </CardTitle>
              <CardDescription>
                Share specific examples using Situation-Behavior-Impact: What was the context? What did they do? What was the positive result?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Example: During our Q4 product launch (Situation), Sarah clearly communicated technical requirements to the team (Behavior), which resulted in zero deployment issues and on-time delivery (Impact)."
                value={strengths}
                onChange={(e) => {
                  if (e.target.value.length <= maxChars) {
                    setStrengths(e.target.value);
                  }
                }}
                className="min-h-32 resize-none"
              />
              <div className="flex items-center justify-between">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setStrengths(getSuggestion("strengths"))}
                >
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI Example
                </Button>
                <Button variant="secondary" size="sm" onClick={() => handleToneCheck(strengths)}>
                  <Sparkles className="w-3 h-3 mr-1" />
                  Check Tone
                </Button>
                <span className="text-sm text-muted-foreground">
                  {strengths.length}/{maxChars}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Question 2: Growth Opportunities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="w-5 h-5 text-secondary" />
                2. Growth Opportunities
              </CardTitle>
              <CardDescription>
                What areas could they develop further? Be constructive and specific about behaviors, not personality traits.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Example: To enhance cross-team collaboration, consider scheduling brief weekly syncs with the engineering team to share product updates proactively."
                value={growthAreas}
                onChange={(e) => {
                  if (e.target.value.length <= maxChars) {
                    setGrowthAreas(e.target.value);
                  }
                }}
                className="min-h-32 resize-none"
              />
              <div className="flex items-center justify-between">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setGrowthAreas(getSuggestion("growth"))}
                >
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI Example
                </Button>
                <Button variant="secondary" size="sm" onClick={() => handleToneCheck(growthAreas)}>
                  <Sparkles className="w-3 h-3 mr-1" />
                  Check Tone
                </Button>
                <span className="text-sm text-muted-foreground">
                  {growthAreas.length}/{maxChars}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Question 3: Vibe Rating */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Lightbulb className="w-5 h-5 text-accent" />
                3. Overall Vibe Rating
              </CardTitle>
              <CardDescription>
                How would you rate your overall experience working with {peerName}?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center gap-3">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setVibeRating(rating)}
                    className="group transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-12 h-12 transition-colors ${
                        rating <= vibeRating
                          ? "fill-warning text-warning"
                          : "text-muted-foreground/30 group-hover:text-warning/50"
                      }`}
                    />
                  </button>
                ))}
              </div>
              {vibeRating > 0 && (
                <div className="text-center">
                  <Badge variant="secondary" className="text-base px-4 py-1">
                    {vibeRating === 5 && "Outstanding! 🌟"}
                    {vibeRating === 4 && "Great Work! 👏"}
                    {vibeRating === 3 && "Good! 👍"}
                    {vibeRating === 2 && "Room to Grow 💪"}
                    {vibeRating === 1 && "Needs Support 🤝"}
                  </Badge>
                </div>
              )}

              {/* Optional Additional Context */}
              <div className="pt-4">
                <Label className="text-sm text-muted-foreground mb-2 block">
                  Additional context for your rating (Optional)
                </Label>
                <Textarea
                  placeholder="Share any additional insights about your collaboration..."
                  value={additionalFeedback}
                  onChange={(e) => {
                    if (e.target.value.length <= maxChars) {
                      setAdditionalFeedback(e.target.value);
                    }
                  }}
                  className="min-h-24 resize-none"
                />
                <div className="text-right mt-2">
                  <span className="text-sm text-muted-foreground">
                    {additionalFeedback.length}/{maxChars}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Actions */}
          <div className="flex gap-3 sticky bottom-4 bg-background/80 backdrop-blur-sm p-4 rounded-lg border">
            <Button 
              variant="outline" 
              onClick={() => navigate("/dashboard")} 
              className="flex-1"
            >
              Save Draft
            </Button>
            <Button 
              onClick={handleSubmit} 
              className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90"
              disabled={!strengths || !growthAreas || vibeRating === 0}
            >
              Submit Feedback
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiveFeedback;
