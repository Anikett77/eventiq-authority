import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Calendar,
  FileCheck,
  BarChart3,
  Bell,
  User,
  Menu,
  X,
  TrendingUp,
  Users,
  Sparkles,
  CheckCircle,
  XCircle,
  Filter,
  Search,
  MapPin,
  Clock,
  Eye,
  MessageSquare,
  ChevronRight,
  Zap,
  Award,
  Activity,
  Sun,
  Moon,
  Palette,
  Send,
  Bot,
} from "lucide-react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

// Mock Data
const events = [
  {
    id: 1,
    title: "AI & Machine Learning Workshop",
    organizer: "Tech Innovators Club",
    date: "2025-11-15",
    time: "10:00 AM",
    rsvp: 156,
    bookmarked: 89,
    engagement: 92,
    category: "Technology",
    type: "Hybrid",
    location: "Tech Hub, Room 301",
    description: "Deep dive into modern AI and ML techniques with hands-on projects.",
    participants: ["Alice", "Bob", "Charlie", "Diana", "Eve"],
    status: "upcoming",
  },
  {
    id: 2,
    title: "Startup Pitch Competition",
    organizer: "Entrepreneurship Society",
    date: "2025-11-20",
    time: "2:00 PM",
    rsvp: 234,
    bookmarked: 145,
    engagement: 88,
    category: "Business",
    type: "In-Person",
    location: "Main Auditorium",
    description: "Watch innovative startup ideas compete for funding and mentorship.",
    participants: ["Frank", "Grace", "Henry", "Ivy"],
    status: "upcoming",
  },
  {
    id: 3,
    title: "Digital Art Exhibition",
    organizer: "Creative Arts Guild",
    date: "2025-11-08",
    time: "6:00 PM",
    rsvp: 98,
    bookmarked: 67,
    engagement: 75,
    category: "Art",
    type: "Hybrid",
    location: "Gallery West",
    description: "Showcase of stunning digital artwork from student artists.",
    participants: ["Jack", "Kelly", "Liam"],
    status: "ongoing",
  },
];

const proposals = [
  {
    id: 1,
    organizer: "Robotics Lab",
    email: "robotics@university.edu",
    organization: "Engineering Department",
    title: "International Robotics Symposium",
    description: "A three-day symposium featuring global experts in robotics and automation.",
    category: ["Technology", "Engineering"],
    expectedParticipants: 300,
    date: "2025-12-10",
    venue: "Engineering Complex",
    mode: "Hybrid",
    aiScore: 89,
  },
  {
    id: 2,
    organizer: "Sustainability Initiative",
    email: "green@university.edu",
    organization: "Environmental Science Club",
    title: "Green Campus Workshop Series",
    description: "Interactive workshops on sustainable practices and environmental conservation.",
    category: ["Environment", "Workshop"],
    expectedParticipants: 120,
    date: "2025-11-25",
    venue: "Science Building",
    mode: "In-Person",
    aiScore: 76,
  },
];

const analyticsData = {
  monthlyParticipation: [
    { month: "Jun", participants: 450 },
    { month: "Jul", participants: 520 },
    { month: "Aug", participants: 480 },
    { month: "Sep", participants: 680 },
    { month: "Oct", participants: 750 },
    { month: "Nov", participants: 890 },
  ],
  categoryPopularity: [
    { name: "Technology", value: 35 },
    { name: "Business", value: 25 },
    { name: "Art", value: 15 },
    { name: "Sports", value: 15 },
    { name: "Other", value: 10 },
  ],
  topOrganizers: [
    { name: "Tech Club", events: 12 },
    { name: "Business Society", events: 9 },
    { name: "Arts Guild", events: 7 },
    { name: "Sports Assoc", events: 6 },
  ],
};

const COLORS = ["#76FF03", "#FFC107", "#FF4081", "#1A237E", "#00BCD4"];

const notifications = [
  { id: 1, type: "proposal", message: "New event proposal from Robotics Lab", time: "5 min ago", unread: true },
  { id: 2, type: "alert", message: "Low predicted turnout for Design Seminar tomorrow", time: "1 hour ago", unread: true },
  { id: 3, type: "update", message: "AI Workshop schedule changed to 3:00 PM", time: "2 hours ago", unread: false },
  { id: 4, type: "success", message: "Startup Competition approved successfully", time: "1 day ago", unread: false },
];

