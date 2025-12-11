'use client';

import Link from 'next/link';
import { Activity, CheckCircle, FileText, Shield, TrendingUp, Users, Zap, ArrowRight, Database, Brain, Clock, Target } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-500"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-xl">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">HealthAI <span className="text-blue-400">Directory</span></span>
          </div>
          <div className="flex items-center space-x-6">
            <Link href="#features" className="text-gray-300 hover:text-white transition-colors">Features</Link>
            <Link href="#agents" className="text-gray-300 hover:text-white transition-colors">AI Agents</Link>
            <Link href="#kpis" className="text-gray-300 hover:text-white transition-colors">KPIs</Link>
            <Link href="/dashboard">
              <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-2.5 rounded-xl font-medium transition-all hover:scale-105 shadow-lg shadow-blue-500/25">
                Launch Dashboard
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-300 text-sm font-medium mb-8 backdrop-blur-sm">
            <Zap className="h-4 w-4 mr-2 text-yellow-400" />
            Powered by NVIDIA Mistral Large AI
          </div>
          <h1 className="text-7xl font-bold text-white mb-6 leading-tight">
            Healthcare Provider<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400">
              Directory Intelligence
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Transform your provider data management with AI-powered validation agents. 
            Achieve <span className="text-cyan-400 font-semibold">80%+ accuracy</span>, process 
            <span className="text-blue-400 font-semibold"> 500+ providers/hour</span>, and reduce manual validation time by 
            <span className="text-purple-400 font-semibold"> 90%</span>.
          </p>
          <div className="flex items-center justify-center space-x-4 mb-16">
            <Link href="/dashboard">
              <button className="group bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105 shadow-xl shadow-blue-500/25 flex items-center">
                Start Validation
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link href="/providers">
              <button className="bg-white/5 hover:bg-white/10 text-white px-10 py-4 rounded-xl font-semibold text-lg border border-white/10 transition-all backdrop-blur-sm">
                Upload Providers
              </button>
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { value: '80%+', label: 'Validation Accuracy', icon: Target, color: 'blue' },
              { value: '500+', label: 'Providers/Hour', icon: Clock, color: 'cyan' },
              { value: '85%+', label: 'PDF Extraction', icon: FileText, color: 'purple' },
              { value: '90%', label: 'Time Saved', icon: TrendingUp, color: 'green' }
            ].map((stat, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all hover:scale-105">
                <stat.icon className={`h-8 w-8 text-${stat.color}-400 mx-auto mb-3`} />
                <div className={`text-4xl font-bold text-${stat.color}-400 mb-1`}>{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Current Challenges Section */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">The Problem We Solve</h2>
            <p className="text-xl text-gray-400">Healthcare payers struggle with maintaining accurate provider directories</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { percentage: '80%+', issue: 'Provider entries contain errors', description: 'Incorrect addresses, phone numbers, professional details, license details' },
              { percentage: '40-80%', issue: 'Inaccurate contact info', description: 'Causing member frustration and access issues' },
              { percentage: 'Weeks', issue: 'Credential verification delays', description: 'Time-consuming processes delaying network additions' }
            ].map((item, idx) => (
              <div key={idx} className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-2xl p-8 backdrop-blur-sm">
                <div className="text-5xl font-bold text-red-400 mb-4">{item.percentage}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{item.issue}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Agents Section */}
      <div id="agents" className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Four Intelligent AI Agents</h2>
            <p className="text-xl text-gray-400">Working together to ensure data quality and compliance</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Database,
                title: 'Data Validation Agent',
                color: 'blue',
                tasks: [
                  'Web scraping of provider practice websites',
                  'Cross-reference against NPI registry & state licensing boards',
                  'Phone number and address validation',
                  'Generate confidence scores for each data element'
                ]
              },
              {
                icon: Brain,
                title: 'Information Enrichment Agent',
                color: 'purple',
                tasks: [
                  'Search public sources for additional provider info',
                  'Analyze provider websites and online profiles',
                  'Identify network gaps by geographic distribution',
                  'Create standardized profiles with enriched data'
                ]
              },
              {
                icon: Shield,
                title: 'Quality Assurance Agent',
                color: 'green',
                tasks: [
                  'Compare info across multiple sources',
                  'Flag suspicious or fraudulent information',
                  'Track data quality metrics and reports',
                  'Prioritize providers for manual verification'
                ]
              },
              {
                icon: FileText,
                title: 'Directory Management Agent',
                color: 'cyan',
                tasks: [
                  'Generate updated directory entries (web, mobile, PDF)',
                  'Create automated alerts for immediate attention',
                  'Produce summary reports with recommendations',
                  'Manage workflow queues for human reviewers'
                ]
              }
            ].map((agent, idx) => (
              <div key={idx} className={`bg-gradient-to-br from-${agent.color}-500/10 to-${agent.color}-600/5 border border-${agent.color}-500/20 rounded-2xl p-8 backdrop-blur-sm hover:border-${agent.color}-500/40 transition-all`}>
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`bg-${agent.color}-500/20 p-3 rounded-xl`}>
                    <agent.icon className={`h-8 w-8 text-${agent.color}-400`} />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">{agent.title}</h3>
                </div>
                <ul className="space-y-3">
                  {agent.tasks.map((task, taskIdx) => (
                    <li key={taskIdx} className="flex items-start space-x-3">
                      <CheckCircle className={`h-5 w-5 text-${agent.color}-400 mt-0.5 flex-shrink-0`} />
                      <span className="text-gray-300">{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Workflow Section */}
      <div id="features" className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Implementation Workflows</h2>
            <p className="text-xl text-gray-400">End-to-end automation for provider data management</p>
          </div>
          <div className="space-y-8">
            {[
              {
                title: 'Flow 1: Automated Provider Contact Validation',
                description: 'Daily batch processing of 200 provider profiles for contact information accuracy',
                steps: ['Extract provider info', 'Web scraping & GMB lookup', 'Cross-validate with NPI registry', 'Generate confidence scores', 'Create validation report', 'Prioritize for human review']
              },
              {
                title: 'Flow 2: New Provider Credential Verification',
                description: '25 new providers applying for network inclusion with credential documentation',
                steps: ['Extract from application forms', 'Lookup state medical board', 'Research education & certifications', 'Cross-reference sources', 'Generate enriched profiles', 'Create credentialing report']
              },
              {
                title: 'Flow 3: Directory Quality Assessment',
                description: 'Weekly quality assessment of entire provider directory database (500 providers)',
                steps: ['Analyze all profiles', 'Selective verification', 'Fill data gaps', 'Generate quality metrics', 'Create action lists', 'Executive dashboard']
              }
            ].map((flow, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                <h3 className="text-2xl font-semibold text-white mb-2">{flow.title}</h3>
                <p className="text-gray-400 mb-6">{flow.description}</p>
                <div className="flex items-center space-x-4 overflow-x-auto pb-4">
                  {flow.steps.map((step, stepIdx) => (
                    <div key={stepIdx} className="flex items-center">
                      <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl px-4 py-3 min-w-max">
                        <span className="text-blue-300 text-sm font-medium">{stepIdx + 1}. {step}</span>
                      </div>
                      {stepIdx < flow.steps.length - 1 && (
                        <ArrowRight className="h-5 w-5 text-gray-600 mx-2 flex-shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* KPIs Section */}
      <div id="kpis" className="relative z-10 container mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/20 rounded-3xl p-12 backdrop-blur-sm">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Target KPIs for Pilot</h2>
            <p className="text-xl text-gray-400">Measurable outcomes for success</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { metric: '80%+', label: 'Validation Accuracy', description: 'Success rate in identifying outdated contact info' },
              { metric: '5 min', label: 'Processing Speed', description: 'Complete validation of 100 providers' },
              { metric: '85%+', label: 'PDF Extraction', description: 'Accuracy with 95% confidence score' },
              { metric: '500+', label: 'Hourly Throughput', description: 'Provider validations per hour' }
            ].map((kpi, idx) => (
              <div key={idx} className="text-center">
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-2">
                  {kpi.metric}
                </div>
                <div className="text-xl font-semibold text-white mb-2">{kpi.label}</div>
                <div className="text-gray-400 text-sm">{kpi.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Transform Provider Data Management?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Start validating provider data with our AI-powered agents. Upload your provider list and see the magic happen.
            </p>
            <Link href="/dashboard">
              <button className="bg-white text-blue-600 px-10 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105 shadow-xl">
                Launch Dashboard Now
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-xl">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">HealthAI Directory</span>
            </div>
            <div className="text-gray-400">
              © 2025 HealthAI. Powered by NVIDIA Mistral Large AI. Built for EY Challenge VI.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
