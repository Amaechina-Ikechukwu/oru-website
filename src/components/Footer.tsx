/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { INSTITUTION_INFO } from '../data';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
}

export default function Footer({ setCurrentTab }: FooterProps) {
  return (
    <footer className="bg-[#16233c] text-white font-sans" id="app-footer">
      {/* Top Banner section */}
      <div className="bg-[#0d1629] py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto w-full px-8 flex flex-col justify-between items-start gap-8">
          <div className="text-left text-white w-full">
            <h3 className="text-2xl md:text-3xl font-serif tracking-wide">
              Ready to raise a spiritual and professional legacy?
            </h3>
            <p className="text-red-100/70 text-sm mt-3 max-w-xl leading-relaxed">
              Become part of a world-renowned academic system right here in Rivers State. Access global leadership strategies grounded in absolute Christian ideals.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <button
              onClick={() => setCurrentTab('application-portal')}
              className="px-8 py-3 bg-[#be123c] hover:bg-[#9f0f32] text-white font-bold uppercase tracking-wider text-xs transition"
            >
              Start Admission Entry
            </button>
            <button
              onClick={() => setCurrentTab('contact')}
              className="px-8 py-3 bg-transparent border border-white/30 hover:border-white text-white font-bold uppercase tracking-wider text-xs transition"
            >
              Speak to Admissions Officer
            </button>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="relative py-20 bg-[#16233c] overflow-hidden">
        {/* Background Image overlay */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto w-full px-8 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Brand & Affiliation Column */}
          <div className="flex flex-col gap-6 pr-4">
            <div className="flex items-center gap-4 mb-2">
              <img src="/oru-logo.png" alt="ORU Logo" className="w-12 h-12 object-contain" />
              <span className="font-serif uppercase tracking-widest text-lg leading-tight text-white">
                ORAL ROBERTS<br/>UNIVERSITY
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed font-medium">
              Oral Roberts University Tulsa Oklahoma is affiliated in Nigeria with Peace land University Enugu to deliver premium academic programs that empower the whole person: spirit, mind, and body.
            </p>
            <div className="flex flex-col gap-2 mt-2">
              <span className="font-bold text-white uppercase tracking-widest text-[10px]">Affiliation Partner</span>
              <span className="text-gray-400 text-sm font-medium">{INSTITUTION_INFO.nigerianAffiliate}</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="flex flex-col gap-6 lg:pl-10">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mt-2">
              Useful Links
            </h4>
            <ul className="flex flex-col gap-3.5 text-sm text-gray-400 font-medium">
               <li><button onClick={() => setCurrentTab('programs')} className="hover:text-white hover:translate-x-1 duration-300 transition-all text-left">Theology & Ministry</button></li>
               <li><button onClick={() => setCurrentTab('programs')} className="hover:text-white hover:translate-x-1 duration-300 transition-all text-left">Leadership & Business</button></li>
               <li><button onClick={() => setCurrentTab('admissions')} className="hover:text-white hover:translate-x-1 duration-300 transition-all text-left">Admissions & Tuition</button></li>
               <li><button onClick={() => setCurrentTab('student-portal')} className="hover:text-white hover:translate-x-1 duration-300 transition-all text-left">Student Portal</button></li>
               <li><button onClick={() => setCurrentTab('application-portal')} className="hover:text-white hover:translate-x-1 duration-300 transition-all text-left">Application Portal</button></li>
               <li><button onClick={() => setCurrentTab('news')} className="hover:text-white hover:translate-x-1 duration-300 transition-all text-left">News & Events</button></li>
            </ul>
          </div>

          {/* Study Center Location */}
          <div className="flex flex-col gap-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mt-2">
              Campus Locations
            </h4>
            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-4 group cursor-default">
                <div className="p-2.5 bg-white/5 border border-white/10 group-hover:bg-red-500/20 group-hover:border-red-500/30 transition-all shrink-0">
                  <MapPin className="w-4 h-4 text-gray-300 group-hover:text-red-400" />
                </div>
                <p className="text-sm text-gray-400 leading-relaxed font-medium">
                  <strong className="text-white font-semibold">Methodist Church Premises</strong><br />
                  Mbonu/Ohaeto Street, D/Line<br />
                  Port Harcourt, Rivers State.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Desk */}
          <div className="flex flex-col gap-6 lg:pl-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mt-2">
              Contact Desk
            </h4>
            
            <div className="flex flex-col gap-5 text-sm text-gray-400">
              <div className="flex items-center gap-4 group cursor-default">
                <div className="p-2.5 bg-white/5 border border-white/10 group-hover:bg-red-500/20 group-hover:border-red-500/30 transition-all shrink-0">
                  <Phone className="w-4 h-4 text-gray-300 group-hover:text-red-400" />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-white">{INSTITUTION_INFO.phones[0]}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4 group cursor-default">
                <div className="p-2.5 bg-white/5 border border-white/10 group-hover:bg-red-500/20 group-hover:border-red-500/30 transition-all shrink-0">
                  <Mail className="w-4 h-4 text-gray-300 group-hover:text-red-400" />
                </div>
                <div className="flex flex-col overflow-hidden min-w-0">
                  <span className="font-medium text-white truncate">{INSTITUTION_INFO.emails.admissions}</span>
                </div>
              </div>
            </div>

            <div className="mt-2 pt-6 border-t border-white/10">
              <button onClick={() => setCurrentTab('contact')} className="w-full text-center py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-[11px] font-bold uppercase tracking-widest transition-all duration-300">
                Contact Support Center
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Copyright credit line */}
      <div className="bg-[#090e1a] text-red-100/40 text-xs py-6 px-8 text-center border-t border-white/5">
        <p>
          © 2026 Oral Roberts University Tulsa Oklahoma, Port Harcourt Study Center. All domestic copyrights/affiliations are reserved in Nigeria in partnership with Peace land University Enugu.
        </p>
      </div>
    </footer>
  );
}
