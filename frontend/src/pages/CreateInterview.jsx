import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ArrowLeft, Calendar, Building, DollarSign, User, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

const CreateInterview = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    package: '',
    date: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.company || !formData.role || !formData.package || !formData.date) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/interviews', formData);
      toast.success('Interview scheduled successfully!');
      navigate(`/interviews/${response.data._id}`);
    } catch (error) {
      toast.error('Failed to schedule interview');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 p-6">
      <div className="max-w-2xl mx-auto">
        <Button 
          onClick={() => navigate('/dashboard')} 
          variant="ghost" 
          className="mb-8 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </Button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Schedule New Interview
          </h1>
          <p className="text-gray-400">Plan your next career opportunity</p>
        </div>

        <Card className="p-8 bg-white/5 backdrop-blur-lg border border-white/10 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Building className="w-4 h-4 text-blue-400" />
                </div>
                Company Name
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="e.g., Google, Microsoft, Amazon"
                className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-200 text-white placeholder-gray-400"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <User className="w-4 h-4 text-green-400" />
                </div>
                Job Role
              </label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="e.g., Software Engineer, Product Manager"
                className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-200 text-white placeholder-gray-400"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                <div className="p-2 bg-yellow-500/20 rounded-lg">
                  <DollarSign className="w-4 h-4 text-yellow-400" />
                </div>
                Package/Salary
              </label>
              <input
                type="text"
                name="package"
                value={formData.package}
                onChange={handleChange}
                placeholder="e.g., $120,000, ₹15 LPA"
                className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-200 text-white placeholder-gray-400"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Calendar className="w-4 h-4 text-purple-400" />
                </div>
                Interview Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-200 text-white"
                required
              />
            </div>

            <div className="flex gap-4 pt-6">
              <Button
                type="button"
                onClick={() => navigate('/dashboard')}
                variant="outline"
                className="flex-1 py-3 border-white/20 text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-200"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Scheduling...
                  </div>
                ) : (
                  'Schedule Interview'
                )}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default CreateInterview;