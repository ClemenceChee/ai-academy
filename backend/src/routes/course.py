from flask import Blueprint, request, jsonify
from src.models.course import db, Course, Lesson, Module, Exercise, Resource
import json

course_bp = Blueprint('course', __name__)

# Course endpoints
@course_bp.route('/courses', methods=['GET'])
def get_courses():
    """Get all active courses"""
    try:
        courses = Course.query.filter_by(is_active=True).all()
        return jsonify({
            'success': True,
            'data': [course.to_dict() for course in courses]
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@course_bp.route('/courses/<int:course_id>', methods=['GET'])
def get_course(course_id):
    """Get a specific course with all its content"""
    try:
        course = Course.query.get_or_404(course_id)
        return jsonify({
            'success': True,
            'data': course.to_dict()
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@course_bp.route('/courses', methods=['POST'])
def create_course():
    """Create a new course"""
    try:
        data = request.get_json()
        
        course = Course(
            title=data.get('title'),
            description=data.get('description'),
            duration=data.get('duration'),
            level=data.get('level'),
            track=data.get('track'),
            instructor=data.get('instructor'),
            image_url=data.get('image_url'),
            tags=json.dumps(data.get('tags', []))
        )
        
        db.session.add(course)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'data': course.to_dict()
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@course_bp.route('/courses/<int:course_id>', methods=['PUT'])
def update_course(course_id):
    """Update a course"""
    try:
        course = Course.query.get_or_404(course_id)
        data = request.get_json()
        
        course.title = data.get('title', course.title)
        course.description = data.get('description', course.description)
        course.duration = data.get('duration', course.duration)
        course.level = data.get('level', course.level)
        course.track = data.get('track', course.track)
        course.instructor = data.get('instructor', course.instructor)
        course.image_url = data.get('image_url', course.image_url)
        if 'tags' in data:
            course.tags = json.dumps(data['tags'])
        
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

# Lesson endpoints
@course_bp.route('/courses/<int:course_id>/lessons', methods=['GET'])
def get_lessons(course_id):
    """Get all lessons for a course"""
    try:
        lessons = Lesson.query.filter_by(course_id=course_id, is_active=True).order_by(Lesson.order_index).all()
        return jsonify({
            'success': True,
            'data': [lesson.to_dict() for lesson in lessons]
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@course_bp.route('/courses/<int:course_id>/lessons/<int:lesson_id>', methods=['GET'])
def get_lesson(course_id, lesson_id):
    """Get a specific lesson with all its content"""
    try:
        lesson = Lesson.query.filter_by(id=lesson_id, course_id=course_id).first_or_404()
        return jsonify({
            'success': True,
            'data': lesson.to_dict()
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@course_bp.route('/courses/<int:course_id>/lessons', methods=['POST'])
def create_lesson(course_id):
    """Create a new lesson"""
    try:
        data = request.get_json()
        
        lesson = Lesson(
            course_id=course_id,
            title=data.get('title'),
            description=data.get('description'),
            duration=data.get('duration'),
            order_index=data.get('order_index', 0)
        )
        
        db.session.add(lesson)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'data': lesson.to_dict()
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@course_bp.route('/lessons/<int:lesson_id>', methods=['PUT'])
def update_lesson(lesson_id):
    """Update a lesson"""
    try:
        lesson = Lesson.query.get_or_404(lesson_id)
        data = request.get_json()
        
        lesson.title = data.get('title', lesson.title)
        lesson.description = data.get('description', lesson.description)
        lesson.duration = data.get('duration', lesson.duration)
        lesson.order_index = data.get('order_index', lesson.order_index)
        
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

# Module endpoints
@course_bp.route('/lessons/<int:lesson_id>/modules', methods=['POST'])
def create_module(lesson_id):
    """Create a new module"""
    try:
        data = request.get_json()
        
        module = Module(
            lesson_id=lesson_id,
            title=data.get('title'),
            content=data.get('content'),
            order_index=data.get('order_index', 0),
            module_type=data.get('module_type', 'content')
        )
        
        db.session.add(module)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'data': module.to_dict()
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@course_bp.route('/modules/<int:module_id>', methods=['PUT'])
def update_module(module_id):
    """Update a module"""
    try:
        module = Module.query.get_or_404(module_id)
        data = request.get_json()
        
        module.title = data.get('title', module.title)
        module.content = data.get('content', module.content)
        module.order_index = data.get('order_index', module.order_index)
        module.module_type = data.get('module_type', module.module_type)
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'data': module.to_dict()
        })
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@course_bp.route('/modules/<int:module_id>', methods=['DELETE'])
def delete_module(module_id):
    """Delete a module"""
    try:
        module = Module.query.get_or_404(module_id)
        db.session.delete(module)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Module deleted successfully'
        })
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

# Exercise endpoints
@course_bp.route('/lessons/<int:lesson_id>/exercises', methods=['POST'])
def create_exercise(lesson_id):
    """Create a new exercise"""
    try:
        data = request.get_json()
        
        exercise = Exercise(
            lesson_id=lesson_id,
            title=data.get('title'),
            description=data.get('description'),
            download_url=data.get('download_url'),
            exercise_type=data.get('exercise_type', 'download')
        )
        
        db.session.add(exercise)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'data': exercise.to_dict()
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@course_bp.route('/exercises/<int:exercise_id>', methods=['PUT'])
def update_exercise(exercise_id):
    """Update an exercise"""
    try:
        exercise = Exercise.query.get_or_404(exercise_id)
        data = request.get_json()
        
        exercise.title = data.get('title', exercise.title)
        exercise.description = data.get('description', exercise.description)
        exercise.download_url = data.get('download_url', exercise.download_url)
        exercise.exercise_type = data.get('exercise_type', exercise.exercise_type)
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'data': exercise.to_dict()
        })
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

# Resource endpoints
@course_bp.route('/lessons/<int:lesson_id>/resources', methods=['POST'])
def create_resource(lesson_id):
    """Create a new resource"""
    try:
        data = request.get_json()
        
        resource = Resource(
            lesson_id=lesson_id,
            title=data.get('title'),
            description=data.get('description'),
            url=data.get('url'),
            resource_type=data.get('resource_type', 'external')
        )
        
        db.session.add(resource)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'data': resource.to_dict()
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@course_bp.route('/resources/<int:resource_id>', methods=['PUT'])
def update_resource(resource_id):
    """Update a resource"""
    try:
        resource = Resource.query.get_or_404(resource_id)
        data = request.get_json()
        
        resource.title = data.get('title', resource.title)
        resource.description = data.get('description', resource.description)
        resource.url = data.get('url', resource.url)
        resource.resource_type = data.get('resource_type', resource.resource_type)
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'data': resource.to_dict()
        })
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

