import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Library from './pages/Library';

export default function App() {
  const [isConnected, setIsConnected] = useState<boolean>(() => {
    return localStorage.getItem('tiktok_connected') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('tiktok_connected', String(isConnected));
  }, [isConnected]);

  const [scheduledVideos, setScheduledVideos] = useState<any[]>(() => {
    const saved = localStorage.getItem('scheduledVideos');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('scheduledVideos', JSON.stringify(scheduledVideos));
  }, [scheduledVideos]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard isConnected={isConnected} setIsConnected={setIsConnected} onSchedule={(video: any) => setScheduledVideos(prev => [video, ...prev])} />} />
        <Route path="/library" element={<Library isConnected={isConnected} setIsConnected={setIsConnected} videos={scheduledVideos} setVideos={setScheduledVideos} />} />
        <Route path="/privacy/tiktokoVSvT2djMhSd4u6iI5EX4eGtxNUF9zdK.txt" element={<Privacy />} />
        <Route path="/terms/tiktokpNdIsQBdXEuVlXCssC6Y5mF825ySjkWt.txt" element={<Terms />} />
      </Routes>
    </BrowserRouter>
  );
}
