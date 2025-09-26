from flask import Blueprint, request, jsonify, render_template_string
from src.models.course import db, Course, Lesson, Module, Exercise, Resource
import json

admin_bp = Blueprint('admin', __name__)

# Admin dashboard template
ADMIN_TEMPLATE = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>B____ AI Academy - Content Management</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'b-orange': '#FF6B35',
                        'b-orange-light': '#FF8A65',
                        'b-orange-dark': '#E65100'
                    }
                }
            }
        }
    </script>
</head>
<body class="bg-gray-50">
    <div class="min-h-screen">
        <!-- Header -->
        <header class="bg-white shadow-sm border-b border-gray-200">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center py-4">
                    <div class="flex items-center">
                        <div class="w-8 h-8 bg-b-orange rounded-full flex items-center justify-center mr-3">
                            <span class="text-white font-bold text-sm">B</span>
                        </div>
                        <h1 class="text-xl font-semibold text-gray-900">B____ AI Academy - Content Management</h1>
                    </div>
                    <div class="flex space-x-4">
                        <button onclick="exportContent()" class="bg-b-orange text-white px-4 py-2 rounded-md hover:bg-b-orange-dark">
                            Export Content
                        </button>
                        <button onclick="importContent()" class="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700">
                            Import Content
                        </button>
                    </div>
                </div>
            </div>
        </header>

        <!-- Main Content -->
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <!-- Course Management -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
                <div class="px-6 py-4 border-b border-gray-200">
                    <h2 class="text-lg font-semibold text-gray-900">Course Management</h2>
                </div>
                <div class="p-6">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-md font-medium text-gray-700">Courses</h3>
                        <button onclick="createCourse()" class="bg-b-orange text-white px-4 py-2 rounded-md hover:bg-b-orange-dark">
                            Add Course
                        </button>
                    </div>
                    <div id="courses-list" class="space-y-4">
                        <!-- Courses will be loaded here -->
                    </div>
                </div>
            </div>

            <!-- Content Editor -->
            <div id="content-editor" class="bg-white rounded-lg shadow-sm border border-gray-200 hidden">
                <div class="px-6 py-4 border-b border-gray-200">
                    <h2 class="text-lg font-semibold text-gray-900">Content Editor</h2>
                </div>
                <div class="p-6">
                    <div id="editor-content">
                        <!-- Editor content will be loaded here -->
                    </div>
                </div>
            </div>
        </main>
    </div>

    <script>
        // Global variables
        let courses = [];
        let currentCourse = null;
        let currentLesson = null;

        // Load courses on page load
        document.addEventListener('DOMContentLoaded', function() {
            loadCourses();
        });

        // API functions
        async function apiCall(url, method = 'GET', data = null) {
            const options = {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                }
            };
            
            if (data) {
                options.body = JSON.stringify(data);
            }
            
            const response = await fetch(url, options);
            return await response.json();
        }

        // Load courses
        async function loadCourses() {
            try {
                const result = await apiCall('/api/courses');
                if (result.success) {
                    courses = result.data;
                    renderCourses();
                }
            } catch (error) {
                console.error('Error loading courses:', error);
            }
        }

        // Render courses
        function renderCourses() {
            const coursesList = document.getElementById('courses-list');
            coursesList.innerHTML = '';
            
            courses.forEach(course => {
                const courseDiv = document.createElement('div');
                courseDiv.className = 'border border-gray-200 rounded-lg p-4';
                courseDiv.innerHTML = `
                    <div class="flex justify-between items-start">
                        <div>
                            <h4 class="text-lg font-medium text-gray-900">${course.title}</h4>
                            <p class="text-gray-600 mt-1">${course.description || ''}</p>
                            <div class="flex space-x-4 mt-2 text-sm text-gray-500">
                                <span>Duration: ${course.duration || 'N/A'}</span>
                                <span>Level: ${course.level || 'N/A'}</span>
                                <span>Track: ${course.track || 'N/A'}</span>
                            </div>
                        </div>
                        <div class="flex space-x-2">
                            <button onclick="editCourse(${course.id})" class="text-b-orange hover:text-b-orange-dark">
                                Edit
                            </button>
                            <button onclick="manageLessons(${course.id})" class="text-blue-600 hover:text-blue-800">
                                Lessons
                            </button>
                        </div>
                    </div>
                    <div id="lessons-${course.id}" class="mt-4 hidden">
                        <!-- Lessons will be loaded here -->
                    </div>
                `;
                coursesList.appendChild(courseDiv);
            });
        }

        // Create course
        function createCourse() {
            const title = prompt('Course Title:');
            if (!title) return;
            
            const description = prompt('Course Description:');
            const duration = prompt('Duration (e.g., "6 hours"):');
            const level = prompt('Level (e.g., "Beginner", "Intermediate", "Advanced"):');
            const track = prompt('Track (e.g., "Leadership", "Technical", "Compliance"):');
            const instructor = prompt('Instructor:', 'tbd / Clemence');
            
            const courseData = {
                title: title,
                description: description,
                duration: duration,
                level: level,
                track: track,
                instructor: instructor,
                tags: []
            };
            
            apiCall('/api/courses', 'POST', courseData)
                .then(result => {
                    if (result.success) {
                        loadCourses();
                    } else {
                        alert('Error creating course: ' + result.error);
                    }
                });
        }

        // Edit course
        function editCourse(courseId) {
            const course = courses.find(c => c.id === courseId);
            if (!course) return;
            
            const title = prompt('Course Title:', course.title);
            if (!title) return;
            
            const description = prompt('Course Description:', course.description);
            const duration = prompt('Duration:', course.duration);
            const level = prompt('Level:', course.level);
            const track = prompt('Track:', course.track);
            const instructor = prompt('Instructor:', course.instructor);
            
            const courseData = {
                title: title,
                description: description,
                duration: duration,
                level: level,
                track: track,
                instructor: instructor
            };
            
            apiCall(`/api/courses/${courseId}`, 'PUT', courseData)
                .then(result => {
                    if (result.success) {
                        loadCourses();
                    } else {
                        alert('Error updating course: ' + result.error);
                    }
                });
        }

        // Manage lessons
        async function manageLessons(courseId) {
            const lessonsDiv = document.getElementById(`lessons-${courseId}`);
            
            if (lessonsDiv.classList.contains('hidden')) {
                // Load and show lessons
                try {
                    const result = await apiCall(`/api/courses/${courseId}/lessons`);
                    if (result.success) {
                        renderLessons(courseId, result.data);
                        lessonsDiv.classList.remove('hidden');
                    }
                } catch (error) {
                    console.error('Error loading lessons:', error);
                }
            } else {
                // Hide lessons
                lessonsDiv.classList.add('hidden');
            }
        }

        // Render lessons
        function renderLessons(courseId, lessons) {
            const lessonsDiv = document.getElementById(`lessons-${courseId}`);
            lessonsDiv.innerHTML = `
                <div class="border-t border-gray-200 pt-4">
                    <div class="flex justify-between items-center mb-3">
                        <h5 class="font-medium text-gray-700">Lessons</h5>
                        <button onclick="createLesson(${courseId})" class="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                            Add Lesson
                        </button>
                    </div>
                    <div class="space-y-2">
                        ${lessons.map(lesson => `
                            <div class="bg-gray-50 p-3 rounded border">
                                <div class="flex justify-between items-start">
                                    <div>
                                        <h6 class="font-medium text-gray-800">${lesson.title}</h6>
                                        <p class="text-sm text-gray-600">${lesson.description || ''}</p>
                                        <span class="text-xs text-gray-500">Duration: ${lesson.duration || 'N/A'}</span>
                                    </div>
                                    <div class="flex space-x-2 text-sm">
                                        <button onclick="editLesson(${lesson.id})" class="text-blue-600 hover:text-blue-800">
                                            Edit
                                        </button>
                                        <button onclick="manageContent(${courseId}, ${lesson.id})" class="text-green-600 hover:text-green-800">
                                            Content
                                        </button>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        // Create lesson
        function createLesson(courseId) {
            const title = prompt('Lesson Title:');
            if (!title) return;
            
            const description = prompt('Lesson Description:');
            const duration = prompt('Duration (e.g., "3 hours"):');
            
            const lessonData = {
                title: title,
                description: description,
                duration: duration,
                order_index: 1
            };
            
            apiCall(`/api/courses/${courseId}/lessons`, 'POST', lessonData)
                .then(result => {
                    if (result.success) {
                        manageLessons(courseId); // Refresh lessons
                    } else {
                        alert('Error creating lesson: ' + result.error);
                    }
                });
        }

        // Edit lesson
        function editLesson(lessonId) {
            // Implementation for editing lesson
            alert('Edit lesson functionality - to be implemented');
        }

        // Manage content
        function manageContent(courseId, lessonId) {
            // Implementation for managing lesson content
            alert('Content management functionality - to be implemented');
        }

        // Export content
        async function exportContent() {
            try {
                const result = await apiCall('/api/courses');
                if (result.success) {
                    const dataStr = JSON.stringify(result.data, null, 2);
                    const dataBlob = new Blob([dataStr], {type: 'application/json'});
                    const url = URL.createObjectURL(dataBlob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = 'b____-ai-academy-content.json';
                    link.click();
                }
            } catch (error) {
                console.error('Error exporting content:', error);
            }
        }

        // Import content
        function importContent() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json';
            input.onchange = function(event) {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        try {
                            const content = JSON.parse(e.target.result);
                            apiCall('/api/content/import', 'POST', {courses: content})
                                .then(result => {
                                    if (result.success) {
                                        alert('Content imported successfully!');
                                        loadCourses();
                                    } else {
                                        alert('Error importing content: ' + result.error);
                                    }
                                });
                        } catch (error) {
                            alert('Error parsing JSON file: ' + error.message);
                        }
                    };
                    reader.readAsText(file);
                }
            };
            input.click();
        }
    </script>
