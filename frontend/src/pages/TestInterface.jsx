import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Clock, Flag } from 'lucide-react';
import { toast } from 'sonner';

const TestInterface = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [round, setRound] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    fetchRound();
  }, [id]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const fetchRound = async () => {
    try {
      const response = await api.get(`/practice-rounds/${id}`);
      setRound(response.data);
      setTimeLeft(response.data.duration * 60);
      setAnswers(new Array(response.data.questions.length).fill({ userAnswer: '' }));
    } catch (error) {
      toast.error('Failed to load test');
      navigate('/practice-rounds');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = { userAnswer: answer };
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < round.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(answers[currentQuestion + 1]?.userAnswer || '');
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1]?.userAnswer || '');
    }
  };

  const handleSubmit = async () => {
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(timeTaken / 60);
    const seconds = timeTaken % 60;
    const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    try {
      const response = await api.post('/test-results/submit', {
        roundId: id,
        answers,
        timeTaken: timeString
      });
      toast.success('Test submitted successfully!');
      navigate(`/test-results/${response.data._id}`);
    } catch (error) {
      toast.error('Failed to submit test');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading test...</div>
      </div>
    );
  }

  const question = round.questions[currentQuestion];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <Card className="p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{round.name}</h2>
              <p className="text-gray-400">Question {currentQuestion + 1} of {round.questions.length}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-2xl font-bold mb-2">
                <Clock className="w-6 h-6" />
                {formatTime(timeLeft)}
              </div>
              <Progress value={currentQuestion + 1} max={round.questions.length} />
            </div>
          </div>
        </Card>

        {/* Question */}
        <Card className="mb-6">
          <h3 className="text-xl font-semibold mb-6">{question.question}</h3>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <div
                key={index}
                onClick={() => handleAnswerSelect(option)}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedAnswer === option
                    ? 'border-purple-400 bg-purple-500/20'
                    : 'border-white/10 hover:border-purple-400/50'
                }`}
              >
                {option}
              </div>
            ))}
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            variant="outline"
          >
            Previous
          </Button>

          <Button onClick={handleSubmit} variant="outline">
            <Flag className="w-4 h-4 mr-2" />
            Submit Test
          </Button>

          {currentQuestion < round.questions.length - 1 ? (
            <Button onClick={handleNext}>Next</Button>
          ) : (
            <Button onClick={handleSubmit}>Submit</Button>
          )}
        </div>

        {/* Question Navigator */}
        <Card className="mt-6">
          <h4 className="font-semibold mb-4">Questions</h4>
          <div className="grid grid-cols-10 gap-2">
            {round.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentQuestion(index);
                  setSelectedAnswer(answers[index]?.userAnswer || '');
                }}
                className={`w-10 h-10 rounded-lg font-medium transition-all ${
                  index === currentQuestion
                    ? 'bg-purple-500 text-white'
                    : answers[index]?.userAnswer
                    ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                    : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TestInterface;

