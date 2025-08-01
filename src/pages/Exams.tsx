import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Plus, 
  MoreVertical,
  Edit,
  Play,
  Copy,
  Trash2,
  Clock,
  Users,
  Calendar
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

const Exams = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const exams = [
    {
      id: 1,
      title: "Mathematics Mock Test - Algebra",
      description: "Comprehensive test covering algebraic equations and functions",
      status: "Active",
      questions: 50,
      duration: 120,
      participants: 45,
      created: "2024-01-15",
      category: "Mathematics"
    },
    {
      id: 2,
      title: "Physics Chapter 1 - Mechanics",
      description: "Basic mechanics concepts and numerical problems",
      status: "Draft",
      questions: 30,
      duration: 90,
      participants: 0,
      created: "2024-01-20",
      category: "Physics"
    },
    {
      id: 3,
      title: "Chemistry Final Exam",
      description: "Complete syllabus coverage for final examination",
      status: "Completed",
      questions: 80,
      duration: 180,
      participants: 89,
      created: "2024-01-10",
      category: "Chemistry"
    },
    {
      id: 4,
      title: "English Literature Quiz",
      description: "Short quiz on modern English literature",
      status: "Active",
      questions: 25,
      duration: 45,
      participants: 23,
      created: "2024-01-22",
      category: "English"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-success text-success-foreground";
      case "Draft": return "bg-warning text-warning-foreground";
      case "Completed": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const filteredExams = exams.filter(exam =>
    exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exam.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Exam Management</h1>
            <p className="text-muted-foreground">Create, edit, and manage your exams</p>
          </div>
          <Link to="/create-exam">
            <Button className="gap-2" size="lg">
              <Plus className="w-4 h-4" />
              Create New Exam
            </Button>
          </Link>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search exams..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>

        {/* Exam Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExams.map((exam) => (
            <Card key={exam.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1 line-clamp-2">{exam.title}</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {exam.category}
                    </Badge>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="gap-2">
                        <Edit className="w-4 h-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2">
                        <Copy className="w-4 h-4" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 text-destructive">
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardDescription className="line-clamp-2 mt-2">
                  {exam.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge className={getStatusColor(exam.status)}>
                    {exam.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    Created {new Date(exam.created).toLocaleDateString()}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-lg font-semibold text-foreground">{exam.questions}</p>
                    <p className="text-xs text-muted-foreground">Questions</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-foreground">{exam.duration}m</p>
                    <p className="text-xs text-muted-foreground">Duration</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-foreground">{exam.participants}</p>
                    <p className="text-xs text-muted-foreground">Participants</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  {exam.status === "Active" && (
                    <Link to={`/take-exam/${exam.id}`} className="flex-1">
                      <Button variant="default" size="sm" className="w-full gap-2">
                        <Play className="w-4 h-4" />
                        Take Exam
                      </Button>
                    </Link>
                  )}
                  <Link to={`/exam/${exam.id}/edit`} className={exam.status === "Active" ? "" : "flex-1"}>
                    <Button variant="outline" size="sm" className="w-full gap-2">
                      <Edit className="w-4 h-4" />
                      {exam.status === "Active" ? "Edit" : "Setup"}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredExams.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No exams found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? "Try adjusting your search terms" : "Create your first exam to get started"}
            </p>
            <Link to="/upload">
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Create New Exam
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Exams;