import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  BookOpen, 
  Clock, 
  Users, 
  Star, 
  PlayCircle,
  CheckCircle,
  Award,
  ArrowLeft,
  Target,
  Brain,
  Shield,
  BarChart3
} from 'lucide-react';
import { courses } from '../comprehensive_course_data';

const CourseDetail = () => {
  const { id } = useParams();
  const { user, updateProgress } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundCourse = courses.find(course => course.id === parseInt(id));
      setCourse(foundCourse || null);
      setLoading(false);
    }, 1000);
  }, [id]);

  const getTrackIcon = (track) => {
    switch (track) {
      case 'leadership': return Target;
      case 'product': return Brain;
      case 'developer': return BarChart3;
      case 'compliance': return Shield;
      default: return BookOpen;
    }
  };

  const getTrackColor = (track) => {
    switch (track) {
      case 'leadership': return 'from-orange-500 to-red-500';
      case 'product': return 'from-blue-500 to-indigo-500';
      case 'developer': return 'from-green-500 to-emerald-500';
      case 'compliance': return 'from-purple-500 to-pink-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading course...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Course Not Found</h2>
          <p className="text-gray-600 mb-4">The course you\'re looking for doesn\'t exist.</p>
          <Link
            to="/courses"
            className="text-orange-600 hover:text-orange-700 font-medium"
          >
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  const TrackIcon = getTrackIcon(course.track);
  const completedLessons = course.lessons.filter(lesson => lesson.completed).length;
  const progressPercentage = (completedLessons / course.lessons.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            to="/courses"
            className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </Link>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
              <div className="flex items-center mb-4">
                <div className={`bg-gradient-to-r ${getTrackColor(course.track)} p-3 rounded-lg mr-4`}>
                  <TrackIcon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
                  <p className="text-gray-600 capitalize">{course.track} Track • {course.level}</p>
                </div>
              </div>
              
              <p className="text-lg text-gray-700 mb-4 max-w-3xl">{course.description}</p>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-1" />
                  <span>{course.lessons.length} lessons</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{course.enrolled.toLocaleString()} enrolled</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span>{course.rating}</span>
                </div>
              </div>
            </div>
            
            {/* Progress Card */}
            {user && (
              <div className="mt-6 lg:mt-0 lg:ml-8">
                <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-6 min-w-[300px]">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Progress</h3>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Completed</span>
                      <span>{completedLessons}/{course.lessons.length} lessons</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                    <div className="text-right text-sm text-gray-600 mt-1">
                      {Math.round(progressPercentage)}% complete
                    </div>
                  </div>
                  
                  {course.badge && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Award className="h-4 w-4 mr-2 text-yellow-500" />
                      <span>Earn: {course.badge}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Lessons List */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Lessons</h2>
            
            <div className="space-y-4">
              {course.lessons.map((lesson, index) => (
                <div
                  key={lesson.id}
                  className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center flex-1">
                        <div className="flex-shrink-0 mr-4">
                          {lesson.completed ? (
                            <div className="bg-green-100 p-2 rounded-full">
                              <CheckCircle className="h-6 w-6 text-green-600" />
                            </div>
                          ) : (
                            <div className="bg-gray-100 p-2 rounded-full">
                              <PlayCircle className="h-6 w-6 text-gray-400" />
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {index + 1}. {lesson.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-2 line-clamp-2">{lesson.content.substring(0, 150)}...</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{lesson.duration}</span>
                          </div>
                        </div>
                      </div>
                      
                      <Link
                        to={`/course/${course.id}/lesson/${lesson.id}`}
                        className="ml-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 text-sm font-medium"
                      >
                        {lesson.completed ? 'Review' : 'Start'}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Info */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Information</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Instructor:</span>
                  <span className="font-medium">{course.instructor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Level:</span>
                  <span className="font-medium">{course.level}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{course.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lessons:</span>
                  <span className="font-medium">{course.lessons.length}</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {course.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
