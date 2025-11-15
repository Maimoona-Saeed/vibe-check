import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  TrendingUp, 
  MessageSquareQuote, 
  Star,
  Sparkles,
  BarChart3,
  Calendar
} from "lucide-react";

const Summary = () => {
  const navigate = useNavigate();

  const sentimentData = [
    { label: "Positive", value: 65, color: "bg-success" },
    { label: "Constructive", value: 25, color: "bg-warning" },
    { label: "Neutral", value: 10, color: "bg-muted" },
  ];

  const topThemes = [
    { theme: "Communication", mentions: 12, trend: "+2" },
    { theme: "Leadership", mentions: 8, trend: "+3" },
    { theme: "Problem Solving", mentions: 7, trend: "0" },
    { theme: "Collaboration", mentions: 6, trend: "+1" },
  ];

  const quarterlyTrends = [
    { quarter: "Q2 2024", vibe: 4.2, feedback: 6 },
    { quarter: "Q3 2024", vibe: 4.5, feedback: 8 },
    { quarter: "Q4 2024", vibe: 4.7, feedback: 10 },
  ];

  const keyInsights = [
    {
      title: "Your Superpower",
      insight: "Team members consistently praise your clear communication, especially in explaining complex technical concepts to non-technical stakeholders.",
      icon: Star,
      color: "text-warning"
    },
    {
      title: "Growth Opportunity",
      insight: "Consider improving meeting time management. Several peers noted that discussions sometimes run over, impacting productivity.",
      icon: TrendingUp,
      color: "text-secondary"
    },
    {
      title: "Recent Improvement",
      insight: "Your responsiveness to feedback requests has improved by 40% compared to Q3. Peers appreciate your quick turnaround times!",
      icon: Sparkles,
      color: "text-accent"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/dashboard")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Your AI-Generated Summary
              </h1>
              <p className="text-muted-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Q4 2024 • Based on 10 peer reviews
              </p>
            </div>
            <Badge className="bg-gradient-to-r from-primary to-accent text-white">
              <Sparkles className="w-3 h-3 mr-1" />
              AI-Powered
            </Badge>
          </div>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-2 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-warning to-warning/50 flex items-center justify-center">
                  <Star className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold">4.7</div>
                  <p className="text-sm text-muted-foreground">Average Vibe Score</p>
                  <Badge variant="secondary" className="mt-1 text-xs">+0.2 from Q3</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center">
                  <MessageSquareQuote className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold">10</div>
                  <p className="text-sm text-muted-foreground">Total Feedback</p>
                  <Badge variant="secondary" className="mt-1 text-xs">+2 from Q3</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-accent/50 flex items-center justify-center">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold">+15%</div>
                  <p className="text-sm text-muted-foreground">Growth Trend</p>
                  <Badge variant="secondary" className="mt-1 text-xs">Trending Up</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="insights" className="space-y-6">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="insights">Key Insights</TabsTrigger>
            <TabsTrigger value="themes">Top Themes</TabsTrigger>
            <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
            <TabsTrigger value="trends">Quarterly Trends</TabsTrigger>
          </TabsList>

          {/* Key Insights */}
          <TabsContent value="insights" className="space-y-4">
            {keyInsights.map((insight, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <insight.icon className={`w-5 h-5 ${insight.color}`} />
                    {insight.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{insight.insight}</p>
                </CardContent>
              </Card>
            ))}

            <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 border-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  AI Recommendation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Based on your feedback patterns, we recommend focusing on:
                </p>
                <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                  <li>Setting clear agendas before meetings to improve time management</li>
                  <li>Continuing your strong communication practices with new team members</li>
                  <li>Requesting more feedback on cross-functional collaboration in Q1 2025</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Top Themes */}
          <TabsContent value="themes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Most Mentioned Themes</CardTitle>
                <CardDescription>What peers are talking about most</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topThemes.map((theme, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold">{theme.theme}</div>
                          <div className="text-sm text-muted-foreground">
                            {theme.mentions} mentions
                          </div>
                        </div>
                      </div>
                      <Badge variant={theme.trend.startsWith("+") ? "default" : "secondary"}>
                        {theme.trend} from Q3
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sample Quotes</CardTitle>
                <CardDescription>What your peers are saying</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-4 rounded-lg bg-success/10 border-l-4 border-success">
                  <MessageSquareQuote className="w-5 h-5 text-success mb-2" />
                  <p className="text-sm italic">
                    "Always available to help explain complex systems. Makes technical discussions accessible to everyone."
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">— Anonymous Peer</p>
                </div>
                <div className="p-4 rounded-lg bg-primary/10 border-l-4 border-primary">
                  <MessageSquareQuote className="w-5 h-5 text-primary mb-2" />
                  <p className="text-sm italic">
                    "Great at problem-solving under pressure. Really stepped up during the Q4 launch."
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">— Anonymous Peer</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sentiment Analysis */}
          <TabsContent value="sentiment">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Feedback Sentiment Breakdown
                </CardTitle>
                <CardDescription>Overall tone of feedback received</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {sentimentData.map((item) => (
                  <div key={item.label} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{item.label}</span>
                      <span className="text-muted-foreground">{item.value}%</span>
                    </div>
                    <div className="h-3 rounded-full bg-muted overflow-hidden">
                      <div 
                        className={`h-full ${item.color} rounded-full transition-all`}
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Quarterly Trends */}
          <TabsContent value="trends">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-secondary" />
                  Your Growth Over Time
                </CardTitle>
                <CardDescription>Tracking your progress across quarters</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {quarterlyTrends.map((quarter, index) => (
                    <div key={index} className="flex items-center gap-6 p-4 rounded-lg bg-muted/30">
                      <div className="w-24 font-semibold text-sm">{quarter.quarter}</div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Vibe Score</span>
                          <span className="font-semibold">{quarter.vibe}/5.0</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-warning to-warning/50 rounded-full"
                            style={{ width: `${(quarter.vibe / 5) * 100}%` }}
                          />
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">{quarter.feedback}</div>
                        <div className="text-xs text-muted-foreground">Reviews</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-secondary/10 to-accent/10">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-secondary mt-1" />
                    <div>
                      <div className="font-semibold mb-1">Positive Trajectory! 📈</div>
                      <p className="text-sm text-muted-foreground">
                        You've shown consistent improvement over the past 3 quarters. Your vibe score increased by 
                        <span className="font-semibold text-secondary"> 12%</span> and you're receiving 
                        <span className="font-semibold text-secondary"> 67% more feedback</span>, indicating stronger peer engagement.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Summary;
