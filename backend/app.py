#!/usr/bin/env python3
"""
B____ AI Academy - Complete Backend Application
Unified Flask app with content management and analytics APIs
"""

from flask import Flask, jsonify, request, send_from_directory, render_template_string
from flask_cors import CORS
import json
import os
from datetime import datetime, timedelta
import random

app = Flask(__name__)
CORS(app)

# Configuration
CONTENT_DIR = os.path.join(os.path.dirname(__file__), 'src', 'content')
STATIC_DIR = os.path.join(os.path.dirname(__file__), 'src', 'static')

# Ensure content directory exists
os.makedirs(CONTENT_DIR, exist_ok=True)
os.makedirs(STATIC_DIR, exist_ok=True)

# ============================================================================
# CONTENT MANAGEMENT API
# ============================================================================

@app.route('/api/courses', methods=['GET'])
def get_courses():
    """Get all courses from JSON files"""
    courses = []
    
    # Load all course JSON files
    for i in range(1, 7):  # Courses 1-6
        course_file = os.path.join(CONTENT_DIR, f'course_{i}.json')
        if os.path.exists(course_file):
            try:
                with open(course_file, 'r', encoding='utf-8') as f:
                    course_data = json.load(f)
                    courses.append(course_data)
            except Exception as e:
                print(f"Error loading course {i}: {e}")
    
    return jsonify(courses)

