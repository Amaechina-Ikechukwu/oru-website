/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Award, ShieldCheck, Flame, Users, BookOpenCheck, Landmark, Compass } from 'lucide-react';
import { INSTITUTION_INFO } from '../data';
import { motion } from 'motion/react';

export default function AboutSection() {
  const values = [
    { title: 'Academic Excellence', desc: 'Developing exceptional mental capabilities and critical evaluation frameworks to challenge secular philosophies.', icon: BookOpenCheck },
    { title: 'Christian Values', desc: 'Sustaining high integrity, Christlike character, humility, and absolute ethical responsibility.', icon: ShieldCheck },
    { title: 'Spiritual Vitality', desc: 'Enabling active Holy Spirit interactions, power in intercessory prayers, and a heart for missions.', icon: Flame },
    { title: 'Social Responsibility', desc: 'Equipping students to heal broken societies, lead national growth, and defend the marginalized.', icon: Compass }
  ];

  const adminPositions = [
    { name: 'Dr. Williams M. Wilson', role: 'VC / President', desc: 'Vice Chancellor and President of Oral Roberts University, U.S.A, driving the global academic and spiritual vision.' },
    { name: 'Rev. (Prof) H.U. Richard', role: 'African Representative / Provost', desc: 'Provost, Southern Baptist Theological Seminary, and African Representative for Oral Roberts University.' },
    { name: 'Apostle Daniel Ndukwe Ph,D', role: 'Provost CCST / DYNASS ABA', desc: 'Provost, Christ-Centered School of Theology & Dynamic School of Arts and Social Sciences (Affiliate of ORU).' }
  ];

  return (
    <div className="w-full flex flex-col bg-gray-50 pb-16" id="about-section-container">
      {/* 1. Hero Banner Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-[400px] w-full bg-[#16233c] overflow-hidden flex items-center shrink-0"
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
        <div className="relative z-10 max-w-7xl w-full mx-auto px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight font-serif mb-4">
              Nurtured in Tulsa OK, Planted in Port Harcourt
            </h1>
            <p className="text-base text-gray-200 leading-relaxed font-medium">
              Discover the legacy of Oral Roberts University, our global spiritual vision, and how our Nigeria Study Center is empowering generations for breakthrough leadership.
            </p>
          </motion.div>
        </div>
      </motion.section>

      <div className="max-w-6xl mx-auto flex flex-col gap-16 w-full px-8 mt-16">

        {/* 1. Interactive History section split */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-16 lg:gap-24 items-center" id="about-history"
        >
          <div className="flex flex-col gap-6 text-left">
            <h2 className="text-2xl lg:text-3xl font-bold font-serif text-[#16233c] tracking-tight flex items-center gap-4">
              <span className="p-3 bg-red-50 text-[#be123c] rounded-xl shrink-0">
                <Landmark className="w-6 h-6" />
              </span>
               ORU Global Vision & Legacy
            </h2>
            <div className="space-y-5 text-gray-600 leading-relaxed font-medium">
              <p>
                Oral Roberts University (ORU) is a world-renowned Christian university located in Tulsa, Oklahoma, founded in 1963 by evangelist Oral Roberts. Built upon the powerful mandate to "hear God's voice and go into every person's world to bring His healing power," ORU has raised thousands of global professionals who lead with extraordinary intelligence and deep faith.
              </p>
              <p>
                Recognizing Nigeria's pivotal role in global missions and corporate development, the Port Harcourt Study Center was established to grant qualified candidates access to these esteemed modules without requiring migration, keeping families and ministerial local assignments active.
              </p>
            </div>
            <blockquote className="mt-4 border-l-4 border-[#be123c] pl-6 py-4 italic text-[#16233c] bg-rose-50/50 rounded-r-xl border border-gray-100 font-serif text-lg">
              "We educate the whole man — spirit, mind, and body. This legacy is not confined to boundaries inside the USA; it is a global spiritual network."
            </blockquote>
          </div>

          <div className="flex flex-col text-left">
            <div className="bg-gray-50 border border-gray-100 p-10 rounded-none flex flex-col gap-6 shadow-sm">
              <h3 className="text-xl lg:text-2xl font-bold text-[#16233c] tracking-tight font-serif mb-2 border-b border-gray-200 pb-4">
                The Port Harcourt <span className="text-[#be123c]">Affiliate Mandate</span>
              </h3>
              <p className="text-gray-600 leading-relaxed font-medium">
                By entering into structural affiliation with Peace land University Enugu, our study center in Rivers State operates under full regulatory authorization. We offer convenient, hybrid face-to-face modules directly accessible inside the Methodist Church Premises in D/Line, Port Harcourt.
              </p>
              <div className="grid grid-cols-2 gap-8 items-center mt-6 pt-8 border-t border-gray-200">
                <div className="flex flex-col gap-1">
                  <span className="text-3xl lg:text-4xl font-black text-[#16233c] leading-none tracking-tighter">2026</span>
                  <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mt-1">Active Session</span>
                </div>
                <div className="flex flex-col gap-1 pl-8 border-l border-gray-200">
                  <span className="text-3xl lg:text-4xl font-black text-[#16233c] leading-none tracking-tighter">100%</span>
                  <span className="text-[10px] text-[#be123c] uppercase font-bold tracking-widest mt-1">Verified License</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* 2. Four Pillars Core Values */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-10 text-left" id="about-pillars"
        >
          <div className="max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#16233c] font-serif mt-4">Academic Excellence <span className="text-[#be123c]">&</span> Christian Values</h2>
            <p className="text-sm text-gray-600 mt-4 leading-relaxed">We refuse to separate academic intelligence from daily character. Our modules are structured to nourish four foundational values.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div key={idx} className="flex flex-col gap-4 text-left">
                  <div className="w-12 h-12 bg-[#be123c]/10 text-[#be123c] rounded-lg flex items-center justify-center border border-[#be123c]/20 shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#16233c] tracking-tight mb-2">
                      {val.title}
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {val.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* 3. Leadership & Administration */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-10 text-left pt-6 border-t border-gray-200" id="about-leaders"
        >
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#16233c] font-serif mt-2">Leadership and Administration</h2>
            <div className="w-16 h-1 mt-4 bg-[#be123c]"></div>
            <p className="text-sm text-gray-600 mt-4 max-w-2xl leading-relaxed">
              Meet our seasoned administrative and spiritual leaders in Port Harcourt, dedicated to ensuring stellar student services, scheduling consistency, and spiritual mentoring.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {adminPositions.map((admin, idx) => (
              <div 
                key={idx} 
                className="flex flex-col gap-4 text-left"
              >
                {/* Visual Avatar representative */}
                <div className="w-14 h-14 rounded-full bg-[#16233c] text-[#be123c] font-serif font-bold flex items-center justify-center text-lg shrink-0 leading-none">
                  {admin.name.split(' ')[1] ? admin.name.split(' ')[0][0] + admin.name.split(' ')[1][0] : admin.name.substring(0, 2)}
                </div>
                
                <div className="flex flex-col">
                  <h4 className="text-sm font-bold text-[#16233c]">{admin.name}</h4>
                  <span className="text-xs font-semibold text-[#be123c] mt-1">{admin.role}</span>
                </div>
                
                <p className="text-xs text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                  {admin.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

      </div>
    </div>
  );
}
