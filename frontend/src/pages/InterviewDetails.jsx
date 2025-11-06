import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ArrowLeft, Calendar, Building, DollarSign, CheckCircle, XCircle, Clock, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

const InterviewDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [aiTips, setAiTips] = useState([]);
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    package: '',
    date: '',
    status: 'scheduled'
  });

  useEffect(() => {
    fetchInterview();
  }, [id]);

  const fetchInterview = async () => {
    try {
      const response = await api.get(`/interviews/${id}`);
      setInterview(response.data);
      setAiTips(response.data.aiTips || []);
      setFormData({
        company: response.data.company,
        role: response.data.role,
        package: response.data.package,
        date: new Date(response.data.date).toISOString().split('T')[0],
        status: response.data.status
      });
    } catch (error) {
      toast.error('Failed to load interview');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await api.put(`/interviews/${id}`, formData);
      setInterview(response.data);
      setEditing(false);
      toast.success('Interview updated successfully');
    } catch (error) {
      toast.error('Failed to update interview');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this interview?')) {
      try {
        await api.delete(`/interviews/${id}`);
        toast.success('Interview deleted');
        navigate('/dashboard');
      } catch (error) {
        toast.error('Failed to delete interview');
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'bg-green-500/20 text-green-400';
      case 'completed': return 'bg-blue-500/20 text-blue-400';
      case 'cancelled': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <Button onClick={() => navigate('/dashboard')} variant="ghost" className="mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </Button>

        <Card className="p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Interview Details</h1>
            <div className="flex gap-3">
              {!editing ? (
                <>
                  <Button onClick={() => setEditing(true)} variant="outline">
                    Edit
                  </Button>
                  <Button onClick={handleDelete} variant="outline" className="text-red-400 border-red-400/50">
                    Delete
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={() => { setEditing(false); fetchInterview(); }} variant="outline">
                    Cancel
                  </Button>
                  <Button onClick={handleUpdate}>
                    Save Changes
                  </Button>
                </>
              )}
            </div>
          </div>

          {!editing ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <Building className="w-6 h-6 text-purple-400 mt-1" />
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Company</p>
                    <p className="text-xl font-semibold">{interview.company}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-purple-400 mt-1" />
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Role</p>
                    <p className="text-xl font-semibold">{interview.role}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <DollarSign className="w-6 h-6 text-purple-400 mt-1" />
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Package</p>
                    <p className="text-xl font-semibold">{interview.package}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Calendar className="w-6 h-6 text-purple-400 mt-1" />
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Date</p>
                    <p className="text-xl font-semibold">
                      {new Date(interview.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-gray-400 text-sm mb-2">Status</p>
                <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(interview.status)}`}>
                  {interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Company</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Role</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Package</label>
                <input
                  type="text"
                  value={formData.package}
                  onChange={(e) => setFormData({ ...formData, package: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-400"
                >
                  <option value="scheduled">Scheduled</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          )}
        </Card>

        {interview.status === 'scheduled' && (
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-bold">AI-Powered Preparation Tips</h2>
            </div>
            <ul className="space-y-3 text-gray-300">
              {(aiTips.length > 0 ? aiTips : [
                `Research ${interview.company} thoroughly - mission, values, recent news`,
                `Review common interview questions for ${interview.role} position`,
                'Prepare examples using STAR method (Situation, Task, Action, Result)',
                'Practice coding problems if it\'s a technical role',
                'Prepare thoughtful questions to ask the interviewer'
              ]).map((tip, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </Card>
        )}
      </div>
    </div>
  );
};

export default InterviewDetails;
