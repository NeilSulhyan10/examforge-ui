import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, 
  Download,
  Share2,
  CheckCircle,
  XCircle,
  AlertCircle,
  BarChart3
} from "lucide-react";
import { Link } from "react-router-dom";

const ExamsMock = [
  {
    id: 1,
    title: "Mathematics Mock Test - Algebra",
    description: "Comprehensive test covering algebraic equations and functions",
    questions: 50,
    duration: 120,
    submittedAt: "2024-01-25T14:30:00",
  },
  {
    id: 2,
    title: "Physics Chapter 1 - Mechanics",
    description: "Basic mechanics concepts and numerical problems",
    questions: 30,
    duration: 90,
    submittedAt: "2024-02-10T10:00:00",
  },
  {
    id: 3,
    title: "Chemistry Final Exam",
    description: "Complete syllabus coverage for final examination",
    questions: 80,
    duration: 180,
    submittedAt: "2024-01-10T09:15:00",
  },
  {
    id: 4,
    title: "English Literature Quiz",
    description: "Short quiz on modern English literature",
    questions: 25,
    duration: 45,
    submittedAt: "2024-03-05T16:45:00",
  }
];

const makeResultForExam = (exam: any) => {
  // Simple deterministic mock generation based on exam id
  const baseCorrect = Math.max(1, Math.round(exam.questions * (0.6 + (exam.id % 3) * 0.1)));
  const incorrect = Math.max(0, exam.questions - baseCorrect - (exam.id % 2));
  const unanswered = Math.max(0, exam.questions - baseCorrect - incorrect);
  const percentage = Math.round((baseCorrect / exam.questions) * 100);

  return {
    examTitle: exam.title,
    score: baseCorrect,
    totalQuestions: exam.questions,
    timeSpent: `${Math.floor(exam.duration / 60)}h ${exam.duration % 60}m`,
    timeTaken: exam.duration,
    totalTime: exam.duration,
    correctAnswers: baseCorrect,
    incorrectAnswers: incorrect,
    unanswered,
    percentage,
    rank: 10 + exam.id,
    totalParticipants: 100 + exam.id * 5,
    submittedAt: exam.submittedAt,
  };
};

const Results = () => {
  const [selectedExamId, setSelectedExamId] = useState<number | null>(null);

  const selectedExam = ExamsMock.find((e) => e.id === selectedExamId) || null;
  const result = selectedExam ? makeResultForExam(selectedExam) : null;

  const getPerformanceBadge = (percentage: number) => {
    if (percentage >= 90) return { label: "Excellent", class: "bg-success text-success-foreground" };
    if (percentage >= 80) return { label: "Good", class: "bg-primary text-primary-foreground" };
    if (percentage >= 60) return { label: "Average", class: "bg-warning text-warning-foreground" };
    return { label: "Needs Improvement", class: "bg-destructive text-destructive-foreground" };
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center">
                <Trophy className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Exam Results</h1>
                <p className="text-sm text-muted-foreground">View results for each exam you took</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/exams">
              <Button variant="ghost" size="sm">Back to Exams</Button>
            </Link>
          </div>
        </div>

        {!selectedExam && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ExamsMock.map((exam) => (
              <Card key={exam.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-1 line-clamp-2">{exam.title}</CardTitle>
                      <CardDescription className="line-clamp-2 mt-2 text-sm text-muted-foreground">{exam.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
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
                      <p className="text-lg font-semibold text-foreground">{new Date(exam.submittedAt).toLocaleDateString()}</p>
                      <p className="text-xs text-muted-foreground">Submitted</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={() => setSelectedExamId(exam.id)} className="w-full gap-2">
                      <BarChart3 className="w-4 h-4" />
                      View Result
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {selectedExam && result && (
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Button variant="ghost" onClick={() => setSelectedExamId(null)}>Back to results list</Button>
            </div>

            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-1">{result.examTitle}</h2>
              <p className="text-sm text-muted-foreground">Submitted {new Date(result.submittedAt).toLocaleString()}</p>
              <Badge className={`mt-2 ${getPerformanceBadge(result.percentage).class}`}>
                {getPerformanceBadge(result.percentage).label}
              </Badge>
            </div>

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
                  <div className="text-2xl font-semibold text-primary mb-4">{result.percentage}%</div>
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

                <div className="mt-6 flex gap-2 justify-center">
                  <Button variant="outline" className="gap-2">
                    <Download className="w-4 h-4" />
                    Download Certificate
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Share2 className="w-4 h-4" />
                    Share Result
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Results;