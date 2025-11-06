import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ArrowLeft, TrendingUp, TrendingDown } from 'lucide-react';
import { toast } from 'sonner';

const TestResults = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResult();
  }, [id]);

  const fetchResult = async () => {
    try {
      const response = await api.get(`/test-results/${id}`);
      setResult(response.data);
    } catch (error) {
      toast.error('Failed to load results');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading results...</div>
      </div>
    );
  }

  const percentage = (result.score / 100) * 360;

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <Button onClick={() => navigate('/dashboard')} variant="ghost" className="mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </Button>

        <h1 className="text-4xl font-bold mb-2">Test Results: {result.roundName}</h1>
        <p className="text-gray-400 mb-8">Here's a detailed breakdown of your performance</p>

        {/* Score Card */}
        <Card className="mb-6 text-center py-12">
          <div className="mb-6">
            <div className="relative w-48 h-48 mx-auto">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="url(#gradient)"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${percentage * 1.54} 999`}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#667eea" />
                    <stop offset="100%" stopColor="#764ba2" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div>
                  <div className="text-5xl font-bold">{result.score}%</div>
                  <div className="text-gray-400 text-sm">Percentile</div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-2">
            {result.score >= 85 ? 'Excellent Work!' : result.score >= 70 ? 'Great Job!' : 'Keep Practicing!'}
          </h2>
          <p className="text-gray-400">
            You are in the top {100 - result.score}% of test takers
          </p>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="text-center">
            <p className="text-gray-400 mb-2">Correct Answers</p>
            <p className="text-3xl font-bold text-green-400">{result.correctAnswers}</p>
          </Card>

          <Card className="text-center">
            <p className="text-gray-400 mb-2">Incorrect Answers</p>
            <p className="text-3xl font-bold text-red-400">
              {result.totalQuestions - result.correctAnswers}
            </p>
          </Card>

          <Card className="text-center">
            <p className="text-gray-400 mb-2">Time Taken</p>
            <p className="text-3xl font-bold">{result.timeTaken}</p>
          </Card>
        </div>

        {/* Analysis */}
        <Card className="mb-6">
          <h3 className="text-xl font-bold mb-6">Analysis</h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <h4 className="font-semibold">Strengths</h4>
              </div>
              <div className="space-y-2">
                {result.score >= 70 && (
                  <>
                    <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg">
                      <span>Problem Solving</span>
                      <div className="w-32 h-2 bg-white/10 rounded-full">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: '90%' }} />
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg">
                      <span>Time Management</span>
                      <div className="w-32 h-2 bg-white/10 rounded-full">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: '85%' }} />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <TrendingDown className="w-5 h-5 text-orange-400" />
                <h4 className="font-semibold">Areas for Improvement</h4>
              </div>
              <div className="space-y-2">
                {result.score < 85 && (
                  <>
                    <div className="flex items-center justify-between p-3 bg-orange-500/10 rounded-lg">
                      <span>Accuracy</span>
                      <div className="w-32 h-2 bg-white/10 rounded-full">
                        <div className="h-full bg-orange-500 rounded-full" style={{ width: '60%' }} />
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-orange-500/10 rounded-lg">
                      <span>Conceptual Understanding</span>
                      <div className="w-32 h-2 bg-white/10 rounded-full">
                        <div className="h-full bg-orange-500 rounded-full" style={{ width: '55%' }} />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          <Button onClick={() => navigate('/practice-rounds')} className="flex-1">
            Practice Again
          </Button>
          <Button onClick={() => navigate('/courses')} variant="outline" className="flex-1">
            View Curriculum
          </Button>
          <Button onClick={() => navigate('/performance')} variant="outline" className="flex-1">
            View All Results
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TestResults;

