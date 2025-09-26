from flask import Blueprint, jsonify, request
import json
import os

content_api = Blueprint('content_api', __name__)

CONTENT_DIR = os.path.join(os.path.dirname(__file__), '..', 'content')

@content_api.route('/api/courses', methods=['GET'])
def get_courses():
    """Get all courses"""
    try:
        courses = []
        for filename in os.listdir(CONTENT_DIR):
            if filename.startswith('course_') and filename.endswith('.json'):
                with open(os.path.join(CONTENT_DIR, filename), 'r') as f:
                    course = json.load(f)
                    # Return summary info for course list
                    courses.append({
                        'id': course['id'],
                        'title': course['title'],
                        'description': course['description'],
                        'duration': course['duration'],
                        'level': course['level'],
                        'track': course['track'],
                        'instructor': course['instructor'],
                        'image_url': course['image_url'],
                        'tags': course['tags']
                    })
        
        courses.sort(key=lambda x: x['id'])
        return jsonify({'success': True, 'data': courses})
    
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@content_api.route('/api/courses/<int:course_id>', methods=['GET'])
def get_course(course_id):
    """Get specific course details"""
    try:
        filename = f'course_{course_id}.json'
        filepath = os.path.join(CONTENT_DIR, filename)
        
        if not os.path.exists(filepath):
            return jsonify({'success': False, 'error': 'Course not found'}), 404
        
        with open(filepath, 'r') as f:
            course = json.load(f)
        
        return jsonify({'success': True, 'data': course})
    
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@content_api.route('/api/courses/<int:course_id>/lessons/<int:lesson_id>', methods=['GET'])
def get_lesson(course_id, lesson_id):
    """Get specific lesson content"""
    try:
        filename = f'course_{course_id}.json'
        filepath = os.path.join(CONTENT_DIR, filename)
        
        if not os.path.exists(filepath):
            return jsonify({'success': False, 'error': 'Course not found'}), 404
        
        with open(filepath, 'r') as f:
            course = json.load(f)
        
        # Find the lesson
        lesson = None
        for l in course.get('lessons', []):
            if l['id'] == lesson_id:
                lesson = l
                break
        
        if not lesson:
            return jsonify({'success': False, 'error': 'Lesson not found'}), 404
        
        return jsonify({'success': True, 'data': lesson})
    
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@content_api.route('/api/admin/courses/<int:course_id>', methods=['PUT'])
def update_course(course_id):
    """Update course content (admin only)"""
    try:
        filename = f'course_{course_id}.json'
        filepath = os.path.join(CONTENT_DIR, filename)
        
        if not os.path.exists(filepath):
            return jsonify({'success': False, 'error': 'Course not found'}), 404
        
        # Get updated content from request
        updated_course = request.get_json()
        
        # Save updated content
        with open(filepath, 'w') as f:
            json.dump(updated_course, f, indent=2)
        
        return jsonify({'success': True, 'message': 'Course updated successfully'})
    
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@content_api.route('/api/admin/courses/<int:course_id>/lessons/<int:lesson_id>', methods=['PUT'])
def update_lesson(course_id, lesson_id):
    """Update lesson content (admin only)"""
    try:
        filename = f'course_{course_id}.json'
        filepath = os.path.join(CONTENT_DIR, filename)
        
        if not os.path.exists(filepath):
            return jsonify({'success': False, 'error': 'Course not found'}), 404
        
        with open(filepath, 'r') as f:
            course = json.load(f)
        
        # Find and update the lesson
        updated_lesson = request.get_json()
        for i, lesson in enumerate(course.get('lessons', [])):
            if lesson['id'] == lesson_id:
                course['lessons'][i] = updated_lesson
                break
        else:
            return jsonify({'success': False, 'error': 'Lesson not found'}), 404
        
        # Save updated course
        with open(filepath, 'w') as f:
            json.dump(course, f, indent=2)
        
        return jsonify({'success': True, 'message': 'Lesson updated successfully'})
    
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
