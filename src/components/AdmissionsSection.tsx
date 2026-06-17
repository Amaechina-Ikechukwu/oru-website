/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HelpCircle, ChevronRight, Calculator, CheckSquare, Sparkles, Receipt, HelpCircle as HelpIcon, ArrowRight, Wallet, BadgeCheck, FileText, Banknote } from 'lucide-react';
import { PROGRAMS, FAQ } from '../data';
import { motion } from 'motion/react';

interface AdmissionsSectionProps {
  setCurrentTab: (tab: string) => void;
}

export default function AdmissionsSection({ setCurrentTab }: AdmissionsSectionProps) {
  const getTuitionCost = (id: string): number => {
    switch (id) {
      case 'cert-theo': return 40000;
      case 'dip-theo': return 60000;
      case 'ba-theo': return 280000;
      case 'phd-missions': return 650000;
      case 'ma-theo': return 400000;
      case 'phd-edu': return 650000;
      case 'phd-theo': return 650000;
      default: return 60000;
    }
  };

  const steps = [
    { title: 'Initialize Query', desc: 'Browse available courses and seek academic counseling from our Port Harcourt Center.' },
    { title: 'Fill Portal Application & Upload Documents', desc: 'Complete the online bio form, select your major, and upload registration requirements including your past certificates, two passport-sized photographs, etc.' },
    { title: 'Pay Application Fee', desc: 'Securely pay the ₦10,000 application fee through our simulated checkout.' },
    { title: 'Evaluations & Interview', desc: 'Our administrative coordinators in PH in partnership with Enugu review submitted details.' },
    { title: 'Receive Offer', desc: 'Approved entries receive formal Admissions letters with assigned Student Matric numbers.' }
  ];

  return (
    <div className="w-full font-sans flex flex-col pt-16 bg-white pb-24" id="admissions-section-container">
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto w-full px-6 lg:px-8 mb-16">
         <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-gray-100"
          >
            <div className="max-w-2xl flex flex-col gap-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#16233c] tracking-tighter leading-none">
                Admissions & <span className="text-[#be123c]">Tuition.</span>
              </h1>
            </div>
         </motion.div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col gap-24 w-full px-6 lg:px-8">

        {/* Track Application Full Section */}
        <div className="bg-gray-50 p-8 md:p-12 border border-gray-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 -mt-8">
          <div className="flex flex-col text-left max-w-2xl">
            <h2 className="text-2xl lg:text-3xl font-serif font-bold text-[#16233c] mb-4 tracking-tight leading-tight">Track Your Admission Status</h2>
            <p className="text-gray-600 leading-relaxed text-sm font-medium">
              Already submitted your application? Check your current status, view next steps, and manage your uploaded documents seamlessly.
            </p>
          </div>
          <button 
            onClick={() => setCurrentTab('track-application')}
            className="flex-shrink-0 bg-[#be123c] hover:bg-[#9f0f32] text-white px-8 py-4 text-sm font-bold uppercase tracking-widest transition"
          >
            Track Application
          </button>
        </div>

        {/* 1. Step-by-step application process graph */}
        <div id="admission-process" className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-4 flex flex-col gap-6 relative lg:sticky lg:top-32">
               <p className="text-gray-500 font-medium leading-relaxed">
                 Follow these steps to complete your enrollment. The process is designed to be fully transparent and digital.
               </p>
               <div className="flex gap-4 mt-4">
                 <button
                    onClick={() => setCurrentTab('application-portal')}
                    className="flex w-fit items-center gap-3 px-8 py-4 bg-[#16233c] hover:bg-black text-white text-xs font-bold uppercase tracking-widest rounded-none transition-all"
                  >
                   Start Admission <ArrowRight className="w-4 h-4" />
                 </button>
               </div>
            </div>

            <div className="lg:col-span-8 flex flex-col">
              {steps.map((st, idx) => (
                <div key={idx} className="flex gap-8 group pb-8 pt-8 border-t border-gray-100 first:border-t-0 first:pt-0 hover:bg-gray-50 transition-colors p-4 -mx-4">
                  <div className="flex flex-col items-center">
                    <span className="text-3xl font-black text-gray-200 group-hover:text-[#be123c] transition-colors leading-none">
                      0{idx + 1}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h4 className="text-lg font-bold text-[#16233c] tracking-tight">
                      {st.title}
                    </h4>
                    <p className="text-gray-500 leading-relaxed font-medium">
                      {st.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
        </div>

        {/* 2. Tuition Fee Structure */}
        <div id="tuition-calculator-grid" className="flex flex-col gap-12 bg-gray-50 p-8 lg:p-16 border border-gray-100 rounded-none">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-gray-200">
               <div className="flex flex-col gap-3 max-w-xl">
                  <h3 className="text-2xl lg:text-3xl font-black text-[#16233c] tracking-tight flex items-center gap-3">
                    Tuition & Finance
                  </h3>
                  <p className="text-gray-600 font-medium leading-relaxed">
                    Fees listed are per program. We keep structures accessible to empower ministers and professionals without compromise.
                  </p>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
              
              {/* Tuition Table */}
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-[#be123c]" />
                  <span className="text-xs font-bold text-[#16233c] uppercase tracking-widest">Base Schedule</span>
                </div>
                
                <div className="flex flex-col border border-gray-200 bg-white">
                  {PROGRAMS.map((prog, idx) => (
                    <div key={prog.id} className={`flex items-center justify-between p-4 ${idx !== PROGRAMS.length - 1 ? 'border-b border-gray-100' : ''} hover:bg-gray-50 transition-colors`}>
                      <span className="font-semibold text-[#16233c] text-sm">{prog.title}</span>
                      <span className="font-mono font-bold text-[#be123c]">₦{getTuitionCost(prog.id).toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="p-4 bg-gray-50 border-t border-gray-200">
                     <span className="text-xs text-gray-500 font-medium uppercase tracking-widest">* Plus Non-Refundable ₦10k App Fee</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Payment Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 pt-12 border-t border-gray-200">
                 <div className="flex flex-col gap-2">
                   <h4 className="text-sm font-bold uppercase tracking-widest text-[#16233c] flex items-center gap-2">
                     <Banknote className="w-4 h-4 text-[#be123c]" /> Official Payment
                   </h4>
                   <p className="text-sm text-gray-500 font-medium pr-4 mt-2">All fees must be remitted directly to the designated institutional account. Payment can be done in installments, two or three times during the course duration.</p>
                 </div>
                 <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
                   <div className="flex flex-col gap-2">
                     <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Account Name</span>
                     <span className="text-sm font-bold text-[#16233c]">Southern bible college</span>
                   </div>
                   <div className="flex flex-col gap-2">
                     <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Number</span>
                     <span className="text-sm font-mono font-bold text-[#16233c]">5216024388</span>
                   </div>
                   <div className="flex flex-col gap-2">
                     <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Bank</span>
                     <span className="text-sm font-bold text-[#16233c]">Monie point</span>
                   </div>
                 </div>
            </div>
        </div>

        {/* 3. Tuition scholarship FAQs */}
        <div id="admission-faq" className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24 mb-16">
          <div className="flex flex-col gap-4 max-w-sm">
             <h3 className="text-2xl font-black text-[#16233c] tracking-tight">
               Affiliation FAQs
             </h3>
             <p className="text-gray-500 font-medium leading-relaxed">
               Common questions regarding admissions, structure, and academic certifications.
             </p>
          </div>
          
          <div className="lg:col-span-2 flex flex-col">
            {FAQ.map((fq, idx) => (
              <div key={idx} className="flex flex-col gap-4 py-8 border-b border-gray-100 first:pt-0 hover:bg-gray-50/50 transition-colors p-4 -mx-4 md:mx-0 md:p-6 md:px-0">
                <span className="font-bold text-lg text-[#16233c] tracking-tight leading-snug">{fq.question}</span>
                <p className="text-base text-gray-600 leading-relaxed font-medium">{fq.answer}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

