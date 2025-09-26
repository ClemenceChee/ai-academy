
import React from 'react';
import { Grid3X3, Target, Brain, BarChart3, Shield, CheckCircle } from 'lucide-react';

const ContentMatrix = () => {
  // Enhanced Learning track explanations
  const trackExplanations = [
    {
      title: 'Leadership Track',
      icon: Target,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      description: 'Designed for executives, managers, and team leaders who need to understand AI strategy and guide organizational transformation.',
      rationale: 'At B____, leadership is about more than just managing teams; it’s about steering the company towards a future where we leverage technology to create better language learning experiences. AI is at the heart of this transformation. This track is designed to equip leaders with the strategic mindset and practical knowledge to identify high-impact AI opportunities, build compelling business cases for investment, and foster a culture of data-driven innovation. It’s not just about understanding the technology; it’s about leading the change that will keep B____ at the forefront of the industry.',
      outcomes: [
        'Develop and articulate a clear AI vision and strategy for your team and the wider organization.',
        'Identify and prioritize AI initiatives that align with B____’s strategic goals and deliver measurable business value.',
        'Build and present a compelling business case for AI investment to secure buy-in from stakeholders.',
        'Lead and inspire a culture of data-driven decision-making and experimentation.',
        'Understand and mitigate the ethical risks associated with AI, ensuring that B____’s use of AI is responsible and trustworthy.',
        'Effectively guide your teams through the organizational changes that come with AI adoption.'
      ]
    },
    {
      title: 'Product Track',
      icon: Brain,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      description: 'Tailored for product managers, product owners, and those involved in AI product development and strategy.',
      rationale: 'As a product manager at B____, you are the voice of the user. In the age of AI, this means understanding how to leverage AI to create more personalized, engaging, and effective learning experiences. This track will give you the skills to not only dream up innovative AI-powered features, but also to work effectively with data scientists and engineers to bring them to life. You will learn how to define and prioritize AI features, manage the unique lifecycle of AI products, and make data-driven decisions that balance user needs with technical feasibility.',
      outcomes: [
        'Define and prioritize AI features that solve real user problems and deliver business value.',
        'Master the AI product lifecycle, from ideation and prototyping to launch and iteration.',
        'Collaborate effectively with data scientists and engineers, speaking their language and understanding their challenges.',
        'Use data to make informed decisions about product strategy, feature prioritization, and model performance.',
        'Develop a deep understanding of the ethical considerations of AI and how to build products that are fair, transparent, and accountable.',
        'Measure the success of AI products and communicate their value to stakeholders.'
      ]
    },
    {
      title: 'Developer Track',
      icon: BarChart3,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      description: 'Focused on software developers, engineers, and technical professionals implementing AI systems.',
      rationale: 'As a developer at B____, you are the architect of our learning platform. The rise of AI presents a huge opportunity to build more intelligent, personalized, and effective learning experiences for our users. This track is designed to give you the practical skills you need to build, deploy, and maintain AI models in production. You will learn about the latest machine learning algorithms, MLOps best practices, and how to build scalable and reliable AI systems. This is your chance to become a leader in the next generation of software development.',
      outcomes: [
        'Implement a wide range of machine learning models, from classic algorithms to deep neural networks.',
        'Master the tools and practices of MLOps to build robust and scalable AI systems.',
        'Deploy machine learning models to production and monitor their performance over time.',
        'Understand the trade-offs between different machine learning algorithms and choose the right one for the job.',
        'Collaborate effectively with data scientists and product managers to build end-to-end AI solutions.',
        'Write clean, efficient, and well-documented code for machine learning applications.'
      ]
    },
    {
      title: 'Compliance Track',
      icon: Shield,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      description: 'Essential for all roles dealing with AI compliance, data protection, and regulatory requirements.',
      rationale: 'At B____, we are committed to protecting our users’ data and privacy. The increasing use of AI creates new compliance challenges, and it is essential that everyone at B____ understands their responsibilities. This track is designed to provide you with a comprehensive understanding of the legal and ethical landscape of AI, including GDPR, the EU AI Act, and other relevant regulations. You will learn how to identify and mitigate compliance risks, conduct Data Protection Impact Assessments (DPIAs), and ensure that our use of AI is always responsible and trustworthy.',
      outcomes: [
        'Develop a deep understanding of the legal and ethical landscape of AI, including GDPR and the EU AI Act.',
        'Identify and mitigate compliance risks associated with AI.',
        'Conduct Data Protection Impact Assessments (DPIAs) for AI projects.',
        'Manage Data Subject Access Requests (DSARs) and other user rights requests.',
        'Develop and implement internal AI usage policies and guidelines.',
        'Advise your team and the wider organization on AI compliance best practices.'
      ]
    }
  ];

  // Enhanced Content areas and their coverage across tracks
  const contentMatrix = [
    {
      area: 'AI Strategy & Planning',
      description: 'Strategic planning and organizational AI roadmaps',
      leadership: true,
      product: true,
      developer: false,
      compliance: false
    },
    {
      area: 'Ethics & Governance',
      description: 'AI ethics frameworks and governance structures',
      leadership: true,
      product: true,
      developer: false,
      compliance: true
    },
    {
      area: 'Technical Implementation',
      description: 'Hands-on AI development and deployment',
      leadership: false,
      product: false,
      developer: true,
      compliance: false
    },
    {
      area: 'Product Management',
      description: 'AI product development and lifecycle management',
      leadership: false,
      product: true,
      developer: false,
      compliance: false
    },
    {
      area: 'Data-Driven Decisions',
      description: 'Using data and AI for informed decision making',
      leadership: true,
      product: true,
      developer: false,
      compliance: false
    },
    {
      area: 'MLOps & Production',
      description: 'Model deployment, monitoring, and maintenance',
      leadership: false,
      product: false,
      developer: true,
      compliance: false
    },
    {
      area: 'GDPR Compliance',
      description: 'Data protection and privacy in AI systems',
      leadership: false,
      product: false,
      developer: false,
      compliance: true
    },
    {
      area: 'CCPA & EU AI Act',
      description: 'Regulatory compliance for AI implementations',
      leadership: false,
      product: false,
      developer: false,
      compliance: true
    },
    {
      area: 'Safe AI Usage',
      description: 'Risk management and safe AI implementation',
      leadership: true,
      product: true,
      developer: true,
      compliance: true
    },
    {
      area: 'Change Management',
      description: 'Organizational transformation and adoption',
      leadership: true,
      product: false,
      developer: false,
      compliance: false
    },
    {
      area: 'AI Integration Patterns',
      description: 'Technical patterns for AI system integration',
      leadership: false,
      product: false,
      developer: true,
      compliance: false
    },
    {
      area: 'Risk Assessment',
      description: 'Identifying and mitigating AI-related risks',
      leadership: true,
      product: true,
      developer: false,
      compliance: true
    },
    {
        area: 'Reinforcement Learning',
        description: 'Learning from interaction with an environment',
        leadership: false,
        product: false,
        developer: true,
        compliance: false
    },
    {
        area: 'Feature Engineering',
        description: 'Creating and selecting features for models',
        leadership: false,
        product: false,
        developer: true,
        compliance: false
    },
    {
        area: 'Model Selection',
        description: 'Choosing the right model for the task',
        leadership: false,
        product: false,
        developer: true,
        compliance: false
    },
    {
        area: 'Hyperparameter Tuning',
        description: 'Optimizing model performance',
        leadership: false,
        product: false,
        developer: true,
        compliance: false
    },
    {
        area: 'Ensemble Methods',
        description: 'Combining multiple models for better results',
        leadership: false,
        product: false,
        developer: true,
        compliance: false
    },
    {
        area: 'Neural Networks and Deep Learning',
        description: 'Building and training neural networks',
        leadership: false,
        product: false,
        developer: true,
        compliance: false
    },
    {
        area: 'Productionizing Machine Learning Models',
        description: 'Deploying and maintaining models in production',
        leadership: false,
        product: false,
        developer: true,
        compliance: false
    },
    {
        area: 'Data Engineering for MLOps',
        description: 'Building and maintaining data pipelines',
        leadership: false,
        product: false,
        developer: true,
        compliance: false
    },
    {
        area: 'Model Engineering for MLOps',
        description: 'Building and training models for production',
        leadership: false,
        product: false,
        developer: true,
        compliance: false
    },
    {
        area: 'Model Deployment',
        description: 'Deploying models to production',
        leadership: false,
        product: false,
        developer: true,
        compliance: false
    },
    {
        area: 'AI Ethics for Product Managers',
        description: 'Ethical considerations in AI product development',
        leadership: false,
        product: true,
        developer: false,
        compliance: true
    },
    {
        area: 'The Future of AI Product Management',
        description: 'Emerging trends and the evolving role of the PM',
        leadership: true,
        product: true,
        developer: false,
        compliance: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Grid3X3 className="h-16 w-16 text-orange-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Content Matrix</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive overview of learning content distribution across different roles and tracks within B____ teams.
          </p>
        </div>

        {/* Detailed Learning Track Explanations */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Why Each Track Requires Specific Learning Content
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {trackExplanations.map((track, index) => {
              const Icon = track.icon;
              return (
                <div
                  key={index}
                  className={`${track.bgColor} ${track.borderColor} border-2 rounded-xl p-6 hover:shadow-lg transition-all duration-200`}
                >
                  <div className="flex items-center mb-4">
                    <div className={`bg-white p-3 rounded-lg mr-4 shadow-sm`}>
                      <Icon className={`h-6 w-6 ${track.color}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {track.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {track.description}
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Learning Rationale:</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {track.rationale}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Key Learning Outcomes:</h4>
                    <ul className="space-y-1">
                      {track.outcomes.map((outcome, outcomeIndex) => (
                        <li key={outcomeIndex} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Content Coverage Matrix */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-orange-500 to-red-500">
            <h2 className="text-2xl font-bold text-white text-center">
              Content Coverage Matrix
            </h2>
            <p className="text-orange-100 text-center mt-2">
              Which content areas are covered in each learning track
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Content Area
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-orange-600">
                    Leadership
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-blue-600">
                    Product
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-green-600">
                    Developer
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-purple-600">
                    Compliance
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {contentMatrix.map((content, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{content.area}</div>
                        <div className="text-sm text-gray-500">{content.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {content.leadership ? (
                        <CheckCircle className="h-5 w-5 text-orange-500 mx-auto" />
                      ) : (
                        <div className="h-5 w-5 mx-auto"></div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {content.product ? (
                        <CheckCircle className="h-5 w-5 text-blue-500 mx-auto" />
                      ) : (
                        <div className="h-5 w-5 mx-auto"></div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {content.developer ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <div className="h-5 w-5 mx-auto"></div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {content.compliance ? (
                        <CheckCircle className="h-5 w-5 text-purple-500 mx-auto" />
                      ) : (
                        <div className="h-5 w-5 mx-auto"></div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Learning Path Guidance */}
        <div className="mt-16 bg-gradient-to-r from-orange-50 to-blue-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Learning Path Recommendations
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">For Beginners</h3>
              <p className="text-gray-600 mb-4">
                New to AI? Start with foundational concepts and gradually build expertise.
              </p>
              <ol className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center">
                  <span className="bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3">1</span>
                  Begin with Safe AI Usage Guidelines (Compliance Track)
                </li>
                <li className="flex items-center">
                  <span className="bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3">2</span>
                  Choose your role-specific track (Leadership, Product, or Developer)
                </li>
                <li className="flex items-center">
                  <span className="bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3">3</span>
                  Complete compliance training relevant to your role
                </li>
              </ol>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">For Experienced Users</h3>
              <p className="text-gray-600 mb-4">
                Already familiar with AI? Focus on advanced topics and cross-functional knowledge.
              </p>
              <ol className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center">
                  <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3">1</span>
                  Explore advanced courses in your primary track
                </li>
                <li className="flex items-center">
                  <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3">2</span>
                  Take courses from complementary tracks for broader perspective
                </li>
                <li className="flex items-center">
                  <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3">3</span>
                  Stay updated with latest compliance requirements
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentMatrix;

