import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ArrowLeft, TrendingUp, TrendingDown, Award, BarChart3, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

const PerformanceReport = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [stats, setStats] = useState({
    totalTests: 0,
    averageScore: 0,
    bestScore: 0,
    improvement: 0
  });
  const [aiInsights, setAiInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const [resultsResponse, insightsResponse] = await Promise.all([
        api.get('/test-results'),
        api.get('/test-results/insights').catch(() => ({ data: { aiInsights: [] } }))
      ]);
      
      setResults(resultsResponse.data);
      setAiInsights(insightsResponse.data.aiInsights || []);

      // Calculate stats
      if (resultsResponse.data.length > 0) {
        const scores = resultsResponse.data.map(r => r.score);
        const totalTests = resultsResponse.data.length;
        const averageScore = Math.round(scores.reduce((a, b) => a + b, 0) / totalTests);
        const bestScore = Math.max(...scores);
        
        // Calculate improvement (compare first vs last)
        let improvement = 0;
        if (totalTests >= 2) {
          const firstScore = resultsResponse.data[totalTests - 1].score;
          const lastScore = resultsResponse.data[0].score;
          improvement = lastScore - firstScore;
        }

        setStats({
          totalTests,
          averageScore,
          bestScore,
          improvement
        });
      }
    } catch (error) {
      toast.error('Failed to load performance data');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 85) return 'text-green-400';
    if (score >= 70) return 'text-blue-400';
    if (score >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'aptitude': return 'bg-purple-500/20 text-purple-400 border-purple-500/50';
      case 'coding': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'hr': return 'bg-pink-500/20 text-pink-400 border-pink-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading performance report...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <Button onClick={() => navigate('/dashboard')} variant="ghost" className="mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </Button>

        <h1 className="text-4xl font-bold mb-2">Performance Report</h1>
        <p className="text-gray-400 mb-8">Track your progress and improvement</p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 text-center">
            <BarChart3 className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <p className="text-gray-400 text-sm mb-2">Total Tests</p>
            <p className="text-3xl font-bold">{stats.totalTests}</p>
          </Card>

          <Card className="p-6 text-center">
            <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-3" />
            <p className="text-gray-400 text-sm mb-2">Average Score</p>
            <p className={`text-3xl font-bold ${getScoreColor(stats.averageScore)}`}>
              {stats.averageScore}%
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Award className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
            <p className="text-gray-400 text-sm mb-2">Best Score</p>
            <p className={`text-3xl font-bold ${getScoreColor(stats.bestScore)}`}>
              {stats.bestScore}%
            </p>
          </Card>

          <Card className="p-6 text-center">
            {stats.improvement >= 0 ? (
              <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-3" />
            ) : (
              <TrendingDown className="w-8 h-8 text-red-400 mx-auto mb-3" />
            )}
            <p className="text-gray-400 text-sm mb-2">Improvement</p>
            <p className={`text-3xl font-bold ${stats.improvement >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {stats.improvement >= 0 ? '+' : ''}{stats.improvement}%
            </p>
          </Card>
        </div>

        {/* AI Insights */}
        {aiInsights.length > 0 && (
          <Card className="p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-bold">AI Performance Insights</h2>
            </div>
            <ul className="space-y-3">
              {aiInsights.map((insight, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-300 p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </Card>
        )}

        {/* Test History */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6">Test History</h2>

          {results.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>No test results yet</p>
              <Button onClick={() => navigate('/practice-rounds')} className="mt-4">
                Take Your First Test
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {results.map((result) => (
                <div
                  key={result._id}
                  className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-purple-400/50 transition-all cursor-pointer"
                  onClick={() => navigate(`/test-results/${result._id}`)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`px-3 py-1 rounded-full text-xs border ${getTypeColor(result.roundType)}`}>
                        {result.roundType?.toUpperCase() || 'TEST'}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{result.roundName}</h3>
                        <p className="text-sm text-gray-400">
                          {new Date(result.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className={`text-2xl font-bold mb-1 ${getScoreColor(result.score)}`}>
                        {result.score}%
                      </div>
                      <p className="text-sm text-gray-400">
                        {result.correctAnswers}/{result.totalQuestions} correct
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Time: {result.timeTaken}
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-3">
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          result.score >= 85 ? 'bg-green-500' :
                          result.score >= 70 ? 'bg-blue-500' :
                          result.score >= 50 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${result.score}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default PerformanceReport;
