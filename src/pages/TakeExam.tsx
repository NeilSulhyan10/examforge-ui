import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Flag,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

const TakeExam = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(7200); // 2 hours in seconds
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());

  // Mock exam data
  const exam = {
    id: examId,
    title: "Mathematics Mock Test - Algebra",
    duration: 120,
    totalQuestions: 50,
    questions: [
      {
        id: 1,
        question: "What is the solution to the equation 2x + 5 = 17?",
        options: ["x = 6", "x = 7", "x = 8", "x = 9"],
        type: "multiple-choice"
      },
      {
        id: 2,
        question: "Simplify the expression: (3x² + 2x - 1) + (x² - 4x + 3)",
        options: ["4x² - 2x + 2", "4x² + 6x + 2", "2x² - 2x + 2", "4x² - 2x - 4"],
        type: "multiple-choice"
      },
      {
        id: 3,
        question: "If f(x) = x² - 3x + 2, what is f(4)?",
        options: ["6", "8", "10", "12"],
        type: "multiple-choice"
      }
    ]
  };

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleSubmitExam();
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleFlagQuestion = (questionId: number) => {
    setFlaggedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const handleSubmitExam = () => {
    // Navigate to results page
    alert("Exam submitted!");
    navigate('/');
  };

  const currentQ = exam.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / exam.questions.length) * 100;
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-foreground">{exam.title}</h1>
              <p className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {exam.questions.length}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-warning">
                <Clock className="w-4 h-4" />
                <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
              </div>
              <Button variant="destructive" onClick={handleSubmitExam}>
                Submit Exam
              </Button>
            </div>
          </div>
          <div className="mt-3">
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Question Panel */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">
                      Question {currentQuestion + 1}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {currentQ.question}
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleFlagQuestion(currentQ.id)}
                    className={flaggedQuestions.has(currentQ.id) ? "text-warning border-warning" : ""}
                  >
                    <Flag className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <RadioGroup
                  value={answers[currentQ.id] || ""}
                  onValueChange={(value) => handleAnswerChange(currentQ.id, value)}
                >
                  {currentQ.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                      <RadioGroupItem value={option} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                <div className="flex items-center justify-between pt-6">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                    disabled={currentQuestion === 0}
                    className="gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>
                  
                  <Button
                    onClick={() => setCurrentQuestion(Math.min(exam.questions.length - 1, currentQuestion + 1))}
                    disabled={currentQuestion === exam.questions.length - 1}
                    className="gap-2"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Navigation Panel */}
          <div className="space-y-6">
            {/* Exam Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Exam Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-success">{answeredCount}</p>
                    <p className="text-xs text-muted-foreground">Answered</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-muted-foreground">{exam.questions.length - answeredCount}</p>
                    <p className="text-xs text-muted-foreground">Remaining</p>
                  </div>
                </div>
                
                {flaggedQuestions.size > 0 && (
                  <div className="text-center">
                    <p className="text-lg font-semibold text-warning">{flaggedQuestions.size}</p>
                    <p className="text-xs text-muted-foreground">Flagged</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Question Navigator */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2">
                  {exam.questions.map((_, index) => {
                    const isAnswered = answers[exam.questions[index].id];
                    const isFlagged = flaggedQuestions.has(exam.questions[index].id);
                    const isCurrent = index === currentQuestion;
                    
                    return (
                      <Button
                        key={index}
                        variant={isCurrent ? "default" : "outline"}
                        size="sm"
                        className={`relative h-10 w-10 p-0 ${
                          isAnswered && !isCurrent ? "bg-success/20 border-success text-success" : ""
                        }`}
                        onClick={() => setCurrentQuestion(index)}
                      >
                        {index + 1}
                        {isFlagged && (
                          <Flag className="absolute -top-1 -right-1 w-3 h-3 text-warning fill-warning" />
                        )}
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Legend */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-primary rounded"></div>
                    <span>Current</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-success/20 border border-success rounded"></div>
                    <span>Answered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Flag className="w-3 h-3 text-warning fill-warning" />
                    <span>Flagged</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TakeExam;