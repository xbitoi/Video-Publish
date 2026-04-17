import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, CheckCircle2, Clock, Calendar, MoreHorizontal, FileVideo, Smartphone } from 'lucide-react';

export default function Library({ isConnected, setIsConnected, videos = [], setVideos }: { isConnected?: boolean, setIsConnected?: any, videos?: any[], setVideos?: any }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Scheduled');

  const handleCancel = (id: number) => {
    if (setVideos) {
      setVideos((prev: any[]) => prev.filter(v => v.id !== id));
    }
  };

  const handleDisconnect = () => {
    if (setIsConnected) setIsConnected(false);
  };

  const displayedVideos = videos.filter(v => v.status === activeTab);

  return (
    <div className="flex flex-col md:flex-row overflow-hidden font-sans h-dvh bg-[#F0F2F5] text-[#1A1A1A]">
      {/* Mobile Header */}
      <div className="flex items-center justify-between p-4 bg-[#0F172A] text-white md:hidden shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-[#00F2EA] to-[#FF0050]"></div>
          <h2 className="text-[18px] font-bold">PUBLISH</h2>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar - Desktop & Mobile overlay */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 flex flex-col w-[260px] md:w-[220px] bg-[#0F172A] text-white py-8 border-r border-[#E2E8F0]
        transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="items-center gap-3 px-6 pb-10 hidden md:flex">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-[#00F2EA] to-[#FF0050]"></div>
          <h2 className="text-[18px] font-bold">PUBLISH</h2>
        </div>
        
        <nav className="flex-1 overflow-y-auto w-full">
          <ul>
            <li>
              <Link to="/" className="flex items-center gap-3 px-6 py-4 text-sm tracking-wide text-white/70 cursor-pointer hover:bg-white/5 hover:text-white transition-colors border-l-4 border-transparent">
                Dashboard
              </Link>
            </li>
            <li className="flex items-center gap-3 px-6 py-4 text-sm tracking-wide text-white bg-white/10 border-l-4 border-[#00F2EA] cursor-pointer">
              Content Library
            </li>
          </ul>
        </nav>

        <div className="mt-auto px-6 w-full">
          {isConnected && (
            <div className="flex flex-col gap-2">
               <div className="flex items-center gap-3 py-3 text-sm tracking-wide text-emerald-400">
                 <CheckCircle2 size={18} />
                 TikTok Connected
               </div>
               <button 
                 onClick={handleDisconnect}
                 className="w-full text-left py-2 text-xs text-slate-400 hover:text-white transition-colors"
               >
                 Disconnect Account
               </button>
            </div>
          )}
        </div>
      </aside>

      {/* Overlay to close sidebar on mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      <main className="flex flex-col flex-1 overflow-hidden h-full">
        {/* Desktop Header */}
        <header className="hidden md:flex items-center justify-between h-20 px-8 shrink-0 bg-white border-b border-[#E2E8F0]">
          <div>
            <h1 className="text-[20px] font-bold">Content Library</h1>
            <p className="text-xs text-[#64748B]">View and manage your scheduled content</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-sm font-semibold">Alex Rivera</div>
              <div className="text-[11px] text-[#22C55E]">
                 TikTok Authorized
              </div>
            </div>
            <div className="w-9 h-9 overflow-hidden rounded-full bg-[#CBD5E1] flex items-center justify-center text-white/50 border border-[#E2E8F0]">
              <img src={`https://api.dicebear.com/7.x/identicon/svg?seed=Alex`} alt="Avatar" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* Mobile Title Area */}
        <div className="md:hidden px-4 py-4 shrink-0 bg-white border-b border-[#E2E8F0]">
          <h1 className="text-[20px] font-bold">Content Library</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6 pb-24 md:pb-6 relative bg-white">
          <div className="max-w-7xl mx-auto items-start animate-in fade-in slide-in-from-bottom-4 duration-500">
             
             <div className="flex items-center justify-between mb-6">
                <div className="flex gap-4">
                  <button onClick={() => setActiveTab('Scheduled')} className={`px-4 py-2 rounded text-sm font-semibold transition-colors ${activeTab === 'Scheduled' ? 'bg-slate-900 text-white shadow-sm' : 'bg-[#F1F5F9] text-slate-600 hover:bg-slate-200'}`}>Scheduled</button>
                  <button onClick={() => setActiveTab('Draft')} className={`px-4 py-2 rounded text-sm font-semibold transition-colors ${activeTab === 'Draft' ? 'bg-slate-900 text-white shadow-sm' : 'bg-[#F1F5F9] text-slate-600 hover:bg-slate-200'}`}>Drafts</button>
                  <button onClick={() => setActiveTab('Published')} className={`px-4 py-2 rounded text-sm font-semibold transition-colors ${activeTab === 'Published' ? 'bg-slate-900 text-white shadow-sm' : 'bg-[#F1F5F9] text-slate-600 hover:bg-slate-200'}`}>Published</button>
                </div>
                <Link to="/">
                  <button className="px-4 py-2 bg-[#FF0050] text-white rounded text-sm font-bold shadow-md hover:bg-[#E60048] transition-colors flex items-center gap-2">
                    + New Post
                  </button>
                </Link>
             </div>

             <div className="space-y-4">
               {displayedVideos.length === 0 ? (
                 <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                    <FileVideo size={48} className="mb-4 text-slate-300" />
                    <p className="text-lg font-medium">No {activeTab.toLowerCase()} videos found.</p>
                 </div>
               ) : (
                 displayedVideos.map((video) => (
                   <div key={video.id} className="flex flex-col md:flex-row items-center gap-6 p-4 border border-[#E2E8F0] rounded-xl hover:shadow-md transition-shadow bg-[#F8FAFC]">
                     
                     {/* Thumbnail area */}
                     <div className="relative w-full md:w-32 aspect-video md:aspect-[9/16] bg-slate-900 rounded-lg overflow-hidden shrink-0 border border-[#E2E8F0] shadow-sm">
                        {video.videoUrl ? (
                          <video src={video.videoUrl} className="w-full h-full object-cover opacity-90" autoPlay loop muted playsInline />
                        ) : (
                          <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover opacity-90" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
                        <div className="absolute bottom-2 left-2 text-white pointer-events-none"><FileVideo size={16} /></div>
                     </div>
  
                     {/* Info area */}
                     <div className="flex-1 w-full space-y-3">
                       <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-bold text-slate-800 line-clamp-1">{video.title}</h3>
                            <p className="text-sm text-slate-500 mt-1 flex items-center gap-2">
                              <span className="flex items-center gap-1"><Calendar size={14} /> {video.date}</span>
                              <span className="text-slate-300">|</span>
                              <span className="flex items-center gap-1"><Clock size={14}/> {video.time}</span>
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${video.status === 'Scheduled' ? 'bg-blue-100 text-blue-600 border border-blue-200' : 'bg-amber-100 text-amber-600 border border-amber-200'}`}>
                             {video.status}
                          </span>
                       </div>
                       <div className="flex items-center gap-3 mt-4">
                          <button className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-white border border-[#E2E8F0] rounded hover:bg-slate-50 transition-colors shadow-sm">Edit Caption</button>
                          <button onClick={() => handleCancel(video.id)} className="px-3 py-1.5 text-xs font-semibold text-red-600 bg-white border border-red-100 rounded hover:bg-red-50 transition-colors shadow-sm">Cancel</button>
                       </div>
                     </div>
                   </div>
                 ))
               )}
             </div>

          </div>
        </div>

        {/* Footer legal */}
        <footer className="hidden md:flex items-center justify-center gap-6 h-12 shrink-0 text-[11px] text-[#94A3B8] bg-[#F8FAFC] border-t border-[#E2E8F0] w-full">
          <Link to="/privacy" className="cursor-pointer hover:text-slate-600 transition-colors underline decoration-slate-300 underline-offset-2 w-max">Privacy Policy</Link>
          <Link to="/terms" className="cursor-pointer hover:text-slate-600 transition-colors underline decoration-slate-300 underline-offset-2 w-max">Terms of Service</Link>
          <span>&copy; 2024 Video Publish</span>
        </footer>
      </main>
    </div>
  );
}
