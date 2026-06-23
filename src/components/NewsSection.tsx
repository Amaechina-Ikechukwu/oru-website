/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { SAMPLE_ANNOUNCEMENTS } from '../data';
import { AnnouncementCategory } from '../types';
import { Calendar, Tag, ChevronRight, BookOpen, AlertCircle, Sparkles, User, FileText } from 'lucide-react';
import { publicApi } from '../api';

interface NewsSectionProps {
  isAdminMode: boolean;
}

export default function NewsSection({ isAdminMode }: NewsSectionProps) {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [readingAnn, setReadingAnn] = useState<any | null>(null);

  // Enum mapping for category 
  const categoryMap: { [key: number]: string } = {
    0: 'News',
    1: 'Event',
    2: 'Seminar',
    3: 'Academic',
    4: 'Gallery'
  };

  // Load from Public API
  useEffect(() => {
    async function loadNews() {
      try {
        const res = await publicApi.listAnnouncements();
        if (res.success && res.data && res.data.items) {
          const loaded = res.data.items.map((item: any) => ({
            id: item.id,
            title: item.title,
            content: item.content,
            category: categoryMap[item.category] || 'News',
            dateString: new Date(item.publishedAt).toLocaleDateString(),
            createdAt: item.publishedAt
          }));
          setAnnouncements(loaded.length > 0 ? loaded : SAMPLE_ANNOUNCEMENTS);
        } else {
          setAnnouncements(SAMPLE_ANNOUNCEMENTS);
        }
      } catch (e) {
        console.warn("Using sample announcements backup.");
        setAnnouncements(SAMPLE_ANNOUNCEMENTS);
      }
    }
    loadNews();
  }, [isAdminMode]);

  const categories = ["All", "News", "Event", "Seminar", "Academic"];

  const filteredAnnouncements = selectedCategory === "All"
    ? announcements
    : announcements.filter(ann => ann.category === selectedCategory);

  return (
    <div className="w-full font-sans flex flex-col bg-gray-50 pb-24" id="news-section-viewport">
      {/* Hero Banner Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-[400px] lg:h-[450px] w-full bg-[#16233c] overflow-hidden flex items-center shrink-0"
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
        <div className="relative z-10 max-w-7xl w-full mx-auto px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight font-serif mb-6">
              News & Events
            </h1>
            <p className="text-base text-gray-200 leading-relaxed font-medium">
              Official university notices, portal updates, scheduling changes, and event galleries from the Port Harcourt Study Center.
            </p>
          </motion.div>
        </div>
      </motion.section>

      <div className="max-w-7xl mx-auto flex flex-col gap-10 w-full px-6 lg:px-8 mt-12 lg:mt-24">

        {/* Category filters bar toggle */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-5">
          <div className="flex flex-wrap items-center gap-3">
            {categories.map((cat) => (
              <button
                id={`news-category-tab-${cat}`}
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setReadingAnn(null);
                }}
                className={`text-xs px-5 py-2.5 font-bold rounded-none transition uppercase tracking-wider ${
                  selectedCategory === cat
                    ? 'bg-[#16233c] text-white shadow-md'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-[#16233c]'
                }`}
              >
                {cat === "All" ? "📰 All Notices" : cat}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
             <button
                onClick={() => {
                  setSelectedCategory("Gallery");
                  setReadingAnn(null);
                }}
                className={`text-xs px-5 py-2.5 font-bold rounded-none transition uppercase tracking-wider ${
                  selectedCategory === "Gallery"
                    ? 'bg-[#be123c] text-white shadow-md'
                    : 'bg-red-50 text-red-700 hover:bg-red-100'
                }`}
              >
                📸 Event Gallery
              </button>
          </div>
        </div>

        {/* Dynamic Content Area: News vs Gallery */}
        {selectedCategory === "Gallery" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in mb-8">
            {[
               '/events/WhatsApp Image 2026-06-20 at 06.5.jpeg',
               '/events/WhatsApp Image 2026-06-20 at 06.51.50.jpeg',
               '/events/WhatsApp Image 2026-06-20 at 06.51.51.jpeg',
               '/events/WhatsApp Image 2026-06-20 at 06.51.jpeg',
               'https://images.unsplash.com/photo-1523580494112-071d16940d14?q=80&w=800&auto=format&fit=crop', // Graduation
               'https://images.unsplash.com/photo-1431576901776-e539bd916ba2?q=80&w=800&auto=format&fit=crop', // Classroom / student
               'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop', // Campus building
               'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop', // Group of students
               'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800&auto=format&fit=crop', // Event hall
               'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800&auto=format&fit=crop'  // library / study
            ].map((url, idx) => (
              <div key={idx} className="bg-gray-100 rounded-none overflow-hidden aspect-video relative group cursor-pointer border border-gray-200">
                <img src={url} alt="Gallery Event" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-[#16233c]/30 group-hover:bg-[#16233c]/60 transition-colors duration-300 pointer-events-none"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[10px] uppercase font-bold tracking-widest bg-[#16233c] px-2 py-1 rounded-none backdrop-blur">Event Detail</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Announcements List */}
          <div className={`flex flex-col gap-6 ${readingAnn ? 'lg:col-span-5' : 'lg:col-span-12'} transition-all duration-300`}>
            {filteredAnnouncements.length === 0 ? (
              <div className="p-10 text-center bg-gray-50 rounded-none border border-dashed border-gray-300">
                <AlertCircle className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                <span className="text-sm font-medium text-gray-500 block">No notices found in this channel yet.</span>
              </div>
            ) : (
              <div className={`grid grid-cols-1 ${readingAnn ? 'grid-cols-1' : 'md:grid-cols-3'} gap-6`}>
                {filteredAnnouncements.map((ann) => (
                  <div
                    key={ann.id}
                    onClick={() => setReadingAnn(ann)}
                    className={`cursor-pointer flex flex-col justify-between text-left h-full transition-all duration-300 py-4 border-b border-gray-200 last:border-0 ${
                      readingAnn?.id === ann.id 
                        ? 'text-[#be123c] opacity-80' 
                        : 'opacity-100'
                    }`}
                  >
                    <div className="flex flex-col gap-3">
                      <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest mb-1 opacity-80">
                        <span className="flex items-center gap-1.5">
                          <Calendar className={`w-3.5 h-3.5 ${readingAnn?.id === ann.id ? 'text-[#be123c]' : 'text-[#be123c]'}`} />
                          {ann.dateString}
                        </span>
                        <span className="text-gray-500">
                          {ann.category}
                        </span>
                      </div>

                      <h3 className={`text-base font-bold font-serif leading-tight ${readingAnn?.id === ann.id ? 'text-[#be123c]' : 'text-[#16233c]'}`}>
                        {ann.title}
                      </h3>

                      <p className="text-xs line-clamp-3 leading-relaxed mt-1 text-gray-600">
                        {ann.content}
                      </p>
                    </div>

                    <div
                      id={`read-more-btn-${ann.id}`}
                      className={`mt-6 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider self-start transition-all ${
                        readingAnn?.id === ann.id ? 'text-[#be123c]' : 'text-gray-500 hover:text-[#16233c]'
                      }`}
                    >
                      <span>Read Full Notice</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Active Notice Reader panel */}
          {readingAnn && (
            <div className="lg:col-span-7 text-left flex flex-col gap-6 relative sticky top-24 pt-4 border-t border-gray-200 lg:border-t-0 lg:pl-10 lg:border-l">
              <button
                id="close-reader-btn"
                onClick={() => setReadingAnn(null)}
                className="absolute top-0 right-0 lg:top-4 lg:right-4 text-[10px] uppercase tracking-widest font-bold text-[#be123c] hover:text-[#16233c] transition"
              >
                Close View
              </button>

              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest mt-2 border-b border-gray-100 pb-4">
                <Tag className="w-4 h-4 text-[#be123c]" />
                <span className="text-[#16233c]">Announcement Category: {readingAnn.category}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#16233c] leading-tight mt-2">
                {readingAnn.title}
              </h2>

              <div className="flex items-center gap-4 text-[11px] uppercase tracking-widest font-bold text-gray-500 bg-gray-50 px-4 py-3 rounded-none">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#be123c]" />
                  Published {readingAnn.dateString}
                </span>
                <span className="h-4 w-px bg-gray-300"></span>
                <span className="flex items-center gap-2 text-[#16233c]">
                  <User className="w-4 h-4" />
                  Port Harcourt Bureau
                </span>
              </div>

              <div className="text-sm text-gray-700 leading-relaxed font-normal whitespace-pre-wrap mt-2">
                {readingAnn.content}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 flex gap-4 items-start">
                <FileText className="w-6 h-6 text-[#be123c] shrink-0" />
                <div className="flex flex-col text-left">
                  <span className="text-sm font-bold font-serif text-[#16233c] mb-1">Official Notice Correspondence</span>
                  <p className="text-xs text-gray-600 leading-relaxed font-normal">
                    For additional clarifications, kindly reach our corporate Admissions Secretary directly via <strong className="font-bold text-[#be123c] uppercase tracking-wide text-[10px] ml-1">admissions@oruphstudycampus.org</strong>.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>
        )}

      </div>
    </div>
  );
}