</body>
</html>
"""

@admin_bp.route('/admin')
def admin_dashboard():
    """Admin dashboard for content management"""
    return render_template_string(ADMIN_TEMPLATE)

@admin_bp.route('/admin/courses')
def admin_courses():
    """Get all courses for admin"""
    try:
        courses = Course.query.all()
        return jsonify({
            'success': True,
            'data': [course.to_dict() for course in courses]
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@admin_bp.route('/admin/courses/<int:course_id>/toggle', methods=['POST'])
def toggle_course_status(course_id):
    """Toggle course active status"""
    try:
        course = Course.query.get_or_404(course_id)
        course.is_active = not course.is_active
        db.session.commit()
        
        return jsonify({
            'success': True,
            'data': course.to_dict()
        })
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@admin_bp.route('/admin/lessons/<int:lesson_id>/toggle', methods=['POST'])
def toggle_lesson_status(lesson_id):
    """Toggle lesson active status"""
    try:
        lesson = Lesson.query.get_or_404(lesson_id)
        lesson.is_active = not lesson.is_active
        db.session.commit()
        
        return jsonify({
            'success': True,
            'data': lesson.to_dict()
        })
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@admin_bp.route('/admin/stats')
def admin_stats():
    """Get admin statistics"""
    try:
        stats = {
            'total_courses': Course.query.count(),
            'active_courses': Course.query.filter_by(is_active=True).count(),
            'total_lessons': Lesson.query.count(),
            'active_lessons': Lesson.query.filter_by(is_active=True).count(),
            'total_modules': Module.query.count(),
            'total_exercises': Exercise.query.count(),
            'total_resources': Resource.query.count()
        }
        
        return jsonify({
            'success': True,
            'data': stats
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500
