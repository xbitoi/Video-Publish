import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Terms() {
  return (
    <div className="min-h-dvh bg-[#F0F2F5] text-[#1A1A1A] font-sans p-6 md:p-12">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 border border-[#E2E8F0] shadow-sm rounded-md">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors mb-8">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold mb-6">Terms of Service for Video Publish</h1>
        <div className="space-y-6 text-[15px] leading-relaxed text-slate-700">
          <p>By using the <strong>Video Publish</strong> application, you agree to the following terms:</p>
          
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">1. Authorized Publishing</h2>
            <p>You grant <strong>Video Publish</strong> the technical authority to perform the <strong>video.publish</strong> action on your behalf through TikTok's official API. This action is only triggered by your direct command within the app dashboard.</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">2. Content Responsibility</h2>
            <p>The user is solely responsible for the content uploaded through <strong>Video Publish</strong>. All media must comply with TikTok’s Community Guidelines and Terms of Service.</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">3. Service Limitation</h2>
            <p><strong>Video Publish</strong> acts as a technical intermediary for scheduling and uploading. We are not responsible for the performance or reach of the content once it is published on the TikTok platform.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
