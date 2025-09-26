from flask import Blueprint, jsonify, request
from datetime import datetime, timedelta
import json
import os
import random

analytics_api = Blueprint('analytics_api', __name__)

def generate_mock_analytics_data():
    """Generate realistic mock analytics data for the dashboard"""
    
    # Generate user signup data for the last 90 days
    end_date = datetime.now()
    start_date = end_date - timedelta(days=90)
    
    user_signups = []
    active_users = []
    course_completions = []
    
    current_date = start_date
    base_signups = 15
    base_active = 2847  # Current active learners from the platform
    
    while current_date <= end_date:
        # Generate realistic signup patterns (higher on weekdays, lower on weekends)
        day_of_week = current_date.weekday()
        signup_multiplier = 1.2 if day_of_week < 5 else 0.6  # Weekday vs weekend
        
        # Add some randomness and growth trend
        days_from_start = (current_date - start_date).days
        growth_factor = 1 + (days_from_start * 0.01)  # 1% growth per day
        
        daily_signups = int(base_signups * signup_multiplier * growth_factor * (0.8 + random.random() * 0.4))
        daily_active = int(base_active + (days_from_start * 5) + random.randint(-50, 100))
        daily_completions = int(daily_signups * 0.3 + random.randint(0, 10))  # ~30% completion rate
        
        user_signups.append({
            'date': current_date.strftime('%Y-%m-%d'),
            'count': daily_signups
        })
        
        active_users.append({
            'date': current_date.strftime('%Y-%m-%d'),
            'count': daily_active
        })
        
        course_completions.append({
            'date': current_date.strftime('%Y-%m-%d'),
            'count': daily_completions,
            'revenue': daily_completions * 150  # $150 value per completion
        })
        
        current_date += timedelta(days=1)
    
    return {
        'user_signups': user_signups,
        'active_users': active_users,
        'course_completions': course_completions
    }

def filter_data_by_period(data, period):
    """Filter data based on the time period"""
    if period == 'all':
        return data
    
    end_date = datetime.now()
    if period == '7d':
        start_date = end_date - timedelta(days=7)
    elif period == '30d':
        start_date = end_date - timedelta(days=30)
    else:
        return data
    
    start_str = start_date.strftime('%Y-%m-%d')
    end_str = end_date.strftime('%Y-%m-%d')
    
    return [item for item in data if start_str <= item['date'] <= end_str]

