import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronDown, ChevronRight, Download, ExternalLink, BookOpen, Target, CheckCircle } from 'lucide-react';

const DynamicLessonView = () => {
  const { courseId, lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedModules, setExpandedModules] = useState({});

  useEffect(() => {
    const fetchLessonData = async () => {
      try {
        setLoading(true);
        
        // Fetch course data
        const courseResponse = await fetch(`/api/courses/${courseId}`);
        const courseResult = await courseResponse.json();
        
        if (!courseResult.success) {
          throw new Error(courseResult.error || 'Failed to fetch course');
        }
        
        setCourse(courseResult.data);
        
        // Fetch lesson data
        const lessonResponse = await fetch(`/api/courses/${courseId}/lessons/${lessonId}`);
        const lessonResult = await lessonResponse.json();
        
        if (!lessonResult.success) {
          throw new Error(lessonResult.error || 'Failed to fetch lesson');
        }
        
        setLesson(lessonResult.data);
        
        // Expand first module by default
        if (lessonResult.data.modules && lessonResult.data.modules.length > 0) {
          setExpandedModules({ [lessonResult.data.modules[0].id]: true });
        }
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (courseId && lessonId) {
      fetchLessonData();
    }
  }, [courseId, lessonId]);

  const toggleModule = (moduleId) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading lesson content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
            <h2 className="text-lg font-semibold text-red-900 mb-2">Content Not Found</h2>
            <p className="text-red-700 mb-4">{error}</p>
            <Link 
              to="/courses" 
              className="inline-flex items-center text-orange-600 hover:text-orange-800"
            >
              ← Back to Courses
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!lesson || !course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Content Not Found</h2>
          <p className="text-gray-600 mb-4">The requested lesson content is not available.</p>
          <Link 
            to="/courses" 
            className="inline-flex items-center text-orange-600 hover:text-orange-800"
          >
            ← Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            to={`/course/${courseId}`}
            className="inline-flex items-center text-orange-600 hover:text-orange-800 mb-2"
          >
            ← Back to {course.title}
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">{lesson.title}</h1>
          <p className="text-gray-600 mt-1">Duration: {lesson.duration}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {/* Lesson Description */}
          {lesson.description && (
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed">{lesson.description}</p>
            </div>
          )}

          {/* Learning Modules */}
          {lesson.modules && lesson.modules.length > 0 && (
            <div className="space-y-4 mb-8">
              {lesson.modules.map((module) => (
                <div key={module.id} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => toggleModule(module.id)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-inset"
                  >
                    <span className="font-medium text-gray-900">{module.title}</span>
                    {expandedModules[module.id] ? (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  
                  {expandedModules[module.id] && (
                    <div className="px-6 pb-6 border-t border-gray-200">
                      <div 
                        className="prose prose-orange max-w-none mt-4"
                        dangerouslySetInnerHTML={{ __html: module.content }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Practical Exercises */}
          {lesson.exercises && lesson.exercises.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Target className="h-5 w-5 text-orange-500 mr-2" />
                Practical Exercises
              </h3>
              <div className="bg-orange-50 rounded-lg p-6">
                <div className="space-y-4">
                  {lesson.exercises.map((exercise) => (
                    <div key={exercise.id} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{exercise.title}</h4>
                        <p className="text-gray-600 text-sm mt-1">{exercise.description}</p>
                        {exercise.download_url && (
                          <a
                            href={exercise.download_url}
                            className="inline-flex items-center text-orange-600 hover:text-orange-800 text-sm mt-2"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* External Resources */}
          {lesson.resources && lesson.resources.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <BookOpen className="h-5 w-5 text-orange-500 mr-2" />
                External Resources
              </h3>
              <div className="bg-blue-50 rounded-lg p-6">
                <div className="space-y-4">
                  {lesson.resources.map((resource) => (
                    <div key={resource.id} className="flex items-start space-x-3">
                      <ExternalLink className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-blue-900 hover:text-blue-700"
                        >
                          {resource.title}
                        </a>
                        <p className="text-blue-700 text-sm mt-1">{resource.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center pt-8 border-t border-gray-200">
            <Link
              to={`/course/${courseId}`}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              ← Back to Course
            </Link>
            
            <div className="text-sm text-gray-500">
              Lesson {lessonId} of {course.lessons ? course.lessons.length : 1}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicLessonView;
