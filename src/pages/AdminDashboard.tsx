import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  MessageCircleHeart, 
  LogOut,
  Moon,
  Sun,
  TrendingUp,
  Users,
  BarChart3,
  Calendar,
  Download,
  Grid3x3,
  List,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  MessageSquare
} from "lucide-react";
import { toast } from "sonner";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("Q1-2025");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [showAIAdvisor, setShowAIAdvisor] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("vibeCode_user");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
    toast.success(`Switched to ${!isDark ? "dark" : "light"} mode`);
  };

  // Mock data for metrics
  const overallMetrics = {
    participationRate: 78,
    avgVibeScore: 4.3,
    totalFeedback: 145,
    growthFromLastQ: 12,
  };

  const departmentData = [
    { dept: "Engineering", participation: 85, avgVibe: 4.5, feedback: 42, topTheme: "Communication" },
    { dept: "Product", participation: 75, avgVibe: 4.2, feedback: 28, topTheme: "Leadership" },
    { dept: "Design", participation: 82, avgVibe: 4.6, feedback: 31, topTheme: "Collaboration" },
    { dept: "Sales", participation: 65, avgVibe: 4.0, feedback: 24, topTheme: "Problem Solving" },
    { dept: "Marketing", participation: 70, avgVibe: 4.1, feedback: 20, topTheme: "Creativity" },
  ];

  const quarterlyComparison = [
    { quarter: "Q2 2024", participation: 62, avgVibe: 4.0, feedback: 98 },
    { quarter: "Q3 2024", participation: 70, avgVibe: 4.1, feedback: 122 },
    { quarter: "Q4 2024", participation: 75, avgVibe: 4.2, feedback: 130 },
    { quarter: "Q1 2025", participation: 78, avgVibe: 4.3, feedback: 145 },
  ];

  const topThemes = [
    { theme: "Communication", mentions: 87, change: "+12%" },
    { theme: "Leadership", mentions: 64, change: "+8%" },
    { theme: "Collaboration", mentions: 52, change: "+15%" },
    { theme: "Problem Solving", mentions: 48, change: "+5%" },
    { theme: "Innovation", mentions: 41, change: "+20%" },
  ];

  const aiInsights = [
    {
      type: "warning",
      title: "Low Participation Alert",
      description: "Sales department showing 15% below target participation. Recommended action: Send targeted reminders and schedule 1:1 check-ins.",
      priority: "high",
    },
    {
      type: "success",
      title: "Strong Growth Area",
      description: "Engineering team shows 22% improvement in cross-functional collaboration scores. Continue supporting their team-building initiatives.",
      priority: "medium",
    },
    {
      type: "info",
      title: "Communication Theme Rising",
      description: "Communication is the #1 mentioned theme with 12% growth. Consider running company-wide communication workshops in Q2.",
      priority: "medium",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <MessageCircleHeart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Acme Quarterly Peer Feedback Admin
              </h1>
              <p className="text-xs text-muted-foreground">HR Dashboard & Analytics</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" onClick={toggleTheme}>
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Period Selector & Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-muted-foreground" />
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Q1-2025">Q1 2025 (Current)</SelectItem>
                <SelectItem value="Q4-2024">Q4 2024</SelectItem>
                <SelectItem value="Q3-2024">Q3 2024</SelectItem>
                <SelectItem value="Q2-2024">Q2 2024</SelectItem>
                <SelectItem value="custom">Custom Date Range</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
          </div>
        </div>

        {/* Key Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{overallMetrics.participationRate}%</p>
                  <p className="text-sm text-muted-foreground">Participation</p>
                  <Badge variant="secondary" className="mt-1 text-xs">+{overallMetrics.growthFromLastQ}%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{overallMetrics.avgVibeScore}</p>
                  <p className="text-sm text-muted-foreground">Avg Vibe Score</p>
                  <Badge variant="secondary" className="mt-1 text-xs">+0.3 from Q4</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{overallMetrics.totalFeedback}</p>
                  <p className="text-sm text-muted-foreground">Total Feedback</p>
                  <Badge variant="secondary" className="mt-1 text-xs">+15 from Q4</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-accent/20 bg-gradient-to-br from-accent/5 to-accent/10">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold">🔥 Trending</p>
                  <p className="text-sm text-muted-foreground">Engagement Up</p>
                  <Badge className="mt-1 text-xs bg-accent">+{overallMetrics.growthFromLastQ}%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Advisor Section */}
        <Card className="mb-8 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 border-none">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Sparkles className="w-5 h-5 text-primary" />
                  AI Growth Advisor
                </CardTitle>
                <CardDescription>Data-driven recommendations for your team</CardDescription>
              </div>
              <Button variant="outline" onClick={() => setShowAIAdvisor(!showAIAdvisor)}>
                {showAIAdvisor ? "Hide Details" : "View All Insights"}
              </Button>
            </div>
          </CardHeader>
          {showAIAdvisor && (
            <CardContent className="space-y-4">
              {aiInsights.map((insight, index) => (
                <Card key={index} className={`${
                  insight.type === "warning" ? "border-warning/50 bg-warning/5" :
                  insight.type === "success" ? "border-success/50 bg-success/5" :
                  "border-accent/50 bg-accent/5"
                }`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      {insight.type === "warning" && <AlertTriangle className="w-5 h-5 text-warning mt-0.5" />}
                      {insight.type === "success" && <CheckCircle2 className="w-5 h-5 text-success mt-0.5" />}
                      {insight.type === "info" && <Sparkles className="w-5 h-5 text-accent mt-0.5" />}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{insight.title}</h4>
                          <Badge variant={
                            insight.priority === "high" ? "destructive" : "secondary"
                          } className="text-xs">
                            {insight.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{insight.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          )}
        </Card>

        {/* Main Analytics Tabs */}
        <Tabs defaultValue="departments" className="space-y-6">
          <div className="flex items-center justify-between gap-3">
            <TabsList className="bg-muted/50">
              <TabsTrigger value="departments">By Department</TabsTrigger>
              <TabsTrigger value="trends">Quarterly Trends</TabsTrigger>
              <TabsTrigger value="themes">Top Themes</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setViewMode(viewMode === 'grid' ? 'table' : 'grid')}>
                {viewMode === 'grid' ? <List className="w-4 h-4 mr-2" /> : <Grid3x3 className="w-4 h-4 mr-2" />}
                {viewMode === 'grid' ? 'Table View' : 'Grid View'}
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>

          {/* Department Analytics */}
          <TabsContent value="departments">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {departmentData.map((dept) => (
                  <Card key={dept.dept} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{dept.dept}</CardTitle>
                      <Badge variant="outline">{dept.feedback} reviews</Badge>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Participation</span>
                          <span className="font-semibold">{dept.participation}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div 
                            className={`h-full ${
                              dept.participation >= 80 ? "bg-success" :
                              dept.participation >= 70 ? "bg-warning" :
                              "bg-destructive"
                            } rounded-full`}
                            style={{ width: `${dept.participation}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t">
                        <div>
                          <p className="text-2xl font-bold">{dept.avgVibe}</p>
                          <p className="text-xs text-muted-foreground">Avg Vibe</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold">{dept.topTheme}</p>
                          <p className="text-xs text-muted-foreground">Top Theme</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Department</TableHead>
                        <TableHead>Participation</TableHead>
                        <TableHead>Avg Vibe</TableHead>
                        <TableHead>Total Feedback</TableHead>
                        <TableHead>Top Theme</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {departmentData.map((dept) => (
                        <TableRow key={dept.dept}>
                          <TableCell className="font-semibold">{dept.dept}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span>{dept.participation}%</span>
                              <Badge variant={
                                dept.participation >= 80 ? "default" :
                                dept.participation >= 70 ? "secondary" :
                                "destructive"
                              } className="text-xs">
                                {dept.participation >= 80 ? "Excellent" :
                                 dept.participation >= 70 ? "Good" :
                                 "Needs Attention"}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className={i < Math.floor(dept.avgVibe) ? "text-warning" : "text-muted-foreground/30"}>
                                  ★
                                </span>
                              ))}
                              <span className="ml-2 text-sm">{dept.avgVibe}</span>
                            </div>
                          </TableCell>
                          <TableCell>{dept.feedback}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{dept.topTheme}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Quarterly Trends */}
          <TabsContent value="trends">
            <Card>
              <CardHeader>
                <CardTitle>Performance Over Time</CardTitle>
                <CardDescription>Track key metrics across quarters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {quarterlyComparison.map((q, index) => (
                  <div key={index} className="space-y-3 pb-6 border-b last:border-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-lg">{q.quarter}</h4>
                      <Badge variant={index === quarterlyComparison.length - 1 ? "default" : "secondary"}>
                        {index === quarterlyComparison.length - 1 ? "Current" : "Past"}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-2xl font-bold text-primary">{q.participation}%</p>
                        <p className="text-sm text-muted-foreground">Participation</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-warning">{q.avgVibe}</p>
                        <p className="text-sm text-muted-foreground">Avg Vibe</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-secondary">{q.feedback}</p>
                        <p className="text-sm text-muted-foreground">Total Reviews</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Top Themes */}
          <TabsContent value="themes">
            <Card>
              <CardHeader>
                <CardTitle>Most Discussed Themes</CardTitle>
                <CardDescription>What employees are talking about across the organization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topThemes.map((theme, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg">{theme.theme}</h4>
                        <p className="text-sm text-muted-foreground">{theme.mentions} mentions</p>
                      </div>
                      <Badge className={theme.change.startsWith("+") ? "bg-success" : "bg-muted"}>
                        {theme.change} from Q4
                      </Badge>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10">
                  <h4 className="font-semibold flex items-center gap-2 mb-3">
                    <Sparkles className="w-5 h-5 text-primary" />
                    AI Recommendation
                  </h4>
                  <p className="text-muted-foreground">
                    <strong>Communication</strong> is showing the strongest growth (+12%). Consider organizing 
                    cross-departmental communication workshops or lunch & learns in Q2 2025 to capitalize on this momentum. 
                    Sales department would benefit most from these initiatives given their lower participation rates.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
