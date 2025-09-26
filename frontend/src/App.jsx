import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import CourseCatalog from './components/CourseCatalog';
import CourseDetail from './components/CourseDetail';
import EnhancedLessonView from './components/EnhancedLessonView';
import ContentMatrix from './components/ContentMatrix';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import Badges from './components/Badges';
import AdminDashboard from './components/AdminDashboard';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/courses" element={<CourseCatalog />} />
            <Route path="/course/:id" element={<CourseDetail />} />
            <Route path="/course/:courseId/lesson/:lessonId" element={<EnhancedLessonView />} />
            <Route path="/content-matrix" element={<ContentMatrix />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/badges" element={<Badges />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/analytics" element={<AnalyticsDashboard />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

