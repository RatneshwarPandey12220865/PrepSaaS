import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Calendar, Target, TrendingUp, LogOut, Plus, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalInterviews: 0,
    upcomingMock: null,
    latestScore: 0,
    aiInsights: []
  });
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, interviewsRes] = await Promise.all([
        api.get('/dashboard/stats'),
        api.get('/interviews')
      ]);
      setStats(statsRes.data);
      setInterviews(interviewsRes.data);
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Logged out successfully');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Welcome back, {user?.fullName?.split(' ')[0]}!
            </h1>
            <p className="text-gray-400 text-lg">Let's prepare for your next interview ✨</p>
          </div>
          <Button 
            onClick={handleLogout} 
            variant="ghost"
            className="text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg">
                <Calendar className="w-7 h-7 text-white" />
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-2">Recent Interviews</p>
            <p className="text-4xl font-bold text-white">{stats.totalInterviews}</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-pink-500/10 to-pink-600/5 border border-pink-500/20 hover:border-pink-400/40 transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="p-4 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl shadow-lg">
                <Target className="w-7 h-7 text-white" />
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-2">Upcoming Mock</p>
            <p className="text-2xl font-bold text-white">
              {stats.upcomingMock ? new Date(stats.upcomingMock).toLocaleDateString() : 'Not scheduled'}
            </p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-2">Latest Score</p>
            <p className="text-4xl font-bold text-white">{stats.latestScore}/10</p>
          </Card>
        </div>

        {/* AI Insights */}
        {stats.aiInsights && stats.aiInsights.length > 0 && (
          <Card className="p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-bold">AI Performance Insights</h2>
            </div>
            <ul className="space-y-2">
              {stats.aiInsights.map((insight, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-300">
                  <span className="text-purple-400 mt-1">•</span>
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Button 
            onClick={() => navigate('/practice-rounds')} 
            className="h-28 text-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg hover:shadow-green-500/25 transition-all duration-300 hover:scale-105"
          >
            <div className="flex flex-col items-center gap-2">
              <Target className="w-6 h-6" />
              Practice Rounds
            </div>
          </Button>
          <Button 
            onClick={() => navigate('/courses')} 
            className="h-28 text-lg bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
          >
            <div className="flex flex-col items-center gap-2">
              <Sparkles className="w-6 h-6" />
              Course Curriculum
            </div>
          </Button>
          <Button 
            onClick={() => navigate('/resumes')} 
            className="h-28 text-lg bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105"
          >
            <div className="flex flex-col items-center gap-2">
              <Calendar className="w-6 h-6" />
              Resume Management
            </div>
          </Button>
        </div>

        {/* My Interviews */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">My Interviews</h2>
            <Button onClick={() => navigate('/interviews/new')} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Interview
            </Button>
          </div>

          {interviews.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p>No interviews scheduled yet</p>
              <Button onClick={() => navigate('/interviews/new')} className="mt-4">
                Schedule Your First Interview
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {interviews.slice(0, 5).map((interview) => (
                <div
                  key={interview._id}
                  className="interview-card p-4 cursor-pointer"
                  onClick={() => navigate(`/interviews/${interview._id}`)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{interview.role}</h3>
                      <p className="text-gray-400">{interview.company}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">{new Date(interview.date).toLocaleDateString()}</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs mt-2 ${
                        interview.status === 'scheduled' ? 'bg-green-500/20 text-green-400' :
                        interview.status === 'completed' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {interview.status}
                      </span>
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

export default Dashboard;

