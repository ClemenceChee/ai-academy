import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, ExternalLink, Download, CheckCircle } from 'lucide-react';

const EnhancedLessonView = () => {
  const { courseId, lessonId } = useParams();
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  // Enhanced content with comprehensive visual learning materials
  const enhancedContent = {
    1: {
      1: {
        title: "AI Strategy for Leadership",
        duration: "6 hours",
        modules: [
          {
            id: "strategic-overview",
            title: "🚀 Module 1: Strategic AI Overview",
            content: `
              <div class="space-y-6">
                <div class="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                  <h3 class="text-lg font-semibold text-blue-900 mb-3">Learning Objectives</h3>
                  <p class="text-blue-800">By the end of this module, you will understand the strategic foundations of AI implementation and be able to develop a comprehensive AI strategy for your organization.</p>
                </div>

                <img src="/ai-strategy-framework.png" alt="AI Strategy Framework" class="w-full max-h-96 object-contain mx-auto shadow-lg rounded-lg" />

                <h4 class="text-xl font-semibold text-gray-800 mt-6">Understanding AI's Strategic Impact</h4>
                <p class="text-gray-700 leading-relaxed">As your instructor with 12 years of experience building AI products, I want you to understand that AI strategy isn't just about technology—it's about transformation. The framework above shows the five critical pillars that every successful AI strategy must address.</p>

                <div class="overflow-x-auto">
                  <table class="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                    <thead class="bg-orange-500 text-white">
                      <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Business Function</th>
                        <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Traditional Approach</th>
                        <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">AI-Enhanced Approach</th>
                        <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Impact Level</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      <tr class="bg-white">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Customer Service</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Manual ticket routing</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Intelligent chatbots + sentiment analysis</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-semibold">🔥🔥🔥 High</td>
                      </tr>
                      <tr class="bg-gray-50">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Marketing</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Demographic targeting</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Behavioral prediction + personalization</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-semibold">🔥🔥🔥 High</td>
                      </tr>
                      <tr class="bg-white">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Operations</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Scheduled maintenance</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Predictive maintenance + optimization</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-orange-600 font-semibold">🔥🔥 Medium</td>
                      </tr>
                      <tr class="bg-gray-50">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Finance</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Historical analysis</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Real-time fraud detection + forecasting</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-semibold">🔥🔥🔥 High</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <img src="/gartner-ai-strategy.png" alt="Gartner AI Strategy Framework" class="w-full max-h-96 object-contain mx-auto shadow-lg rounded-lg mt-6" />

                <h4 class="text-xl font-semibold text-gray-800 mt-6">Step-by-Step Strategic Implementation</h4>
                <div class="bg-gray-50 p-6 rounded-lg">
                  <h5 class="font-semibold text-gray-800 mb-3">Phase 1: Assessment (Weeks 1-4)</h5>
                  <ul class="space-y-2 text-gray-700">
                    <li class="flex items-start"><span class="text-green-500 mr-2">✓</span>Conduct AI readiness assessment</li>
                    <li class="flex items-start"><span class="text-green-500 mr-2">✓</span>Identify high-impact use cases</li>
                    <li class="flex items-start"><span class="text-green-500 mr-2">✓</span>Evaluate current data infrastructure</li>
                    <li class="flex items-start"><span class="text-green-500 mr-2">✓</span>Assess team capabilities and gaps</li>
                  </ul>
                </div>
              </div>
            `
          },
          {
            id: "business-impact",
            title: "📊 Module 2: Business Impact Assessment",
            content: `
              <div class="space-y-6">
                <div class="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
                  <h3 class="text-lg font-semibold text-green-900 mb-3">ROI Calculation Framework</h3>
                  <p class="text-green-800">Learn to calculate and present the business case for AI investments with proven methodologies.</p>
                </div>

                <h4 class="text-xl font-semibold text-gray-800">Measuring AI Business Impact</h4>
                <p class="text-gray-700 leading-relaxed">In my experience working with Fortune 500 companies, the key to successful AI adoption is demonstrating clear business value. Here's the framework I use to calculate ROI for AI initiatives.</p>

                <div class="overflow-x-auto">
                  <table class="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                    <thead class="bg-orange-500 text-white">
                      <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Metric Category</th>
                        <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Measurement Method</th>
                        <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Typical ROI Range</th>
                        <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Time to Value</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      <tr class="bg-white">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Cost Reduction</td>
                        <td class="px-6 py-4 text-sm text-gray-500">Labor hours saved × hourly rate</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">200-400%</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">3-6 months</td>
                      </tr>
                      <tr class="bg-gray-50">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Revenue Growth</td>
                        <td class="px-6 py-4 text-sm text-gray-500">Conversion rate improvement × volume</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">150-300%</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">6-12 months</td>
                      </tr>
                      <tr class="bg-white">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Risk Mitigation</td>
                        <td class="px-6 py-4 text-sm text-gray-500">Error reduction × cost per error</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">300-500%</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1-3 months</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div class="bg-blue-50 p-6 rounded-lg mt-6">
                  <h5 class="font-semibold text-blue-900 mb-3">Practical Exercise: ROI Calculator</h5>
                  <p class="text-blue-800 mb-4">Use this framework to calculate ROI for your specific use case:</p>
                  <div class="space-y-3 text-blue-800">
                    <div><strong>Step 1:</strong> Current Cost = (Hours spent × Hourly rate) + Error costs</div>
                    <div><strong>Step 2:</strong> AI Solution Cost = Technology + Implementation + Maintenance</div>
                    <div><strong>Step 3:</strong> Annual Savings = Current Cost - AI Solution Cost</div>
                    <div><strong>Step 4:</strong> ROI = (Annual Savings / AI Solution Cost) × 100</div>
                  </div>
                </div>
              </div>
            `
          }
        ],
        practicalExercises: [
          {
            title: "AI Strategy Canvas",
            description: "Complete strategic planning template",
            downloadUrl: "#"
          },
          {
            title: "ROI Calculator Spreadsheet",
            description: "Calculate business impact",
            downloadUrl: "#"
          }
        ],
        externalResources: [
          {
            title: "MIT AI Strategy Guide",
            url: "https://mitsloan.mit.edu/ideas-made-to-matter/artificial-intelligence-strategy",
            description: "Comprehensive AI strategy framework from MIT"
          },
          {
            title: "Harvard Business Review - AI Strategy",
            url: "https://hbr.org/topic/artificial-intelligence",
            description: "Latest insights on AI business strategy"
          }
        ]
      }
    },
    2: {
      1: {
        title: "GDPR Compliance for AI Systems",
        duration: "6 hours",
        modules: [
          {
            id: "gdpr-framework",
            title: "⚖️ Module 1: GDPR Legal Framework for AI",
            content: `
              <div class="space-y-6">
                <div class="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
                  <h3 class="text-lg font-semibold text-red-900 mb-3">Critical Compliance Alert</h3>
                  <p class="text-red-800">GDPR violations can result in fines up to €20M or 4% of global turnover. This module will ensure your AI systems are compliant.</p>
                </div>

                <img src="/gdpr-rights-infographic.png" alt="GDPR Individual Rights" class="w-full max-h-96 object-contain mx-auto shadow-lg rounded-lg" />

                <h4 class="text-xl font-semibold text-gray-800">Understanding GDPR in AI Context</h4>
                <p class="text-gray-700 leading-relaxed">As a legal practitioner specializing in AI compliance for 8 years, I've seen organizations struggle with GDPR compliance for AI systems. The key is understanding that GDPR wasn't written with AI in mind, so we must interpret its principles carefully.</p>

                <div class="overflow-x-auto">
                  <table class="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                    <thead class="bg-orange-500 text-white">
                      <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">GDPR Principle</th>
                        <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">AI Challenge</th>
                        <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Compliance Solution</th>
                        <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Risk Level</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      <tr class="bg-white">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Purpose Limitation</td>
                        <td class="px-6 py-4 text-sm text-gray-500">AI discovers new data uses</td>
                        <td class="px-6 py-4 text-sm text-gray-500">Compatible purpose assessment</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-semibold">🔴 High</td>
                      </tr>
                      <tr class="bg-gray-50">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Data Minimization</td>
                        <td class="px-6 py-4 text-sm text-gray-500">AI needs large datasets</td>
                        <td class="px-6 py-4 text-sm text-gray-500">Privacy-preserving techniques</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-orange-600 font-semibold">🟡 Medium</td>
                      </tr>
                      <tr class="bg-white">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Transparency</td>
                        <td class="px-6 py-4 text-sm text-gray-500">Black box algorithms</td>
                        <td class="px-6 py-4 text-sm text-gray-500">Explainable AI implementation</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-semibold">🔴 High</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div class="bg-yellow-50 p-6 rounded-lg mt-6">
                  <h5 class="font-semibold text-yellow-900 mb-3">Compliance Checklist</h5>
                  <div class="space-y-2 text-yellow-800">
                    <div class="flex items-start"><span class="text-green-500 mr-2">☐</span>Legal basis identified for AI processing</div>
                    <div class="flex items-start"><span class="text-green-500 mr-2">☐</span>Privacy notice updated for AI use</div>
                    <div class="flex items-start"><span class="text-green-500 mr-2">☐</span>Data subject rights procedures established</div>
                    <div class="flex items-start"><span class="text-green-500 mr-2">☐</span>Automated decision-making safeguards implemented</div>
                  </div>
                </div>
              </div>
            `
          },
          {
            id: "privacy-design",
            title: "🔒 Module 2: Privacy by Design for AI",
            content: `
              <div class="space-y-6">
                <h4 class="text-xl font-semibold text-gray-800">Implementing Privacy by Design</h4>
                <p class="text-gray-700 leading-relaxed">Privacy by Design isn't optional—it's a legal requirement under GDPR. Here's how to build privacy into your AI systems from the ground up.</p>

                <div class="overflow-x-auto">
                  <table class="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                    <thead class="bg-orange-500 text-white">
                      <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Privacy Technique</th>
                        <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">AI Application</th>
                        <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Implementation Complexity</th>
                        <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Privacy Level</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      <tr class="bg-white">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Differential Privacy</td>
                        <td class="px-6 py-4 text-sm text-gray-500">Training data protection</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-orange-600">Medium</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">🟢 High</td>
                      </tr>
                      <tr class="bg-gray-50">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Federated Learning</td>
                        <td class="px-6 py-4 text-sm text-gray-500">Decentralized training</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-red-600">High</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">🟢 High</td>
                      </tr>
                      <tr class="bg-white">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Homomorphic Encryption</td>
                        <td class="px-6 py-4 text-sm text-gray-500">Encrypted computation</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-red-600">Very High</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">🟢 Very High</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            `
          }
        ],
        practicalExercises: [
          {
            title: "GDPR Compliance Workbook",
            description: "Step-by-step compliance assessment",
            downloadUrl: "#"
          }
        ],
        externalResources: [
          {
            title: "ICO AI Guidance",
            url: "https://ico.org.uk/for-organisations/guide-to-data-protection/key-dp-themes/artificial-intelligence/",
            description: "Official UK regulator guidance on AI and data protection"
          },
          {
            title: "EDPB Guidelines on AI",
            url: "https://edpb.europa.eu/our-work-tools/documents/public-consultations_en",
            description: "European Data Protection Board guidance"
          }
        ]
      }
    },
    3: {
      1: {
        title: "AI Product Management",
        duration: "8 hours",
        modules: [
          {
            id: "ai-product-strategy",
            title: "🎯 Module 1: AI Product Strategy",
            content: `
              <div class="space-y-6">
                <div class="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
                  <h3 class="text-lg font-semibold text-purple-900 mb-3">Product Management Excellence</h3>
                  <p class="text-purple-800">Master the unique challenges of managing AI products with frameworks from 12 years of product management experience.</p>
                </div>

                <img src="/ai-product-management-framework.png" alt="AI Product Management Framework" class="w-full max-h-96 object-contain mx-auto shadow-lg rounded-lg" />

                <h4 class="text-xl font-semibold text-gray-800">AI Product Strategy Framework</h4>
                <p class="text-gray-700 leading-relaxed">As a product manager who has launched 15+ AI products, I've learned that traditional PM frameworks need adaptation for AI. Here's the comprehensive framework I use for AI product strategy.</p>

                <div class="overflow-x-auto">
                  <table class="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                    <thead class="bg-orange-500 text-white">
                      <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">AI Product Type</th>
                        <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Key Challenges</th>
                        <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Success Metrics</th>
                        <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Time to Market</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      <tr class="bg-white">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Recommendation Engine</td>
                        <td class="px-6 py-4 text-sm text-gray-500">Cold start, data sparsity</td>
                        <td class="px-6 py-4 text-sm text-gray-500">CTR, conversion rate</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-green-600">3-6 months</td>
                      </tr>
                      <tr class="bg-gray-50">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Computer Vision</td>
                        <td class="px-6 py-4 text-sm text-gray-500">Data quality, edge cases</td>
                        <td class="px-6 py-4 text-sm text-gray-500">Accuracy, precision, recall</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-orange-600">6-12 months</td>
                      </tr>
                      <tr class="bg-white">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">NLP/Chatbot</td>
                        <td class="px-6 py-4 text-sm text-gray-500">Intent recognition, context</td>
                        <td class="px-6 py-4 text-sm text-gray-500">User satisfaction, resolution rate</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-orange-600">4-8 months</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            `
          }
        ],
        practicalExercises: [
          {
            title: "AI Product Strategy Canvas",
            description: "Complete product strategy framework",
            downloadUrl: "#"
          }
        ],
        externalResources: [
          {
            title: "Google AI Product Management",
            url: "https://ai.google/education/",
            description: "Google's comprehensive AI product management resources"
          }
        ]
      }
    },
    4: {
      1: {
        title: "Machine Learning for Developers",
        duration: "10 hours",
        modules: [
          {
            id: "ml-fundamentals",
            title: "🤖 Module 1: ML Fundamentals",
            content: `
              <div class="space-y-6">
                <div class="bg-indigo-50 p-6 rounded-lg border-l-4 border-indigo-500">
                  <h3 class="text-lg font-semibold text-indigo-900 mb-3">No Math PhD Required</h3>
                  <p class="text-indigo-800">Learn machine learning through intuition and practical implementation, not complex mathematics.</p>
                </div>

                <img src="/ml-workflow-diagram.png" alt="ML Workflow" class="w-full max-h-96 object-contain mx-auto shadow-lg rounded-lg" />

                <h4 class="text-xl font-semibold text-gray-800">Understanding Machine Learning</h4>
                <p class="text-gray-700 leading-relaxed">As a developer who has built ML systems for 8 years, I believe in teaching ML through practical understanding rather than mathematical theory. Let's start with what ML actually does.</p>

                <div class="overflow-x-auto">
                  <table class="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                    <thead class="bg-orange-500 text-white">
                      <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Algorithm Type</th>
                        <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Best Use Cases</th>
                        <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Data Requirements</th>
                        <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Complexity</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      <tr class="bg-white">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Linear Regression</td>
                        <td class="px-6 py-4 text-sm text-gray-500">Price prediction, forecasting</td>
                        <td class="px-6 py-4 text-sm text-gray-500">100+ samples</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-green-600">Low</td>
                      </tr>
                      <tr class="bg-gray-50">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Random Forest</td>
                        <td class="px-6 py-4 text-sm text-gray-500">Classification, feature importance</td>
                        <td class="px-6 py-4 text-sm text-gray-500">1000+ samples</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-orange-600">Medium</td>
                      </tr>
                      <tr class="bg-white">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Neural Networks</td>
                        <td class="px-6 py-4 text-sm text-gray-500">Complex patterns, images, text</td>
                        <td class="px-6 py-4 text-sm text-gray-500">10000+ samples</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-red-600">High</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <img src="/ml-pipeline-design-patterns.png" alt="ML Pipeline Design Patterns" class="w-full max-h-96 object-contain mx-auto shadow-lg rounded-lg mt-6" />
              </div>
            `
          }
        ],
        practicalExercises: [
          {
            title: "Algorithm Selection Workbook",
            description: "Choose the right algorithm for your use case",
            downloadUrl: "#"
          }
        ],
        externalResources: [
          {
            title: "Scikit-learn Documentation",
            url: "https://scikit-learn.org/stable/",
            description: "Comprehensive ML library documentation"
          }
        ]
      }
    },
    5: {
      1: {
        title: "Safe AI Usage Guidelines",
        duration: "4 hours",
        modules: [
          {
            id: "ai-safety-principles",
            title: "🛡️ Module 1: AI Safety Principles",
            content: `
              <div class="space-y-6">
                <div class="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
                  <h3 class="text-lg font-semibold text-red-900 mb-3">Safety First Approach</h3>
                  <p class="text-red-800">Learn from 10 years of AI failures to build safe, responsible AI systems that protect users and organizations.</p>
                </div>

                <img src="/nist-ai-risk-framework.png" alt="NIST AI Risk Management Framework" class="w-full max-h-96 object-contain mx-auto shadow-lg rounded-lg" />

                <h4 class="text-xl font-semibold text-gray-800">AI Safety Framework</h4>
                <p class="text-gray-700 leading-relaxed">After witnessing numerous AI failures over the past decade, I've developed this comprehensive safety framework. The NIST framework above provides the foundation for responsible AI development.</p>

                <div class="overflow-x-auto">
                  <table class="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                    <thead class="bg-orange-500 text-white">
                      <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Risk Category</th>
                        <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Common Failures</th>
                        <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Mitigation Strategy</th>
                        <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Priority Level</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      <tr class="bg-white">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Bias & Fairness</td>
                        <td class="px-6 py-4 text-sm text-gray-500">Discriminatory outcomes</td>
                        <td class="px-6 py-4 text-sm text-gray-500">Bias testing, diverse datasets</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-semibold">🔴 Critical</td>
                      </tr>
                      <tr class="bg-gray-50">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Privacy</td>
                        <td class="px-6 py-4 text-sm text-gray-500">Data leakage, re-identification</td>
                        <td class="px-6 py-4 text-sm text-gray-500">Differential privacy, anonymization</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-semibold">🔴 Critical</td>
                      </tr>
                      <tr class="bg-white">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Robustness</td>
                        <td class="px-6 py-4 text-sm text-gray-500">Adversarial attacks, drift</td>
                        <td class="px-6 py-4 text-sm text-gray-500">Monitoring, validation</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-orange-600 font-semibold">🟡 High</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            `
          }
        ],
        practicalExercises: [
          {
            title: "AI Safety Checklist",
            description: "Comprehensive safety assessment tool",
            downloadUrl: "#"
          }
        ],
        externalResources: [
          {
            title: "Partnership on AI",
            url: "https://partnershiponai.org/",
            description: "Industry collaboration on AI safety"
          }
        ]
      }
    },
    6: {
      1: {
        title: "MLOps and Production AI",
        duration: "4 hours",
        modules: [
          {
            id: "mlops-fundamentals",
            title: "🔧 Module 1: MLOps Fundamentals",
            content: `
              <div class="space-y-6">
                <div class="bg-teal-50 p-6 rounded-lg border-l-4 border-teal-500">
                  <h3 class="text-lg font-semibold text-teal-900 mb-3">Production-Ready AI</h3>
                  <p class="text-teal-800">Learn to deploy and maintain AI systems at scale with enterprise-grade MLOps practices.</p>
                </div>

                <img src="/mlops-pipeline-architecture.png" alt="MLOps Pipeline Architecture" class="w-full max-h-96 object-contain mx-auto shadow-lg rounded-lg" />

                <h4 class="text-xl font-semibold text-gray-800">MLOps Implementation Strategy</h4>
                <p class="text-gray-700 leading-relaxed">Having deployed ML systems for Fortune 500 companies, I've learned that MLOps is critical for production success. The architecture above shows a complete MLOps pipeline.</p>

                <div class="overflow-x-auto">
                  <table class="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                    <thead class="bg-orange-500 text-white">
                      <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">MLOps Component</th>
                        <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Purpose</th>
                        <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Tools</th>
                        <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Maturity Level</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      <tr class="bg-white">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Model Training</td>
                        <td class="px-6 py-4 text-sm text-gray-500">Automated model development</td>
                        <td class="px-6 py-4 text-sm text-gray-500">MLflow, Kubeflow</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-green-600">Level 2</td>
                      </tr>
                      <tr class="bg-gray-50">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Model Deployment</td>
                        <td class="px-6 py-4 text-sm text-gray-500">Production serving</td>
                        <td class="px-6 py-4 text-sm text-gray-500">Kubernetes, Docker</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-orange-600">Level 3</td>
                      </tr>
                      <tr class="bg-white">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Monitoring</td>
                        <td class="px-6 py-4 text-sm text-gray-500">Performance tracking</td>
                        <td class="px-6 py-4 text-sm text-gray-500">Prometheus, Grafana</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-red-600">Level 4</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <img src="/data-science-process-framework.png" alt="Data Science Process Framework" class="w-full max-h-96 object-contain mx-auto shadow-lg rounded-lg mt-6" />
              </div>
            `
          }
        ],
        practicalExercises: [
          {
            title: "MLOps Implementation Guide",
            description: "Step-by-step deployment checklist",
            downloadUrl: "#"
          }
        ],
        externalResources: [
          {
            title: "Google MLOps Guide",
            url: "https://cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning",
            description: "Comprehensive MLOps implementation guide"
          }
        ]
      }
    }
  };

  const courseIdNum = parseInt(courseId);
  const lessonIdNum = parseInt(lessonId);
  const content = enhancedContent[courseIdNum]?.[lessonIdNum];

  if (!content) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Content Not Found</h2>
          <p className="text-gray-600 mb-6">The requested lesson content is not available.</p>
          <Link to="/courses" className="text-orange-600 hover:text-orange-700 font-medium">
            ← Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="mb-8">
            <Link to={`/course/${courseId}`} className="text-orange-600 hover:text-orange-700 font-medium mb-4 inline-block">
              ← Back to {content.title}
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{content.title}</h1>
            <p className="text-gray-600">Duration: {content.duration}</p>
          </div>

          {/* Interactive Modules */}
          <div className="space-y-6">
            {content.modules.map((module) => (
              <div key={module.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection(module.id)}
                  className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 flex items-center justify-between text-left transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-900">{module.title}</h3>
                  {expandedSections[module.id] ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                {expandedSections[module.id] && (
                  <div className="px-6 py-6 bg-white">
                    <div dangerouslySetInnerHTML={{ __html: module.content }} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Practical Exercises */}
          {content.practicalExercises && (
            <div className="mt-8 bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                <Download className="h-5 w-5 mr-2" />
                Practical Exercises
              </h3>
              <div className="space-y-3">
                {content.practicalExercises.map((exercise, index) => (
                  <div key={index} className="flex items-center justify-between bg-white p-4 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{exercise.title}</h4>
                      <p className="text-sm text-gray-600">{exercise.description}</p>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* External Resources */}
          {content.externalResources && (
            <div className="mt-8 bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
                <ExternalLink className="h-5 w-5 mr-2" />
                External Resources
              </h3>
              <div className="space-y-3">
                {content.externalResources.map((resource, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg">
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-green-700 hover:text-green-800 flex items-center"
                    >
                      {resource.title}
                      <ExternalLink className="h-4 w-4 ml-1" />
                    </a>
                    <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedLessonView;