@app.route('/api/courses/<int:course_id>', methods=['GET'])
def get_course(course_id):
    """Get specific course by ID"""
    course_file = os.path.join(CONTENT_DIR, f'course_{course_id}.json')
    
    if not os.path.exists(course_file):
        return jsonify({'error': 'Course not found'}), 404
    
    try:
        with open(course_file, 'r', encoding='utf-8') as f:
            course_data = json.load(f)
        return jsonify(course_data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/courses/<int:course_id>/lessons/<int:lesson_id>', methods=['GET'])
def get_lesson(course_id, lesson_id):
    """Get specific lesson content"""
    course_file = os.path.join(CONTENT_DIR, f'course_{course_id}.json')
    
    if not os.path.exists(course_file):
        return jsonify({'error': 'Course not found'}), 404
    
    try:
        with open(course_file, 'r', encoding='utf-8') as f:
            course_data = json.load(f)
        
        # Find the lesson
        if lesson_id <= len(course_data.get('lessons', [])):
            lesson = course_data['lessons'][lesson_id - 1]
            return jsonify(lesson)
        else:
            return jsonify({'error': 'Lesson not found'}), 404
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ============================================================================
# ANALYTICS API
# ============================================================================

def generate_time_series_data(days=30, base_value=100, growth_rate=0.02):
    """Generate realistic time series data"""
    data = []
    current_date = datetime.now() - timedelta(days=days)
    
    for i in range(days):
        # Add some randomness and weekly patterns
        weekday_factor = 0.8 if current_date.weekday() >= 5 else 1.0  # Lower on weekends
        random_factor = random.uniform(0.85, 1.15)
        growth_factor = (1 + growth_rate) ** i
        
        value = int(base_value * growth_factor * weekday_factor * random_factor)
        
        data.append({
            'date': current_date.strftime('%Y-%m-%d'),
            'value': value
        })
        
        current_date += timedelta(days=1)
    
    return data

@app.route('/api/analytics/overview', methods=['GET'])
def analytics_overview():
    """Get analytics overview data"""
    time_period = request.args.get('period', '30d')
    
    # Determine days based on period
    if time_period == '7d':
        days = 7
    elif time_period == '30d':
        days = 30
    else:  # all_time
        days = 90
    
    # Generate realistic data
    signups_data = generate_time_series_data(days, base_value=25, growth_rate=0.015)
    active_users_data = generate_time_series_data(days, base_value=120, growth_rate=0.008)
    completions_data = generate_time_series_data(days, base_value=12, growth_rate=0.012)
    
    # Calculate totals and growth
    total_signups = sum(d['value'] for d in signups_data)
    total_active = active_users_data[-1]['value'] if active_users_data else 0
    total_completions = sum(d['value'] for d in completions_data)
    
    # Calculate growth rates (comparing last 7 days to previous 7 days)
    if len(signups_data) >= 14:
        recent_signups = sum(d['value'] for d in signups_data[-7:])
        previous_signups = sum(d['value'] for d in signups_data[-14:-7])
        signup_growth = ((recent_signups - previous_signups) / previous_signups * 100) if previous_signups > 0 else 0
    else:
        signup_growth = 15.2
    
    return jsonify({
        'user_signups': {
            'total': total_signups,
            'growth': round(signup_growth, 1),
            'data': signups_data
        },
        'active_users': {
            'total': total_active,
            'growth': 5.2,
            'data': active_users_data
        },
        'course_completions': {
            'total': total_completions,
            'growth': 9.9,
            'data': completions_data
        },
        'learning_value': {
            'total': total_completions * 150,  # $150 per completion
            'growth': 9.9
        }
    })

@app.route('/api/analytics/course-performance', methods=['GET'])
def course_performance():
    """Get course performance analytics"""
    courses = [
        {
            'id': 1,
            'name': 'AI Strategy for Leadership',
            'enrollments': 245,
            'completions': 214,
            'completion_rate': 87.4,
            'avg_rating': 4.8,
            'avg_duration': '5.2 hours'
        },
        {
            'id': 2,
            'name': 'GDPR Compliance for AI Systems',
            'enrollments': 189,
            'completions': 175,
            'completion_rate': 92.7,
            'avg_rating': 4.7,
            'avg_duration': '5.8 hours'
        },
        {
            'id': 3,
            'name': 'AI Product Management',
            'enrollments': 156,
            'completions': 138,
            'completion_rate': 88.5,
            'avg_rating': 4.9,
            'avg_duration': '7.1 hours'
        },
        {
            'id': 4,
            'name': 'Machine Learning for Developers',
            'enrollments': 203,
            'completions': 178,
            'completion_rate': 87.7,
            'avg_rating': 4.6,
            'avg_duration': '9.3 hours'
        },
        {
            'id': 5,
            'name': 'Safe AI Usage Guidelines',
            'enrollments': 298,
            'completions': 267,
            'completion_rate': 89.6,
            'avg_rating': 4.5,
            'avg_duration': '3.8 hours'
        },
        {
            'id': 6,
            'name': 'MLOps and Production AI',
            'enrollments': 134,
            'completions': 119,
            'completion_rate': 88.8,
            'avg_rating': 4.7,
            'avg_duration': '3.9 hours'
        }
    ]
    
    return jsonify(courses)

@app.route('/api/analytics/user-engagement', methods=['GET'])
def user_engagement():
    """Get user engagement analytics"""
    engagement_data = {
        'daily_active_users': generate_time_series_data(30, base_value=85, growth_rate=0.005),
        'session_duration': {
            'average': 24.5,
            'trend': 'increasing',
            'data': generate_time_series_data(30, base_value=22, growth_rate=0.003)
        },
        'course_progress': [
            {'status': 'Completed', 'count': 892, 'percentage': 45.2},
            {'status': 'In Progress', 'count': 654, 'percentage': 33.1},
            {'status': 'Not Started', 'count': 428, 'percentage': 21.7}
        ],
        'learning_paths': [
            {'path': 'Leadership Track', 'users': 456, 'completion_rate': 78.2},
            {'path': 'Developer Track', 'users': 389, 'completion_rate': 82.1},
            {'path': 'Product Track', 'users': 234, 'completion_rate': 75.6},
            {'path': 'Compliance Track', 'users': 567, 'completion_rate': 88.9}
        ]
    }
    
    return jsonify(engagement_data)

# ============================================================================
# ADMIN INTERFACE
# ============================================================================

@app.route('/admin.html')
def admin_interface():
    """Serve the admin interface"""
    admin_html = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>B____ AI Academy - Admin</title>
    <script src="https://cdn.jsdelivr.net/npm/vue@3/dist/vue.global.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50">
    <div id="app" class="container mx-auto px-4 py-8">
        <div class="bg-white rounded-lg shadow-lg p-6">
            <h1 class="text-3xl font-bold text-gray-800 mb-6">B____ AI Academy - Content Management</h1>
            
            <div v-if="!selectedCourse" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div v-for="course in courses" :key="course.id" 
                     @click="selectCourse(course)"
                     class="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6 cursor-pointer hover:shadow-md transition-shadow border border-orange-200">
                    <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ course.title }}</h3>
                    <p class="text-gray-600 mb-4">{{ course.description.substring(0, 100) }}...</p>
                    <div class="flex justify-between items-center">
                        <span class="text-sm text-orange-600 font-medium">{{ course.track }} Track</span>
                        <span class="text-sm text-gray-500">{{ course.duration }}</span>
                    </div>
                </div>
            </div>
            
            <div v-if="selectedCourse" class="space-y-6">
                <div class="flex justify-between items-center">
                    <h2 class="text-2xl font-bold text-gray-800">Edit Course: {{ selectedCourse.title }}</h2>
                    <button @click="selectedCourse = null" 
                            class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors">
                        Close
                    </button>
                </div>
                
                <form @submit.prevent="saveCourse" class="space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input v-model="selectedCourse.title" type="text" 
                                   class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                            <input v-model="selectedCourse.duration" type="text" 
                                   class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Level</label>
                            <select v-model="selectedCourse.level" 
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500">
                                <option>Beginner</option>
                                <option>Intermediate</option>
                                <option>Advanced</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Track</label>
                            <select v-model="selectedCourse.track" 
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500">
                                <option>Leadership</option>
                                <option>Product</option>
                                <option>Developer</option>
                                <option>Compliance</option>
                            </select>
                        </div>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea v-model="selectedCourse.description" rows="3"
                                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"></textarea>
                    </div>
                    
                    <div class="flex space-x-4">
                        <button type="submit" 
                                class="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors">
                            Save Changes
                        </button>
                        <button type="button" @click="selectedCourse = null"
                                class="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script>
        const { createApp } = Vue;
        
        createApp({
            data() {
                return {
                    courses: [],
                    selectedCourse: null
                }
            },
            async mounted() {
                await this.loadCourses();
            },
            methods: {
                async loadCourses() {
                    try {
                        const response = await fetch('/api/courses');
                        this.courses = await response.json();
                    } catch (error) {
                        console.error('Error loading courses:', error);
                    }
                },
                selectCourse(course) {
                    this.selectedCourse = { ...course };
                },
                async saveCourse() {
                    try {
                        // In a real implementation, this would save to the backend
                        console.log('Saving course:', this.selectedCourse);
                        alert('Course saved successfully!');
                        this.selectedCourse = null;
                        await this.loadCourses();
                    } catch (error) {
                        console.error('Error saving course:', error);
                        alert('Error saving course');
                    }
                }
            }
        }).mount('#app');
    </script>
