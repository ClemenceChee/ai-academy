import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  BookOpen, 
  Clock, 
  Users, 
  Star, 
  Filter,
  Search,
  CheckCircle,
  PlayCircle,
  Award,
  Target,
  Brain,
  Shield,
  BarChart3
} from 'lucide-react';
import { courses as allCourses } from '../comprehensive_course_data';

const CourseCatalog = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const tracks = [
    { id: 'all', name: 'All Tracks', icon: BookOpen, color: 'text-gray-600' },
    { id: 'leadership', name: 'Leadership', icon: Target, color: 'text-orange-600' },
    { id: 'product', name: 'Product', icon: Brain, color: 'text-blue-600' },
    { id: 'developer', name: 'Developer', icon: BarChart3, color: 'text-green-600' },
    { id: 'compliance', name: 'Compliance', icon: Shield, color: 'text-purple-600' }
  ];

  useEffect(() => {
    fetchCourses();
  }, [user]);

  const fetchCourses = async () => {
    try {
      const response = await fetch('https://77h9ikc6edzp.manus.space/api/courses');
      const coursesData = await response.json();
      
      const courseArray = coursesData.map(course => ({
        ...course,
        progress: user ? Math.floor(Math.random() * 100) : 0, // Mock progress
        completed: user ? Math.random() > 0.8 : false, // Mock completion
        rating: 4.8, // Mock rating
        tags: ['AI', 'Strategy', 'Leadership'], // Mock tags
        badge: 'AI Expert' // Mock badge
      }));
      setCourses(courseArray);
      setFilteredCourses(courseArray);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching courses:', error);
      // Fallback to local data
      const courseArray = allCourses.map(course => ({
        ...course,
        progress: user ? Math.floor(Math.random() * 100) : 0,
        completed: user ? Math.random() > 0.8 : false,
        rating: 4.8,
        tags: ['AI', 'Strategy', 'Leadership'],
        badge: 'AI Expert'
      }));
      setCourses(courseArray);
      setFilteredCourses(courseArray);
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = courses;

    // Filter by track
    if (selectedTrack !== 'all') {
      filtered = filtered.filter(course => course.track.toLowerCase() === selectedTrack.toLowerCase());
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (course.tags && course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
      );
    }

    setFilteredCourses(filtered);
  }, [courses, selectedTrack, searchTerm]);

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrackColor = (track) => {
    switch (track) {
      case 'leadership': return 'bg-orange-100 text-orange-800';
      case 'product': return 'bg-blue-100 text-blue-800';
      case 'developer': return 'bg-green-100 text-green-800';
      case 'compliance': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Course Catalog</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover comprehensive AI education courses designed specifically for B____ teams. 
              Build expertise across leadership, product, development, and compliance.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            {/* Track Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">Filter by track:</span>
            </div>
          </div>

          {/* Track Buttons */}
          <div className="flex flex-wrap gap-2">
            {tracks.map((track) => {
              const Icon = track.icon;
              return (
                <button
                  key={track.id}
                  onClick={() => setSelectedTrack(track.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
                    selectedTrack === track.id
                      ? 'bg-orange-500 text-white border-orange-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-orange-300 hover:bg-orange-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{track.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-200 overflow-hidden"
            >
              {/* Course Image */}
              <div className="relative h-48 bg-gradient-to-br from-orange-100 to-blue-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <BookOpen className="h-16 w-16 text-orange-500" />
                </div>
                
                {/* Progress Bar */}
                {user && course.progress > 0 && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2">
                    <div className="flex items-center justify-between text-white text-sm mb-1">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div
                        className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Completion Badge */}
                {user && course.completed && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white p-2 rounded-full">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                )}
              </div>

              {/* Course Content */}
              <div className="p-6">
                {/* Track and Level */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTrackColor(course.track.toLowerCase())}`}>
                    {course.track}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
                    {course.level}
                  </span>
                </div>

                {/* Title and Description */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>

                {/* Course Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-1" />
                      <span>{course.lessons.length} lessons</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span>{course.rating}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {course.tags && course.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Button */}
                <Link
                  to={`/course/${course.id}`}
                  className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition-all duration-200"
                >
                  {user && course.progress > 0 ? (
                    <>
                      <PlayCircle className="h-4 w-4 mr-2" />
                      Continue Learning
                    </>
                  ) : (
                    <>
                      <BookOpen className="h-4 w-4 mr-2" />
                      Start Learning
                    </>
                  )}
                </Link>

                {/* Badge Info */}
                {course.badge && (
                  <div className="mt-3 flex items-center justify-center text-xs text-gray-500">
                    <Award className="h-3 w-3 mr-1" />
                    <span>Earn: {course.badge}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search terms or selected track filter.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedTrack('all');
              }}
              className="text-orange-600 hover:text-orange-700 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCatalog;
