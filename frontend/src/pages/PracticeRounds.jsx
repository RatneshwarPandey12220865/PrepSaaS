import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ArrowLeft, Clock, Brain, Code, Users } from 'lucide-react';
import { toast } from 'sonner';

const PracticeRounds = () => {
  const navigate = useNavigate();
  const [rounds, setRounds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRounds();
  }, []);

  const fetchRounds = async () => {
    try {
      const response = await api.get('/practice-rounds');
      setRounds(response.data);
    } catch (error) {
      toast.error('Failed to load practice rounds');
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'aptitude': return <Brain className="w-8 h-8" />;
      case 'coding': return <Code className="w-8 h-8" />;
      case 'hr': return <Users className="w-8 h-8" />;
      default: return <Brain className="w-8 h-8" />;
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400 bg-green-500/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'Hard': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading practice rounds...</div>
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

        <h1 className="text-4xl font-bold mb-2">Practice Rounds</h1>
        <p className="text-gray-400 mb-8">Choose your practice session</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rounds.map((round) => (
            <Card key={round._id} className="p-6 hover:border-purple-400/50 transition-all">
              <div className="mb-4">
                <div className="p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg w-fit mb-4">
                  {getIcon(round.type)}
                </div>
                <h3 className="text-2xl font-bold mb-2">{round.name}</h3>
                <p className="text-gray-400 mb-4">{round.description}</p>
              </div>

              <div className="flex items-center justify-between mb-4 text-sm">
                <div className="flex items-center text-gray-400">
                  <Clock className="w-4 h-4 mr-2" />
                  {round.duration} mins
                </div>
                <span className={`px-3 py-1 rounded-full text-xs ${getDifficultyColor(round.difficulty)}`}>
                  {round.difficulty}
                </span>
              </div>

              <div className="flex gap-3">
                <Button onClick={() => navigate(`/test/${round._id}`)} className="flex-1">
                  Start
                </Button>
                <Button variant="outline" className="flex-1">
                  Customize
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {rounds.length === 0 && (
          <Card className="text-center py-12 p-6">
            <p className="text-gray-400 mb-4">No practice rounds available</p>
            <Button onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PracticeRounds;