@analytics_api.route('/api/analytics/overview', methods=['GET'])
def get_analytics_overview():
    """Get overview analytics with key metrics"""
    try:
        period = request.args.get('period', '30d')  # Default to 30 days
        
        # Generate mock data
        mock_data = generate_mock_analytics_data()
        
        # Filter data based on period
        signups = filter_data_by_period(mock_data['user_signups'], period)
        active = filter_data_by_period(mock_data['active_users'], period)
        completions = filter_data_by_period(mock_data['course_completions'], period)
        
        # Calculate totals and changes
        total_signups = sum(item['count'] for item in signups)
        total_active = active[-1]['count'] if active else 0
        total_completions = sum(item['count'] for item in completions)
        total_revenue = sum(item['revenue'] for item in completions)
        
        # Calculate percentage changes (comparing to previous period)
        if period == '7d':
            prev_period_days = 7
        elif period == '30d':
            prev_period_days = 30
        else:
            prev_period_days = 30
        
        # Get previous period data for comparison
        prev_end = datetime.now() - timedelta(days=prev_period_days)
        prev_start = prev_end - timedelta(days=prev_period_days)
        prev_start_str = prev_start.strftime('%Y-%m-%d')
        prev_end_str = prev_end.strftime('%Y-%m-%d')
        
        prev_signups = [item for item in mock_data['user_signups'] 
                       if prev_start_str <= item['date'] <= prev_end_str]
        prev_completions = [item for item in mock_data['course_completions'] 
                           if prev_start_str <= item['date'] <= prev_end_str]
        
        prev_total_signups = sum(item['count'] for item in prev_signups)
        prev_total_completions = sum(item['count'] for item in prev_completions)
        prev_total_revenue = sum(item['revenue'] for item in prev_completions)
        
        # Calculate percentage changes
        signup_change = ((total_signups - prev_total_signups) / prev_total_signups * 100) if prev_total_signups > 0 else 0
        completion_change = ((total_completions - prev_total_completions) / prev_total_completions * 100) if prev_total_completions > 0 else 0
        revenue_change = ((total_revenue - prev_total_revenue) / prev_total_revenue * 100) if prev_total_revenue > 0 else 0
        
        return jsonify({
            'success': True,
            'data': {
                'overview': {
                    'total_signups': total_signups,
                    'signup_change': round(signup_change, 1),
                    'total_active_users': total_active,
                    'active_change': 5.2,  # Mock positive change
                    'total_completions': total_completions,
                    'completion_change': round(completion_change, 1),
                    'total_revenue': total_revenue,
                    'revenue_change': round(revenue_change, 1)
                },
                'charts': {
                    'user_signups': signups,
                    'active_users': active,
                    'course_completions': completions
                }
            }
        })
    
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@analytics_api.route('/api/analytics/course-performance', methods=['GET'])
def get_course_performance():
    """Get course-specific performance metrics"""
    try:
        # Mock course performance data
        courses = [
            {
                'id': 1,
                'title': 'AI Strategy for Leadership',
                'enrollments': 1247,
                'completions': 1156,
                'completion_rate': 92.7,
                'avg_rating': 4.8,
                'revenue': 173400
            },
            {
                'id': 2,
                'title': 'GDPR Compliance for AI Systems',
                'enrollments': 892,
                'completions': 801,
                'completion_rate': 89.8,
                'avg_rating': 4.7,
                'revenue': 120150
            },
            {
                'id': 3,
                'title': 'AI Product Management',
                'enrollments': 756,
                'completions': 689,
                'completion_rate': 91.1,
                'avg_rating': 4.9,
                'revenue': 103350
            },
            {
                'id': 4,
                'title': 'Machine Learning for Developers',
                'enrollments': 634,
                'completions': 567,
                'completion_rate': 89.4,
                'avg_rating': 4.6,
                'revenue': 85050
            },
            {
                'id': 5,
                'title': 'Safe AI Usage Guidelines',
                'enrollments': 1123,
                'completions': 1034,
                'completion_rate': 92.1,
                'avg_rating': 4.8,
                'revenue': 155100
            },
            {
                'id': 6,
                'title': 'MLOps and Production AI',
                'enrollments': 445,
                'completions': 389,
                'completion_rate': 87.4,
                'avg_rating': 4.7,
                'revenue': 58350
            }
        ]
        
        return jsonify({
            'success': True,
            'data': courses
        })
    
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@analytics_api.route('/api/analytics/user-engagement', methods=['GET'])
def get_user_engagement():
    """Get user engagement metrics"""
    try:
        period = request.args.get('period', '30d')
        
        # Mock engagement data
        engagement_data = {
            'daily_active_users': [
                {'date': '2025-09-11', 'count': 1234},
                {'date': '2025-09-12', 'count': 1456},
                {'date': '2025-09-13', 'count': 1389},
                {'date': '2025-09-14', 'count': 1567},
                {'date': '2025-09-15', 'count': 1445},
                {'date': '2025-09-16', 'count': 1678},
                {'date': '2025-09-17', 'count': 1789},
                {'date': '2025-09-18', 'count': 1834}
            ],
            'session_duration': {
                'average_minutes': 24.5,
                'change_percent': 8.3
            },
            'course_progress': {
                'in_progress': 1456,
                'completed': 3421,
                'not_started': 892
            }
        }
        
        return jsonify({
            'success': True,
            'data': engagement_data
        })
    
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