# Content management endpoints
@course_bp.route('/content/import', methods=['POST'])
def import_content():
    """Import content from existing data structure"""
    try:
        data = request.get_json()
        
        for course_data in data.get('courses', []):
            # Create course
            course = Course(
                title=course_data.get('title'),
                description=course_data.get('description'),
                duration=course_data.get('duration'),
                level=course_data.get('level'),
                track=course_data.get('track'),
                instructor=course_data.get('instructor'),
                image_url=course_data.get('image_url'),
                tags=json.dumps(course_data.get('tags', []))
            )
            db.session.add(course)
            db.session.flush()  # Get the course ID
            
            # Create lessons
            for lesson_data in course_data.get('lessons', []):
                lesson = Lesson(
                    course_id=course.id,
                    title=lesson_data.get('title'),
                    description=lesson_data.get('description'),
                    duration=lesson_data.get('duration'),
                    order_index=lesson_data.get('order_index', 0)
                )
                db.session.add(lesson)
                db.session.flush()  # Get the lesson ID
                
                # Create modules
                for module_data in lesson_data.get('modules', []):
                    module = Module(
                        lesson_id=lesson.id,
                        title=module_data.get('title'),
                        content=module_data.get('content'),
                        order_index=module_data.get('order_index', 0),
                        module_type=module_data.get('module_type', 'content')
                    )
                    db.session.add(module)
                
                # Create exercises
                for exercise_data in lesson_data.get('exercises', []):
                    exercise = Exercise(
                        lesson_id=lesson.id,
                        title=exercise_data.get('title'),
                        description=exercise_data.get('description'),
                        download_url=exercise_data.get('download_url'),
                        exercise_type=exercise_data.get('exercise_type', 'download')
                    )
                    db.session.add(exercise)
                
                # Create resources
                for resource_data in lesson_data.get('resources', []):
                    resource = Resource(
                        lesson_id=lesson.id,
                        title=resource_data.get('title'),
                        description=resource_data.get('description'),
                        url=resource_data.get('url'),
                        resource_type=resource_data.get('resource_type', 'external')
                    )
                    db.session.add(resource)
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Content imported successfully'
        })
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500
