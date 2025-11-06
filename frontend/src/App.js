import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Toaster } from 'sonner';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import CreateInterview from './pages/CreateInterview';
import InterviewDetails from './pages/InterviewDetails';
import PracticeRounds from './pages/PracticeRounds';
import TestInterface from './pages/TestInterface';
import TestResults from './pages/TestResults';
import ResumeManagement from './pages/ResumeManagement';
import CourseCurriculum from './pages/CourseCurriculum';
import PerformanceReport from './pages/PerformanceReport';
import './App.css';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }
  
  return user ? children : <Navigate to="/" />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/interviews/new" element={<ProtectedRoute><CreateInterview /></ProtectedRoute>} />
          <Route path="/interviews/:id" element={<ProtectedRoute><InterviewDetails /></ProtectedRoute>} />
          <Route path="/practice-rounds" element={<ProtectedRoute><PracticeRounds /></ProtectedRoute>} />
          <Route path="/test/:id" element={<ProtectedRoute><TestInterface /></ProtectedRoute>} />
          <Route path="/test-results/:id" element={<ProtectedRoute><TestResults /></ProtectedRoute>} />
          <Route path="/resumes" element={<ProtectedRoute><ResumeManagement /></ProtectedRoute>} />
          <Route path="/courses" element={<ProtectedRoute><CourseCurriculum /></ProtectedRoute>} />
          <Route path="/performance" element={<ProtectedRoute><PerformanceReport /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

