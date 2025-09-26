#!/usr/bin/env python3

import json
import os

def create_json_content():
    """Create JSON files for course content management"""
    
    # Create content directory
    content_dir = "src/content"
    os.makedirs(content_dir, exist_ok=True)
    
    # Course 1: AI Strategy for Leadership
    course1 = {
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
                "title": "Strategic AI Planning and Implementation",
                "description": "Learn to develop comprehensive AI strategies that align with business objectives and drive organizational transformation.",
                "duration": "3 hours",
                "modules": [
                    {
                        "id": 1,
                        "title": "🎯 Module 1: Strategic AI Overview",
                        "content": """
                        <div class="mb-6">
                            <h3 class="text-lg font-semibold mb-4">Welcome to Strategic AI Planning</h3>
                            <p class="mb-4">As your instructor with over 12 years of experience building AI products at Fortune 500 companies, I want you to understand that successful AI implementation isn't about technology—it's about strategy.</p>
                            
                            <div class="bg-blue-50 p-4 rounded-lg mb-6">
                                <h4 class="font-semibold text-blue-900 mb-2">🎯 Learning Objectives</h4>
                                <ul class="text-blue-800 space-y-1">
                                    <li>• Understand the strategic foundations of AI implementation</li>
                                    <li>• Learn to assess organizational AI readiness</li>
                                    <li>• Develop frameworks for AI business case development</li>
                                    <li>• Master stakeholder alignment strategies</li>
                                </ul>
                            </div>
                            
                            <img src="/ai-strategy-framework.png" alt="AI Strategy Framework" class="w-full max-h-96 object-contain mx-auto mb-6 rounded-lg shadow-md" />
                            
                            <h4 class="font-semibold mb-3">The Strategic AI Framework</h4>
                            <p class="mb-4">The framework above shows the five critical pillars of successful AI strategy. Let me walk you through each one based on what I've learned from both successes and failures:</p>
                            
                            <div class="overflow-x-auto mb-6">
                                <table class="min-w-full bg-white border border-gray-200">
                                    <thead class="bg-orange-500 text-white">
                                        <tr>
                                            <th class="px-4 py-3 text-left">Business Function</th>
                                            <th class="px-4 py-3 text-left">Traditional Approach</th>
                                            <th class="px-4 py-3 text-left">AI-Enhanced Approach</th>
                                            <th class="px-4 py-3 text-left">Impact Level</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-gray-200">
                                        <tr class="hover:bg-gray-50">
                                            <td class="px-4 py-3 font-medium">Customer Service</td>
                                            <td class="px-4 py-3">Manual ticket routing</td>
                                            <td class="px-4 py-3">Intelligent chatbots + sentiment analysis</td>
                                            <td class="px-4 py-3">🔥🔥🔥 High</td>
                                        </tr>
                                        <tr class="hover:bg-gray-50">
                                            <td class="px-4 py-3 font-medium">Marketing</td>
                                            <td class="px-4 py-3">Demographic targeting</td>
                                            <td class="px-4 py-3">Behavioral prediction + personalization</td>
                                            <td class="px-4 py-3">🔥🔥🔥 High</td>
                                        </tr>
                                        <tr class="hover:bg-gray-50">
                                            <td class="px-4 py-3 font-medium">Operations</td>
                                            <td class="px-4 py-3">Scheduled maintenance</td>
                                            <td class="px-4 py-3">Predictive maintenance + optimization</td>
                                            <td class="px-4 py-3">🔥🔥 Medium</td>
                                        </tr>
                                        <tr class="hover:bg-gray-50">
                                            <td class="px-4 py-3 font-medium">Finance</td>
                                            <td class="px-4 py-3">Historical analysis</td>
                                            <td class="px-4 py-3">Real-time fraud detection + forecasting</td>
                                            <td class="px-4 py-3">🔥🔥🔥 High</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            
                            <h4 class="font-semibold mb-3">Key Strategic Principles</h4>
                            <div class="space-y-4">
                                <div class="border-l-4 border-orange-500 pl-4">
                                    <h5 class="font-medium">1. Start with Business Problems, Not Technology</h5>
                                    <p class="text-gray-600">I've seen too many organizations fall in love with AI technology without understanding the business problem they're solving. Always start with: "What business outcome do we want to achieve?"</p>
                                </div>
                                <div class="border-l-4 border-orange-500 pl-4">
                                    <h5 class="font-medium">2. Build Data Infrastructure First</h5>
                                    <p class="text-gray-600">AI is only as good as your data. Before implementing any AI solution, ensure you have clean, accessible, and well-governed data infrastructure.</p>
                                </div>
                                <div class="border-l-4 border-orange-500 pl-4">
                                    <h5 class="font-medium">3. Focus on Change Management</h5>
                                    <p class="text-gray-600">The biggest AI failures I've witnessed weren't technical—they were organizational. People need to understand, trust, and adopt AI solutions for them to succeed.</p>
                                </div>
                            </div>
                        </div>
                        """
                    },
                    {
                        "id": 2,
                        "title": "📊 Module 2: Business Impact Assessment",
                        "content": """
                        <div class="mb-6">
                            <h3 class="text-lg font-semibold mb-4">Measuring AI Business Impact</h3>
                            <p class="mb-4">Here's what I've learned about measuring AI success: if you can't measure it, you can't manage it. Let me show you the frameworks that actually work in practice.</p>
                            
                            <div class="overflow-x-auto mb-6">
                                <table class="min-w-full bg-white border border-gray-200">
                                    <thead class="bg-orange-500 text-white">
                                        <tr>
                                            <th class="px-4 py-3 text-left">Metric Category</th>
                                            <th class="px-4 py-3 text-left">Key Indicators</th>
                                            <th class="px-4 py-3 text-left">Measurement Method</th>
                                            <th class="px-4 py-3 text-left">Timeline</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-gray-200">
                                        <tr>
                                            <td class="px-4 py-3 font-medium">Efficiency Gains</td>
                                            <td class="px-4 py-3">Time saved, Cost reduction</td>
                                            <td class="px-4 py-3">Before/after analysis</td>
                                            <td class="px-4 py-3">3-6 months</td>
                                        </tr>
                                        <tr>
                                            <td class="px-4 py-3 font-medium">Revenue Impact</td>
                                            <td class="px-4 py-3">New revenue streams, Conversion rates</td>
                                            <td class="px-4 py-3">A/B testing, Attribution modeling</td>
                                            <td class="px-4 py-3">6-12 months</td>
                                        </tr>
                                        <tr>
                                            <td class="px-4 py-3 font-medium">Customer Experience</td>
                                            <td class="px-4 py-3">Satisfaction scores, Response times</td>
                                            <td class="px-4 py-3">Surveys, Analytics</td>
                                            <td class="px-4 py-3">1-3 months</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            
                            <div class="bg-green-50 p-4 rounded-lg mb-4">
                                <h4 class="font-semibold text-green-900 mb-2">💡 Pro Tip from Experience</h4>
                                <p class="text-green-800">Always establish baseline metrics BEFORE implementing AI. I've seen countless projects fail to demonstrate value because they didn't measure the "before" state properly.</p>
                            </div>
                        </div>
                        """
                    }
                ],
                "exercises": [
                    {
                        "id": 1,
                        "title": "AI Strategy Canvas",
                        "description": "Complete a strategic planning canvas for your organization's AI initiative",
                        "download_url": "/downloads/ai-strategy-canvas.pdf"
                    },
                    {
                        "id": 2,
                        "title": "ROI Calculator",
                        "description": "Calculate potential return on investment for AI projects",
                        "download_url": "/downloads/ai-roi-calculator.xlsx"
                    }
                ],
                "resources": [
                    {
                        "id": 1,
                        "title": "MIT AI Strategy Guide",
                        "description": "Comprehensive guide to AI strategy from MIT Sloan",
                        "url": "https://mitsloan.mit.edu/ideas-made-to-matter/artificial-intelligence-strategy"
                    },
                    {
                        "id": 2,
                        "title": "Harvard Business Review: AI Strategy",
                        "description": "Collection of articles on AI strategy and implementation",
                        "url": "https://hbr.org/topic/artificial-intelligence"
                    },
                    {
                        "id": 3,
                        "title": "Deloitte AI Maturity Assessment",
                        "description": "Framework for assessing organizational AI readiness",
                        "url": "https://www2.deloitte.com/us/en/insights/focus/cognitive-technologies.html"
                    }
                ]
            }
        ]
    }
    
    # Save course 1
    with open(f"{content_dir}/course_1.json", "w") as f:
        json.dump(course1, f, indent=2)
    
    print("Created course content JSON files successfully!")
    print(f"Content saved to: {content_dir}/")

if __name__ == "__main__":
    create_json_content()
