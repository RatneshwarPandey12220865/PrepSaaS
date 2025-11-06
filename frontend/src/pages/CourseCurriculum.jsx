import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { ArrowLeft, BookOpen, ChevronDown, ChevronUp, CheckCircle, Circle, PlayCircle } from 'lucide-react';
import { toast } from 'sonner';

const CourseCurriculum = () => {
  const navigate = useNavigate();
  const [topics, setTopics] = useState({});
  const [progress, setProgress] = useState({ total: 0, completed: 0, percentage: 0 });
  const [expandedCategories, setExpandedCategories] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [topicsRes, progressRes] = await Promise.all([
        api.get('/courses/topics'),
        api.get('/courses/progress')
      ]);
      setTopics(topicsRes.data);
      setProgress(progressRes.data);
      
      // Expand all categories by default
      const categories = Object.keys(topicsRes.data);
      const expanded = {};
      categories.forEach(cat => expanded[cat] = true);
      setExpandedCategories(expanded);
    } catch (error) {
      toast.error('Failed to load course curriculum');
    } finally {
      setLoading(false);
    }
  };

  const toggleCategory = (category) => {
    setExpandedCategories({
      ...expandedCategories,
      [category]: !expandedCategories[category]
    });
  };

  const updateProgress = async (topicId, status) => {
    try {
      await api.post('/courses/progress', { topicId, status });
      fetchData(); // Refresh data
      toast.success('Progress updated');
    } catch (error) {
      toast.error('Failed to update progress');
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'in_progress':
        return <PlayCircle className="w-5 h-5 text-blue-400" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
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
        <div className="text-xl">Loading curriculum...</div>
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

        <h1 className="text-4xl font-bold mb-2">Course Curriculum</h1>
        <p className="text-gray-400 mb-8">Master interview preparation topics</p>

        {/* Overall Progress */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">Overall Progress</h2>
              <p className="text-gray-400">
                {progress.completedTopics} of {progress.totalTopics} topics completed
              </p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-purple-400 mb-2">
                {progress.progressPercentage}%
              </div>
              <p className="text-gray-400">Completed</p>
            </div>
          </div>
          <Progress value={progress.progressPercentage} max={100} className="h-3" />
        </Card>

        {/* Topics by Category */}
        <div className="space-y-4">
          {Object.entries(topics).map(([category, categoryTopics]) => (
            <Card key={category} className="p-6">
              <div
                className="flex items-center justify-between cursor-pointer mb-4"
                onClick={() => toggleCategory(category)}
              >
                <h3 className="text-2xl font-bold flex items-center gap-3">
                  <BookOpen className="w-6 h-6 text-purple-400" />
                  {category}
                  <span className="text-lg text-gray-400 font-normal">
                    ({categoryTopics.length} topics)
                  </span>
                </h3>
                {expandedCategories[category] ? (
                  <ChevronUp className="w-6 h-6" />
                ) : (
                  <ChevronDown className="w-6 h-6" />
                )}
              </div>

              {expandedCategories[category] && (
                <div className="space-y-3 mt-4">
                  {categoryTopics.map((topic) => (
                    <div
                      key={topic._id}
                      className="p-4 bg-white/5 rounded-lg border border-white/10 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        {getStatusIcon(topic.status)}
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg mb-1">{topic.name}</h4>
                          <p className="text-gray-400 text-sm">{topic.description}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs ${getDifficultyColor(topic.difficulty)}`}>
                          {topic.difficulty}
                        </span>
                      </div>

                      <div className="flex gap-2 ml-4">
                        <Button
                          onClick={() => updateProgress(topic._id, 'in_progress')}
                          variant="outline"
                          size="sm"
                          disabled={topic.status === 'in_progress'}
                        >
                          Start
                        </Button>
                        <Button
                          onClick={() => updateProgress(topic._id, 'completed')}
                          variant="outline"
                          size="sm"
                          disabled={topic.status === 'completed'}
                          className={topic.status === 'completed' ? 'bg-green-500/20 border-green-500/50' : ''}
                        >
                          Complete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseCurriculum;
