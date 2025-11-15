import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Sparkles, Users, User, MessageSquarePlus, Info } from "lucide-react";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type TriggerType = "suggest" | "request" | "specific" | "suggest-request";

const RequestFeedback = () => {
  const navigate = useNavigate();
  const [triggerType, setTriggerType] = useState<TriggerType>("suggest");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [context, setContext] = useState("");
  const [selectedPeers, setSelectedPeers] = useState<string[]>([]);

  // Mock AI-suggested peers
  const aiSuggestedPeers = [
    { id: "1", name: "Sarah Chen", role: "Product Manager", reason: "Frequent collaborator" },
    { id: "2", name: "Marcus Williams", role: "Senior Developer", reason: "Same project team" },
    { id: "3", name: "Elena Rodriguez", role: "UX Designer", reason: "Cross-functional partner" },
  ];

  const allPeers = [
    ...aiSuggestedPeers,
    { id: "4", name: "Jordan Lee", role: "Engineering Manager", reason: "" },
    { id: "5", name: "Alex Rivera", role: "Data Analyst", reason: "" },
  ];

  const handleSubmit = () => {
    if (triggerType === "specific" && selectedPeers.length === 0) {
      toast.error("Please select at least one peer");
      return;
    }

    toast.success(
      isAnonymous 
        ? "Anonymous feedback request sent! Your identity is protected." 
        : "Feedback request sent successfully!"
    );
    
    setTimeout(() => navigate("/dashboard"), 1500);
  };

  const getTriggerInfo = (type: TriggerType) => {
    const info = {
      suggest: "AI recommends peers based on your collaboration patterns and team structure",
      request: "Send a general request that any peer can respond to",
      specific: "Choose specific teammates you'd like feedback from (1-5 people)",
      "suggest-request": "Encourage a peer to request feedback from you, fostering reciprocity"
    };
    return info[type];
  };

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

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <MessageSquarePlus className="w-6 h-6 text-primary" />
              Request Peer Feedback
            </CardTitle>
            <CardDescription>
              Choose how you'd like to gather insights for Q1 2025
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Trigger Type Selection */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Label className="text-base font-semibold">Select Request Type</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>Different ways to initiate feedback based on your needs</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <RadioGroup value={triggerType} onValueChange={(v) => setTriggerType(v as TriggerType)}>
                <div className="grid gap-4">
                  <div className={`relative rounded-lg border-2 p-4 cursor-pointer transition-all ${triggerType === "suggest" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}>
                    <div className="flex items-start gap-3">
                      <RadioGroupItem value="suggest" id="suggest" className="mt-1" />
                      <Label htmlFor="suggest" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-2 mb-1">
                          <Sparkles className="w-5 h-5 text-primary" />
                          <span className="font-semibold">AI Suggested Peership</span>
                          <Badge variant="secondary" className="text-xs">Recommended</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{getTriggerInfo("suggest")}</p>
                      </Label>
                    </div>
                  </div>

                  <div className={`relative rounded-lg border-2 p-4 cursor-pointer transition-all ${triggerType === "request" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}>
                    <div className="flex items-start gap-3">
                      <RadioGroupItem value="request" id="request" className="mt-1" />
                      <Label htmlFor="request" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-2 mb-1">
                          <Users className="w-5 h-5 text-accent" />
                          <span className="font-semibold">General Request</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{getTriggerInfo("request")}</p>
                      </Label>
                    </div>
                  </div>

                  <div className={`relative rounded-lg border-2 p-4 cursor-pointer transition-all ${triggerType === "specific" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}>
                    <div className="flex items-start gap-3">
                      <RadioGroupItem value="specific" id="specific" className="mt-1" />
                      <Label htmlFor="specific" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-2 mb-1">
                          <User className="w-5 h-5 text-secondary" />
                          <span className="font-semibold">Specific Peership</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{getTriggerInfo("specific")}</p>
                      </Label>
                    </div>
                  </div>

                  <div className={`relative rounded-lg border-2 p-4 cursor-pointer transition-all ${triggerType === "suggest-request" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}>
                    <div className="flex items-start gap-3">
                      <RadioGroupItem value="suggest-request" id="suggest-request" className="mt-1" />
                      <Label htmlFor="suggest-request" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-2 mb-1">
                          <MessageSquarePlus className="w-5 h-5 text-warning" />
                          <span className="font-semibold">Suggest Peership Request</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{getTriggerInfo("suggest-request")}</p>
                      </Label>
                    </div>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {/* Peer Selection (for Suggest and Specific) */}
            {(triggerType === "suggest" || triggerType === "specific") && (
              <div className="space-y-4">
                <Label className="text-base font-semibold">
                  {triggerType === "suggest" ? "AI Recommended Peers" : "Select Peers (1-5)"}
                </Label>
                
                {triggerType === "suggest" && (
                  <div className="grid gap-3">
                    {aiSuggestedPeers.map((peer) => (
                      <Card key={peer.id} className="bg-primary/5 border-primary/20">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-semibold flex items-center gap-2">
                                {peer.name}
                                <Sparkles className="w-4 h-4 text-primary" />
                              </div>
                              <p className="text-sm text-muted-foreground">{peer.role}</p>
                              <p className="text-xs text-primary mt-1">{peer.reason}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {triggerType === "specific" && (
                  <Select onValueChange={(value) => {
                    if (!selectedPeers.includes(value) && selectedPeers.length < 5) {
                      setSelectedPeers([...selectedPeers, value]);
                    }
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Search and select peers..." />
                    </SelectTrigger>
                    <SelectContent>
                      {allPeers.map((peer) => (
                        <SelectItem 
                          key={peer.id} 
                          value={peer.id}
                          disabled={selectedPeers.includes(peer.id)}
                        >
                          {peer.name} - {peer.role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                {selectedPeers.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedPeers.map((peerId) => {
                      const peer = allPeers.find(p => p.id === peerId);
                      return (
                        <Badge key={peerId} variant="secondary" className="px-3 py-1">
                          {peer?.name}
                          <button
                            onClick={() => setSelectedPeers(selectedPeers.filter(id => id !== peerId))}
                            className="ml-2 hover:text-destructive"
                          >
                            ×
                          </button>
                        </Badge>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Context Field */}
            <div className="space-y-3">
              <Label htmlFor="context" className="text-base font-semibold">
                Additional Context (Optional)
              </Label>
              <Textarea
                id="context"
                placeholder="E.g., 'I'd love feedback on my communication during our recent product launch' or use AI suggestions..."
                value={context}
                onChange={(e) => setContext(e.target.value)}
                className="min-h-24 resize-none"
              />
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setContext("I'd appreciate feedback on my collaboration and teamwork")}
                >
                  <Sparkles className="w-3 h-3 mr-1" />
                  Collaboration
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setContext("Looking for insights on my communication style")}
                >
                  <Sparkles className="w-3 h-3 mr-1" />
                  Communication
                </Button>
              </div>
            </div>

            {/* Anonymity Toggle */}
            <Card className="bg-muted/30 border-dashed">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="anonymous" className="text-base font-semibold cursor-pointer">
                      Keep my name hidden
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Your identity will be protected. Peers won't see who requested feedback.
                    </p>
                  </div>
                  <Switch 
                    id="anonymous" 
                    checked={isAnonymous} 
                    onCheckedChange={setIsAnonymous}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit Actions */}
            <div className="flex gap-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => navigate("/dashboard")} 
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSubmit} 
                className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90"
              >
                Send Request
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RequestFeedback;
