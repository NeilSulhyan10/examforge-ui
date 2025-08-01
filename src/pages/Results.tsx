import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, 
  Clock, 
  Target, 
  Users, 
  Download,
  Share2,
  BarChart3,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";
import { Link } from "react-router-dom";

const Results = () => {
  // Mock result data
  const result = {
    examTitle: "Mathematics Mock Test - Algebra",
    score: 42,
    totalQuestions: 50,
    timeSpent: "1h 45m",
    timeTaken: 105, // minutes
    totalTime: 120, // minutes
    correctAnswers: 42,
    incorrectAnswers: 6,
    unanswered: 2,
    percentage: 84,
    rank: 12,
    totalParticipants: 156,
    submittedAt: "2024-01-25 14:30:00"
  };

  const questionBreakdown = [
    { category: "Linear Equations", total: 15, correct: 13, percentage: 87 },
    { category: "Quadratic Functions", total: 12, correct: 10, percentage: 83 },
    { category: "Polynomials", total: 10, correct: 8, percentage: 80 },
    { category: "Algebraic Expressions", total: 8, correct: 7, percentage: 88 },
    { category: "Inequalities", total: 5, correct: 4, percentage: 80 }
  ];

  const getPerformanceColor = (percentage: number) => {
    if (percentage >= 80) return "text-success";
    if (percentage >= 60) return "text-warning";
    return "text-destructive";
  };

  const getPerformanceBadge = (percentage: number) => {
    if (percentage >= 90) return { label: "Excellent", class: "bg-success text-success-foreground" };
    if (percentage >= 80) return { label: "Good", class: "bg-primary text-primary-foreground" };
    if (percentage >= 60) return { label: "Average", class: "bg-warning text-warning-foreground" };
    return { label: "Needs Improvement", class: "bg-destructive text-destructive-foreground" };
  };

  const performanceBadge = getPerformanceBadge(result.percentage);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Exam Results</h1>
          <p className="text-muted-foreground">{result.examTitle}</p>
          <Badge className={`mt-2 ${performanceBadge.class}`}>
            {performanceBadge.label}
          </Badge>
        </div>

        {/* Main Results */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Score Overview */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Score Overview</CardTitle>
                <CardDescription>Your performance summary</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="text-6xl font-bold text-foreground mb-2">
                    {result.score}<span className="text-2xl text-muted-foreground">/{result.totalQuestions}</span>
                  </div>
                  <div className="text-2xl font-semibold text-primary mb-4">
                    {result.percentage}%
                  </div>
                  <Progress value={result.percentage} className="h-3 mb-4" />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-success/10 rounded-lg">
                    <CheckCircle className="w-8 h-8 text-success mx-auto mb-2" />
                    <p className="text-2xl font-bold text-success">{result.correctAnswers}</p>
                    <p className="text-sm text-muted-foreground">Correct</p>
                  </div>
                  <div className="text-center p-4 bg-destructive/10 rounded-lg">
                    <XCircle className="w-8 h-8 text-destructive mx-auto mb-2" />
                    <p className="text-2xl font-bold text-destructive">{result.incorrectAnswers}</p>
                    <p className="text-sm text-muted-foreground">Incorrect</p>
                  </div>
                  <div className="text-center p-4 bg-warning/10 rounded-lg">
                    <AlertCircle className="w-8 h-8 text-warning mx-auto mb-2" />
                    <p className="text-2xl font-bold text-warning">{result.unanswered}</p>
                    <p className="text-sm text-muted-foreground">Unanswered</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Time Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-muted-foreground">Time Used</span>
                    <span className="font-semibold">{result.timeSpent}</span>
                  </div>
                  <Progress value={(result.timeTaken / result.totalTime) * 100} className="h-2" />
                </div>
                <div className="text-center pt-2">
                  <p className="text-sm text-muted-foreground">
                    Completed {Math.round((result.timeTaken / result.totalTime) * 100)}% of allotted time
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Ranking
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">#{result.rank}</div>
                <p className="text-muted-foreground">
                  out of {result.totalParticipants} participants
                </p>
                <div className="mt-4 text-sm text-muted-foreground">
                  Top {Math.round((result.rank / result.totalParticipants) * 100)}%
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Category Breakdown */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Category Breakdown
            </CardTitle>
            <CardDescription>Performance analysis by topic</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {questionBreakdown.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{category.category}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {category.correct}/{category.total}
                      </span>
                      <span className={`font-semibold ${getPerformanceColor(category.percentage)}`}>
                        {category.percentage}%
                      </span>
                    </div>
                  </div>
                  <Progress value={category.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Download Certificate
          </Button>
          <Button variant="outline" className="gap-2">
            <Share2 className="w-4 h-4" />
            Share Result
          </Button>
          <Link to="/exams">
            <Button className="gap-2">
              <Target className="w-4 h-4" />
              Take Another Exam
            </Button>
          </Link>
        </div>

        {/* Exam Info */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Exam completed on {new Date(result.submittedAt).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Results;