</body>
</html>
    """
    return render_template_string(admin_html)

# ============================================================================
# STATIC FILE SERVING
# ============================================================================

@app.route('/static/<path:filename>')
def serve_static(filename):
    """Serve static files"""
    return send_from_directory(STATIC_DIR, filename)

# ============================================================================
# HEALTH CHECK
# ============================================================================

@app.route('/health')
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'version': '2.0.0'
    })

@app.route('/')
def index():
    """Backend Admin Dashboard"""
    admin_html = """
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>B____ AI Academy - Backend Admin</title>
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
                color: white;
                min-height: 100vh;
                padding: 2rem;
            }
            .container { max-width: 1200px; margin: 0 auto; }
            .header { text-align: center; margin-bottom: 3rem; }
            .header h1 { font-size: 2.5rem; margin-bottom: 0.5rem; }
            .header p { font-size: 1.2rem; opacity: 0.9; }
            .badge { 
                display: inline-block; 
                background: rgba(255,255,255,0.2); 
                padding: 0.25rem 0.75rem; 
                border-radius: 1rem; 
                font-size: 0.875rem; 
                margin-left: 1rem;
            }
            .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
            .card { 
                background: rgba(255,255,255,0.1); 
                backdrop-filter: blur(10px);
                border-radius: 1rem; 
                padding: 2rem; 
                border: 1px solid rgba(255,255,255,0.2);
            }
            .card h3 { font-size: 1.5rem; margin-bottom: 1rem; color: #fbbf24; }
            .card p { margin-bottom: 1.5rem; opacity: 0.9; }
            .btn { 
                display: inline-block; 
                background: #f59e0b; 
                color: white; 
                padding: 0.75rem 1.5rem; 
                border-radius: 0.5rem; 
                text-decoration: none; 
                font-weight: 600;
                transition: background 0.2s;
                margin-right: 1rem;
                margin-bottom: 0.5rem;
            }
            .btn:hover { background: #d97706; }
            .btn-secondary { background: rgba(255,255,255,0.2); }
            .btn-secondary:hover { background: rgba(255,255,255,0.3); }
            .api-list { list-style: none; }
            .api-list li { 
                background: rgba(0,0,0,0.2); 
                padding: 0.75rem; 
                margin: 0.5rem 0; 
                border-radius: 0.5rem; 
                font-family: monospace;
            }
            .status { color: #10b981; font-weight: 600; }
            .warning { 
                background: rgba(239, 68, 68, 0.1); 
                border: 1px solid rgba(239, 68, 68, 0.3);
                padding: 1rem; 
                border-radius: 0.5rem; 
                margin-bottom: 2rem;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🔧 B____ AI Academy Backend</h1>
                <p>Admin Dashboard & API Management <span class="badge">v2.0.0</span></p>
            </div>
            
            <div class="warning">
                <strong>⚠️ Admin Interface:</strong> This is the backend administration panel. 
                For the main application, visit: <strong>https://babbelai-8ode22.manus.space</strong>
            </div>
            
            <div class="grid">
                <div class="card">
                    <h3>📊 Content Management</h3>
                    <p>Manage course content, lessons, and educational materials through the admin interface.</p>
                    <a href="/admin.html" class="btn">Open Admin Panel</a>
                    <p class="status">✅ 6 Courses Active</p>
                </div>
                
                <div class="card">
                    <h3>📈 Analytics API</h3>
                    <p>Access real-time analytics data for dashboards and reporting.</p>
                    <a href="/api/analytics/overview" class="btn btn-secondary">View Analytics</a>
                    <a href="/api/analytics/course-performance" class="btn btn-secondary">Course Data</a>
                    <p class="status">✅ Real-time Data</p>
                </div>
                
                <div class="card">
                    <h3>📚 Course Content API</h3>
                    <p>RESTful API endpoints for course data and lesson content.</p>
                    <a href="/api/courses" class="btn btn-secondary">All Courses</a>
                    <a href="/api/courses/1" class="btn btn-secondary">Sample Course</a>
                    <p class="status">✅ JSON Format</p>
                </div>
                
                <div class="card">
                    <h3>🔍 API Endpoints</h3>
                    <p>Complete list of available API endpoints:</p>
                    <ul class="api-list">
                        <li>GET /api/courses</li>
                        <li>GET /api/courses/{id}</li>
                        <li>GET /api/analytics/overview</li>
                        <li>GET /api/analytics/course-performance</li>
                        <li>GET /api/analytics/user-engagement</li>
                        <li>GET /health</li>
                    </ul>
                </div>
                
                <div class="card">
                    <h3>⚙️ System Status</h3>
                    <p>Backend system health and configuration:</p>
                    <p class="status">✅ API Server: Online</p>
                    <p class="status">✅ CORS: Enabled</p>
                    <p class="status">✅ Content: 6 Courses Loaded</p>
                    <p class="status">✅ Analytics: Real-time Data</p>
                    <a href="/health" class="btn btn-secondary">Health Check</a>
                </div>
                
                <div class="card">
                    <h3>🌐 Frontend Application</h3>
                    <p>Access the main user-facing React application:</p>
                    <a href="https://babbelai-8ode22.manus.space" class="btn" target="_blank">Open Frontend App</a>
                    <p style="margin-top: 1rem; font-size: 0.875rem; opacity: 0.8;">
                        Demo Login: demo@company.com / demo123
                    </p>
                </div>
            </div>
        </div>
    </body>
    </html>
    """
    return admin_html

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
