import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, UploadCloud, CheckCircle2, Loader2, Calendar, Clock, Smartphone, MoreHorizontal } from 'lucide-react';

export default function Dashboard({ isConnected, setIsConnected, onSchedule }: { isConnected?: boolean, setIsConnected?: any, onSchedule?: (video: any) => void }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'success'>('idle');
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isPublishing, setIsPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Capture local video file for viewing
  const [videoBlobUrl, setVideoBlobUrl] = useState<string | null>(null);

  // Caption state
  const [caption, setCaption] = useState('');

  // Time picker state
  const [selectedDay, setSelectedDay] = useState<number>(6);
  const [scheduleHour, setScheduleHour] = useState('06');
  const [scheduleMinute, setScheduleMinute] = useState('30');
  const [schedulePeriod, setSchedulePeriod] = useState('PM');

  const handleConnectClick = () => {
    setShowLoginModal(true);
    setIsSidebarOpen(false); // close sidebar if on mobile
  };

  const handleFakeLogin = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      if (setIsConnected) setIsConnected(true);
      setShowLoginModal(false);
    }, 1500);
  };

  const handleDisconnect = () => {
    if (setIsConnected) setIsConnected(false);
  };

  const simulateUpload = () => {
    setUploadState('uploading');
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadState('success');
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setVideoBlobUrl(URL.createObjectURL(e.target.files[0]));
      simulateUpload();
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setVideoBlobUrl(URL.createObjectURL(e.dataTransfer.files[0]));
      simulateUpload();
    }
  };

  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      setPublishSuccess(true);
      setShowSuccessModal(true);
      
      if (onSchedule) {
        onSchedule({
          id: Date.now(),
          title: caption || 'Untitled Video',
          date: `Oct ${selectedDay}, 2024`,
          time: `${scheduleHour}:${scheduleMinute} ${schedulePeriod}`,
          status: "Scheduled",
          videoUrl: videoBlobUrl,
          thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=200&h=300" // fallback
        });
      }
    }, 2000);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    setPublishSuccess(false);
    setUploadState('idle');
    setProgress(0);
    setCaption('');
    setVideoBlobUrl(null);
  };

  return (
    <div className="flex flex-col md:flex-row overflow-hidden font-sans h-dvh bg-[#F0F2F5] text-[#1A1A1A]">
      {/* Fake Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm overflow-hidden flex flex-col transform transition-all">
            <div className="bg-[#000000] p-4 text-white flex justify-between items-center">
               <div className="font-bold flex items-center gap-2">TikTok Authorization</div>
               <button onClick={() => setShowLoginModal(false)} className="text-white/70 hover:text-white transition-colors"><X size={20}/></button>
            </div>
            <div className="p-6 flex flex-col gap-4">
               <p className="text-sm font-medium text-slate-700 text-center mb-2">Log in to authorize <strong className="text-black">Video Publish</strong></p>
               <input type="email" placeholder="Email" className="border border-gray-300 p-3 rounded-md focus:border-[#FF0050] focus:ring-1 focus:ring-[#FF0050] outline-none text-sm transition-shadow" />
               <input type="password" placeholder="Password" className="border border-gray-300 p-3 rounded-md focus:border-[#FF0050] focus:ring-1 focus:ring-[#FF0050] outline-none text-sm transition-shadow" />
               
               <label className="flex items-start gap-2 text-xs text-slate-600 mt-1 cursor-pointer">
                 <input 
                   type="checkbox" 
                   checked={agreedToTerms} 
                   onChange={(e) => setAgreedToTerms(e.target.checked)}
                   className="mt-0.5 w-4 h-4 text-[#FF0050] rounded border-gray-300" 
                 />
                 <span className="leading-relaxed">
                   I agree to the <Link to="/terms" onClick={() => setShowLoginModal(false)} className="text-blue-600 hover:underline">Terms of Service</Link> and <Link to="/privacy" onClick={() => setShowLoginModal(false)} className="text-blue-600 hover:underline">Privacy Policy</Link>.
                 </span>
               </label>

               <button
                 onClick={handleFakeLogin}
                 disabled={isConnecting || !agreedToTerms}
                 className="mt-2 bg-[#FF0050] text-white py-3 rounded-md font-bold hover:bg-[#E60048] flex justify-center items-center h-12 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
               >
                 {isConnecting ? <Loader2 size={20} className="animate-spin" /> : 'Log In & Authorize'}
               </button>
               <p className="text-[10px] text-center text-slate-400 mt-2">This is a secure mocked simulation environment.</p>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/60 z-[70] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden flex flex-col items-center p-8 transform transition-all animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-inner border border-emerald-100">
              <CheckCircle2 size={40} />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Publishing Scheduled!</h3>
            <p className="text-slate-500 text-center text-sm mb-6 leading-relaxed">
              Your video has been processed and is successfully scheduled for TikTok.
            </p>
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-5 w-full mb-8 shadow-sm">
              <div className="flex items-center justify-between mb-3 border-b border-[#E2E8F0] pb-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Publish Date</span>
                <span className="text-sm font-bold text-slate-800">Oct {selectedDay}, 2024</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Publish Time</span>
                <span className="text-[15px] font-bold text-[#FF0050]">{scheduleHour}:{scheduleMinute} {schedulePeriod}</span>
              </div>
            </div>
            <button
              onClick={handleCloseSuccessModal}
              className="w-full bg-[#000000] text-white py-3.5 rounded-lg font-bold hover:bg-slate-800 transition-colors shadow-md text-sm"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      )}

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
            <li className="flex items-center gap-3 px-6 py-4 text-sm tracking-wide text-white bg-white/10 border-l-4 border-[#00F2EA] cursor-pointer">
              Dashboard
            </li>
            <li>
              <Link to="/library" className="flex items-center gap-3 px-6 py-4 text-sm tracking-wide text-white/70 cursor-pointer hover:bg-white/5 hover:text-white transition-colors border-l-4 border-transparent">
                Content Library
              </Link>
            </li>
          </ul>
        </nav>

        <div className="mt-auto px-6 w-full">
          {isConnected ? (
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
          ) : (
            <button 
              onClick={handleConnectClick}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 text-sm font-semibold tracking-wide text-white bg-[#00F2EA]/20 hover:bg-[#00F2EA]/30 border border-[#00F2EA]/50 rounded transition-colors"
            >
              Connect TikTok
            </button>
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
            <h1 className="text-[20px] font-bold">Dashboard</h1>
            <p className="text-xs text-[#64748B]">Manage your high-performance content strategy</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-sm font-semibold">{isConnected ? 'Alex Rivera' : 'Guest User'}</div>
              <div className="text-[11px] text-[#22C55E]">
                 {isConnected ? 'TikTok Authorized' : 'Please connect account'}
              </div>
            </div>
            <div className="w-9 h-9 overflow-hidden rounded-full bg-[#CBD5E1] flex items-center justify-center text-white/50 border border-[#E2E8F0]">
              <img src={`https://api.dicebear.com/7.x/identicon/svg?seed=${isConnected ? 'Alex' : 'Guest'}`} alt="Avatar" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* Mobile Title Area */}
        <div className="md:hidden px-4 py-4 shrink-0 bg-white border-b border-[#E2E8F0]">
          <h1 className="text-[20px] font-bold">Dashboard</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6 pb-24 md:pb-6 relative">
          
          {!isConnected ? (
            <div className="flex flex-col items-center justify-center h-full max-w-md mx-auto text-center gap-4 animate-in fade-in duration-500">
               <div className="w-20 h-20 bg-white shadow-sm rounded-full flex items-center justify-center mb-2 border border-[#E2E8F0]">
                  <Smartphone size={36} className="text-slate-400" />
               </div>
               <h2 className="text-2xl font-bold text-slate-800">Welcome to Video Publish</h2>
               <p className="text-slate-500 text-[15px] mb-4 leading-relaxed">Please securely log in and connect your TikTok account to start uploading and scheduling your content.</p>
               <button onClick={handleConnectClick} className="px-8 py-3 bg-[#000000] text-white text-sm font-bold rounded shadow-md hover:bg-slate-800 transition-colors tracking-wide">
                  Connect TikTok Account
               </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 max-w-7xl mx-auto items-start animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Composer Card */}
              <div className="flex flex-col gap-5 p-4 md:p-6 bg-white border border-[#E2E8F0] shadow-sm rounded-md w-full">
                
                <input 
                  type="file" 
                  accept="video/mp4,video/webm" 
                  className="hidden" 
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                />

                <div 
                  onClick={() => uploadState === 'idle' && fileInputRef.current?.click()}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className={`flex flex-col items-center justify-center p-6 min-h-[180px] gap-3 text-[#64748B] border-2 border-dashed rounded-md transition-all ${
                    uploadState === 'idle' ? 'border-[#CBD5E1] cursor-pointer hover:bg-slate-50 hover:border-blue-300' : 
                    uploadState === 'uploading' ? 'border-blue-400 bg-blue-50/50 cursor-default' : 
                    'border-emerald-400 bg-emerald-50/50 cursor-default'
                  }`}
                >
                  {uploadState === 'idle' && (
                    <>
                      <UploadCloud size={40} className="text-slate-400 shrink-0" />
                      <div className="text-center">
                         <span className="font-semibold text-slate-700">Click to upload</span> or drag video
                      </div>
                      <div className="text-[11px] text-center px-4">MP4 or WebM (Max 500MB)</div>
                    </>
                  )}

                  {uploadState === 'uploading' && (
                    <div className="w-full max-w-xs flex flex-col items-center gap-4">
                      <Loader2 size={32} className="text-blue-500 animate-spin shrink-0" />
                      <div className="text-sm font-semibold text-slate-700 text-center">Uploading video...</div>
                      <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                        <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-100 ease-out" style={{ width: `${progress}%` }}></div>
                      </div>
                      <div className="text-xs font-mono">{progress}%</div>
                    </div>
                  )}

                  {uploadState === 'success' && (
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shrink-0 shadow-inner">
                        <CheckCircle2 size={32} />
                      </div>
                      <div className="text-sm font-bold text-slate-700 text-center">Upload Complete</div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setUploadState('idle'); }}
                        className="text-xs text-blue-600 hover:underline mt-2 font-medium"
                      >
                        Remove and upload different file
                      </button>
                    </div>
                  )}
                </div>

                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="p-4 w-full min-h-[120px] text-[15px] leading-relaxed border border-[#E2E8F0] resize-none focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] rounded-sm transition-shadow"
                  placeholder="Write your caption here... Use @ to mention or # for tags."
                />
                
                <div className="flex flex-wrap gap-2 w-full">
                  {['#productivity', '#workspace', '#2024trends'].map(tag => (
                    <button 
                      key={tag}
                      onClick={() => setCaption(prev => prev ? `${prev} ${tag}` : tag)}
                      className="px-3 py-1.5 text-xs font-semibold rounded bg-[#F1F5F9] text-[#475569] hover:bg-slate-200 transition-colors cursor-pointer"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-auto pt-4 border-t border-[#F1F5F9] gap-4">
                  <label className="flex items-center gap-2 text-[13px] text-[#64748B] cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-[#2563EB] rounded border-gray-300" />
                    Allow stitching and duets
                  </label>
                  
                  <button 
                    onClick={handlePublish}
                    disabled={uploadState !== 'success' || !isConnected || isPublishing}
                    className={`relative w-full sm:w-auto px-8 py-3 text-sm font-bold text-white rounded transition-all shrink-0 ${
                      uploadState === 'success' && isConnected && !isPublishing
                        ? 'bg-[#FF0050] hover:bg-[#E60048] cursor-pointer shadow-md transform hover:-translate-y-0.5 active:translate-y-0' 
                        : 'bg-slate-300 cursor-not-allowed text-slate-500'
                    }`}
                  >
                    {isPublishing ? (
                      <span className="flex items-center justify-center gap-2">
                         <Loader2 size={16} className="animate-spin" /> Publishing...
                      </span>
                    ) : publishSuccess ? (
                      <span className="flex items-center justify-center gap-2">
                        <CheckCircle2 size={16} /> Published!
                      </span>
                    ) : (
                      'Publish to TikTok'
                    )}
                    
                    {(!isConnected || uploadState !== 'success') && !isPublishing && !publishSuccess && (
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 hover:opacity-100 whitespace-nowrap transition-opacity pointer-events-none">
                        {!isConnected ? 'Please connect TikTok account' : 'Please upload a video first'}
                      </div>
                    )}
                  </button>
                </div>
              </div>

              {/* Sidebar Column (Scheduling & Preview) */}
              <div className="flex flex-col gap-6 w-full">
                {/* Scheduling Widget */}
                <div className="p-5 bg-white border border-[#E2E8F0] shadow-sm rounded-md w-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-xs font-bold tracking-widest uppercase text-[#94A3B8] flex items-center gap-2">
                      <Calendar size={14} /> Smart Scheduling
                    </div>
                    <MoreHorizontal size={16} className="text-slate-400" />
                  </div>
                  
                  <div className="grid grid-cols-7 gap-1">
                    {['S','M','T','W','T','F','S'].map((day, index) => (
                      <div key={`${day}-${index}`} className="text-center text-[10px] font-bold text-slate-400 mb-1">{day}</div>
                    ))}
                    {[28,29,30].map(d => <div key={'prev'+d} className="flex items-center justify-center text-xs opacity-30 aspect-square rounded-sm">{d}</div>)}
                    
                    {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18].map(d => (
                      <div 
                        key={d} 
                        onClick={() => setSelectedDay(d)}
                        className={`flex items-center justify-center text-xs aspect-square rounded-sm cursor-pointer transition-colors ${
                          selectedDay === d 
                            ? 'text-white bg-[#2563EB] shadow-sm relative' 
                            : 'hover:bg-slate-100 hover:text-blue-600'
                        }`}
                      >
                        {d}
                        {selectedDay === d && <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full border border-white"></div>}
                      </div>
                    ))}
                  </div>
                  
                  {/* Interactive Time Picker */}
                  <div className="flex gap-2 mt-5 items-center">
                    <div className="text-slate-400 shrink-0"><Clock size={16} /></div>
                    <select 
                      value={scheduleHour} 
                      onChange={(e) => setScheduleHour(e.target.value)} 
                      className="flex-1 p-2 text-sm font-semibold text-center border border-[#E2E8F0] rounded-sm focus-within:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors bg-white cursor-pointer outline-none hover:border-slate-300"
                    >
                      {['01','02','03','04','05','06','07','08','09','10','11','12'].map(h => <option key={h} value={h}>{h}</option>)}
                    </select>
                    <div className="flex items-center justify-center px-1 font-bold shrink-0 text-slate-400">:</div>
                    <select 
                      value={scheduleMinute} 
                      onChange={(e) => setScheduleMinute(e.target.value)} 
                      className="flex-1 p-2 text-sm font-semibold text-center border border-[#E2E8F0] rounded-sm focus-within:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors bg-white cursor-pointer outline-none hover:border-slate-300"
                    >
                      {['00','15','30','45'].map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                    <select 
                      value={schedulePeriod} 
                      onChange={(e) => setSchedulePeriod(e.target.value)} 
                      className="flex-1 p-2 text-sm font-bold text-center border border-[#E2E8F0] rounded-sm focus-within:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors bg-[#F8FAFC] cursor-pointer outline-none hover:border-slate-300"
                    >
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                  <div className="mt-4 text-[11px] text-center text-[#64748B] bg-blue-50/50 p-2 rounded border border-blue-100">
                    Post will reach peak audience at <span className="font-bold text-blue-600">{scheduleHour}:{scheduleMinute} {schedulePeriod}</span>
                  </div>
                </div>

                {/* Preview Widget */}
                <div className="p-5 bg-white border border-[#E2E8F0] shadow-sm rounded-md hidden md:block w-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-xs font-bold tracking-widest uppercase text-[#94A3B8] flex items-center gap-2">
                      <Smartphone size={14} /> Mobile Preview
                    </div>
                  </div>
                  <div className="relative w-[140px] mx-auto bg-slate-900 rounded-xl aspect-[9/16] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-4 border-slate-800 group cursor-pointer">
                    {uploadState === 'success' ? (
                       <>
                         {videoBlobUrl && <video src={videoBlobUrl} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />}
                         <div className="absolute inset-0 bg-blue-900/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-blue-900/10 transition-colors">
                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md shadow-lg transform group-hover:scale-110 transition-transform">
                              <div className="w-0 h-0 border-t-4 border-t-transparent border-l-6 border-l-white border-b-4 border-b-transparent ml-1"></div>
                            </div>
                         </div>
                       </>
                    ) : (
                      <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
                        <span className="text-xs text-slate-500 font-medium">No video</span>
                      </div>
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end">
                      <div className="p-3 text-[9px] text-white w-full transform transition-transform origin-bottom">
                        <p className="font-bold truncate">@{isConnected ? 'alex_rivera' : 'username'}</p>
                        <p className="mt-1 opacity-90 line-clamp-2 leading-relaxed">{caption || 'Write a caption...'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

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
