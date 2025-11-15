import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageCircleHeart, 
  Plus, 
  Clock, 
  CheckCircle2, 
  TrendingUp,
  LogOut,
  Moon,
  Sun
} from "lucide-react";
import { toast } from "sonner";

interface User {
  email: string;
  role: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("vibeCode_user");
    if (!storedUser) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [navigate]);

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

  if (!user) return null;

  const pendingRequests = [
    { id: 1, from: "Sarah Chen", role: "Product Manager", requested: "2 days ago", type: "Requested Peership" },
    { id: 2, from: "Marcus Williams", role: "Senior Developer", requested: "1 week ago", type: "Suggested Peership" },
  ];

  const completedFeedback = [
    { id: 1, to: "Alex Rivera", quarter: "Q4 2024", vibeScore: 4.5, completed: "1 week ago" },
    { id: 2, to: "Jordan Lee", quarter: "Q4 2024", vibeScore: 5, completed: "2 weeks ago" },
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
                Vibe Code
              </h1>
              <p className="text-xs text-muted-foreground">Q1 2025 Reviews Open</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" onClick={toggleTheme}>
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Avatar className="w-10 h-10 cursor-pointer border-2 border-primary/20">
              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white font-semibold">
                {user.email.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Welcome Banner */}
        <Card className="mb-8 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 border-none">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Welcome back! 👋</h2>
                <p className="text-muted-foreground mb-4">
                  Q1 2025 feedback period is now open. Share your insights and help your peers grow!
                </p>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
                  onClick={() => navigate("/request-feedback")}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Request Feedback
                </Button>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  12
                </div>
                <p className="text-sm text-muted-foreground">Days Remaining</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">2</p>
                  <p className="text-sm text-muted-foreground">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold">4.7</p>
                  <p className="text-sm text-muted-foreground">Avg Vibe</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <MessageCircleHeart className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">15</p>
                  <p className="text-sm text-muted-foreground">Total Q1</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="pending" className="space-y-4">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="pending">Pending Requests ({pendingRequests.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedFeedback.length})</TabsTrigger>
            <TabsTrigger value="summary">My Summary</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {pendingRequests.map((request) => (
              <Card key={request.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-12 h-12 border-2 border-primary/20">
                        <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white">
                          {request.from.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-lg">{request.from}</h3>
                        <p className="text-sm text-muted-foreground">{request.role}</p>
                        <Badge variant="secondary" className="mt-2">
                          {request.type}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-2">Requested {request.requested}</p>
                      </div>
                    </div>
                    <Button onClick={() => navigate("/give-feedback")}>
                      Give Feedback
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedFeedback.map((feedback) => (
              <Card key={feedback.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12 border-2 border-success/20">
                        <AvatarFallback className="bg-gradient-to-br from-success to-accent text-white">
                          {feedback.to.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">Feedback for {feedback.to}</h3>
                        <p className="text-sm text-muted-foreground">{feedback.quarter} • {feedback.completed}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < Math.floor(feedback.vibeScore) ? "text-warning" : "text-muted-foreground/30"}>
                              ★
                            </span>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">Vibe Score</p>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="summary">
            <Card>
              <CardHeader>
                <CardTitle>Your Feedback Summary - Q4 2024</CardTitle>
                <CardDescription>AI-generated insights from your received feedback</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button onClick={() => navigate("/summary")} size="lg" className="w-full">
                  View Full AI Summary
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
