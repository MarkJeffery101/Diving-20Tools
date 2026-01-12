import { Copy, Check, Mail, Link as LinkIcon, ArrowLeft, Download, HardDrive, FileText, Code } from "lucide-react";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

export default function Share() {
  const [copied, setCopied] = useState(false);
  const appUrl = window.location.origin;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(appUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEmailShare = () => {
    const subject = "DivePlan - Professional Dive Planning Reference";
    const body = `Check out DivePlan, a comprehensive dive planning reference system:\n\n${appUrl}\n\nPerfect for commercial, air, and nitrox diving.`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <RouterLink
            to="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </RouterLink>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Share DivePlan
          </h1>
          <p className="text-gray-600">
            Share this professional dive planning resource with your team
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Link Sharing */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <LinkIcon className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Copy Link</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Copy the app link to share via chat, email, or any other platform
            </p>
            <div className="bg-slate-100 p-4 rounded-lg mb-4 break-all text-sm text-gray-700">
              {appUrl}
            </div>
            <button
              onClick={handleCopyLink}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              {copied ? (
                <>
                  <Check className="h-5 w-5" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-5 w-5" />
                  Copy Link
                </>
              )}
            </button>
          </div>

          {/* Email Sharing */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <Mail className="h-6 w-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900">Email Share</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Send a pre-formatted email with the app link to your colleagues
            </p>
            <button
              onClick={handleEmailShare}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              <Mail className="h-5 w-5" />
              Share via Email
            </button>
          </div>
        </div>

        {/* Download for Offline Use */}
        <div className="mt-8 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg shadow-lg p-8 border-2 border-purple-200">
          <div className="flex items-center gap-3 mb-6">
            <Download className="h-7 w-7 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900">
              Download for Offline Use
            </h2>
          </div>
          <p className="text-gray-700 mb-8">
            Download DivePlan to your desktop for offline access. Perfect for operations without internet connectivity.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Full Application */}
            <div className="bg-white rounded-lg p-6 shadow-md border border-purple-100">
              <div className="flex items-center gap-2 mb-4">
                <HardDrive className="h-5 w-5 text-purple-600" />
                <h3 className="font-bold text-gray-900">Full Application</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Download the complete DivePlan application with all features
              </p>
              <div className="space-y-2 text-sm text-gray-700 mb-4">
                <p className="font-semibold">Steps:</p>
                <ol className="list-decimal list-inside space-y-1 text-xs">
                  <li>Install Git and Node.js (v18+)</li>
                  <li>Clone: <code className="bg-gray-100 px-1 rounded text-xs">git clone https://github.com/MarkJeffery101/Diving-20Tools.git</code></li>
                  <li>Run: <code className="bg-gray-100 px-1 rounded text-xs">pnpm install</code></li>
                  <li>Run: <code className="bg-gray-100 px-1 rounded text-xs">pnpm dev</code></li>
                  <li>Access at localhost:8080</li>
                </ol>
              </div>
              <a
                href="https://github.com/MarkJeffery101/Diving-20Tools"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium w-full justify-center"
              >
                <Code className="h-4 w-4" />
                View on GitHub
              </a>
            </div>

            {/* Standalone Widgets */}
            <div className="bg-white rounded-lg p-6 shadow-md border border-blue-100">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-blue-600" />
                <h3 className="font-bold text-gray-900">Standalone Widgets</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Single HTML files that work offline without installation
              </p>
              <div className="space-y-2 text-sm text-gray-700 mb-4">
                <p className="font-semibold">Available Widgets:</p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>TUP Calculator</li>
                  <li>Dive Tables Browser</li>
                  <li>Complete Dive Tools</li>
                  <li>Table Selection Tool</li>
                  <li>Emergency Procedures</li>
                </ul>
              </div>
              <a
                href="https://github.com/MarkJeffery101/Diving-20Tools/tree/main"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium w-full justify-center"
              >
                <Download className="h-4 w-4" />
                Download Widgets
              </a>
            </div>

            {/* Quick Guide */}
            <div className="bg-white rounded-lg p-6 shadow-md border border-green-100">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-green-600" />
                <h3 className="font-bold text-gray-900">Quick Start</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Easiest way to use offline: download individual widgets
              </p>
              <div className="space-y-2 text-sm text-gray-700 mb-4">
                <p className="font-semibold">How to use:</p>
                <ol className="list-decimal list-inside space-y-1 text-xs">
                  <li>Download .html widget files</li>
                  <li>Save to your desktop</li>
                  <li>Double-click to open in browser</li>
                  <li>Works 100% offline</li>
                  <li>No installation needed</li>
                </ol>
              </div>
              <div className="bg-green-50 border border-green-200 rounded p-3 text-xs text-green-800">
                ✓ No internet required<br/>
                ✓ All data embedded<br/>
                ✓ Copy to USB drive
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Download Options Explained</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <p className="font-semibold text-purple-700 mb-1">Full Application:</p>
                <p className="text-xs">Best for developers or those who want to customize. Requires Node.js and Git. Includes all features, tools, and future updates.</p>
              </div>
              <div>
                <p className="font-semibold text-blue-700 mb-1">Standalone Widgets:</p>
                <p className="text-xs">Best for end users. Just download and open - no installation. Each widget is self-contained with specific functionality.</p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-xs text-yellow-800">
                <strong>Note:</strong> For actual diving operations, always use official physical tables and follow your certification training. These tools are reference aids only.
              </p>
            </div>
          </div>
        </div>

        {/* App Information */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            About DivePlan
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Comprehensive
              </h3>
              <p className="text-gray-600">
                Complete reference for air, nitrox, and commercial diving tables
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Professional
              </h3>
              <p className="text-gray-600">
                Built for dive professionals and commercial operations
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Integrated
              </h3>
              <p className="text-gray-600">
                Linked dive planning with calculators and emergency procedures
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
