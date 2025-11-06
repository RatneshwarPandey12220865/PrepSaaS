import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ArrowLeft, FileText, Sparkles, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const ResumeManagement = () => {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const response = await api.get('/resumes');
      setResumes(response.data);
    } catch (error) {
      toast.error('Failed to load resumes');
    }
  };

  const handleCreateResume = () => {
    setSelectedResume(null);
    setContent('');
  };

  const handleAnalyze = async () => {
    if (!content.trim()) {
      toast.error('Please enter resume content');
      return;
    }

    setAnalyzing(true);
    try {
      const response = await api.post('/resumes', { content });
      setSelectedResume(response.data);
      setResumes([response.data, ...resumes]);
      toast.success('Resume analyzed successfully!');
    } catch (error) {
      toast.error('Failed to analyze resume');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      try {
        await api.delete(`/resumes/${id}`);
        setResumes(resumes.filter(r => r._id !== id));
        if (selectedResume?._id === id) {
          setSelectedResume(null);
          setContent('');
        }
        toast.success('Resume deleted');
      } catch (error) {
        toast.error('Failed to delete resume');
      }
    }
  };

  const handleSelectResume = (resume) => {
    setSelectedResume(resume);
    setContent(resume.content);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <Button onClick={() => navigate('/dashboard')} variant="ghost" className="mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Resume List */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">My Resumes</h2>
                <Button onClick={handleCreateResume} variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  New
                </Button>
              </div>

              <div className="space-y-3">
                {resumes.map((resume) => (
                  <div
                    key={resume._id}
                    onClick={() => handleSelectResume(resume)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedResume?._id === resume._id
                        ? 'border-purple-400 bg-purple-500/10'
                        : 'border-white/10 hover:border-purple-400/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-purple-400" />
                        <div>
                          <p className="font-medium">Resume {new Date(resume.createdAt).toLocaleDateString()}</p>
                          <p className="text-sm text-gray-400">
                            {resume.aiSuggestions?.length || 0} suggestions
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(resume._id);
                        }}
                        variant="ghost"
                        size="sm"
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                {resumes.length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No resumes yet</p>
                    <p className="text-sm">Create your first resume</p>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Resume Editor & Analysis */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">
                {selectedResume ? 'Edit Resume' : 'Create New Resume'}
              </h2>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Resume Content
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Paste your resume content here..."
                  className="w-full h-64 px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-400 resize-none"
                />
              </div>

              <Button
                onClick={handleAnalyze}
                disabled={analyzing || !content.trim()}
                className="w-full mb-6"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {analyzing ? 'Analyzing with AI...' : 'Analyze with AI'}
              </Button>

              {selectedResume?.aiSuggestions && selectedResume.aiSuggestions.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                    AI Suggestions
                  </h3>
                  <div className="space-y-3">
                    {selectedResume.aiSuggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg"
                      >
                        <p className="text-gray-300">{suggestion}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeManagement;