// AI Recommendations Mock Data
const aiRecommendations = {
  dashboard: [
    { title: "AI & ML Workshop Series", description: "Recommended based on 37% increase in tech interest this week" },
    { title: "Weekend Hybrid Events", description: "Students show 34% higher attendance on weekends" },
    { title: "Professional Development Seminars", description: "Evening slots show strong engagement for career-focused events" },
    { title: "Sustainability Initiative", description: "Growing interest in environmental topics, 12% monthly increase" },
  ],
  events: [
    { title: "Blockchain Technology Meetup", description: "Similar audience to AI Workshop attendees" },
    { title: "Design Thinking Sprint", description: "Complements current creative arts engagement" },
    { title: "Startup Networking Evening", description: "High predicted turnout based on business category trends" },
  ],
  proposals: [
    { title: "Approve Robotics Symposium", description: "89% alignment score with student interests in engineering" },
    { title: "Request Additional Details", description: "Green Campus Workshop needs venue capacity confirmation" },
    { title: "Expedite Tech Events", description: "Fast-track technology proposals due to high demand" },
    { title: "Weekend Scheduling", description: "Consider scheduling hybrid events for Saturday afternoons" },
  ],
  analytics: [
    { 
      title: "Organize more workshops in AI & ML", 
      description: "Engagement up 30% this month — highest performing category",
      trend: "+30%",
      priority: "high"
    },
    { 
      title: "Peak registration occurs between 10 AM and 2 PM", 
      description: "Schedule events accordingly for maximum sign-ups",
      trend: "67%",
      priority: "medium"
    },
    { 
      title: "Low engagement in webinars", 
      description: "Try switching to hybrid sessions — 45% better attendance rate",
      trend: "-22%",
      priority: "high"
    },
    { 
      title: "Weekend events drive 34% higher attendance", 
      description: "Saturday afternoons show best performance",
      trend: "+34%",
      priority: "medium"
    },
    { 
      title: "Partner with Tech Club for co-hosting", 
      description: "Their events have 95% average attendance rate",
      trend: "95%",
      priority: "low"
    },
  ],
  eventDetail: [
    { title: "Similar AI/ML Events", description: "Data Science Bootcamp and Neural Networks Workshop" },
    { title: "Follow-up Sessions", description: "Consider advanced workshops for engaged participants" },
    { title: "Cross-promote", description: "Notify attendees about upcoming Robotics Symposium" },
  ],
};

