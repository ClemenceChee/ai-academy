import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  ArrowRight, 
  Users, 
  BookOpen, 
  Award, 
  TrendingUp,
  Shield,
  Brain,
  Target,
  CheckCircle,
  Star,
  Clock,
  BarChart3
} from 'lucide-react';

const HomePage = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'Active Learners', value: '2,847', icon: Users, color: 'text-blue-600' },
    { label: 'Courses Available', value: '6', icon: BookOpen, color: 'text-green-600' },
    { label: 'Badges Earned', value: '1,234', icon: Award, color: 'text-purple-600' },
    { label: 'Completion Rate', value: '94%', icon: TrendingUp, color: 'text-orange-600' }
  ];

  const tracks = [
    {
      title: 'Leadership Track',
      description: 'Strategic AI leadership for executives and managers',
      courses: ['AI Strategy', 'Ethics & Governance', 'Building AI-Ready Organizations'],
      icon: Target,
      color: 'from-orange-500 to-red-500',
      textColor: 'text-orange-700',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      title: 'Product Track',
      description: 'AI product development and data-driven decisions',
      courses: ['AI Product Management', 'Data-Driven Decisions', 'AI Product Strategy'],
      icon: Brain,
      color: 'from-blue-500 to-indigo-500',
      textColor: 'text-blue-700',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      title: 'Developer Track',
      description: 'Technical AI implementation and production systems',
      courses: ['Machine Learning', 'MLOps', 'AI Integration Patterns'],
      icon: BarChart3,
      color: 'from-green-500 to-emerald-500',
      textColor: 'text-green-700',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      title: 'Compliance Track',
      description: 'Regulatory compliance and safe AI usage',
      courses: ['GDPR Compliance', 'CCPA & EU AI Act', 'Safe AI Usage Guidelines'],
      icon: Shield,
      color: 'from-purple-500 to-pink-500',
      textColor: 'text-purple-700',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    }
  ];

  const features = [
    {
      title: 'Personalized Learning Paths',
      description: 'Tailored content based on your role and experience level',
      icon: Target
    },
    {
      title: 'Progress Tracking',
      description: 'Monitor your learning journey with detailed analytics',
      icon: BarChart3
    },
    {
      title: 'Interactive Content',
      description: 'Engaging lessons with practical exercises and real-world scenarios',
      icon: Brain
    },
    {
      title: 'Certification & Badges',
      description: 'Earn recognition for your AI knowledge and skills',
      icon: Award
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-blue-500/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Build AI Literacy Across
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                {' '}B____ Teams
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Empower your teams with comprehensive AI education designed specifically for language learning technology companies. 
              From leadership strategy to technical implementation.
            </p>
            
            {user ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Continue Learning
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/courses"
                  className="inline-flex items-center px-8 py-4 border-2 border-orange-500 text-lg font-medium rounded-lg text-orange-600 bg-white hover:bg-orange-50 transition-all duration-200"
                >
                  Browse Courses
                  <BookOpen className="ml-2 h-5 w-5" />
                </Link>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/register"
                  className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/courses"
                  className="inline-flex items-center px-8 py-4 border-2 border-orange-500 text-lg font-medium rounded-lg text-orange-600 bg-white hover:bg-orange-50 transition-all duration-200"
                >
                  Explore Courses
                  <BookOpen className="ml-2 h-5 w-5" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="bg-gradient-to-r from-orange-100 to-red-100 p-3 rounded-full">
                      <Icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Learning Tracks */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Learning Track
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialized learning paths designed for different roles within B____. 
              Each track provides targeted knowledge and practical skills.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tracks.map((track, index) => {
              const Icon = track.icon;
              return (
                <div
                  key={index}
                  className={`${track.bgColor} ${track.borderColor} border-2 rounded-xl p-6 hover:shadow-lg transition-all duration-200 hover:scale-105`}
                >
                  <div className="flex items-center mb-4">
                    <div className={`bg-gradient-to-r ${track.color} p-3 rounded-lg mr-4`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className={`text-xl font-bold ${track.textColor}`}>
                      {track.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{track.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    {track.courses.map((course, courseIndex) => (
                      <div key={courseIndex} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm text-gray-700">{course}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Link
                    to="/courses"
                    className={`inline-flex items-center w-full justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r ${track.color} hover:shadow-md transition-all duration-200`}
                  >
                    Start Learning
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose B____ AI Academy?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform is designed specifically for B____ teams, with features that enhance learning and track progress.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="bg-gradient-to-r from-orange-100 to-red-100 p-4 rounded-full">
                      <Icon className="h-8 w-8 text-orange-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Demo Account Section */}
      {!user && (
        <div className="py-16 bg-gradient-to-r from-orange-500 to-red-500">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Try Our Demo Account
            </h2>
            <p className="text-xl text-orange-100 mb-8">
              Experience the full platform with our demo account. No registration required.
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-white mb-4">Demo Credentials</h3>
              <div className="space-y-2 text-orange-100">
                <div className="flex items-center justify-between">
                  <span>Email:</span>
                  <span className="font-mono bg-white/20 px-2 py-1 rounded">demo@company.com</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Password:</span>
                  <span className="font-mono bg-white/20 px-2 py-1 rounded">demo123</span>
                </div>
              </div>
            </div>
            
            <Link
              to="/login"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-lg font-medium rounded-lg text-white hover:bg-white hover:text-orange-600 transition-all duration-200"
            >
              Try Demo Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your AI Knowledge?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of B____ team members who are already building their AI expertise.
          </p>
          
          {user ? (
            <Link
              to="/courses"
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-gray-900 bg-white hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Continue Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          ) : (
            <Link
              to="/register"
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-gray-900 bg-white hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Start Learning Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

