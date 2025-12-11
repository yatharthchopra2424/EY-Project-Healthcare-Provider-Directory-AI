'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Shield, ArrowLeft, Download, FileText, BarChart3, PieChart,
  TrendingUp, Users, CheckCircle, AlertTriangle, XCircle, Clock,
  Calendar, RefreshCw
} from 'lucide-react';

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  
  // Sample data for charts
  const validationTrends = [
    { date: 'Mon', verified: 45, needsReview: 12, failed: 3 },
    { date: 'Tue', verified: 52, needsReview: 8, failed: 5 },
    { date: 'Wed', verified: 48, needsReview: 15, failed: 2 },
    { date: 'Thu', verified: 61, needsReview: 10, failed: 4 },
    { date: 'Fri', verified: 55, needsReview: 9, failed: 6 },
    { date: 'Sat', verified: 38, needsReview: 5, failed: 2 },
    { date: 'Sun', verified: 42, needsReview: 7, failed: 3 },
  ];

  const kpiMetrics = [
    { 
      label: 'Validation Accuracy', 
      value: '84%', 
      target: '80%', 
      status: 'achieved',
      description: 'Success rate in identifying outdated contact information'
    },
    { 
      label: 'Processing Speed', 
      value: '4.2 min', 
      target: '5 min', 
      status: 'achieved',
      description: 'Time to validate 100 providers'
    },
    { 
      label: 'PDF Extraction Accuracy', 
      value: '87%', 
      target: '85%', 
      status: 'achieved',
      description: 'Accuracy with 95% confidence score'
    },
    { 
      label: 'Hourly Throughput', 
      value: '520', 
      target: '500', 
      status: 'achieved',
      description: 'Provider validations per hour'
    },
  ];

  const agentPerformance = [
    { agent: 'Data Validation Agent', tasksCompleted: 1250, avgTime: '2.3s', accuracy: '85%', status: 'active' },
    { agent: 'Information Enrichment Agent', tasksCompleted: 1180, avgTime: '1.8s', accuracy: '78%', status: 'active' },
    { agent: 'Quality Assurance Agent', tasksCompleted: 1250, avgTime: '0.5s', accuracy: '92%', status: 'active' },
    { agent: 'Directory Management Agent', tasksCompleted: 1250, avgTime: '0.3s', accuracy: '95%', status: 'active' },
  ];

  const recentValidations = [
    { batchId: 'VAL-2024-001', providers: 200, completed: '2024-12-09 14:30', verified: 168, needsReview: 25, failed: 7 },
    { batchId: 'VAL-2024-002', providers: 150, completed: '2024-12-09 11:15', verified: 130, needsReview: 15, failed: 5 },
    { batchId: 'VAL-2024-003', providers: 100, completed: '2024-12-08 16:45', verified: 85, needsReview: 12, failed: 3 },
    { batchId: 'VAL-2024-004', providers: 250, completed: '2024-12-08 10:00', verified: 210, needsReview: 30, failed: 10 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800/50 border-b border-slate-700 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-xl">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">HealthAI <span className="text-blue-400">Reports</span></span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Dashboard</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Analytics & Reports</h1>
            <p className="text-gray-400">Comprehensive overview of provider validation performance</p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-white"
            >
              <option value="day">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
            </select>
            <button className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {kpiMetrics.map((kpi, idx) => (
            <div key={idx} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">{kpi.label}</span>
                {kpi.status === 'achieved' ? (
                  <span className="text-green-400 text-xs bg-green-400/10 px-2 py-1 rounded-full">Target Met</span>
                ) : (
                  <span className="text-yellow-400 text-xs bg-yellow-400/10 px-2 py-1 rounded-full">In Progress</span>
                )}
              </div>
              <div className="text-3xl font-bold text-white mb-1">{kpi.value}</div>
              <div className="text-sm text-gray-500">Target: {kpi.target}</div>
              <div className="text-xs text-gray-600 mt-2">{kpi.description}</div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Validation Trends Chart */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-6">Validation Trends</h3>
            <div className="h-64 flex items-end justify-between space-x-2">
              {validationTrends.map((day, idx) => {
                const total = day.verified + day.needsReview + day.failed;
                const maxHeight = 200;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center">
                    <div className="w-full flex flex-col-reverse" style={{ height: maxHeight }}>
                      <div 
                        className="bg-green-500 rounded-t"
                        style={{ height: `${(day.verified / 70) * maxHeight}px` }}
                      />
                      <div 
                        className="bg-yellow-500"
                        style={{ height: `${(day.needsReview / 70) * maxHeight}px` }}
                      />
                      <div 
                        className="bg-red-500 rounded-t"
                        style={{ height: `${(day.failed / 70) * maxHeight}px` }}
                      />
                    </div>
                    <span className="text-gray-500 text-xs mt-2">{day.date}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-center space-x-6 mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className="text-gray-400 text-sm">Verified</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                <span className="text-gray-400 text-sm">Needs Review</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span className="text-gray-400 text-sm">Failed</span>
              </div>
            </div>
          </div>

          {/* Status Distribution */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-6">Status Distribution</h3>
            <div className="flex items-center justify-center h-64">
              <div className="relative w-48 h-48">
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                  {/* Background circle */}
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#334155" strokeWidth="12" />
                  {/* Verified - 70% */}
                  <circle 
                    cx="50" cy="50" r="40" fill="none" 
                    stroke="#22c55e" strokeWidth="12"
                    strokeDasharray="175.93 251.33"
                    strokeLinecap="round"
                  />
                  {/* Needs Review - 20% */}
                  <circle 
                    cx="50" cy="50" r="40" fill="none" 
                    stroke="#eab308" strokeWidth="12"
                    strokeDasharray="50.27 251.33"
                    strokeDashoffset="-175.93"
                    strokeLinecap="round"
                  />
                  {/* Failed - 10% */}
                  <circle 
                    cx="50" cy="50" r="40" fill="none" 
                    stroke="#ef4444" strokeWidth="12"
                    strokeDasharray="25.13 251.33"
                    strokeDashoffset="-226.20"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-white">1,250</span>
                  <span className="text-gray-400 text-sm">Total</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-6 mt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">875</div>
                <div className="text-gray-500 text-sm">Verified (70%)</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">250</div>
                <div className="text-gray-500 text-sm">Review (20%)</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">125</div>
                <div className="text-gray-500 text-sm">Failed (10%)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Agent Performance Table */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 backdrop-blur-sm mb-8">
          <h3 className="text-xl font-bold text-white mb-6">AI Agent Performance</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-400 border-b border-slate-700">
                  <th className="text-left py-4 px-4">Agent</th>
                  <th className="text-left py-4 px-4">Tasks Completed</th>
                  <th className="text-left py-4 px-4">Avg. Processing Time</th>
                  <th className="text-left py-4 px-4">Accuracy</th>
                  <th className="text-left py-4 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {agentPerformance.map((agent, idx) => (
                  <tr key={idx} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                    <td className="py-4 px-4 text-white font-medium">{agent.agent}</td>
                    <td className="py-4 px-4 text-gray-300">{agent.tasksCompleted.toLocaleString()}</td>
                    <td className="py-4 px-4 text-gray-300">{agent.avgTime}</td>
                    <td className="py-4 px-4">
                      <span className="text-green-400">{agent.accuracy}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-600">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Validation Batches */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
          <h3 className="text-xl font-bold text-white mb-6">Recent Validation Batches</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-400 border-b border-slate-700">
                  <th className="text-left py-4 px-4">Batch ID</th>
                  <th className="text-left py-4 px-4">Providers</th>
                  <th className="text-left py-4 px-4">Completed</th>
                  <th className="text-left py-4 px-4">Verified</th>
                  <th className="text-left py-4 px-4">Needs Review</th>
                  <th className="text-left py-4 px-4">Failed</th>
                  <th className="text-left py-4 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentValidations.map((batch, idx) => (
                  <tr key={idx} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                    <td className="py-4 px-4 text-blue-400 font-medium">{batch.batchId}</td>
                    <td className="py-4 px-4 text-white">{batch.providers}</td>
                    <td className="py-4 px-4 text-gray-300">{batch.completed}</td>
                    <td className="py-4 px-4 text-green-400">{batch.verified}</td>
                    <td className="py-4 px-4 text-yellow-400">{batch.needsReview}</td>
                    <td className="py-4 px-4 text-red-400">{batch.failed}</td>
                    <td className="py-4 px-4">
                      <button className="text-blue-400 hover:text-blue-300 mr-3">View</button>
                      <button className="text-gray-400 hover:text-white">
                        <Download className="h-4 w-4 inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
