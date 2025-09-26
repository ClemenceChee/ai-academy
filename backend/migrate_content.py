#!/usr/bin/env python3
"""
Content Migration Script for B____ AI Academy
Migrates existing course content to the database
"""

import os
import sys
import json

# Add the project root to the Python path
sys.path.insert(0, os.path.dirname(__file__))

from src.main import app
from src.models.course import Course, Lesson, Module, Exercise, Resource
from src.models.user import db

def migrate_existing_content():
    """Migrate existing course content to database"""
    
    # Sample course data structure based on the existing content
    courses_data = [
        {
            "id": 1,
            "title": "AI Strategy for Leadership",
            "description": "Strategic AI implementation for business leaders and executives",
            "duration": "6 hours",
            "level": "Executive",
            "track": "Leadership",
            "instructor": "tbd / Clemence",
            "image_url": "/ai-strategy-framework.png",
            "tags": ["Strategy", "Leadership", "Business", "ROI"],
            "lessons": [
                {
                    "id": 1,
                    "title": "Strategic AI Overview",
                    "description": "Understanding AI's strategic potential for business transformation",
                    "duration": "3 hours",
                    "order_index": 1,
                    "modules": [
                        {
                            "title": "🎯 Module 1: Strategic AI Framework",
                            "content": """
                            <div class="space-y-6">
                                <div class="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                                    <h4 class="font-semibold text-blue-900 mb-2">Learning Objective</h4>
                                    <p class="text-blue-800">Master the strategic framework for AI implementation that drives measurable business value and competitive advantage.</p>
                                </div>
                                
                                <div class="space-y-4">
                                    <h5 class="text-lg font-semibold text-gray-900">Welcome to Strategic AI Leadership</h5>
                                    <p class="text-gray-700 leading-relaxed">As your instructor with over 12 years of experience building AI products at Fortune 500 companies, I want you to understand that successful AI strategy isn't about the technology—it's about business transformation. Today, we'll explore how to think strategically about AI implementation.</p>
                                    
                                    <div class="bg-orange-50 p-4 rounded-lg">
                                        <h6 class="font-semibold text-orange-900 mb-2">💡 Key Insight</h6>
                                        <p class="text-orange-800">The companies that succeed with AI don't start with the technology. They start with the business problem and work backwards to the solution.</p>
                                    </div>
                                </div>
                                
                                <div class="space-y-4">
                                    <h5 class="text-lg font-semibold text-gray-900">The Strategic AI Framework</h5>
                                    <img src="/ai-strategy-framework.png" alt="AI Strategy Framework" class="w-full max-w-2xl mx-auto rounded-lg shadow-md" />
                                    
                                    <div class="overflow-x-auto">
                                        <table class="min-w-full bg-white border border-gray-200 rounded-lg">
                                            <thead class="bg-orange-500 text-white">
                                                <tr>
                                                    <th class="px-4 py-3 text-left font-semibold">Business Function</th>
                                                    <th class="px-4 py-3 text-left font-semibold">Traditional Approach</th>
                                                    <th class="px-4 py-3 text-left font-semibold">AI-Enhanced Approach</th>
                                                    <th class="px-4 py-3 text-left font-semibold">Impact Level</th>
                                                </tr>
                                            </thead>
                                            <tbody class="divide-y divide-gray-200">
                                                <tr class="hover:bg-gray-50">
                                                    <td class="px-4 py-3 font-medium text-gray-900">Customer Service</td>
                                                    <td class="px-4 py-3 text-gray-700">Manual ticket routing</td>
                                                    <td class="px-4 py-3 text-gray-700">Intelligent chatbots + sentiment analysis</td>
                                                    <td class="px-4 py-3 text-red-600 font-semibold">🔥🔥🔥 High</td>
                                                </tr>
                                                <tr class="hover:bg-gray-50">
                                                    <td class="px-4 py-3 font-medium text-gray-900">Marketing</td>
                                                    <td class="px-4 py-3 text-gray-700">Demographic targeting</td>
                                                    <td class="px-4 py-3 text-gray-700">Behavioral prediction + personalization</td>
                                                    <td class="px-4 py-3 text-red-600 font-semibold">🔥🔥🔥 High</td>
                                                </tr>
                                                <tr class="hover:bg-gray-50">
                                                    <td class="px-4 py-3 font-medium text-gray-900">Operations</td>
                                                    <td class="px-4 py-3 text-gray-700">Scheduled maintenance</td>
                                                    <td class="px-4 py-3 text-gray-700">Predictive maintenance + optimization</td>
                                                    <td class="px-4 py-3 text-orange-600 font-semibold">🔥🔥 Medium</td>
                                                </tr>
                                                <tr class="hover:bg-gray-50">
                                                    <td class="px-4 py-3 font-medium text-gray-900">Finance</td>
                                                    <td class="px-4 py-3 text-gray-700">Historical analysis</td>
                                                    <td class="px-4 py-3 text-gray-700">Real-time fraud detection + forecasting</td>
                                                    <td class="px-4 py-3 text-red-600 font-semibold">🔥🔥🔥 High</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                
                                <div class="bg-green-50 p-4 rounded-lg">
                                    <h6 class="font-semibold text-green-900 mb-2">🎯 Practical Application</h6>
                                    <p class="text-green-800">Use this framework to identify the highest-impact AI opportunities in your organization. Start with functions that have clear, measurable outcomes and abundant data.</p>
                                </div>
                            </div>
                            """,
                            "order_index": 1,
                            "module_type": "content"
                        },
                        {
                            "title": "📊 Module 2: Business Impact Assessment",
                            "content": """
                            <div class="space-y-6">
                                <div class="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                                    <h4 class="font-semibold text-blue-900 mb-2">Learning Objective</h4>
                                    <p class="text-blue-800">Learn to quantify AI's business impact using proven ROI frameworks and measurement methodologies.</p>
                                </div>
                                
                                <div class="space-y-4">
                                    <h5 class="text-lg font-semibold text-gray-900">Measuring AI Business Impact</h5>
                                    <p class="text-gray-700 leading-relaxed">In my experience leading AI initiatives at three Fortune 500 companies, the projects that succeed are those with clear, measurable business outcomes from day one. Let me show you how to build a compelling business case for AI.</p>
                                    
                                    <div class="overflow-x-auto">
                                        <table class="min-w-full bg-white border border-gray-200 rounded-lg">
                                            <thead class="bg-orange-500 text-white">
                                                <tr>
                                                    <th class="px-4 py-3 text-left font-semibold">Metric Category</th>
                                                    <th class="px-4 py-3 text-left font-semibold">Example Metrics</th>
                                                    <th class="px-4 py-3 text-left font-semibold">Measurement Method</th>
                                                    <th class="px-4 py-3 text-left font-semibold">Typical ROI</th>
                                                </tr>
                                            </thead>
                                            <tbody class="divide-y divide-gray-200">
                                                <tr class="hover:bg-gray-50">
                                                    <td class="px-4 py-3 font-medium text-gray-900">Cost Reduction</td>
                                                    <td class="px-4 py-3 text-gray-700">Automation savings, efficiency gains</td>
                                                    <td class="px-4 py-3 text-gray-700">Before/after cost analysis</td>
                                                    <td class="px-4 py-3 text-green-600 font-semibold">15-40%</td>
                                                </tr>
                                                <tr class="hover:bg-gray-50">
                                                    <td class="px-4 py-3 font-medium text-gray-900">Revenue Growth</td>
                                                    <td class="px-4 py-3 text-gray-700">Personalization, recommendations</td>
                                                    <td class="px-4 py-3 text-gray-700">A/B testing, cohort analysis</td>
                                                    <td class="px-4 py-3 text-green-600 font-semibold">5-25%</td>
                                                </tr>
                                                <tr class="hover:bg-gray-50">
                                                    <td class="px-4 py-3 font-medium text-gray-900">Risk Mitigation</td>
                                                    <td class="px-4 py-3 text-gray-700">Fraud prevention, compliance</td>
                                                    <td class="px-4 py-3 text-gray-700">Risk-adjusted value</td>
                                                    <td class="px-4 py-3 text-green-600 font-semibold">10-50%</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                
                                <div class="bg-yellow-50 p-4 rounded-lg">
                                    <h6 class="font-semibold text-yellow-900 mb-2">⚠️ Common Pitfall</h6>
                                    <p class="text-yellow-800">Don't fall into the "AI for AI's sake" trap. Every AI initiative must have a clear business justification and measurable success criteria.</p>
                                </div>
                            </div>
                            """,
                            "order_index": 2,
                            "module_type": "content"
                        }
                    ],
                    "exercises": [
                        {
                            "title": "AI Strategy Canvas",
                            "description": "Download and complete the AI Strategy Canvas for your organization",
                            "download_url": "/downloads/ai-strategy-canvas.pdf",
                            "exercise_type": "download"
                        },
                        {
                            "title": "ROI Calculator",
                            "description": "Excel template for calculating AI project ROI",
                            "download_url": "/downloads/ai-roi-calculator.xlsx",
                            "exercise_type": "download"
                        }
                    ],
                    "resources": [
                        {
                            "title": "MIT AI Strategy Guide",
                            "description": "Comprehensive guide to AI strategy from MIT Sloan",
                            "url": "https://mitsloan.mit.edu/ideas-made-to-matter/artificial-intelligence-strategy",
                            "resource_type": "external"
                        },
                        {
                            "title": "Harvard Business Review - AI Strategy",
                            "description": "Collection of HBR articles on AI strategy",
                            "url": "https://hbr.org/topic/artificial-intelligence",
                            "resource_type": "external"
                        },
                        {
                            "title": "Deloitte AI Maturity Model",
                            "description": "Framework for assessing organizational AI readiness",
                            "url": "https://www2.deloitte.com/us/en/insights/focus/cognitive-technologies.html",
                            "resource_type": "external"
                        }
                    ]
                }
            ]
        },
        {
            "id": 2,
            "title": "GDPR Compliance for AI Systems",
            "description": "Legal framework and compliance requirements for AI systems under GDPR",
            "duration": "6 hours",
            "level": "Intermediate",
            "track": "Compliance",
            "instructor": "tbd / Clemence",
            "image_url": "/gdpr-rights-infographic.png",
            "tags": ["GDPR", "Compliance", "Legal", "Privacy"],
            "lessons": [
                {
                    "id": 1,
                    "title": "Understanding GDPR Fundamentals in AI Context",
                    "description": "Core GDPR principles and their application to AI systems",
                    "duration": "3 hours",
                    "order_index": 1,
                    "modules": [
                        {
                            "title": "⚖️ Module 1: GDPR Legal Framework for AI",
                            "content": """
                            <div class="space-y-6">
                                <div class="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                                    <h4 class="font-semibold text-blue-900 mb-2">Learning Objective</h4>
                                    <p class="text-blue-800">Understand how GDPR principles apply specifically to AI systems and automated decision-making.</p>
                                </div>
                                
                                <div class="space-y-4">
                                    <h5 class="text-lg font-semibold text-gray-900">GDPR and AI: A Complex Intersection</h5>
                                    <p class="text-gray-700 leading-relaxed">As a legal practitioner who has guided dozens of companies through GDPR compliance for AI systems, I can tell you that the intersection of AI and data protection law is one of the most challenging areas in technology law today. Let's break it down systematically.</p>
                                    
                                    <img src="/gdpr-rights-infographic.png" alt="GDPR Individual Rights" class="w-full max-w-2xl mx-auto rounded-lg shadow-md" />
                                    
                                    <div class="overflow-x-auto">
                                        <table class="min-w-full bg-white border border-gray-200 rounded-lg">
                                            <thead class="bg-orange-500 text-white">
                                                <tr>
                                                    <th class="px-4 py-3 text-left font-semibold">GDPR Principle</th>
                                                    <th class="px-4 py-3 text-left font-semibold">AI Challenge</th>
                                                    <th class="px-4 py-3 text-left font-semibold">Compliance Solution</th>
                                                    <th class="px-4 py-3 text-left font-semibold">Risk Level</th>
                                                </tr>
                                            </thead>
                                            <tbody class="divide-y divide-gray-200">
                                                <tr class="hover:bg-gray-50">
                                                    <td class="px-4 py-3 font-medium text-gray-900">Purpose Limitation</td>
                                                    <td class="px-4 py-3 text-gray-700">AI discovers new data uses</td>
                                                    <td class="px-4 py-3 text-gray-700">Explicit consent for new purposes</td>
                                                    <td class="px-4 py-3 text-red-600 font-semibold">🔴 High</td>
                                                </tr>
                                                <tr class="hover:bg-gray-50">
                                                    <td class="px-4 py-3 font-medium text-gray-900">Data Minimization</td>
                                                    <td class="px-4 py-3 text-gray-700">AI benefits from large datasets</td>
                                                    <td class="px-4 py-3 text-gray-700">Privacy-preserving techniques</td>
                                                    <td class="px-4 py-3 text-orange-600 font-semibold">🟡 Medium</td>
                                                </tr>
                                                <tr class="hover:bg-gray-50">
                                                    <td class="px-4 py-3 font-medium text-gray-900">Transparency</td>
                                                    <td class="px-4 py-3 text-gray-700">AI "black box" decisions</td>
                                                    <td class="px-4 py-3 text-gray-700">Explainable AI implementation</td>
                                                    <td class="px-4 py-3 text-red-600 font-semibold">🔴 High</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                
                                <div class="bg-red-50 p-4 rounded-lg">
                                    <h6 class="font-semibold text-red-900 mb-2">⚠️ Critical Compliance Point</h6>
                                    <p class="text-red-800">Article 22 of GDPR specifically prohibits solely automated decision-making with legal or significant effects. This directly impacts many AI applications.</p>
                                </div>
                            </div>
                            """,
                            "order_index": 1,
                            "module_type": "content"
                        }
                    ],
                    "exercises": [
                        {
                            "title": "GDPR Compliance Checklist",
                            "description": "Comprehensive checklist for AI system GDPR compliance",
                            "download_url": "/downloads/gdpr-ai-compliance-checklist.pdf",
                            "exercise_type": "download"
                        }
                    ],
                    "resources": [
                        {
                            "title": "ICO AI Guidance",
                            "description": "Official UK ICO guidance on AI and data protection",
                            "url": "https://ico.org.uk/for-organisations/guide-to-data-protection/key-dp-themes/artificial-intelligence/",
                            "resource_type": "external"
                        },
                        {
                            "title": "EDPB Guidelines on Automated Decision-Making",
                            "description": "European Data Protection Board guidelines",
                            "url": "https://edpb.europa.eu/our-work-tools/our-documents/guidelines_en",
                            "resource_type": "external"
                        }
                    ]
                }
            ]
        }
        # Add more courses here...
    ]
    
    with app.app_context():
        # Clear existing data
        try:
            db.drop_all()
        except:
            pass  # Tables might not exist yet
        
        db.create_all()
        
        for course_data in courses_data:
            # Create course
            course = Course(
                title=course_data['title'],
                description=course_data['description'],
                duration=course_data['duration'],
                level=course_data['level'],
                track=course_data['track'],
                instructor=course_data['instructor'],
                image_url=course_data['image_url'],
                tags=json.dumps(course_data['tags'])
            )
            db.session.add(course)
            db.session.flush()  # Get the course ID
            
            # Create lessons
            for lesson_data in course_data['lessons']:
                lesson = Lesson(
                    course_id=course.id,
                    title=lesson_data['title'],
                    description=lesson_data['description'],
                    duration=lesson_data['duration'],
                    order_index=lesson_data['order_index']
                )
                db.session.add(lesson)
                db.session.flush()  # Get the lesson ID
                
                # Create modules
                for module_data in lesson_data['modules']:
                    module = Module(
                        lesson_id=lesson.id,
                        title=module_data['title'],
                        content=module_data['content'],
                        order_index=module_data['order_index'],
                        module_type=module_data['module_type']
                    )
                    db.session.add(module)
                
                # Create exercises
                for exercise_data in lesson_data['exercises']:
                    exercise = Exercise(
                        lesson_id=lesson.id,
                        title=exercise_data['title'],
                        description=exercise_data['description'],
                        download_url=exercise_data['download_url'],
                        exercise_type=exercise_data['exercise_type']
                    )
                    db.session.add(exercise)
                
                # Create resources
                for resource_data in lesson_data['resources']:
                    resource = Resource(
                        lesson_id=lesson.id,
                        title=resource_data['title'],
                        description=resource_data['description'],
                        url=resource_data['url'],
                        resource_type=resource_data['resource_type']
                    )
                    db.session.add(resource)
        
        db.session.commit()
        print("✅ Content migration completed successfully!")
        print(f"📊 Migrated {len(courses_data)} courses with lessons, modules, exercises, and resources")

if __name__ == '__main__':
    migrate_existing_content()
