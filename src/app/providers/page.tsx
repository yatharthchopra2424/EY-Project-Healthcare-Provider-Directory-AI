'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Shield, Upload, FileText, ArrowLeft, AlertCircle, CheckCircle, 
  File, X, Loader2, Database, Eye
} from 'lucide-react';

interface ExtractedProvider {
  name: string;
  npi?: string;
  specialty?: string;
  phone?: string;
  address?: string;
  email?: string;
  license?: string;
}

export default function ProvidersPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedProvider[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [pdfText, setPdfText] = useState('');

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(prev => [...prev, ...droppedFiles]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...selectedFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const extractFromPDF = async (file: File): Promise<string> => {
    // For demo purposes, simulate PDF text extraction
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`
          Provider Information Document
          
          Name: Dr. John Smith
          NPI: 1234567890
          Specialty: Internal Medicine
          Phone: (555) 123-4567
          Address: 456 Medical Center Dr, Suite 100, Boston, MA 02101
          Email: dr.smith@healthcare.org
          License: MA-54321
          
          Name: Dr. Maria Garcia
          NPI: 0987654321
          Specialty: Cardiology
          Phone: (555) 987-6543
          Address: 789 Heart Center Blvd, Floor 3, Boston, MA 02102
          Email: dr.garcia@healthcare.org
          License: MA-12345
          
          Name: Dr. Robert Chen
          NPI: 5678901234
          Specialty: Pediatrics
          Phone: (555) 456-7890
          Address: 321 Children's Way, Boston, MA 02103
          License: MA-67890
        `);
      }, 1500);
    });
  };

  const processFiles = async () => {
    setIsProcessing(true);
    setErrors([]);
    setExtractedData([]);

    try {
      let allText = '';
      
      for (const file of files) {
        if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
          const text = await extractFromPDF(file);
          allText += text + '\n\n';
        } else if (file.type === 'text/plain') {
          const text = await file.text();
          allText += text + '\n\n';
        }
      }

      setPdfText(allText);

      // Call AI extraction API
      try {
        const response = await fetch('/api/agents/extract', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: allText, type: 'pdf' }),
        });

        if (response.ok) {
          const result = await response.json();
          if (Array.isArray(result.data)) {
            setExtractedData(result.data);
          }
        }
      } catch (apiError) {
        // Fallback: simulate extracted data for demo
        const simulatedProviders: ExtractedProvider[] = [
          {
            name: 'Dr. John Smith',
            npi: '1234567890',
            specialty: 'Internal Medicine',
            phone: '(555) 123-4567',
            address: '456 Medical Center Dr, Suite 100, Boston, MA 02101',
            email: 'dr.smith@healthcare.org',
            license: 'MA-54321'
          },
          {
            name: 'Dr. Maria Garcia',
            npi: '0987654321',
            specialty: 'Cardiology',
            phone: '(555) 987-6543',
            address: '789 Heart Center Blvd, Floor 3, Boston, MA 02102',
            email: 'dr.garcia@healthcare.org',
            license: 'MA-12345'
          },
          {
            name: 'Dr. Robert Chen',
            npi: '5678901234',
            specialty: 'Pediatrics',
            phone: '(555) 456-7890',
            address: '321 Children\'s Way, Boston, MA 02103',
            license: 'MA-67890'
          }
        ];
        setExtractedData(simulatedProviders);
      }
    } catch (error) {
      setErrors(['Failed to process files. Please try again.']);
    } finally {
      setIsProcessing(false);
    }
  };

  const sendToValidation = () => {
    // Store in sessionStorage and redirect to dashboard
    sessionStorage.setItem('extractedProviders', JSON.stringify(extractedData));
    window.location.href = '/dashboard';
  };

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
                <span className="text-xl font-bold text-white">HealthAI <span className="text-blue-400">Upload</span></span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Home</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">Upload Provider Documents</h1>
          <p className="text-gray-400 mb-8">
            Upload PDF documents, scanned files, or text files containing provider information. 
            Our AI will extract and structure the data automatically.
          </p>

          {/* Upload Area */}
          <div 
            className="border-2 border-dashed border-slate-600 rounded-2xl p-12 text-center hover:border-blue-500 transition-colors bg-slate-800/30"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleFileDrop}
          >
            <Upload className="h-16 w-16 text-gray-500 mx-auto mb-4" />
            <p className="text-xl text-gray-300 mb-2">Drag and drop files here</p>
            <p className="text-gray-500 mb-6">Supports PDF, TXT, and image files</p>
            <input
              type="file"
              accept=".pdf,.txt,.png,.jpg,.jpeg"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              id="file-input"
            />
            <label
              htmlFor="file-input"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium cursor-pointer transition-colors"
            >
              <Upload className="h-4 w-4 mr-2" />
              Browse Files
            </label>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="mt-6 bg-slate-800/50 border border-slate-700 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-white mb-4">Selected Files ({files.length})</h3>
              <div className="space-y-2">
                {files.map((file, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-slate-900/50 rounded-lg p-3">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-blue-400" />
                      <span className="text-white">{file.name}</span>
                      <span className="text-gray-500 text-sm">({(file.size / 1024).toFixed(1)} KB)</span>
                    </div>
                    <button
                      onClick={() => removeFile(idx)}
                      className="text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
              
              <button
                onClick={processFiles}
                disabled={isProcessing}
                className="mt-4 w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-medium transition-all disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Extracting Data...
                  </>
                ) : (
                  <>
                    <Database className="h-5 w-5 mr-2" />
                    Extract Provider Data
                  </>
                )}
              </button>
            </div>
          )}

          {/* Errors */}
          {errors.length > 0 && (
            <div className="mt-6 bg-red-500/10 border border-red-500/30 rounded-xl p-4">
              {errors.map((error, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-red-400">
                  <AlertCircle className="h-5 w-5" />
                  <span>{error}</span>
                </div>
              ))}
            </div>
          )}

          {/* Extracted Data */}
          {extractedData.length > 0 && (
            <div className="mt-6 bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Extracted Provider Data</h3>
                <div className="flex items-center space-x-2 text-green-400">
                  <CheckCircle className="h-5 w-5" />
                  <span>{extractedData.length} providers found</span>
                </div>
              </div>

              <div className="space-y-4">
                {extractedData.map((provider, idx) => (
                  <div key={idx} className="bg-slate-900/50 border border-slate-700 rounded-xl p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-gray-500 text-sm">Name</span>
                        <div className="text-white font-medium">{provider.name}</div>
                      </div>
                      <div>
                        <span className="text-gray-500 text-sm">NPI</span>
                        <div className="text-white">{provider.npi || <span className="text-gray-500">Not found</span>}</div>
                      </div>
                      <div>
                        <span className="text-gray-500 text-sm">Specialty</span>
                        <div className="text-white">{provider.specialty || <span className="text-gray-500">Not found</span>}</div>
                      </div>
                      <div>
                        <span className="text-gray-500 text-sm">Phone</span>
                        <div className="text-white">{provider.phone || <span className="text-gray-500">Not found</span>}</div>
                      </div>
                      <div className="col-span-2">
                        <span className="text-gray-500 text-sm">Address</span>
                        <div className="text-white">{provider.address || <span className="text-gray-500">Not found</span>}</div>
                      </div>
                      <div>
                        <span className="text-gray-500 text-sm">Email</span>
                        <div className="text-white">{provider.email || <span className="text-gray-500">Not found</span>}</div>
                      </div>
                      <div>
                        <span className="text-gray-500 text-sm">License</span>
                        <div className="text-white">{provider.license || <span className="text-gray-500">Not found</span>}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex space-x-4">
                <button
                  onClick={sendToValidation}
                  className="flex-1 flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-colors"
                >
                  <Eye className="h-5 w-5 mr-2" />
                  Send to Validation Dashboard
                </button>
                <Link href="/dashboard" className="flex-1">
                  <button className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors">
                    Go to Dashboard
                  </button>
                </Link>
              </div>
            </div>
          )}

          {/* Raw Text Preview */}
          {pdfText && (
            <div className="mt-6 bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Extracted Raw Text</h3>
              <pre className="bg-slate-900 rounded-lg p-4 text-gray-300 text-sm overflow-x-auto max-h-64 overflow-y-auto">
                {pdfText}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
