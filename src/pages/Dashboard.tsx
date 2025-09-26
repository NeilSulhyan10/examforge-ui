import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  FileText, 
  Users, 
  BarChart3, 
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const stats = [
    { label: "Total Exams", value: "24", icon: FileText, color: "text-primary" },
    { label: "Active Tests", value: "8", icon: Clock, color: "text-warning" },
    { label: "Completed", value: "16", icon: CheckCircle, color: "text-success" },
  ];

  const recentExams = [
    { name: "Mathematics Mock Test", status: "Active", participants: 45, date: "2 days ago" },
    { name: "Physics Chapter 1", status: "Draft", participants: 0, date: "1 week ago" },
    { name: "Chemistry Final", status: "Completed", participants: 89, date: "3 days ago" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's your exam overview.</p>
          </div>
          <Link to="/upload">
            <Button className="gap-2" size="lg">
              <Plus className="w-4 h-4" />
              Create Exam
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-lg bg-accent/20 ${stat.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Quick Actions
              </CardTitle>
              <CardDescription>Get started with common tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/upload" className="block">
                <Button variant="outline" className="w-full justify-start gap-3">
                  <Upload className="w-4 h-4" />
                  Upload Questions
                </Button>
              </Link>
              <Link to="/exams" className="block">
                <Button variant="outline" className="w-full justify-start gap-3">
                  <FileText className="w-4 h-4" />
                  Manage Exams
                </Button>
              </Link>
              <Link to="/results" className="block">
                <Button variant="outline" className="w-full justify-start gap-3">
                  <BarChart3 className="w-4 h-4" />
                  View Analytics
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Recent Exams */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Exams</CardTitle>
              <CardDescription>Your latest exam activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentExams.map((exam, index) => {
                  const getStatusColor = (status: string) => {
                    switch (status) {
                      case "Active": return "bg-success text-success-foreground";
                      case "Draft": return "bg-warning text-warning-foreground";
                      case "Completed": return "bg-muted text-muted-foreground";
                      default: return "bg-muted text-muted-foreground";
                    }
                  };

                  return (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-1">{exam.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{exam.participants} participants</span>
                          <span>{exam.date}</span>
                        </div>
                      </div>
                      <Badge className={getStatusColor(exam.status)}>
                        {exam.status}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;