import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronDownIcon, ChevronRightIcon, ExternalLinkIcon, DownloadIcon } from 'lucide-react';

const DynamicLessonView = () => {
    const { courseId, lessonId } = useParams();
    const [lesson, setLesson] = useState(null);
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedModules, setExpandedModules] = useState({});

    useEffect(() => {
        const loadContent = async () => {
            try {
                setLoading(true);
                
                // Load course info
                const courseResponse = await fetch(`/api/courses/${courseId}`);
                const courseResult = await courseResponse.json();
                if (courseResult.success) {
                    setCourse(courseResult.data);
                }

                // Load lesson content
                const lessonResponse = await fetch(`/api/courses/${courseId}/lessons/${lessonId}`);
                const lessonResult = await lessonResponse.json();
                if (lessonResult.success) {
                    setLesson(lessonResult.data);
                    // Expand first module by default
                    if (lessonResult.data.modules && lessonResult.data.modules.length > 0) {
                        setExpandedModules({ 0: true });
                    }
                } else {
                    setError('Lesson content not found');
                }
            } catch (err) {
                setError('Failed to load content');
                console.error('Error loading content:', err);
            } finally {
                setLoading(false);
            }
        };

        loadContent();
    }, [courseId, lessonId]);

    const toggleModule = (index) => {
        setExpandedModules(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading lesson content...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Content Not Found</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <Link to="/courses" className="text-orange-600 hover:text-orange-800">
                        ← Back to Courses
                    </Link>
                </div>
            </div>
        );
    }

    if (!lesson) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Content Not Found</h2>
                    <p className="text-gray-600 mb-6">The requested lesson content is not available.</p>
                    <Link to="/courses" className="text-orange-600 hover:text-orange-800">
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
                    <Link to={`/course/${courseId}`} className="text-orange-600 hover:text-orange-800 mb-4 inline-block">
                        ← Back to {course?.title || 'Course'}
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">{lesson.title}</h1>
                    <p className="text-gray-600 mt-2">Duration: {lesson.duration}</p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                            {/* Lesson Description */}
                            {lesson.description && (
                                <div className="mb-8">
                                    <p className="text-gray-700 leading-relaxed">{lesson.description}</p>
                                </div>
                            )}

                            {/* Interactive Modules */}
                            {lesson.modules && lesson.modules.map((module, index) => (
                                <div key={module.id} className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
                                    <button
                                        onClick={() => toggleModule(index)}
                                        className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 flex items-center justify-between text-left transition-colors"
                                    >
                                        <h3 className="text-lg font-semibold text-gray-900">{module.title}</h3>
                                        {expandedModules[index] ? (
                                            <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                                        ) : (
                                            <ChevronRightIcon className="h-5 w-5 text-gray-500" />
                                        )}
                                    </button>
                                    
                                    {expandedModules[index] && (
                                        <div className="px-6 py-4 border-t border-gray-200">
                                            <div 
                                                className="prose prose-orange max-w-none"
                                                dangerouslySetInnerHTML={{ __html: module.content }}
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        {/* Practical Exercises */}
                        {lesson.exercises && lesson.exercises.length > 0 && (
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                    <DownloadIcon className="h-5 w-5 mr-2 text-orange-500" />
                                    Practical Exercises
                                </h3>
                                <div className="space-y-4">
                                    {lesson.exercises.map((exercise) => (
                                        <div key={exercise.id} className="border border-gray-200 rounded-lg p-4">
                                            <h4 className="font-medium text-gray-900 mb-2">{exercise.title}</h4>
                                            <p className="text-sm text-gray-600 mb-3">{exercise.description}</p>
                                            {exercise.download_url && (
                                                <a
                                                    href={exercise.download_url}
                                                    className="inline-flex items-center text-sm text-orange-600 hover:text-orange-800"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <DownloadIcon className="h-4 w-4 mr-1" />
                                                    Download
                                                </a>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* External Resources */}
                        {lesson.resources && lesson.resources.length > 0 && (
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                    <ExternalLinkIcon className="h-5 w-5 mr-2 text-orange-500" />
                                    External Resources
                                </h3>
                                <div className="space-y-4">
                                    {lesson.resources.map((resource) => (
                                        <div key={resource.id} className="border border-gray-200 rounded-lg p-4">
                                            <h4 className="font-medium text-gray-900 mb-2">{resource.title}</h4>
                                            <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                                            <a
                                                href={resource.url}
                                                className="inline-flex items-center text-sm text-orange-600 hover:text-orange-800"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <ExternalLinkIcon className="h-4 w-4 mr-1" />
                                                Visit Resource
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DynamicLessonView;