// AI Engagement Predictions Mock Data
const engagementPredictions = {
  currentMonth: {
    predicted: 82,
    change: 15,
    growth: 120,
    confidence: 94
  },
  weeklyTrends: [
    { week: "Week 1", engagement: 68 },
    { week: "Week 2", engagement: 72 },
    { week: "Week 3", engagement: 78 },
    { week: "Week 4", engagement: 82 },
  ],
  insights: [
    "Consider promoting events earlier in the week for higher turnout",
    "Hybrid format events show 45% better engagement than webinars",
    "Evening slots (6-8 PM) have 28% higher attendance rate",
  ]
};

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState("light");
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [selectedProposal, setSelectedProposal] = useState<any>(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [aiInsight, setAiInsight] = useState("");
  const [showAiModal, setShowAiModal] = useState(false);
  
  // Chat state
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([]);
  const [chatInput, setChatInput] = useState("");
  const [isLoadingResponse, setIsLoadingResponse] = useState(false);

  const filteredEvents = events.filter((event) => {
    const matchesCategory = filterCategory === "all" || event.category === filterCategory;
    const matchesType = filterType === "all" || event.type === filterType;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesType && matchesSearch;
  });

  const handleApprove = (proposal: any) => {
    toast.success(`Event "${proposal.title}" approved successfully!`);
    setSelectedProposal(null);
  };

  const handleReject = () => {
    if (!rejectReason.trim()) {
      toast.error("Please provide a reason for rejection");
      return;
    }
    toast.success(`Event rejected. Organizer will be notified.`);
    setShowRejectModal(false);
    setSelectedProposal(null);
    setRejectReason("");
  };

  const generateAiSummary = (proposal: any) => {
    const insights = [
      `This event aligns ${proposal.aiScore}% with current student interests in the ${proposal.category[0]} domain.`,
      `Expected engagement is high. Similar events saw 85% attendance rate.`,
      `Recommended: Approve. The organizer has a strong track record with 95% success rate.`,
      `Peak interest detected for ${proposal.category[0]} topics this semester.`,
    ];
    setAiInsight(insights.join("\n\n"));
    setShowAiModal(true);
  };

  // API Integration for Chatbot
  const sendMessageToAPI = async (message: string) => {
    try {
      const response = await fetch('https://api.example.com/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          conversationId: '8d800915-6d5d-495d-9d93-7568583d8e56',
        })
      });
      
      const data = await response.json();
      return data.response || "I'm here to help! Ask me about event predictions, trends, or recommendations.";
    } catch (error) {
      console.error('API Error:', error);
      return "Sorry, I'm having trouble connecting right now. Please try again in a moment.";
    }
  };

  const handleSendMessage = async (message?: string) => {
    const messageToSend = message || chatInput.trim();
    if (!messageToSend) return;

    // Add user message
    const newMessages = [...chatMessages, { role: 'user' as const, content: messageToSend }];
    setChatMessages(newMessages);
    setChatInput("");
    setIsLoadingResponse(true);

    try {
      // Get AI response
      const aiResponse = await sendMessageToAPI(messageToSend);
      setChatMessages([...newMessages, { role: 'assistant' as const, content: aiResponse }]);
    } catch (error) {
      toast.error("Failed to get AI response. Please try again.");
    } finally {
      setIsLoadingResponse(false);
    }
  };

  const openChatWithPrompt = (prompt: string) => {
    setIsChatOpen(true);
    setChatInput(prompt);
  };

  const SidebarLink = ({ icon: Icon, label, section }: any) => (
    <motion.button
      whileHover={{ x: 5 }}
      onClick={() => setActiveSection(section)}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all w-full ${
        activeSection === section
          ? "bg-accent text-accent-foreground shadow-lg"
          : "hover:bg-secondary/50 text-foreground"
      }`}
    >
      <Icon size={20} />
      <AnimatePresence>
        {sidebarOpen && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            className="font-medium"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );

  const StatCard = ({ icon: Icon, label, value, trend, color }: any) => (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className="glass p-6 rounded-2xl shadow-glass"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
        {trend && (
          <Badge variant="secondary" className="bg-success/20 text-success-foreground">
            <TrendingUp size={14} className="mr-1" />
            +{trend}%
          </Badge>
        )}
      </div>
      <h3 className="text-3xl font-bold mb-1">{value}</h3>
      <p className="text-muted-foreground text-sm">{label}</p>
    </motion.div>
  );

  const EventCard = ({ event }: any) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="glass p-5 rounded-2xl shadow-glass cursor-pointer"
      onClick={() => setSelectedEvent(event)}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-lg mb-1">{event.title}</h3>
          <p className="text-sm text-muted-foreground">{event.organizer}</p>
        </div>
        <Badge className="bg-primary text-primary-foreground">{event.category}</Badge>
      </div>
      
      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
        <span className="flex items-center gap-1">
          <Clock size={14} />
          {event.date} • {event.time}
        </span>
        <span className="flex items-center gap-1">
          <MapPin size={14} />
          {event.type}
        </span>
      </div>

      <div className="flex items-center gap-4 mb-3">
        <div className="flex items-center gap-2">
          <Users size={16} className="text-accent" />
          <span className="text-sm font-medium">{event.rsvp} RSVPs</span>
        </div>
        <div className="flex items-center gap-2">
          <Activity size={16} className="text-warning" />
          <span className="text-sm font-medium">{event.engagement}% Engagement</span>
        </div>
      </div>

      <div className="flex gap-2">
        <Button size="sm" className="flex-1 bg-accent hover:bg-accent/90">
          <Eye size={14} className="mr-1" />
          View Details
        </Button>
        <Button size="sm" variant="outline">
          <MessageSquare size={14} className="mr-1" />
          Contact
        </Button>
      </div>
    </motion.div>
  );

  const ProposalCard = ({ proposal }: any) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="glass p-6 rounded-2xl shadow-glass"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-lg mb-1">{proposal.title}</h3>
          <p className="text-sm text-muted-foreground">{proposal.organizer} • {proposal.organization}</p>
        </div>
        <Badge className="bg-accent/20 text-accent-foreground">
          <Sparkles size={14} className="mr-1" />
          AI Score: {proposal.aiScore}%
        </Badge>
      </div>

      <p className="text-sm mb-4 text-muted-foreground line-clamp-2">{proposal.description}</p>

      <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
        <div>
          <span className="text-muted-foreground">Expected:</span>
          <span className="font-medium ml-2">{proposal.expectedParticipants} participants</span>
        </div>
        <div>
          <span className="text-muted-foreground">Date:</span>
          <span className="font-medium ml-2">{proposal.date}</span>
        </div>
        <div>
          <span className="text-muted-foreground">Venue:</span>
          <span className="font-medium ml-2">{proposal.venue}</span>
        </div>
        <div>
          <span className="text-muted-foreground">Mode:</span>
          <span className="font-medium ml-2">{proposal.mode}</span>
        </div>
      </div>

      <div className="flex gap-2 mb-3">
        {proposal.category.map((cat: string) => (
          <Badge key={cat} variant="secondary">{cat}</Badge>
        ))}
      </div>

      <div className="flex gap-2">
        <Button
          size="sm"
          className="flex-1 bg-success hover:bg-success/90 text-success-foreground"
          onClick={() => handleApprove(proposal)}
        >
          <CheckCircle size={14} className="mr-1" />
          Approve
        </Button>
        <Button
          size="sm"
          variant="destructive"
          className="flex-1"
          onClick={() => {
            setSelectedProposal(proposal);
            setShowRejectModal(true);
          }}
        >
          <XCircle size={14} className="mr-1" />
          Reject
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => generateAiSummary(proposal)}
        >
          <Sparkles size={14} className="mr-1" />
          AI Summary
        </Button>
      </div>
    </motion.div>
  );

  const RecommendationCard = ({ recommendation }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ x: 5 }}
      className="glass p-4 rounded-xl border border-accent/20 hover:border-accent/40 transition-all cursor-pointer"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-accent/20 shrink-0">
          <Sparkles size={16} className="text-accent" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm mb-1 line-clamp-1">{recommendation.title}</h4>
          <p className="text-xs text-muted-foreground line-clamp-2">{recommendation.description}</p>
        </div>
        <ChevronRight size={16} className="text-muted-foreground shrink-0" />
      </div>
    </motion.div>
  );

  const AIRecommendationCard = ({ recommendation }: any) => {
    const getPriorityColor = (priority: string) => {
      switch (priority) {
        case "high": return "bg-error/10 border-error/30 text-error";
        case "medium": return "bg-warning/10 border-warning/30 text-warning";
        case "low": return "bg-accent/10 border-accent/30 text-accent";
        default: return "bg-accent/10 border-accent/30 text-accent";
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        className={`glass p-5 rounded-xl border ${getPriorityColor(recommendation.priority)} transition-all`}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-accent/20 shrink-0">
              <TrendingUp size={18} className="text-accent" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-sm mb-1">{recommendation.title}</h4>
              <p className="text-xs text-muted-foreground">{recommendation.description}</p>
            </div>
          </div>
          <Badge className="bg-accent/20 text-accent-foreground shrink-0 ml-2">
            {recommendation.trend}
          </Badge>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className={`font-medium ${
            recommendation.priority === "high" ? "text-error" :
            recommendation.priority === "medium" ? "text-warning" : "text-accent"
          }`}>
            {recommendation.priority.toUpperCase()} PRIORITY
          </span>
        </div>
      </motion.div>
    );
  };

  const AIEngagementPredictor = () => (
    <Card className="glass p-6 rounded-2xl shadow-glass">
      <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
        <Zap className="text-accent" size={20} />
        AI Engagement Predictor
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="glass p-4 rounded-xl text-center border border-accent/20">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Activity size={16} className="text-accent" />
            <span className="text-xs text-muted-foreground">Predicted Engagement</span>
          </div>
          <div className="flex items-baseline justify-center gap-2">
            <p className="text-3xl font-bold text-accent">{engagementPredictions.currentMonth.predicted}%</p>
            <Badge className="bg-success/20 text-success-foreground">
              <TrendingUp size={12} className="mr-1" />
              +{engagementPredictions.currentMonth.change}%
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-2">from last month</p>
        </div>

        <div className="glass p-4 rounded-xl text-center border border-warning/20">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Users size={16} className="text-warning" />
            <span className="text-xs text-muted-foreground">Expected Growth</span>
          </div>
          <p className="text-3xl font-bold text-warning">+{engagementPredictions.currentMonth.growth}</p>
          <p className="text-xs text-muted-foreground mt-2">users next week</p>
        </div>

        <div className="glass p-4 rounded-xl text-center border border-primary/20">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Award size={16} className="text-primary" />
            <span className="text-xs text-muted-foreground">AI Confidence</span>
          </div>
          <p className="text-3xl font-bold text-primary">{engagementPredictions.currentMonth.confidence}%</p>
          <p className="text-xs text-muted-foreground mt-2">prediction accuracy</p>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <TrendingUp size={16} className="text-accent" />
          Weekly Engagement Trend
        </h4>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={engagementPredictions.weeklyTrends}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="week" stroke="currentColor" fontSize={12} />
            <YAxis stroke="currentColor" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(0,0,0,0.8)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "12px",
              }}
            />
            <Line
              type="monotone"
              dataKey="engagement"
              stroke="#76FF03"
              strokeWidth={3}
              dot={{ fill: "#76FF03", r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-semibold flex items-center gap-2">
          <Sparkles size={16} className="text-accent" />
          AI Insights & Suggestions
        </h4>
        {engagementPredictions.insights.map((insight, idx) => (
          <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-accent/5 border border-accent/20">
            <div className="p-1.5 rounded-lg bg-accent/20 shrink-0 mt-0.5">
              <Sparkles size={14} className="text-accent" />
            </div>
            <p className="text-sm text-foreground">{insight}</p>
          </div>
        ))}
      </div>
    </Card>
  );

  return (
    <div className={`min-h-screen ${theme === "dark" ? "dark" : ""}`}>
      <div className="flex h-screen overflow-hidden bg-gradient-to-br from-background via-background to-secondary/20">
        {/* Sidebar */}
        <motion.aside
          animate={{ width: sidebarOpen ? 280 : 80 }}
          className="glass-dark border-r border-border/50 flex flex-col"
        >
          <div className="p-6 flex items-center justify-between">
            <AnimatePresence>
              {sidebarOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h1 className="text-xl font-bold bg-gradient-accent bg-clip-text text-transparent">
                    Authority Hub
                  </h1>
                </motion.div>
              )}
            </AnimatePresence>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hover:bg-accent/20"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>

          <nav className="flex-1 px-4 space-y-2">
            <SidebarLink icon={LayoutDashboard} label="Dashboard" section="dashboard" />
            <SidebarLink icon={Calendar} label="Events" section="events" />
            <SidebarLink icon={FileCheck} label="Proposals" section="proposals" />
            <SidebarLink icon={BarChart3} label="Analytics" section="analytics" />
            <SidebarLink icon={Bell} label="Notifications" section="notifications" />
            <SidebarLink icon={User} label="Profile" section="profile" />
          </nav>

          {/* AI Assistant */}
          <div className="p-4 m-4 glass rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={18} className="text-accent" />
              {sidebarOpen && <span className="font-semibold text-sm">AI Assistant</span>}
            </div>
            {sidebarOpen && (
              <div className="space-y-2">
                <Button 
                  size="sm" 
                  className="w-full justify-start text-xs bg-accent hover:bg-accent/90"
                  onClick={() => setIsChatOpen(true)}
                >
                  <MessageSquare size={12} className="mr-1" />
                  Open Chat
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full justify-start text-xs"
                  onClick={() => openChatWithPrompt("Predict engagement for upcoming events based on current trends.")}
                >
                  <Zap size={12} className="mr-1" />
                  Predict Engagement
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full justify-start text-xs"
                  onClick={() => openChatWithPrompt("Give me a comprehensive trend summary for this month's events.")}
                >
                  <TrendingUp size={12} className="mr-1" />
                  Trend Summary
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full justify-start text-xs"
                  onClick={() => openChatWithPrompt("Show me the top 3 performing events and analyze what made them successful.")}
                >
                  <Award size={12} className="mr-1" />
                  Top Events
                </Button>
              </div>
            )}
          </div>
        </motion.aside>

        {/* AI Chat Modal */}
        <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
          <DialogContent className="max-w-2xl h-[600px] flex flex-col p-0 gap-0">
            <DialogHeader className="p-6 pb-4 border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-accent/20">
                  <Bot size={24} className="text-accent" />
                </div>
                <div>
                  <DialogTitle className="text-xl">AI Assistant Chat</DialogTitle>
                  <DialogDescription>
                    Ask me anything about events, analytics, or get predictions
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <ScrollArea className="flex-1 p-6">
              <div className="space-y-4">
                {chatMessages.length === 0 && (
                  <div className="text-center py-12">
                    <div className="inline-flex p-4 rounded-2xl bg-accent/10 mb-4">
                      <Sparkles size={32} className="text-accent" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Welcome to AI Assistant!</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      I can help you with event predictions, trend analysis, and recommendations.
                    </p>
                    <div className="grid grid-cols-1 gap-2 max-w-md mx-auto">
                      <Button
                        variant="outline"
                        className="justify-start text-xs"
                        onClick={() => handleSendMessage("What's the predicted engagement for next week?")}
                      >
                        <Zap size={12} className="mr-2" />
                        What's the predicted engagement for next week?
                      </Button>
                      <Button
                        variant="outline"
                        className="justify-start text-xs"
                        onClick={() => handleSendMessage("Analyze current event trends")}
                      >
                        <TrendingUp size={12} className="mr-2" />
                        Analyze current event trends
                      </Button>
                      <Button
                        variant="outline"
                        className="justify-start text-xs"
                        onClick={() => handleSendMessage("Which events should I promote?")}
                      >
                        <Award size={12} className="mr-2" />
                        Which events should I promote?
                      </Button>
                    </div>
                  </div>
                )}

                {chatMessages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="p-2 rounded-xl bg-accent/20 h-fit">
                        <Bot size={20} className="text-accent" />
                      </div>
                    )}
                    <div
                      className={`max-w-[70%] p-4 rounded-2xl ${
                        msg.role === 'user'
                          ? 'bg-accent text-accent-foreground'
                          : 'glass border border-border/50'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    </div>
                    {msg.role === 'user' && (
                      <div className="p-2 rounded-xl bg-primary/20 h-fit">
                        <User size={20} className="text-primary" />
                      </div>
                    )}
                  </motion.div>
                ))}

                {isLoadingResponse && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3 justify-start"
                  >
                    <div className="p-2 rounded-xl bg-accent/20 h-fit">
                      <Bot size={20} className="text-accent" />
                    </div>
                    <div className="glass border border-border/50 p-4 rounded-2xl">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </ScrollArea>

            <div className="p-6 pt-4 border-t border-border/50">
              <div className="flex gap-2">
                <Textarea
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Ask me anything about your events..."
                  className="min-h-[60px] resize-none"
                  disabled={isLoadingResponse}
                />
                <Button
                  onClick={() => handleSendMessage()}
                  disabled={!chatInput.trim() || isLoadingResponse}
                  className="self-end bg-accent hover:bg-accent/90"
                  size="icon"
                >
                  <Send size={18} />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Press Enter to send • Shift+Enter for new line
              </p>
            </div>
          </DialogContent>
        </Dialog>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Bar */}
          <header className="glass-dark border-b border-border/50 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="glass px-4 py-2 rounded-full flex items-center gap-2">
                <Sparkles size={16} className="text-accent" />
                <span className="text-sm font-medium">AI Summary: High engagement in AI workshops this week, 37% increase</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 glass rounded-full hover:bg-accent/20"
              >
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full"></span>
              </motion.button>

              <div className="glass px-3 py-2 rounded-full flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-accent flex items-center justify-center text-sm font-bold">
                  A
                </div>
                <span className="text-sm font-medium">Authority Admin</span>
              </div>
            </div>
          </header>

          {/* Notifications Dropdown */}
          <AnimatePresence>
            {notificationsOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-6 top-20 w-96 glass rounded-2xl shadow-elevated p-4 z-50"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Notifications</h3>
                  <Button variant="ghost" size="sm">Mark all read</Button>
                </div>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-3 rounded-xl ${notif.unread ? "bg-accent/10" : "bg-secondary/30"}`}
                    >
                      <p className="text-sm mb-1">{notif.message}</p>
                      <span className="text-xs text-muted-foreground">{notif.time}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Content Area */}
          <main className="flex-1 overflow-y-auto p-6">
            <AnimatePresence mode="wait">
              {activeSection === "dashboard" && (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-3xl font-bold mb-6">Dashboard Overview</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                      icon={Calendar}
                      label="Total Events"
                      value="342"
                      trend={12}
                      color="bg-primary"
                    />
                    <StatCard
                      icon={Users}
                      label="Organizers"
                      value="89"
                      trend={8}
                      color="bg-accent"
                    />
                    <StatCard
                      icon={Activity}
                      label="Participants"
                      value="2,547"
                      trend={23}
                      color="bg-warning"
                    />
                    <StatCard
                      icon={TrendingUp}
                      label="Avg Engagement"
                      value="87%"
                      trend={5}
                      color="bg-error"
                    />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="glass p-6 rounded-2xl shadow-glass">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <TrendingUp className="text-accent" size={20} />
                        Monthly Participation Trends
                      </h3>
                      <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={analyticsData.monthlyParticipation}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                          <XAxis dataKey="month" stroke="currentColor" />
                          <YAxis stroke="currentColor" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "rgba(0,0,0,0.8)",
                              border: "1px solid rgba(255,255,255,0.2)",
                              borderRadius: "12px",
                            }}
                          />
                          <Line
                            type="monotone"
                            dataKey="participants"
                            stroke="#76FF03"
                            strokeWidth={3}
                            dot={{ fill: "#76FF03", r: 5 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </Card>

                    <Card className="glass p-6 rounded-2xl shadow-glass">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Sparkles className="text-accent" size={20} />
                        AI Insights
                      </h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-accent/10 rounded-xl">
                          <p className="text-sm font-medium mb-2">📈 Peak Attendance Pattern</p>
                          <p className="text-xs text-muted-foreground">
                            Weekends show 34% higher attendance. Students prefer hybrid events (67%).
                          </p>
                        </div>
                        <div className="p-4 bg-warning/10 rounded-xl">
                          <p className="text-sm font-medium mb-2">🎯 Trending Categories</p>
                          <p className="text-xs text-muted-foreground">
                            Technology and AI workshops gaining momentum. 45% increase in interest.
                          </p>
                        </div>
                        <div className="p-4 bg-error/10 rounded-xl">
                          <p className="text-sm font-medium mb-2">💡 Recommendation</p>
                          <p className="text-xs text-muted-foreground">
                            Consider promoting evening slots for professional development events.
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>

                  <Card className="glass p-6 rounded-2xl shadow-glass">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Sparkles className="text-accent" size={20} />
                      AI Recommendations
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {aiRecommendations.dashboard.map((rec, idx) => (
                        <RecommendationCard key={idx} recommendation={rec} />
                      ))}
                    </div>
                  </Card>

                  <Card className="glass p-6 rounded-2xl shadow-glass">
                    <h3 className="text-lg font-semibold mb-4">Category Popularity Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={analyticsData.categoryPopularity}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={(entry: any) => `${entry.name}: ${((entry.percent || 0) * 100).toFixed(0)}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {analyticsData.categoryPopularity.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </Card>
                </motion.div>
              )}

              {activeSection === "events" && (
                <motion.div
                  key="events"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold">Event Management</h2>
                    <Button className="bg-accent hover:bg-accent/90">
                      <Filter size={16} className="mr-2" />
                      Export Report
                    </Button>
                  </div>

                  <div className="glass p-4 rounded-2xl flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[200px]">
                      <Input
                        placeholder="Search events..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-background/50"
                      />
                    </div>
                    <Select value={filterCategory} onValueChange={setFilterCategory}>
                      <SelectTrigger className="w-[180px] bg-background/50">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="Business">Business</SelectItem>
                        <SelectItem value="Art">Art</SelectItem>
                        <SelectItem value="Sports">Sports</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger className="w-[180px] bg-background/50">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="Hybrid">Hybrid</SelectItem>
                        <SelectItem value="In-Person">In-Person</SelectItem>
                        <SelectItem value="Online">Online</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEvents.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>

                  <Card className="glass p-6 rounded-2xl shadow-glass mt-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Sparkles className="text-accent" size={20} />
                      AI Recommendations
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {aiRecommendations.events.map((rec, idx) => (
                        <RecommendationCard key={idx} recommendation={rec} />
                      ))}
                    </div>
                  </Card>
                </motion.div>
              )}

              {activeSection === "proposals" && (
                <motion.div
                  key="proposals"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-3xl font-bold">Organizer Proposals</h2>

                  <div className="glass p-4 rounded-2xl">
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Sparkles size={16} className="text-accent" />
                      AI-powered proposal analysis helps you make faster, data-driven decisions
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {proposals.map((proposal) => (
                      <ProposalCard key={proposal.id} proposal={proposal} />
                    ))}
                  </div>

                  <Card className="glass p-6 rounded-2xl shadow-glass mt-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Sparkles className="text-accent" size={20} />
                      AI Recommendations
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {aiRecommendations.proposals.map((rec, idx) => (
                        <RecommendationCard key={idx} recommendation={rec} />
                      ))}
                    </div>
                  </Card>
                </motion.div>
              )}

              {activeSection === "analytics" && (
                <motion.div
                  key="analytics"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-3xl font-bold">Analytics & Insights</h2>

                  {/* AI Engagement Predictor - Featured at Top */}
                  <AIEngagementPredictor />

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="glass p-6 rounded-2xl shadow-glass">
                      <h3 className="text-lg font-semibold mb-4">Top Performing Organizers</h3>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={analyticsData.topOrganizers}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                          <XAxis dataKey="name" stroke="currentColor" />
                          <YAxis stroke="currentColor" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "rgba(0,0,0,0.8)",
                              border: "1px solid rgba(255,255,255,0.2)",
                              borderRadius: "12px",
                            }}
                          />
                          <Bar dataKey="events" fill="#76FF03" radius={[8, 8, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </Card>

                    <Card className="glass p-6 rounded-2xl shadow-glass">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Sparkles className="text-accent" size={20} />
                        Predictive Insights
                      </h3>
                      <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-gradient-to-r from-accent/20 to-transparent border border-accent/30">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">Predicted Q4 Growth</span>
                            <Badge className="bg-accent text-accent-foreground">+28%</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Based on current trends, expect significant increase in tech events
                          </p>
                        </div>

                        <div className="p-4 rounded-xl bg-gradient-to-r from-warning/20 to-transparent border border-warning/30">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">Engagement Forecast</span>
                            <Badge className="bg-warning text-warning-foreground">High</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Weekend events projected to achieve 92% average attendance
                          </p>
                        </div>

                        <div className="p-4 rounded-xl bg-gradient-to-r from-error/20 to-transparent border border-error/30">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">Resource Allocation</span>
                            <Badge variant="destructive">Action Required</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Consider allocating more venues for hybrid format events
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>

                  <Card className="glass p-6 rounded-2xl shadow-glass">
                    <h3 className="text-lg font-semibold mb-4">Participation Trends (6 Months)</h3>
                    <ResponsiveContainer width="100%" height={350}>
                      <LineChart data={analyticsData.monthlyParticipation}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="month" stroke="currentColor" />
                        <YAxis stroke="currentColor" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(0,0,0,0.8)",
                            border: "1px solid rgba(255,255,255,0.2)",
                            borderRadius: "12px",
                          }}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="participants"
                          stroke="#76FF03"
                          strokeWidth={3}
                          dot={{ fill: "#76FF03", r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </Card>

                  {/* AI Recommendations Section - Enhanced */}
                  <Card className="glass p-6 rounded-2xl shadow-glass">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Sparkles className="text-accent" size={20} />
                        AI Recommendations
                      </h3>
                      <Badge className="bg-accent/20 text-accent-foreground">
                        Based on Analytics Data
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {aiRecommendations.analytics.map((rec, idx) => (
                        <AIRecommendationCard key={idx} recommendation={rec} />
                      ))}
                    </div>
                  </Card>
                </motion.div>
              )}

              {activeSection === "notifications" && (
                <motion.div
                  key="notifications"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold">Notifications & Alerts</h2>
                    <Button variant="outline">
                      <CheckCircle size={16} className="mr-2" />
                      Mark All as Read
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {notifications.map((notif) => (
                      <motion.div
                        key={notif.id}
                        whileHover={{ scale: 1.01 }}
                        className={`glass p-5 rounded-2xl shadow-glass ${
                          notif.unread ? "border-l-4 border-accent" : ""
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              {notif.type === "proposal" && <FileCheck size={18} className="text-accent" />}
                              {notif.type === "alert" && <Bell size={18} className="text-warning" />}
                              {notif.type === "update" && <Activity size={18} className="text-primary" />}
                              {notif.type === "success" && <CheckCircle size={18} className="text-success" />}
                              <span className="font-medium">{notif.message}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">{notif.time}</span>
                          </div>
                          {notif.unread && (
                            <Badge className="bg-accent/20 text-accent-foreground">New</Badge>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeSection === "profile" && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-3xl font-bold">Profile & Settings</h2>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card className="glass p-6 rounded-2xl shadow-glass text-center">
                      <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-accent flex items-center justify-center text-4xl font-bold">
                        A
                      </div>
                      <h3 className="text-xl font-semibold mb-1">Authority Admin</h3>
                      <p className="text-sm text-muted-foreground mb-2">admin@university.edu</p>
                      <Badge className="mb-4">Super Administrator</Badge>
                      <p className="text-xs text-muted-foreground">ID: AUTH-2024-001</p>
                    </Card>

                    <Card className="lg:col-span-2 glass p-6 rounded-2xl shadow-glass">
                      <h3 className="text-lg font-semibold mb-6">Preferences</h3>
                      
                      <div className="space-y-6">
                        <div>
                          <label className="text-sm font-medium mb-3 block">Theme Mode</label>
                          <div className="flex gap-3">
                            <Button
                              variant={theme === "light" ? "default" : "outline"}
                              onClick={() => setTheme("light")}
                              className={theme === "light" ? "bg-accent" : ""}
                            >
                              <Sun size={16} className="mr-2" />
                              Light
                            </Button>
                            <Button
                              variant={theme === "dark" ? "default" : "outline"}
                              onClick={() => setTheme("dark")}
                              className={theme === "dark" ? "bg-accent" : ""}
                            >
                              <Moon size={16} className="mr-2" />
                              Dark
                            </Button>
                            <Button
                              variant={theme === "vibrant" ? "default" : "outline"}
                              onClick={() => setTheme("vibrant")}
                              className={theme === "vibrant" ? "bg-accent" : ""}
                            >
                              <Palette size={16} className="mr-2" />
                              Vibrant
                            </Button>
                          </div>
                        </div>

                        <div className="p-4 rounded-xl bg-accent/10 border border-accent/30">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Sparkles size={18} className="text-accent" />
                              <span className="font-medium">AI Assistant</span>
                            </div>
                            <Button size="sm" className="bg-accent hover:bg-accent/90">
                              Enabled
                            </Button>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Get intelligent summaries, predictions, and recommendations
                          </p>
                        </div>

                        <div className="pt-4 border-t border-border">
                          <Button variant="destructive" className="w-full">
                            <XCircle size={16} className="mr-2" />
                            Logout
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>

      {/* Event Details Modal */}
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="glass max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedEvent?.title}</DialogTitle>
            <DialogDescription>{selectedEvent?.organizer}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Date & Time:</span>
                <p className="font-medium">{selectedEvent?.date} at {selectedEvent?.time}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Location:</span>
                <p className="font-medium">{selectedEvent?.location}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Type:</span>
                <p className="font-medium">{selectedEvent?.type}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Category:</span>
                <p className="font-medium">{selectedEvent?.category}</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Description</h4>
              <p className="text-sm text-muted-foreground">{selectedEvent?.description}</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="glass p-4 rounded-xl text-center">
                <p className="text-2xl font-bold text-accent">{selectedEvent?.rsvp}</p>
                <p className="text-xs text-muted-foreground">RSVPs</p>
              </div>
              <div className="glass p-4 rounded-xl text-center">
                <p className="text-2xl font-bold text-warning">{selectedEvent?.bookmarked}</p>
                <p className="text-xs text-muted-foreground">Bookmarked</p>
              </div>
              <div className="glass p-4 rounded-xl text-center">
                <p className="text-2xl font-bold text-success">{selectedEvent?.engagement}%</p>
                <p className="text-xs text-muted-foreground">Engagement</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Participants Preview</h4>
              <div className="flex gap-2 flex-wrap">
                {selectedEvent?.participants.map((name: string, idx: number) => (
                  <div
                    key={idx}
                    className="w-10 h-10 rounded-full bg-gradient-accent flex items-center justify-center text-sm font-bold"
                  >
                    {name[0]}
                  </div>
                ))}
              </div>
            </div>

            <div className="glass p-4 rounded-xl bg-accent/10">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Sparkles size={16} className="text-accent" />
                AI Analysis
              </h4>
              <p className="text-sm text-muted-foreground">
                This event has strong engagement metrics and aligns well with current student interests.
                Predicted attendance rate: 94%. Recommend highlighting similar future events.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Sparkles size={16} className="text-accent" />
                AI Recommendations
              </h4>
              <div className="space-y-2">
                {aiRecommendations.eventDetail.map((rec, idx) => (
                  <RecommendationCard key={idx} recommendation={rec} />
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Reject Proposal Modal */}
      <Dialog open={showRejectModal} onOpenChange={setShowRejectModal}>
        <DialogContent className="glass">
          <DialogHeader>
            <DialogTitle>Reject Proposal</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this proposal. The organizer will be notified.
            </DialogDescription>
          </DialogHeader>

          <Textarea
            placeholder="Enter rejection reason..."
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            className="min-h-[120px] bg-background/50"
          />

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                setShowRejectModal(false);
                setRejectReason("");
              }}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="flex-1"
              onClick={handleReject}
            >
              Confirm Rejection
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* AI Summary Modal */}
      <Dialog open={showAiModal} onOpenChange={setShowAiModal}>
        <DialogContent className="glass max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="text-accent" size={20} />
              AI Analysis Summary
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-accent/10 border border-accent/30">
              <pre className="text-sm whitespace-pre-wrap text-foreground">{aiInsight}</pre>
            </div>

            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2 text-sm">
                Related Recommendations
              </h4>
              <div className="space-y-2">
                {aiRecommendations.proposals.slice(0, 3).map((rec, idx) => (
                  <RecommendationCard key={idx} recommendation={rec} />
                ))}
              </div>
            </div>

            <Button className="w-full bg-accent hover:bg-accent/90" onClick={() => setShowAiModal(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
