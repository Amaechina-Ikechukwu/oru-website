/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeSection from './components/HomeSection';
import AboutSection from './components/AboutSection';
import AcademicSection from './components/AcademicSection';
import AdmissionsSection from './components/AdmissionsSection';
import StudyCenterSection from './components/StudyCenterSection';
import StudentLifeSection from './components/StudentLifeSection';
import NewsSection from './components/NewsSection';
import ContactSection from './components/ContactSection';
import ApplicationPortal from './components/ApplicationPortal';
import TrackApplication from './components/TrackApplication';
import StudentPortal from './components/StudentPortal';
import AdminPortal from './components/AdminPortal';
import { Student } from './types';
import { MessageCircle, X, Send } from 'lucide-react';
import { INSTITUTION_INFO } from './data';
import { Toaster, toast } from 'sonner';

export default function App({ initialPath = '/' }: { initialPath?: string }) {
  const getTabFromPath = (path: string) => {
    // Basic router logic to parse the slug mapped to the tab
    const segments = path.split('/').filter(Boolean);
    const firstSegment = segments[0];
    if (!firstSegment || firstSegment === 'home') return 'home';
    const validTabs = ['about', 'programs', 'admissions', 'study-center', 'student-life', 'news', 'contact', 'application-portal', 'track-application', 'student-portal', 'admin-panel'];
    return validTabs.includes(firstSegment) ? firstSegment : 'home';
  };

  const [currentTab, setCurrentTab] = useState<string>(getTabFromPath(typeof window !== 'undefined' ? window.location.pathname : initialPath));
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [selectedProgramForApplication, setSelectedProgramForApplication] = useState<string>("");
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  React.useEffect(() => {
    const handlePopState = () => {
      setCurrentTab(getTabFromPath(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleTabChange = (newTab: string | ((prev: string) => string)) => {
    const actualTab = typeof newTab === 'function' ? newTab(currentTab) : newTab;
    setCurrentTab(actualTab);
    if (typeof window !== 'undefined') {
      const path = actualTab === 'home' ? '/' : `/${actualTab}`;
      if (window.location.pathname !== path) {
        window.history.pushState({}, '', path);
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  const setStudentLogout = () => {
    setCurrentStudent(null);
    handleTabChange('home');
  };

  const renderContent = () => {
    switch (currentTab) {
      case 'home':
        return <HomeSection setCurrentTab={handleTabChange} />;
      case 'about':
        return <AboutSection />;
      case 'programs':
        return (
          <AcademicSection 
            setCurrentTab={handleTabChange} 
            setSelectedProgramForApplication={setSelectedProgramForApplication} 
          />
        );
      case 'admissions':
        return <AdmissionsSection setCurrentTab={handleTabChange} />;
      case 'study-center':
        return <StudyCenterSection />;
      case 'student-life':
        return <StudentLifeSection />;
      case 'news':
        return <NewsSection isAdminMode={isAdminMode} />;
      case 'contact':
        return <ContactSection />;
      case 'application-portal':
        return <ApplicationPortal initialProgram={selectedProgramForApplication} />;
      case 'track-application':
        return <TrackApplication />;
      case 'student-portal':
        return (
          <StudentPortal 
            currentStudent={currentStudent} 
            setCurrentStudent={setCurrentStudent} 
          />
        );
      case 'admin-panel':
        return <AdminPortal />;
      default:
        return <HomeSection setCurrentTab={handleTabChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between" id="app-wrapper">
      <Toaster position="top-right" richColors />
      {/* Universal Institutional Header Nav */}
      {currentTab !== 'student-portal' && (
        <Header 
          currentTab={currentTab} 
          setCurrentTab={handleTabChange} 
          isAdminMode={isAdminMode} 
          setIsAdminMode={setIsAdminMode}
          currentStudent={currentStudent}
          setStudentLogout={setStudentLogout}
        />
      )}

      {/* Main viewport transition pane */}
      <main className="flex-1 w-full" id="main-app-content">
        <div className="animate-fade-in transition duration-300">
          {renderContent()}
        </div>
      </main>

      {/* Universal Institutional Footer */}
      {currentTab !== 'student-portal' && (
        <Footer setCurrentTab={handleTabChange} />
      )}

      {/* Floating WhatsApp / Live Chat Widget */}
      {currentTab !== 'student-portal' && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
          {isChatOpen && (
            <div className="bg-white w-80 shadow-2xl rounded-2xl overflow-hidden border border-gray-200 animate-fade-in flex flex-col">
              <div className="bg-[#16233c] text-white p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-sm">Live Support</h3>
                  <p className="text-[10px] text-red-200 uppercase tracking-widest">Available 9am - 5pm</p>
                </div>
                <button onClick={() => setIsChatOpen(false)} className="hover:text-red-400 transition">
                  <X size={18} />
                </button>
              </div>
              <div className="p-4 flex-1 h-64 bg-gray-50 flex flex-col gap-3 overflow-y-auto">
                <div className="bg-gray-200 p-3 rounded-lg rounded-tl-none w-5/6 text-xs text-gray-700">
                  Hello! Welcome to ORU Port Harcourt. How can we help you today regarding admissions or your student portal?
                </div>
              </div>
              <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
                <input type="text" placeholder="Type a message..." className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-xs focus:outline-none" />
                <button disabled className="bg-[#be123c] text-white p-2 rounded-full cursor-not-allowed opacity-50">
                  <Send size={14} />
                </button>
              </div>
              <div className="p-3 bg-green-50 border-t border-green-100 flex flex-col items-center justify-center text-center">
                <span className="text-xs text-gray-600 mb-2 mt-1">Prefer to use WhatsApp?</span>
                <a 
                  href={`https://wa.me/${INSTITUTION_INFO.whatsapp}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="bg-[#25D366] text-white text-xs font-bold uppercase tracking-wider py-2 px-6 rounded-full flex items-center gap-2 hover:bg-[#128C7E] transition mb-1"
                >
                  <MessageCircle size={16} /> Open WhatsApp
                </a>
              </div>
            </div>
          )}
          
          {!isChatOpen && (
            <button 
              onClick={() => setIsChatOpen(true)}
              className="bg-[#be123c] text-white p-4 rounded-full shadow-xl hover:bg-[#9f0f32] transition transform hover:scale-110 flex items-center justify-center duration-1000"
            >
              <MessageCircle size={28} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
