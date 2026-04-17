import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="min-h-dvh bg-[#F0F2F5] text-[#1A1A1A] font-sans p-6 md:p-12">
      {/* Hidden verification code for TikTok crawler */}
      <div className="hidden" aria-hidden="true" data-nosnippet>
        tiktok-developers-site-verification=pNdIsQBdXEuVlXCssC6Y5mF825ySjkWt
        tiktok-developers-site-verification=oVSvT2djMhSd4u6iI5EX4eGtxNUF9zdK
      </div>
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 border border-[#E2E8F0] shadow-sm rounded-md">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors mb-8">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold mb-6">Privacy Policy for Video Publish</h1>
        <div className="space-y-6 text-[15px] leading-relaxed text-slate-700">
          <p>At <strong>Video Publish</strong>, we prioritize your privacy and data security. This policy outlines how we handle your information:</p>
          
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">1. Data Access & Permissions</h2>
            <p>Our application explicitly requests the <strong>video.publish</strong> and <strong>video.upload</strong> permissions. These scopes are used solely to enable the core functionality of uploading and posting videos to your TikTok account as initiated by you.</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">2. Media Handling</h2>
            <p><strong>Video Publish</strong> does not store your raw video files on our servers permanently. Once a video is successfully transmitted to TikTok via the API, the temporary file is purged from our system.</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">3. No Third-Party Sharing</h2>
            <p>We do not sell, trade, or share your personal data or TikTok account information with any third-party entities. All interactions are handled through TikTok's secure authorized channels.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
