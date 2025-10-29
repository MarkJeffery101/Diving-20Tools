import { Copy, Check, Mail, Link as LinkIcon, ArrowLeft } from "lucide-react";
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
