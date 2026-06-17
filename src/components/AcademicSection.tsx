/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PROGRAMS } from '../data';
import { BookOpen, Award, ArrowRight, CheckCircle2, ChevronRight, Sparkles, AlertCircle, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AcademicSectionProps {
  setCurrentTab: (tab: string) => void;
  setSelectedProgramForApplication: (program: string) => void;
}

const ProgramDetailsPane = ({ program, onApply }: { program: any, onApply: (title: string) => void }) => {
  if (!program) return null;
  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500">
      {/* Title & Banner element */}
      <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-6 px-1 xl:px-0 border-b border-gray-100 pb-8 relative z-10">
        <div className="flex flex-col gap-3 xl:pr-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#16233c] font-serif tracking-tight leading-tight">
            {program.title}
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row xl:flex-col text-left shrink-0 gap-3 xl:gap-1 bg-gray-50/80 xl:bg-transparent p-4 xl:p-0 rounded-none">
          <div className="flex items-center gap-2 xl:gap-0 xl:flex-col xl:items-start">
            <span className="text-xs text-gray-400 uppercase font-bold tracking-widest flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              Duration
            </span>
            <span className="text-sm font-bold text-[#16233c]">{program.duration}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-8 py-8 flex-grow">
        {/* Description section */}
        <div className="flex flex-col gap-3 relative z-10 group">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1.5 h-1.5 rounded-none bg-[#be123c]"></div>
            <h4 className="text-xs uppercase font-bold text-[#16233c] tracking-widest">Program Focus</h4>
          </div>
          <p className="text-[15px] text-gray-600 leading-relaxed font-medium">
            {program.description}
          </p>
        </div>

        {/* Entry Requirements box */}
        <div className="bg-red-50/50 rounded-none p-6 border border-red-100/50 flex gap-4 relative z-10 transition-colors hover:bg-red-50">
          <AlertCircle className="w-5 h-5 text-[#be123c] shrink-0 mt-0.5" />
          <div className="flex flex-col text-left">
            <h5 className="text-xs font-bold uppercase text-[#16233c] tracking-widest">Entry Requirements</h5>
            <p className="text-[14px] text-gray-600 mt-2.5 leading-relaxed font-medium">
              {program.requirements}
            </p>
          </div>
        </div>

        {/* Career Opportunities Grid */}
        <div className="flex flex-col gap-4 relative z-10 bg-white border border-gray-100 rounded-none p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
          <h4 className="text-xs uppercase font-bold text-[#be123c] tracking-widest border-b border-gray-50 pb-3">Key Career Paths</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            {program.careerPaths.map((path: string, idx: number) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-gray-700">{path}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action panel */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10 pt-8 border-t border-gray-100 mt-auto">
        <div className="text-center sm:text-left flex flex-col gap-1.5">
          <h5 className="text-lg font-bold text-[#16233c] font-serif">Secure your placement</h5>
          <p className="text-xs text-gray-500 font-medium">Begin your local Port Harcourt application.</p>
        </div>
        <button
          id={`apply-btn-${program.id}`}
          onClick={() => onApply(program.title)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-[#be123c] hover:bg-[#9f0f32] hover:shadow-lg hover:shadow-red-500/30 hover:-translate-y-0.5 transition-all duration-300 text-white text-[13px] font-bold tracking-widest uppercase rounded-none"
        >
          <span>Apply Now</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default function AcademicSection({ setCurrentTab, setSelectedProgramForApplication }: AcademicSectionProps) {
  const [activeProgId, setActiveProgId] = useState(PROGRAMS[0].id);

  const activeProgram = PROGRAMS.find(p => p.id === activeProgId);

  const handleApplyForProgram = (programTitle: string) => {
    setSelectedProgramForApplication(programTitle);
    setCurrentTab('application-portal');
  };

  const toggleAccordion = (id: string) => {
    setActiveProgId(activeProgId === id ? '' : id);
  };

  return (
    <div className="w-full font-sans flex flex-col bg-gray-50 pb-24" id="academic-section-container">
      {/* Hero Banner Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-[400px] lg:h-[450px] w-full bg-[#16233c] overflow-hidden flex items-center shrink-0"
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
        <div className="relative z-10 max-w-7xl w-full mx-auto px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight font-serif mb-6">
              Globally Relevant<br />Academic Programs
            </h1>
            <p className="text-base lg:text-lg text-gray-300 leading-relaxed font-medium">
              Select from our 7 core tracks. Each curriculum matches the meticulous standard of Oral Roberts University, designed to raise leadership stature and professional skill.
            </p>
          </motion.div>
        </div>
      </motion.section>

      <div className="max-w-7xl mx-auto w-full px-6 lg:px-8 mt-12 lg:mt-24">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start"
        >
          {/* Programs navigation sidebar / Mobile Accordion list */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <span className="hidden lg:block text-xs font-bold text-[#16233c] uppercase tracking-widest pl-2 text-left pb-3 border-b border-gray-200">
              Select Major or Discipline
            </span>
            <div className="flex flex-col gap-3">
              {PROGRAMS.map((prog) => {
                const isActive = prog.id === activeProgId;
                return (
                  <div key={prog.id} className="flex flex-col">
                    <button
                      id={`prog-tab-${prog.id}`}
                      onClick={() => toggleAccordion(prog.id)}
                      className={`w-full text-left p-5 lg:p-6 rounded-none flex items-center justify-between transition-all duration-300 ${
                        isActive
                          ? 'bg-[#16233c] text-white shadow-xl shadow-red-900/10 scale-[1.02] lg:scale-100 z-10'
                          : 'bg-white border border-gray-100 text-gray-700 hover:bg-gray-50 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-none transition-colors duration-300 ${isActive ? 'bg-white/10 text-white' : 'bg-red-50 text-[#be123c]'}`}>
                          <BookOpen className="w-5 h-5" />
                        </div>
                        <span className="text-base font-semibold tracking-tight leading-snug lg:max-w-xs">{prog.title}</span>
                      </div>
                      <ChevronRight className={`w-5 h-5 shrink-0 transition-transform duration-300 ${isActive ? 'text-white rotate-90 lg:rotate-0' : 'text-gray-400'}`} />
                    </button>
                    
                    {/* Mobile Accordion Drawer */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0, marginTop: 0 }}
                          animate={{ height: 'auto', opacity: 1, marginTop: 12 }}
                          exit={{ height: 0, opacity: 0, marginTop: 0 }}
                          transition={{ duration: 0.3 }}
                          className="lg:hidden overflow-hidden"
                        >
                          <div className="bg-white p-6 sm:p-8 rounded-none border border-gray-100 shadow-sm">
                            <ProgramDetailsPane program={prog} onApply={handleApplyForProgram} />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Desktop Program details viewport panel */}
          <div className="hidden lg:flex lg:col-span-7 flex-col gap-8 text-left relative bg-white p-12 rounded-none border border-gray-100 shadow-xl shadow-gray-200/50 min-h-[600px] sticky top-32">
            <AnimatePresence mode="wait">
              {activeProgram && (
                <motion.div
                  key={activeProgram.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="h-full flex flex-col"
                >
                  <ProgramDetailsPane program={activeProgram} onApply={handleApplyForProgram} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
