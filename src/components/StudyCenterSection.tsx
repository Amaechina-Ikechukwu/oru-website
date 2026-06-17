/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Clock, MapPin, Milestone, CheckCircle, Calendar, Grid, Building } from 'lucide-react';
import { STUDY_CENTER_INFO, PROGRAMS } from '../data';

export default function StudyCenterSection() {
  const [selectedProgScheduleId, setSelectedProgScheduleId] = useState('theology');

  // Realistic schedules depending on program to create rich academic value
  const getProgramSchedule = (progId: string) => {
    switch (progId) {
      case 'theology':
        return [
          { day: 'Friday', time: '5:00 PM - 8:00 PM', course: 'Hermeneutics & Biblical Interpretation', lecturer: 'Rev. Dr. Josiah O. Amaechi' },
          { day: 'Saturday', time: '9:00 AM - 12:00 PM', course: 'Introduction to Biblical Theology', lecturer: 'Prof. Joseph Nnam’di (CCU)' },
          { day: 'Saturday', time: '1:00 PM - 3:00 PM', course: 'Life & Vision of Oral Roberts', lecturer: 'Rev. Emmanuel Nwankwo' }
        ];
      case 'computer-science':
        return [
          { day: 'Friday', time: '4:00 PM - 7:00 PM', course: 'Introduction to Algorithmic Reasoning', lecturer: 'Engr. Blessing Williams' },
          { day: 'Saturday', time: '10:00 AM - 1:00 PM', course: 'Web Technologies & UI/UX Systems', lecturer: 'Dr. Timothy Cole' },
          { day: 'Saturday', time: '2:00 PM - 5:00 PM', course: 'Object-Oriented Programming', lecturer: 'Engr. Blessing Williams' }
        ];
      case 'leadership':
      case 'business':
        return [
          { day: 'Friday', time: '5:00 PM - 8:00 PM', course: 'Principles of Christian Business Ethics', lecturer: 'Dr. Josiah O. Amaechi' },
          { day: 'Saturday', time: '9:00 AM - 12:00 PM', course: 'Foundations of Servant Leadership', lecturer: 'Prof. J. Nnam’di' },
          { day: 'Saturday', time: '1:00 PM - 4:00 PM', course: 'Stewardship Financial Accounting', lecturer: 'Mrs. Cynthia Cole-Okoye' }
        ];
      default:
        return [
          { day: 'Friday', time: '5:00 PM - 8:00 PM', course: 'Academic Research & Writing Protocols', lecturer: 'Dean of CCU Partner' },
          { day: 'Saturday', time: '10:00 AM - 2:00 PM', course: 'Moral Leadership in Modern Civilizations', lecturer: 'Rev. Emmanuel Nwankwo' }
        ];
    }
  };

  const scheduleList = getProgramSchedule(selectedProgScheduleId);

  return (
    <div className="w-full font-sans flex flex-col pt-16 bg-white pb-24" id="study-center-section-container">
      <div className="max-w-7xl mx-auto flex flex-col gap-24 w-full px-6 lg:px-8">

        {/* 1. Location and Environment Highlight Section split */}
        <section className="flex flex-col gap-16" id="study-center-environment">
          
          {/* Spatial highlights */}
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <h3 className="text-2xl lg:text-3xl font-bold font-serif text-[#16233c] tracking-tight">Facilities Hub</h3>
              <p className="text-gray-600 font-medium leading-relaxed">
                Experience comfort and modern infrastructure curated to empower focused learning and robust peer networking.
              </p>
            </div>
            
            <div className="flex flex-col gap-6 pt-6 border-t border-gray-200">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-[#16233c] shrink-0 mt-1" />
                <div className="flex flex-col text-left">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Premises Address</h4>
                  <p className="text-[#16233c] font-medium leading-relaxed">
                    Methodist Church Premises, Mbonu/Ohaeto Street, D/Line, Port Harcourt, Rivers State.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col gap-6 mt-4">
                {STUDY_CENTER_INFO.features.map((ft, idx) => (
                  <div key={idx} className="flex flex-col gap-1 text-left">
                    <span className="text-base font-bold font-serif text-[#16233c] tracking-tight">{ft.title}</span>
                    <p className="text-sm text-gray-600 font-medium leading-relaxed">{ft.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 p-6 bg-white border border-gray-200 flex items-start gap-4 text-sm text-gray-600 font-medium leading-relaxed rounded-none">
              <Building className="w-5 h-5 text-[#16233c] shrink-0 mt-0.5" />
              <span>Full-time security, quiet learning zones and standby power generation systems.</span>
            </div>
          </div>

          {/* Core Timetable Lecture Schedules option */}
          <div className="flex flex-col gap-10 bg-white p-8 lg:p-12 border border-gray-200 rounded-none">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-[#16233c] shrink-0" />
                <h3 className="text-2xl lg:text-3xl font-bold font-serif text-[#16233c] tracking-tight">Flexible Structures</h3>
              </div>
              <p className="text-gray-600 font-medium leading-relaxed">
                Whether you choose on-campus weekend intensive blocks, weekday hybrid evenings, or remote-assisted pathways, our frameworks respect your family and ministry callings.
              </p>
            </div>

            <div className="flex flex-col gap-8 pt-6 border-t border-gray-200">
              <div className="flex flex-col gap-2">
                <strong className="text-gray-500 font-bold tracking-widest uppercase text-xs block">Weekday Block Format</strong>
                <span className="text-[#16233c] font-serif text-xl">{STUDY_CENTER_INFO.lectureSchedule.weekday}</span>
              </div>
              <div className="flex flex-col gap-2">
                <strong className="text-gray-500 font-bold tracking-widest uppercase text-xs block">Weekend Cohorts Plan</strong>
                <span className="text-[#16233c] font-serif text-xl">{STUDY_CENTER_INFO.lectureSchedule.weekend}</span>
              </div>
              <div className="flex flex-col gap-2">
                <strong className="text-gray-500 font-bold tracking-widest uppercase text-xs block">Remote Assisted Module</strong>
                <span className="text-[#16233c] font-serif text-xl">{STUDY_CENTER_INFO.lectureSchedule.online}</span>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-600 font-medium flex items-start gap-3 pt-6 border-t border-gray-200">
              <CheckCircle className="w-5 h-5 shrink-0 text-[#16233c] mt-0.5" />
              <span className="leading-relaxed">All formats grant equal, rigorous access to Coal City University evaluation structures.</span>
            </div>
          </div>

        </section>

        {/* 2. Interactive Lecture Schedule Browser */}
        <section className="flex flex-col gap-12" id="interactive-timetable-block">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-gray-200">
            <div className="text-left flex flex-col gap-3">
              <h2 className="text-2xl lg:text-3xl font-bold font-serif text-[#16233c] tracking-tight flex items-center gap-3">
                <Calendar className="w-6 h-6 text-[#16233c]" />
                Live Timetables
              </h2>
              <p className="text-gray-600 font-medium">
                Interactive preview of current weekend classes by department framework.
              </p>
            </div>

            {/* Select program dropdown for timetable */}
            <div className="flex flex-wrap items-center gap-3">
              {PROGRAMS.slice(0, 5).map((p) => {
                const isSelected = p.id === selectedProgScheduleId;
                return (
                  <button
                    id={`sched-toggle-btn-${p.id}`}
                    key={p.id}
                    onClick={() => setSelectedProgScheduleId(p.id)}
                    className={`text-xs px-6 py-3 rounded-none border transition-all font-bold uppercase tracking-widest ${
                      isSelected
                        ? 'bg-[#16233c] border-[#16233c] text-white'
                        : 'bg-white hover:bg-gray-50 text-[#16233c] border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {p.title.split(' ')[0]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Timetable table list rendering */}
          <div className="overflow-x-auto border border-gray-200 rounded-none bg-white">
            <table className="w-full text-left font-sans text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-[#16233c] text-xs uppercase tracking-widest font-bold bg-gray-50">
                  <th className="py-5 px-6 font-semibold text-gray-600">Day</th>
                  <th className="py-5 px-6 font-semibold text-gray-600">Timing Bracket</th>
                  <th className="py-5 px-6 font-semibold text-gray-600">Subject / Course Module</th>
                  <th className="py-5 px-6 font-semibold text-gray-600">Lecturer / Co-ordinator</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {scheduleList.map((sched, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="py-6 px-6 font-medium text-[#16233c] border-r border-gray-50">{sched.day}</td>
                    <td className="py-6 px-6 border-r border-gray-50">
                      <span className="font-mono text-gray-600 text-sm whitespace-nowrap">
                        {sched.time}
                      </span>
                    </td>
                    <td className="py-6 px-6 font-serif text-lg text-[#16233c] border-r border-gray-50">{sched.course}</td>
                    <td className="py-6 px-6 text-gray-600 font-medium">{sched.lecturer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
}
