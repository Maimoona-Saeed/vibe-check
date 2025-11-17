import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircleHeart } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"employee" | "admin">("employee");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      localStorage.setItem("vibeCode_user", JSON.stringify({ email, role }));
      navigate(role === "admin" ? "/admin-dashboard" : "/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <MessageCircleHeart className="w-9 h-9 text-white" />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Acme Quarterly Peer Feedback
            </CardTitle>
            <CardDescription className="text-base mt-2">
              Your quarterly peer feedback companion
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@acmeinc.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11"
              />
            </div>

            <div className="space-y-3">
              <Label>Select Your Role</Label>
              <RadioGroup value={role} onValueChange={(v) => setRole(v as "employee" | "admin")}>
                <div className="flex items-center space-x-3 rounded-lg border border-border p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                  <RadioGroupItem value="employee" id="employee" />
                  <Label htmlFor="employee" className="flex-1 cursor-pointer font-normal">
                    <div className="font-medium">Employee</div>
                    <div className="text-sm text-muted-foreground">
                      Access your feedback and peer reviews
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 rounded-lg border border-border p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                  <RadioGroupItem value="admin" id="admin" />
                  <Label htmlFor="admin" className="flex-1 cursor-pointer font-normal">
                    <div className="font-medium">Admin / HR</div>
                    <div className="text-sm text-muted-foreground">
                      View team metrics and insights
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Button type="submit" className="w-full h-11 text-base" size="lg">
              Continue to Acme Quarterly Peer Feedback
            </Button>
          </form>

          <p className="text-xs text-center text-muted-foreground mt-6">
            Demo mode - No actual authentication required
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
