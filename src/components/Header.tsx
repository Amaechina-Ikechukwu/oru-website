import React, { useState } from 'react';
import { Mail, GraduationCap, Search, Menu, X, Settings, Users, BookOpen, Building, MapPin } from 'lucide-react';
import { INSTITUTION_INFO } from '../data';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  isAdminMode: boolean;
  setIsAdminMode: (state: boolean) => void;
  currentStudent: any;
  setStudentLogout: () => void;
}

export default function Header({ 
  currentTab, 
  setCurrentTab, 
  isAdminMode, 
  setIsAdminMode, 
  currentStudent 
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'programs', label: 'Academic Programs' },
    { id: 'admissions', label: 'Admissions' },
    { id: 'study-center', label: 'Study Center' },
    { id: 'student-life', label: 'Student Life' },
    { id: 'news', label: 'News & Events' },
    { id: 'contact', label: 'Contact Page' }
  ];

  const handleTabChange = (tabId: string) => {
    setCurrentTab(tabId);
    setIsOpen(false);
  };

  return (
    <header className="w-full flex flex-col z-50 sticky top-0 bg-[#16233c] text-white shadow-xl" id="app-header">
      
      {/* Top Bar */}
      <div className="w-full border-b border-white/10">
        <div className="hidden lg:flex justify-between items-center px-8 py-5 max-w-7xl mx-auto w-full">
          
          {/* Left Logo */}
          <div 
            onClick={() => handleTabChange('home')}
            className="flex items-center gap-4 cursor-pointer group"
          >
            <img src="/oru-logo.png" alt="ORU Logo" className="w-14 h-14 object-contain" />
            <span className="text-3xl font-serif tracking-widest uppercase mt-1 text-white">
              ORAL ROBERTS
            </span>
          </div>

          {/* Right Links */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => handleTabChange('student-portal')}
              className="hidden lg:flex items-center gap-2 px-6 py-3 bg-transparent hover:bg-white/10 text-white text-[11px] font-bold uppercase tracking-widest transition border border-white/50"
            >
              <GraduationCap size={16} /> Student Login
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Top Bar (Simplified) */}
      <div className="lg:hidden flex justify-between items-center px-4 py-3 border-b border-white/10">
        <div className="flex items-center gap-3">
          <img src="/oru-logo.png" alt="ORU Logo" className="w-8 h-8 object-contain" />
          <span className="text-xl font-serif tracking-widest text-white mt-1">ORAL ROBERTS</span>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="hidden lg:flex justify-center gap-12 py-5 text-[11px] font-semibold uppercase tracking-widest max-w-7xl mx-auto w-full">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`hover:text-red-300 transition pb-1 border-b-2 ${currentTab === tab.id ? 'border-white' : 'border-transparent hover:border-red-300'}`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#0d1629] flex flex-col p-4 gap-2 border-t border-white/10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`text-left px-4 py-3 text-sm font-semibold uppercase tracking-widest rounded transition-colors ${currentTab === tab.id ? 'bg-[#be123c] text-white' : 'hover:bg-white/5 text-gray-300'}`}
            >
              {tab.label}
            </button>
          ))}
          <div className="h-px bg-white/10 my-2"></div>
          <button 
            className="flex items-center gap-2 text-left px-4 py-3 text-sm font-semibold uppercase tracking-widest text-[#be123c] hover:bg-white/5 rounded"
            onClick={() => handleTabChange('application-portal')}
          >
            <BookOpen size={16} /> Application Portal
          </button>
          <button 
            className="flex items-center gap-2 text-left px-4 py-3 text-sm font-semibold uppercase tracking-widest text-[#be123c] hover:bg-white/5 rounded"
            onClick={() => handleTabChange('student-portal')}
          >
            <GraduationCap size={16} /> Student Portal
          </button>
          <div className="h-px bg-white/10 my-1"></div>
          <button 
            className="flex items-center gap-2 text-left px-4 py-3 text-sm font-semibold uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/5 rounded"
            onClick={() => handleTabChange('admin-panel')}
          >
            <Settings size={16} /> Admin Portal
          </button>
        </div>
      )}
    </header>
  );
}
