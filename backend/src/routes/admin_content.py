from flask import Blueprint, request, jsonify, render_template
import json
import os

admin_content = Blueprint('admin_content', __name__)

CONTENT_DIR = os.path.join(os.path.dirname(__file__), '..', 'content')

@admin_content.route('/admin')
def admin_dashboard():
    """Serve the admin dashboard for content management"""
    from flask import send_from_directory
    import os
    static_dir = os.path.join(os.path.dirname(__file__), '..', 'static')
    return send_from_directory(static_dir, 'admin.html')

@admin_content.route('/api/admin/courses/<int:course_id>', methods=['PUT'])
def update_course(course_id):
    """Update course content"""
    try:
        course_data = request.get_json()
        
        # Update course metadata
        courses_file = os.path.join(CONTENT_DIR, 'courses.json')
        with open(courses_file, 'r') as f:
            courses = json.load(f)
        
        # Find and update the course
        for course in courses['data']:
            if course['id'] == course_id:
                course.update({
                    'title': course_data.get('title', course['title']),
                    'description': course_data.get('description', course['description']),
                    'duration': course_data.get('duration', course['duration']),
                    'level': course_data.get('level', course['level']),
                    'track': course_data.get('track', course['track']),
                    'tags': course_data.get('tags', course['tags'])
                })
                break
        
        # Save updated courses
        with open(courses_file, 'w') as f:
            json.dump(courses, f, indent=2)
        
        # Update lessons
        if 'lessons' in course_data:
            for lesson in course_data['lessons']:
                lesson_file = os.path.join(CONTENT_DIR, f'course_{course_id}_lesson_{lesson["id"]}.json')
                lesson_data = {
                    'data': lesson,
                    'success': True
                }
                with open(lesson_file, 'w') as f:
                    json.dump(lesson_data, f, indent=2)
        
        return jsonify({
            'success': True,
            'message': 'Course updated successfully'
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@admin_content.route('/api/admin/courses/<int:course_id>/lessons/<int:lesson_id>', methods=['PUT'])
def update_lesson(course_id, lesson_id):
    """Update specific lesson content"""
    try:
        lesson_data = request.get_json()
        
        lesson_file = os.path.join(CONTENT_DIR, f'course_{course_id}_lesson_{lesson_id}.json')
        
        # Update lesson data
        updated_lesson = {
            'data': lesson_data,
            'success': True
        }
        
        with open(lesson_file, 'w') as f:
            json.dump(updated_lesson, f, indent=2)
        
        return jsonify({
            'success': True,
            'message': 'Lesson updated successfully'
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@admin_content.route('/api/admin/courses', methods=['POST'])
def create_course():
    """Create a new course"""
    try:
        course_data = request.get_json()
        
        # Load existing courses
        courses_file = os.path.join(CONTENT_DIR, 'courses.json')
        with open(courses_file, 'r') as f:
            courses = json.load(f)
        
        # Generate new course ID
        new_id = max([course['id'] for course in courses['data']]) + 1
        
        # Create new course
        new_course = {
            'id': new_id,
            'title': course_data.get('title', 'New Course'),
            'description': course_data.get('description', ''),
            'duration': course_data.get('duration', '1 hour'),
            'level': course_data.get('level', 'Beginner'),
            'track': course_data.get('track', 'General'),
            'instructor': 'tbd / Clemence',
            'enrolled': 0,
            'rating': 0.0,
            'image_url': '/course-placeholder.png',
            'tags': course_data.get('tags', [])
        }
        
        courses['data'].append(new_course)
        
        # Save updated courses
        with open(courses_file, 'w') as f:
            json.dump(courses, f, indent=2)
        
        return jsonify({
            'success': True,
            'data': new_course,
            'message': 'Course created successfully'
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@admin_content.route('/api/admin/courses/<int:course_id>', methods=['DELETE'])
def delete_course(course_id):
    """Delete a course and all its lessons"""
    try:
        # Load existing courses
        courses_file = os.path.join(CONTENT_DIR, 'courses.json')
        with open(courses_file, 'r') as f:
            courses = json.load(f)
        
        # Remove course from list
        courses['data'] = [course for course in courses['data'] if course['id'] != course_id]
        
        # Save updated courses
        with open(courses_file, 'w') as f:
            json.dump(courses, f, indent=2)
        
        # Delete lesson files
        for filename in os.listdir(CONTENT_DIR):
            if filename.startswith(f'course_{course_id}_lesson_'):
                os.remove(os.path.join(CONTENT_DIR, filename))
        
        return jsonify({
            'success': True,
            'message': 'Course deleted successfully'
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@admin_content.route('/api/admin/backup')
def backup_content():
    """Create a backup of all content"""
    try:
        import zipfile
        import tempfile
        from datetime import datetime
        
        # Create temporary zip file
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        backup_filename = f'content_backup_{timestamp}.zip'
        
        with tempfile.NamedTemporaryFile(delete=False, suffix='.zip') as tmp_file:
            with zipfile.ZipFile(tmp_file.name, 'w') as zip_file:
                # Add all content files to zip
                for filename in os.listdir(CONTENT_DIR):
                    if filename.endswith('.json'):
                        zip_file.write(
                            os.path.join(CONTENT_DIR, filename),
                            filename
                        )
            
            # Return download URL
            return jsonify({
                'success': True,
                'backup_url': f'/downloads/{backup_filename}',
                'message': 'Backup created successfully'
            })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@admin_content.route('/api/admin/restore', methods=['POST'])
def restore_content():
    """Restore content from backup"""
    try:
        if 'backup_file' not in request.files:
            return jsonify({
                'success': False,
                'error': 'No backup file provided'
            }), 400
        
        backup_file = request.files['backup_file']
        
        if backup_file.filename == '':
            return jsonify({
                'success': False,
                'error': 'No file selected'
            }), 400
        
        # Extract backup
        import zipfile
        import tempfile
        
        with tempfile.NamedTemporaryFile() as tmp_file:
            backup_file.save(tmp_file.name)
            
            with zipfile.ZipFile(tmp_file.name, 'r') as zip_file:
                zip_file.extractall(CONTENT_DIR)
        
        return jsonify({
            'success': True,
            'message': 'Content restored successfully'
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500
